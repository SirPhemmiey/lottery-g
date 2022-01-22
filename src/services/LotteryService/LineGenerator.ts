
export interface ILineGenerator {
    generateLine(): number;
    generateLotteryNumber(max: number): number;
}

export class LineGenerator implements ILineGenerator {

    constructor(public maxNumber: number) {}

    generateLine() {
        return this.generateLotteryNumber(this.maxNumber);
    }

    generateLotteryNumber(max: number) {
        return Math.random() * max | 0;
    }

}