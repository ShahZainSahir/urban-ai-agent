type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [k: string]: boolean | undefined | null }
  | ClassValue[];

export function cn(...args: ClassValue[]): string {
  const resolve = (val: ClassValue): string => {
    if (!val && val !== 0) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number") return String(val);
    if (Array.isArray(val))
      return val.map(resolve).filter(Boolean).join(" ");
    if (typeof val === "object") {
      return Object.entries(val)
        .filter(([, v]) => Boolean(v))
        .map(([k]) => k)
        .join(" ");
    }
    return "";
  };
  return args.map(resolve).filter(Boolean).join(" ");
}
