import { Font } from '@react-pdf/renderer'
import tinosRegular from '@fontsource/tinos/files/tinos-latin-400-normal.woff'
import arimoRegular from '@fontsource/arimo/files/arimo-latin-400-normal.woff'
import arimoBold from '@fontsource/arimo/files/arimo-latin-700-normal.woff'
import arimoItalic from '@fontsource/arimo/files/arimo-latin-400-italic.woff'

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
// Body text uses Arimo, not Calibri's clone Carlito: root-caused via fontkit
// directly against the actual font files (`font.availableFeatures`) that
// Carlito ships a "liga" OpenType feature substituting "ti"/"tt"/"fi"/"fl"/
// "ft" into single ligature glyphs, and @react-pdf/renderer's font-
// subsetting step loses the correct Unicode codepoint mapping for those
// glyphs when embedding the subset font in the PDF -- confirmed against a
// real generated CV where copying the text (or an ATS parsing it) silently
// dropped a letter from exactly those pairs (e.g. "applikationer" ->
// "applikatoner"), while the rendered PDF stayed pixel-correct throughout.
// Tinos and Arimo both have zero ligature features (checked with the same
// tool), so there's no ligature glyph for subsetting to ever mismap. The
// original 2026-08-11 investigation (see git history) targeted fixing the
// subsetting/ToUnicode step itself, which genuinely has no public API for
// it -- switching away from the one font that triggers the ligature
// substitution sidesteps the problem instead of patching react-pdf's
// bundled fontkit fork. The HTML preview switched fonts to match (see
// main.tsx, ResumePage.module.css) so it still shows exactly what the PDF
// export produces.
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
// subset font at render time, roughly a dozen extra font files across Tinos/
// Arimo, which meaningfully bloats the bundle for every user to cover a
// rare case. Deliberately not built, same tradeoff call as the ligature
// issue above. CJK glyphs aren't in these font families at all, in the
// preview or the PDF, so no amount of subset-loading fixes that; it would
// require swapping the whole typeface.
export function registerPdfFonts() {
  if (registered) return
  registered = true

  Font.register({
    family: 'Tinos',
    fonts: [{ src: tinosRegular, fontWeight: 400 }],
  })

  Font.register({
    family: 'Arimo',
    fonts: [
      { src: arimoRegular, fontWeight: 400, fontStyle: 'normal' },
      { src: arimoBold, fontWeight: 700, fontStyle: 'normal' },
      { src: arimoItalic, fontWeight: 400, fontStyle: 'italic' },
    ],
  })

  Font.registerHyphenationCallback(hyphenationCallback)
}
