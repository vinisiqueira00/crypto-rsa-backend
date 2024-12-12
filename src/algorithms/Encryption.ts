import { BreakMessageIntoBlocks } from "../library/BreakMessageIntoBlocks";
import { ModularPotentialArithmeticAlgorithm } from "../library/ModularPotentialArithmeticAlgorithm";

export class Encryption {
  public static ALPHABET_LENGTH = 8;

  private decipherPublicKey(publicKey: string) {
    let result = publicKey;

    result = Buffer.from(result, "base64").toString();
    result = Buffer.from(result, "base64").toString();

    return {
      n: BigInt(result.toString().split("_")[0]),
      e: BigInt(result.toString().split("_")[1]),
    };
  }

  private generateBlocks(message: string, n: bigint): string[] {
    const breakMessageIntoBlocks = new BreakMessageIntoBlocks();
    const blocks = breakMessageIntoBlocks.break(
      message,
      n,
      Encryption.ALPHABET_LENGTH
    );

    return blocks;
  }

  private encodeBlocks(blocks: string[], n: bigint, e: bigint): string[] {
    const modularPotentialArithmetic =
      new ModularPotentialArithmeticAlgorithm();

    const encodedBlocks = blocks.map((block) => {
      const blockEncoded = modularPotentialArithmetic.calculate(
        BigInt(block),
        e,
        n
      );
      return blockEncoded < 0n
        ? (blockEncoded + n).toString()
        : blockEncoded.toString();
    });

    return encodedBlocks;
  }

  public encode({
    message,
    publicKey,
  }: {
    message: string;
    publicKey: string;
  }) {
    const { n, e } = this.decipherPublicKey(publicKey);

    const blocks = this.generateBlocks(message, n);

    const encodedBlocks = this.encodeBlocks(blocks, n, e);

    return encodedBlocks;
  }
}
