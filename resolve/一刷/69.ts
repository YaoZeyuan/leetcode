function mySqrt(x: number): number {
    let result = 0
    while(result * result <= x){
        result++
    }
    return result - 1
}
