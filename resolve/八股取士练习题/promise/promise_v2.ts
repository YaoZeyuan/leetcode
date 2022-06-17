const Const_Status_Pending = 'pending' as const
const Const_Status_Fulfilled = 'fulfilled' as const
const Const_Status_Rejected = 'rejected' as const

type Type_State_V2 = typeof Const_Status_Pending | typeof Const_Status_Fulfilled | typeof Const_Status_Rejected

type Type_Func_V2 = (...param: any[]) => any

// 根据x的状态, 决定myPromiseV2的状态
function reslovePromise(myPromiseV2, x, reslove, reject) {
    if (myPromiseV2 === x) {
        throw new Error('循环引用')
    }

    if (x instanceof MyPromiseV2) {
        // x是MyPromiseV2的子类
        if (x.state === Const_Status_Pending) {
            x.then(
                (nextValue) => {
                    reslovePromise(myPromiseV2, nextValue, reslove, reject)
                },
                (nextReason) => {
                    reject(nextReason)
                },
            )
        } else {
            x.then(reslove, reject)
        }
    } else if (x && (typeof x === 'function' || typeof x === 'object')) {
        let hasCalled = false
        try {
            let thenFunc = x.then

            if (typeof thenFunc === 'function') {
                thenFunc.call(
                    x,
                    (nextValue) => {
                        if (hasCalled) return
                        hasCalled = true
                        reslovePromise(myPromiseV2, nextValue, reslove, reject)
                    },
                    (nextReason) => {
                        if (hasCalled) return
                        hasCalled = true
                        reject(nextReason)
                    },
                )
            } else {
                hasCalled = true
                reslove(x)
            }
        } catch (e) {
            if (hasCalled) return
            hasCalled = true
            reject(e)
        }
    } else {
        // 普通值类型, 直接返回即可
        reslove(x)
    }
}

class MyPromiseV2 {
    // 初始值为pending
    state: Type_State_V2 = Const_Status_Pending

    // 执行结果
    value: any
    reason: any

    onFulfilledCallbackList: Type_Func_V2[] = []
    onRejectedCallbackList: Type_Func_V2[] = []

    constructor(exector: (reslove: Type_Func_V2, rejected: Type_Func_V2) => any) {
        let reslove = (value) => {
            queueMicrotask(() => {
                // 在下个微任务中开始执行
                if (this.state === Const_Status_Pending) {
                    // 只有pending状态才能修改
                    this.value = value
                    this.state = Const_Status_Fulfilled

                    // 不用担心抛异常问题
                    for (let func of this.onFulfilledCallbackList) {
                        func(this.value)
                    }
                }
            })
        }

        let rejected = (reason) => {
            if (this.state === Const_Status_Pending) {
                // 只有pending状态才能修改
                this.reason = reason
                this.state = Const_Status_Rejected

                // 不用担心抛异常问题
                for (let func of this.onRejectedCallbackList) {
                    func(this.reason)
                }
            }
        }

        try {
            exector(reslove, rejected)
        } catch (e) {
            rejected(e)
        }
    }

    then(onFulfilledCallback: Type_Func_V2, onRejectedCallback: Type_Func_V2) {
        // 确保传入值一定是函数
        onFulfilledCallback = typeof onFulfilledCallback === 'function' ? onFulfilledCallback : (value) => value
        onRejectedCallback =
            typeof onRejectedCallback === 'function'
                ? onRejectedCallback
                : (reason) => {
                      throw reason
                  }

        let promise2
        switch (this.state) {
            // 待解决
            case Const_Status_Pending: {
                // 等待Promise执行完毕

                promise2 = new MyPromiseV2((thenReslove, thenReject) => {
                    this.onFulfilledCallbackList.push((value) => {
                        try {
                            let x = onFulfilledCallback(value)
                            reslovePromise(promise2, x, thenReslove, thenReject)
                        } catch (e) {
                            thenReject(e)
                        }
                    })

                    this.onRejectedCallbackList.push((reason) => {
                        try {
                            let x = onRejectedCallback(reason)
                            reslovePromise(promise2, x, thenReslove, thenReject)
                        } catch (e) {
                            thenReject(e)
                        }
                    })
                })
            }
            case Const_Status_Fulfilled: {
                // 已完成
                promise2 = new MyPromiseV2((thenReslove, thenReject) => {
                    try {
                        let x = onFulfilledCallback(this.value)
                        reslovePromise(promise2, x, thenReslove, thenReject)
                    } catch (e) {
                        thenReject(e)
                    }
                })
            }
            case Const_Status_Rejected: {
                // 已终止
                promise2 = new MyPromiseV2((thenReslove, thenReject) => {
                    try {
                        let x = onRejectedCallback(this.reason)
                        reslovePromise(promise2, x, thenReslove, thenReject)
                    } catch (e) {
                        thenReject(e)
                    }
                })
            }
            // 没有其他可能
        }
        return promise2
    }
}
