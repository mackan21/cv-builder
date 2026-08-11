import { Font } from '@react-pdf/renderer'
import tinosRegular from '@fontsource/tinos/files/tinos-latin-400-normal.woff'
import arimoBold from '@fontsource/arimo/files/arimo-latin-700-normal.woff'
import carlitoRegular from '@fontsource/carlito/files/carlito-latin-400-normal.woff'
import carlitoBold from '@fontsource/carlito/files/carlito-latin-700-normal.woff'
import carlitoItalic from '@fontsource/carlito/files/carlito-latin-400-italic.woff'

let registered = false

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
}
