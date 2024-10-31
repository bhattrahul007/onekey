import { OnekeyValidator } from '@onekey/ui-design/core/types';

class MaxLengthValidator implements OnekeyValidator<string> {
  private readonly code = 'MIN_LENGTH';
  private readonly maxLength: number;
  private readonly message: string;

  constructor(maxLength?: number, message?: string) {
    this.maxLength = maxLength ?? 255;
    this.message = message ?? `Maximun ${this.maxLength} length required.`;
  }

  getCode(): string {
    return this.code;
  }

  getMessage() {
    return this.message;
  }

  validate(value: string | undefined): boolean {
    const sanitizedInput = value?.trim() ?? '';
    return this.maxLength != undefined && sanitizedInput.length <= this.maxLength;
  }
}

export default MaxLengthValidator;
