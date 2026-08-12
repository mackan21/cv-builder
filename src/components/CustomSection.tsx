import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'
import listStyles from '../styles/list.module.css'
import { normalizePastedLines } from '../utils/text'
import { InfoTooltip } from './InfoTooltip'
import { ConfirmDialog } from './ConfirmDialog'
import { useConfirmRemove } from '../hooks/useConfirmRemove'

export function CustomSection() {
  const customSection = useCVStore((state) => state.data.customSection)
  const heading = useCVStore((state) => state.data.headings.customSection)
  const addCustomEntry = useCVStore((state) => state.addCustomEntry)
  const updateCustomEntry = useCVStore((state) => state.updateCustomEntry)
  const removeCustomEntry = useCVStore((state) => state.removeCustomEntry)
  const updateHeading = useCVStore((state) => state.updateHeading)
  const moveItem = useCVStore((state) => state.moveItem)
  const removeConfirm = useConfirmRemove(removeCustomEntry)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Additional Section</h2>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="custom-heading">
          Heading (shown on CV)
          <InfoTooltip text="Use this for anything that doesn't fit elsewhere, for example Volunteer Work, Awards, or Publications" />
        </label>
        <input
          id="custom-heading"
          className={formStyles.input}
          placeholder="Additional Section"
          value={heading}
          onChange={(e) => updateHeading('customSection', e.target.value)}
        />
      </div>
      {customSection.map((item, index) => (
        <div key={item.id} className={listStyles.entry}>
          <div className={listStyles.entryHead}>
            <div className={listStyles.entryHeadLeft}>
              <span className={listStyles.entryIndex}>{String(index + 1).padStart(2, '0')}</span>
              <button
                type="button"
                className={listStyles.moveButton}
                onClick={() => moveItem('customSection', item.id, 'up')}
                disabled={index === 0}
                aria-label="Move this entry up"
              >
                ↑
              </button>
              <button
                type="button"
                className={listStyles.moveButton}
                onClick={() => moveItem('customSection', item.id, 'down')}
                disabled={index === customSection.length - 1}
                aria-label="Move this entry down"
              >
                ↓
              </button>
            </div>
            <button
              type="button"
              className={listStyles.removeButton}
              onClick={() => removeConfirm.requestRemove(item.id)}
              aria-label="Remove this entry"
            >
              Remove
            </button>
          </div>
          <div className={formStyles.grid}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`custom-title-${item.id}`}>
                Title
              </label>
              <input
                id={`custom-title-${item.id}`}
                className={formStyles.input}
                placeholder="Entry Title"
                value={item.title}
                onChange={(e) => updateCustomEntry(item.id, { title: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`custom-subtitle-${item.id}`}>
                Subtitle
              </label>
              <input
                id={`custom-subtitle-${item.id}`}
                className={formStyles.input}
                placeholder="Organization or Context"
                value={item.subtitle}
                onChange={(e) => updateCustomEntry(item.id, { subtitle: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`custom-date-${item.id}`}>
                Date
              </label>
              <input
                id={`custom-date-${item.id}`}
                className={formStyles.input}
                placeholder="Month Year"
                value={item.date}
                onChange={(e) => updateCustomEntry(item.id, { date: e.target.value })}
              />
            </div>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor={`custom-description-${item.id}`}>
              Description (one bullet per line)
              <InfoTooltip text="Press Enter to start a new bullet, each line becomes one bullet point on your CV" />
            </label>
            <textarea
              id={`custom-description-${item.id}`}
              className={formStyles.textarea}
              placeholder="Details about this entry."
              value={item.description}
              onChange={(e) => updateCustomEntry(item.id, { description: e.target.value })}
              onPaste={(e) => {
                e.preventDefault()
                const target = e.currentTarget
                const pasted = normalizePastedLines(e.clipboardData.getData('text'))
                const start = target.selectionStart
                const end = target.selectionEnd
                const newValue = item.description.slice(0, start) + pasted + item.description.slice(end)
                updateCustomEntry(item.id, { description: newValue })
              }}
              rows={4}
            />
          </div>
        </div>
      ))}
      <button type="button" className={listStyles.addButton} onClick={addCustomEntry}>
        + Add entry
      </button>
      {removeConfirm.pendingId && (
        <ConfirmDialog
          title="Remove entry"
          message="This removes this entry. This can't be undone."
          confirmLabel="Remove"
          onConfirm={removeConfirm.confirm}
          onCancel={removeConfirm.cancel}
        />
      )}
    </section>
  )
}
