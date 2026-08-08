import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'
import listStyles from '../styles/list.module.css'

export function LinksSection() {
  const links = useCVStore((state) => state.data.links)
  const addLink = useCVStore((state) => state.addLink)
  const updateLink = useCVStore((state) => state.updateLink)
  const removeLink = useCVStore((state) => state.removeLink)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Links</h2>
      {links.map((item, index) => (
        <div key={item.id} className={listStyles.entry}>
          <div className={listStyles.entryHead}>
            <span className={listStyles.entryIndex}>{String(index + 1).padStart(2, '0')}</span>
            <button
              type="button"
              className={listStyles.removeButton}
              onClick={() => removeLink(item.id)}
              aria-label="Remove this link"
            >
              Remove
            </button>
          </div>
          <div className={formStyles.grid}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`link-label-${item.id}`}>
                Label
              </label>
              <input
                id={`link-label-${item.id}`}
                className={formStyles.input}
                placeholder="GitHub, Portfolio, Behance…"
                value={item.label}
                onChange={(e) => updateLink(item.id, { label: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`link-url-${item.id}`}>
                URL
              </label>
              <input
                id={`link-url-${item.id}`}
                className={formStyles.input}
                placeholder="github.com/yourname"
                value={item.url}
                onChange={(e) => updateLink(item.id, { url: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className={listStyles.addButton} onClick={addLink}>
        + Add link
      </button>
    </section>
  )
}
