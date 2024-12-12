import { ModularArithmeticAlgorithm } from "./ModularArithmeticAlgorithm";

export class ModularPotentialArithmeticAlgorithm {
  calculate(
    baseNumber: bigint,
    exponentNumber: bigint,
    moduleNumber: bigint
  ): bigint {
    try {
      const modularArithmeticAlgorithm = new ModularArithmeticAlgorithm();

      let result = 1n;
      baseNumber = baseNumber % moduleNumber;

      while (exponentNumber > 0) {
        if (exponentNumber % 2n === 1n) {
          const r = (result * baseNumber) % moduleNumber;
          result = modularArithmeticAlgorithm.calculate(moduleNumber, r);
        }

        exponentNumber = exponentNumber / 2n;
        baseNumber = (baseNumber * baseNumber) % moduleNumber;
      }

      return result;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
