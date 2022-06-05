function maxProfit(prices: number[]): number {
    // @todo 该题目没有做出来
    // 第i天持有股票 和 第i天不持有股票带来的收入
    // 全程可以执行多次买入卖出操作
    // 基本思路同第121题

    type Type_Result = {
        withStock: number
        withoutStock: number
    }
    let currentResult: Type_Result = {
        withStock: 0 - prices[0],
        withoutStock: 0,
    }
    for (let currentAt = 1; currentAt < prices.length; currentAt++) {
        let nextResult: Type_Result = {
            withStock: Math.max(
                // 在今天开始持有股票
                currentResult.withoutStock - prices[currentAt],
                // 继续持有昨天的股票
                currentResult.withStock,
            ),
            withoutStock: Math.max(
                // 继续不持有股票
                currentResult.withoutStock,
                // 将持有的股票卖出
                currentResult.withStock + prices[currentAt],
            ),
        }
        currentResult = nextResult
    }
    return Math.max(currentResult.withStock, currentResult.withoutStock)
}
