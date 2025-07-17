// utils/EmailValidator.ts
import { Validator } from './validator';

export class EmailValidator implements Validator<string> {
   isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
