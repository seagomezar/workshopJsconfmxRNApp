export function capitalizeFirstLetter(str: string): string {
  if (!str) return ""
  if (str && !str.length) return ""

  return str.charAt(0).toUpperCase() + str.slice(1)
}
