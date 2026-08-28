export function cz(...items: (false | string | undefined)[]): string {
  return items.filter(Boolean).join(" ");
}
