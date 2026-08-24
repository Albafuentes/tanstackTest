export function stringVerification(value: unknown): string[] {
  const errors: string[] = [];
  if (!value) {
    errors.push("This field is required");
  }

  if (typeof value !== "string") {
    errors.push("The field must be a string");
  }

  return errors;
}

export function mailVerification(value: unknown): string[] {
  if (typeof value === "string" && !value.includes("@")) {
    return ["Email must be a valid email address"];
  }
  return [];
}
