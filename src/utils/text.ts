/**
 * Word (and similar apps) often insert a line break at every wrapped line when you
 * copy a paragraph, not just at the end of a sentence. Pasted into a "one bullet per
 * line" textarea, that silently splits a single bullet into several.
 *
 * Heuristic: a line that doesn't end in sentence-ending punctuation is treated as a
 * wrapped continuation of the previous line and gets joined back with a space.
 * Blank lines (intentional paragraph breaks) are always kept as-is.
 */
export function normalizePastedLines(text: string): string {
  const lines = text.split(/\r\n|\r|\n/).map((line) => line.trim())
  const result: string[] = []

  for (const line of lines) {
    const previous = result[result.length - 1]
    const previousEndsSentence = previous && /[.!?:;]$/.test(previous)

    if (line !== '' && previous !== undefined && previous !== '' && !previousEndsSentence) {
      result[result.length - 1] = `${previous} ${line}`
    } else {
      result.push(line)
    }
  }

  return result.join('\n')
}
