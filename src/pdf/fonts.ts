import { Font } from '@react-pdf/renderer'
import tinosRegular from '@fontsource/tinos/files/tinos-latin-400-normal.woff'
import arimoBold from '@fontsource/arimo/files/arimo-latin-700-normal.woff'
import carlitoRegular from '@fontsource/carlito/files/carlito-latin-400-normal.woff'
import carlitoBold from '@fontsource/carlito/files/carlito-latin-700-normal.woff'
import carlitoItalic from '@fontsource/carlito/files/carlito-latin-400-italic.woff'

let registered = false

// react-pdf's default hyphenation callback returns a word unsplit
// (`(word) => [word]`), so a long unbroken token with no spaces (a bare URL,
// a long email) has no valid line-break point and can run off the page edge
// instead of wrapping. Short/normal words are left alone; only tokens past
// a length no real line could fit get fallback break points.
const MAX_UNSPLIT_WORD_LENGTH = 20
const HYPHENATION_CHUNK_SIZE = 10

function hyphenationCallback(word: string): string[] {
  if (word.length <= MAX_UNSPLIT_WORD_LENGTH) return [word]
  const chunks: string[] = []
  for (let i = 0; i < word.length; i += HYPHENATION_CHUNK_SIZE) {
    chunks.push(word.slice(i, i + HYPHENATION_CHUNK_SIZE))
  }
  return chunks
}

// Metric-compatible open-source stand-ins for the Microsoft fonts the resume
// template is styled after (Times New Roman, Arial Nova, Calibri). Same glyph
// widths, so layout matches exactly, but freely licensed for a public repo.
//
// Known limitation: @react-pdf/renderer's font subsetting doesn't record
// correct Unicode codepoints for ligature glyphs (e.g. "ti", "tt", "fl"),
// so copying text out of the exported PDF (or an ATS scanning it) can drop
// a letter from those pairs, e.g. "applikationer" -> "applikatoner". Purely
// a copy/paste and text-extraction issue, the rendered PDF itself is
// pixel-correct. No public API in @react-pdf/renderer to disable ligature
// substitution or fix the ToUnicode mapping (checked font/layout/pdfkit
// packages directly, see git history 2026-08-11). Would require patching
// their bundled fontkit fork, not worth the fragility.
//
// Known limitation: only the -latin glyph subset of each font is registered
// here, while the HTML preview (see main.tsx) loads the full @fontsource
// CSS, which covers latin-ext/cyrillic/greek/vietnamese too and lets the
// browser pick the right file per character automatically via unicode-range.
// react-pdf's Font.register has no equivalent, it maps exactly one font file
// per family+weight, so a name or summary using Cyrillic, Greek, or
// Vietnamese characters can render correctly in the live preview but show
// missing glyphs in the exported PDF. A real fix would mean detecting the
// script of each piece of user text and registering/selecting the matching
// subset font at render time, roughly 20 extra font files across Tinos/
// Arimo/Carlito, which meaningfully bloats the bundle for every user to
// cover a rare case. Deliberately not built, same tradeoff call as the
// ligature issue above. CJK glyphs aren't in these font families at all, in
// the preview or the PDF, so no amount of subset-loading fixes that; it
// would require swapping the whole typeface.
export function registerPdfFonts() {
  if (registered) return
  registered = true

  Font.register({
    family: 'Tinos',
    fonts: [{ src: tinosRegular, fontWeight: 400 }],
  })

  Font.register({
    family: 'Arimo',
    fonts: [{ src: arimoBold, fontWeight: 700 }],
  })

  Font.register({
    family: 'Carlito',
    fonts: [
      { src: carlitoRegular, fontWeight: 400, fontStyle: 'normal' },
      { src: carlitoBold, fontWeight: 700, fontStyle: 'normal' },
      { src: carlitoItalic, fontWeight: 400, fontStyle: 'italic' },
    ],
  })

  Font.registerHyphenationCallback(hyphenationCallback)
}
