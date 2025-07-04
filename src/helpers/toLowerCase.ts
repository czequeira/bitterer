export function toLowerCase(text: string): string {
  const firstLetter = text.slice(0, 1)
  const restOfTheWord = text.slice(1, text.length)

  return [firstLetter.toLowerCase(), restOfTheWord].join('')
}
