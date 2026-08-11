import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'

export function SummarySection() {
  const summary = useCVStore((state) => state.data.summary)
  const heading = useCVStore((state) => state.data.headings.summary)
  const setField = useCVStore((state) => state.setField)
  const updateHeading = useCVStore((state) => state.updateHeading)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Summary</h2>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="summary-heading">
          Heading (shown on CV)
        </label>
        <input
          id="summary-heading"
          className={formStyles.input}
          placeholder="Professional Summary"
          value={heading}
          onChange={(e) => updateHeading('summary', e.target.value)}
        />
      </div>
      <div className={formStyles.field}>
        <textarea
          className={formStyles.textarea}
          placeholder="A short summary of who you are and what you do — two or three sentences is plenty."
          value={summary}
          onChange={(e) => setField('summary', e.target.value)}
          rows={4}
        />
      </div>
    </section>
  )
}
