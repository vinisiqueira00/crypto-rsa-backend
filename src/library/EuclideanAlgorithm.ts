export interface EuclideanAlgorithmProps {
  firstNumber: bigint;
  secondNumber: bigint;
}

export class EuclideanAlgorithm {
  private getSmallerNumber(firstNumber: bigint, secondNumber: bigint): bigint {
    if (firstNumber < secondNumber) return firstNumber;

    return secondNumber;
  }

  private getHigherNumber(firstNumber: bigint, secondNumber: bigint): bigint {
    if (firstNumber > secondNumber) return firstNumber;

    return secondNumber;
  }

  public calculate({
    firstNumber,
    secondNumber,
  }: EuclideanAlgorithmProps): bigint {
    try {
      const smallerNumber = this.getSmallerNumber(firstNumber, secondNumber);
      const higherNumber = this.getHigherNumber(firstNumber, secondNumber);

      const window = {
        firstField: higherNumber,
        secondField: smallerNumber,
      };

      let rest = 1n;

      while (rest !== 0n) {
        rest = window.firstField % window.secondField;
        window.firstField = window.secondField;
        window.secondField = rest;
      }

      return window.firstField;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
