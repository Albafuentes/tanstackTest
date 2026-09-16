import { es } from "../locales/es";

export function stringVerification(value: unknown): string[] {
  const errors: string[] = [];
  if (!value) {
    errors.push(es.stringVerificationNotValueError);
  }

  if (typeof value !== "string") {
    errors.push(es.stringVerificationNotStringError);
  }

  return errors;
}
