function a() {
    const Const_Status_Pending = 'pending' as const
    const Const_Status_Fulfilled = 'fulfilled' as const
    const Const_Status_Rejected = 'rejected' as const

    type Type_State = typeof Const_Status_Pending | typeof Const_Status_Fulfilled | typeof Const_Status_Rejected

    type Type_Func = (...param: any[]) => any

    // 根据x状态, 决定promise2状态
    function reslovePromise(promise2, x, reslove, rejected) {
        if (promise2 === x) {
            throw new Error('循环引用')
        }

        if (x instanceof MyPromise) {
            switch (x.state) {
                case Const_Status_Pending: {
                    x.then(
                        (value) => {
                            reslovePromise(promise2, value, reslove, rejected)
                        },
                        (reason) => {
                            reslovePromise(promise2, reason, reslove, rejected)
                        },
                    )
                }
                case Const_Status_Fulfilled: {
                    try {
                        reslove(x.value)
                    } catch (e) {
                        rejected(e)
                    }
                }
                case Const_Status_Rejected: {
                    rejected(x.reason)
                }
            }
        } else if ((x && typeof x === 'function') || typeof x === 'object') {
            let hasCalled = false
            try {
                let thenFunc = x.then
                thenFunc(
                    (value) => {
                        if (hasCalled) {
                            return
                        }
                        hasCalled = true
                        reslovePromise(promise2, value, reslove, rejected)
                    },
                    (reason) => {
                        if (hasCalled) {
                            return
                        }
                        hasCalled = true
                        rejected(reason)
                    },
                )
            } catch (e) {
                if (hasCalled) return
                rejected(e)
            }
        } else {
            // 普通数值
            reslove(x)
        }
    }

    class MyPromise {
        state: Type_State = Const_Status_Pending

        value: any
        reason: any

        onFulfilledCallbackList: Type_Func[] = []
        onRejectedCallbackList: Type_Func[] = []

        constructor(execute: Type_Func) {
            let reslove = (value) => {
                queueMicrotask(() => {
                    // 只有pending状态可以修改
                    if (this.state === Const_Status_Pending) {
                        this.state = Const_Status_Fulfilled
                        this.value = value
                        for (let func of this.onFulfilledCallbackList) {
                            func(this.value)
                        }
                    }
                })
            }
            let rejected = (reason) => {
                if (this.state === Const_Status_Pending) {
                    this.state = Const_Status_Rejected
                    this.value = reason
                    for (let func of this.onRejectedCallbackList) {
                        func(this.reason)
                    }
                }
            }

            // 一开始就执行
            try {
                execute(reslove, rejected)
            } catch (e) {
                rejected(e)
            }
        }

        then(fulfilledCallback: Type_Func, rejectedCallback: Type_Func) {
            // 首先检测是不是可执行函数
            fulfilledCallback = typeof fulfilledCallback === 'function' ? fulfilledCallback : (value) => value
            rejectedCallback = typeof rejectedCallback === 'function' ? rejectedCallback : (value) => value

            // 然后开始执行代码

            // 最终需要返回一个promise
            let promise2

            // 根据当前状态决定
            switch (this.state) {
                // 只有pending需要额外处理
                case Const_Status_Pending: {
                    promise2 = new MyPromise((reslove, rejected) => {
                        // 将回调函数包装后, 放入回调列表中
                        this.onFulfilledCallbackList.push((value) => {
                            try {
                                let x = fulfilledCallback(value)
                                reslovePromise(promise2, x, reslove, rejected)
                            } catch (e) {
                                rejected(e)
                            }
                        })

                        this.onRejectedCallbackList.push((reason) => {
                            try {
                                let x = rejectedCallback(reason)
                                reslovePromise(promise2, x, reslove, rejected)
                            } catch (e) {
                                rejected(e)
                            }
                        })
                    })
                }
                case Const_Status_Fulfilled: {
                    // 直接执行即可
                    promise2 = new MyPromise((reslove, rejected) => {
                        try {
                            let x = fulfilledCallback(this.value)
                            reslovePromise(promise2, x, reslove, rejected)
                        } catch (e) {
                            rejected(e)
                        }
                    })
                }
                case Const_Status_Rejected: {
                    promise2 = new MyPromise((reslove, rejected) => {
                        let x = rejectedCallback(this.reason)
                        reslovePromise(promise2, x, reslove, rejected)
                    })
                }
            }

            return promise2
        }
    }
}
