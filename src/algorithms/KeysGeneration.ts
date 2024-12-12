import { prime } from "bigint-crypto-utils";

import { EuclideanAlgorithm } from "../library/EuclideanAlgorithm";
import { ModularInverseArithmeticAlgorithm } from "../library/ModularInverseArithmeticAlgorithm";

export class KeysGeneration {
  private static BIT_LENGTH = 64;

  private async generatePrimesNumbers() {
    return [
      await prime(KeysGeneration.BIT_LENGTH),
      await prime(KeysGeneration.BIT_LENGTH),
    ];
  }

  private calculatePhi(p: bigint, q: bigint) {
    return (p - 1n) * (q - 1n);
  }

  private calculateE(p: bigint, phi: bigint) {
    const euclideanAlgorithm = new EuclideanAlgorithm();

    for (let e = p; e < phi; e += 2n) {
      const gcd = euclideanAlgorithm.calculate({
        firstNumber: e,
        secondNumber: phi,
      });

      if (gcd === 1n) return e;
    }
  }

  private calculateD(e: bigint, phi: bigint) {
    const modularInverseArithmeticAlgorithm =
      new ModularInverseArithmeticAlgorithm();
    const d = modularInverseArithmeticAlgorithm.calculate({
      number: e,
      moduleNumber: phi,
    });

    return d;
  }

  private cipherKey(privateKey: string): string {
    let buffer = privateKey;

    buffer = Buffer.from(buffer).toString("base64");
    buffer = Buffer.from(buffer).toString("base64");

    return buffer.toString();
  }

  public async generate() {
    const [p, q] = await this.generatePrimesNumbers();

    const n = p * q;

    const phi = this.calculatePhi(p, q);

    const e = this.calculateE(p, phi);

    if (!e) return;

    const d = this.calculateD(e, phi);

    const keys = {
      public: this.cipherKey(`${n.toString()}_${e.toString()}`),
      private: this.cipherKey(
        `${p.toString()}_${q.toString()}_${d.toString()}`
      ),
    };

    return {
      publicKey: keys.public,
      privateKey: keys.private,
    };
  }
}
