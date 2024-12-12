export interface ExtendedEuclideanAlgorithmProps {
  firstNumber: bigint;
  secondNumber: bigint;
}

export interface ExtendedEuclideanAlgorithmResponse {
  gcd: bigint;
  alpha: bigint;
  beta: bigint;
}

interface ValuesType {
  rest: bigint;
  quotient: bigint | null;
  alpha: bigint;
  beta: bigint;
}

export class ExtendedEuclideanAlgorithm {
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
  }: ExtendedEuclideanAlgorithmProps): ExtendedEuclideanAlgorithmResponse {
    try {
      if (firstNumber === secondNumber) {
        return {
          gcd: firstNumber,
          alpha: 2n,
          beta: -1n,
        };
      }

      const smallerNumber = this.getSmallerNumber(firstNumber, secondNumber);
      const higherNumber = this.getHigherNumber(firstNumber, secondNumber);

      if (higherNumber % smallerNumber === 0n) {
        const quotient = higherNumber / smallerNumber;

        return {
          gcd: smallerNumber,
          alpha: higherNumber === firstNumber ? 1n : 1n - quotient,
          beta: higherNumber === firstNumber ? 1n - quotient : 1n,
        };
      }

      const values: ValuesType[] = [
        { rest: higherNumber, quotient: null, alpha: 1n, beta: 0n },
        { rest: smallerNumber, quotient: null, alpha: 0n, beta: 1n },
      ];

      while (values[1].rest !== 0n) {
        const newQuotient = values[0].rest / values[1].rest;

        const newRest = values[0].rest % values[1].rest;

        const newAlpha = values[0].alpha - newQuotient * values[1].alpha;

        const newBeta = values[0].beta - newQuotient * values[1].beta;

        values[0] = values[1];
        values[1] = {
          rest: newRest,
          quotient: newQuotient,
          alpha: newAlpha,
          beta: newBeta,
        };
      }

      return {
        gcd: values[0].rest,
        alpha: higherNumber === firstNumber ? values[0].alpha : values[0].beta,
        beta: higherNumber === firstNumber ? values[0].beta : values[0].alpha,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
