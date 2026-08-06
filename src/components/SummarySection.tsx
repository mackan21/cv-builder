import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'

export function SummarySection() {
  const summary = useCVStore((state) => state.data.summary)
  const setField = useCVStore((state) => state.setField)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Summary</h2>
      <div className={formStyles.field}>
        <textarea
          className={formStyles.textarea}
          value={summary}
          onChange={(e) => setField('summary', e.target.value)}
          rows={4}
        />
      </div>
    </section>
  )
}
