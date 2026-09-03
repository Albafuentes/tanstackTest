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

export function mailVerification(value: unknown): string[] {
  if (typeof value === "string" && !value.includes("@")) {
    return [es.mailVerificationNotValidEmailError];
  }
  return [];
}
