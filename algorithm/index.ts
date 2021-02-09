export const solution = (pikachu: number, candy: number) => {
    const evCandyCost = 12

    let xp = 0
    let raichu = 0

    while (true) {
        if (pikachu === 0) {
            break
        }

        let evCandy = pikachu * evCandyCost
        let evPikachu = pikachu

        if (evCandy > candy) {
            evPikachu = Math.floor(candy / evCandyCost)
            evCandy = evPikachu * evCandyCost
        }

        // 오박사에게 보낸다
        if (evPikachu === 0) {
            pikachu--
            candy++
            continue
        }

        // 진화
        pikachu -= evPikachu
        raichu += evPikachu
        candy = candy - evCandy + evPikachu
        xp += 500 * evPikachu
    }

    return xp
}
