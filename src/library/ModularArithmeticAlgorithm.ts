export class ModularArithmeticAlgorithm {
  searchNumberIndex(values: bigint[][], number: bigint) {
    let counter = 0n;
    for (const value of values) {
      const result = value.findIndex((valueItem) => valueItem === number);

      if (result !== -1) {
        break;
      }

      counter++;
    }

    return counter;
  }

  abs(number: bigint) {
    return number >= 0 ? number : -1n * number;
  }

  calculate(moduleNumber: bigint, number: bigint): bigint {
    try {
      if (!moduleNumber) {
        throw new Error("Non-integer module number");
      }

      const result = ((number % moduleNumber) + moduleNumber) % moduleNumber;

      const middleModule = moduleNumber / 2n;

      if (result > middleModule) return result - moduleNumber;

      return result;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
