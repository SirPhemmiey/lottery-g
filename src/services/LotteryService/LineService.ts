import { LineNumbers, LineNumbersValue } from "./TicketDao";


export interface ILineService {
    generateLine(): number;
    generateLotteryNumber(max: number): number;
    checkLineNumbers(lines: LineNumbers[]): LineNumbersValue[];
}

export class LineService implements ILineService {

    constructor(public maxNumber: number) { }

    generateLine() {
        return this.generateLotteryNumber(this.maxNumber);
    }

    generateLotteryNumber(max: number) {
        return Math.random() * max | 0;
    }

    checkLineNumbers(lines: LineNumbers[]) {
        const results: LineNumbersValue[] = [];
        for (const line of lines) {
            let number1 = line.numbers[0];
            let number2 = line.numbers[1];
            let number3 = line.numbers[2];
            if (number1 + number2 + number3 === 2) {
                results.push({
                    numbers: line.numbers,
                    outcomeValue: 10
                });
            } else if (number1 === number2 && number2 === number3) {
                results.push({
                    numbers: line.numbers,
                    outcomeValue: 5
                });
            } else if (number2 !== number1 && number3 !== number1) {
                results.push({
                    numbers: line.numbers,
                    outcomeValue: 1
                });
            } else {
                results.push({
                    numbers: line.numbers,
                    outcomeValue: 0
                });
            }
        }
        return results;
    }


}