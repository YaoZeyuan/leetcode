type Type_146_LRU_Item = {
    key: number
    val: number
    next: Type_146_LRU_Item
    prev: Type_146_LRU_Item
}
class LRUCache {
    // 首先需要一个hash表记录当前已经缓存的数据
    hashCache = new Map<number, Type_146_LRU_Item>()
    // 记录最不常用的key
    mostUseLessKey: number
    // 记录最常用的key
    mostUseKey: number

    // 最大长度
    maxCacheSize = 0

    constructor(capacity: number) {
        this.maxCacheSize = capacity
    }

    get(key: number): number {
        if (this.hashCache.has(key)) {
            // 存在数据
            let item = this.hashCache.get(key)

            // 更新key使用频率

            // 使用双向链表保存使用频率
            // 注意事项:
            // 如果链表中只有一个元素, 不需要处理
            if (this.hashCache.size === 1) {
                this.mostUseKey = item.key
                this.mostUseLessKey = item.key
            } else {
                // 先取出左右两侧的key
                let oldMostUseItem = this.hashCache.get(this.mostUseKey)
                // 如果链表中有2个及以上元素
                if (this.mostUseLessKey === key) {
                    // - 待处理元素为链表左端点

                    // 1. 将下一个元素设为最不常使用的元素
                    let nextItem = item.next
                    nextItem.prev = null
                    this.mostUseLessKey = nextItem.key

                    // 2. 将item设为最常使用的元素
                    oldMostUseItem.next = item
                    item.next = null
                    item.prev = oldMostUseItem
                    this.mostUseKey = item.key
                } else if (this.mostUseKey === key) {
                    // - 待处理元素为链表右端点
                    // 说明已经是最常使用的元素了, 不需要进行处理
                } else {
                    // - 待处理元素为链表中间的元素
                    // 1. 把item从双向链表中摘出来
                    item.prev.next = item.next
                    item.next.prev = item.prev
                    // 2. 将item设为最常使用的元素
                    oldMostUseItem.next = item
                    item.prev = oldMostUseItem
                    item.next = null
                    this.mostUseKey = item.key
                }
            }

            return item.val
        } else {
            return -1
        }
    }

    put(key: number, value: number): void {
        if (this.mostUseKey === undefined) {
            // 初次调用
            this.mostUseKey = key
            this.mostUseLessKey = key

            let item: Type_146_LRU_Item = {
                key: key,
                val: value,
                prev: null,
                next: null,
            }
            this.hashCache.set(key, item)
            return
        }

        if (this.hashCache.has(key)) {
            // key已存在, 更新已有值
            let item = this.hashCache.get(key)
            item.val = value
            // 调用get方法, 会自动将该值设为最新值
            this.get(key)
            return
        }

        // key 不存在, 新增元素

        // 非初次调用, 新加入元素必然为当前最常使用元素
        let oldMostUseItem = this.hashCache.get(this.mostUseKey)
        let item: Type_146_LRU_Item = {
            key: key,
            val: value,
            prev: oldMostUseItem,
            next: null,
        }
        oldMostUseItem.next = item
        this.mostUseKey = key
        this.hashCache.set(key, item)

        // 检查缓存区容量
        if (this.hashCache.size > this.maxCacheSize) {
            // 需要删除旧元素
            let oldMostUseLessItem = this.hashCache.get(this.mostUseLessKey)
            this.hashCache.delete(oldMostUseLessItem.key)
            oldMostUseLessItem.next.prev = null
            this.mostUseLessKey = oldMostUseLessItem.next.key
        }
        return
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

function test146() {
    let actionList = ['put', 'put', 'put', 'put', 'get', 'get', 'get', 'get', 'put', 'get', 'get', 'get', 'get', 'get']
    let paramList = [[1, 1], [2, 2], [3, 3], [4, 4], [4], [3], [2], [1], [5, 5], [1], [2], [3], [4], [5]]

    let item = new LRUCache(3)
    for (let i = 0; i < actionList.length; i++) {
        let action = actionList[i]
        let param = paramList[i]
        switch (action) {
            case 'put':
                item.put(...param)
                break
            case 'get':
                if (param[0] === 4) {
                    console.log('1')
                }
                item.get(...param)
                break
        }
    }
}

console.log(test146())
