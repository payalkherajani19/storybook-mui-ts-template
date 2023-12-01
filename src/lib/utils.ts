export const coerceArray = <T extends {}>(value: T | T[]): T[] =>
    Array.isArray(value) ? value : [value]
