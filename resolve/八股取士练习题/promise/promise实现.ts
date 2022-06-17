/**
 * 任务目标: 手工实现一个Promise
 *
 * 支持实例创建/then方法
 *
 * 参考: https://mp.weixin.qq.com/s/_gDIO6YCswAS2dICllMG0A
 */

const Const_State_Pending = 'pending' as const
const Const_State_Fulfilled = 'fulfilled' as const
const Const_State_Rejected = 'rejected' as const

type Type_State = typeof Const_State_Fulfilled | typeof Const_State_Pending | typeof Const_State_Rejected

function resolvePromise(promise2, x, resolve: Function, reject: Function) {}

class MyPromise {
    // 初始状态
    state: Type_State = Const_State_Pending

    onFulfilledCallbackList: Function[] = [] // 成功回调队列
    onRejectedCallbackList: Function[] = [] // 失败回调队列

    value: any = undefined // 保存终值
    reason: any = undefined // 保存拒绝原因

    constructor(executor: (outsideReslove: Function, outsideReject: Function) => any) {
        const reslove = (value: any) => {
            // 在下一个微任务中开始执行
            queueMicrotask(() => {
                if (this.state === Const_State_Pending) {
                    // 保证状态只能改变一次
                    this.state = Const_State_Fulfilled
                    this.value = value

                    for (let callbackFunc of this.onFulfilledCallbackList) {
                        // 由callbackFunc负责保证不抛出异常, 主函数中不需要做跟进处理
                        callbackFunc(this.value)
                    }
                }
            })
        }
        const rejected = (reason: any) => {
            if (this.state === Const_State_Pending) {
                // 保证状态只能改变一次
                this.state = Const_State_Rejected
                this.reason = reason
            }
        }

        // 避免执行期间抛出异常
        try {
            executor(reslove, rejected)
        } catch (e) {
            rejected(e)
        }
    }

    then(onFulfilled: Function, onRejected: Function) {
        // 避免onFulfilled onRejected不是函数
        onFulfilled =
            typeof onFulfilled === 'function'
                ? onFulfilled
                : (value) => {
                      return value
                  }
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (reason) => {
                      throw reason
                  }

        switch (this.state) {
            case Const_State_Pending: {
                // 处理中
                let promise2 = new MyPromise((resolve, reject) => {
                    this.onFulfilledCallbackList.push((value) => {
                        try {
                            // 第一步正常回调
                            let x = onFulfilled(value)
                            // 第二步, 设置promise2的状态
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                    this.onRejectedCallbackList.push((reason) => {
                        try {
                            let x = onRejected(reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                return promise2
            }
            // 已定义
            case Const_State_Fulfilled: {
                // 直接返回结果
                let promise2 = new MyPromise((resolve, reject) => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                return promise2
            }
            case Const_State_Rejected: {
                // 直接返回结果

                let promise2 = new MyPromise((resolve, reject) => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                return promise2
            }
        }
    }
}
