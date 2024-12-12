import { Helpers } from "../helpers/Helpers";

export class BreakMessageIntoBlocks {
  private blocks: string[] = [];
  private message: string = "";

  private textToMessage(text: string, size: number): string {
    return text
      .split("")
      .map((textChar) => Helpers.charToCode(textChar, size))
      .join("");
  }

  private resetMessage(blockLength: number) {
    this.message = this.message.substring(blockLength);
  }

  private generateBlock(reviews: { value: string; isValid: boolean }[]) {
    const validReviews = reviews.filter((review) => review.isValid);
    const lastValidReview = validReviews[validReviews.length - 1];
    const block = lastValidReview.value;

    this.blocks.push(block);

    this.resetMessage(block.length);
  }

  public break(text: string, n: bigint, size: number): string[] {
    try {
      this.message = this.textToMessage(text, size);

      let reviews: { value: string; isValid: boolean }[] = [];

      let index = 1;
      while (index <= this.message.length) {
        const inReview = this.message.substring(0, index);
        const nextValue = this.message[index];

        if (BigInt(inReview) >= n) {
          reviews.push({ value: inReview, isValid: false });

          this.generateBlock(reviews);

          index = 1;
          reviews = [];

          continue;
        } else if (!nextValue) {
          reviews.push({ value: inReview, isValid: true });

          this.generateBlock(reviews);
        } else if (BigInt(nextValue) === 0n) {
          reviews.push({ value: inReview, isValid: false });
        } else {
          reviews.push({ value: inReview, isValid: true });
        }

        index++;
      }

      return this.blocks;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
