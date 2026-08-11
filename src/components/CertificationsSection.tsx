import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'
import listStyles from '../styles/list.module.css'
import { ConfirmDialog } from './ConfirmDialog'
import { useConfirmRemove } from '../hooks/useConfirmRemove'

export function CertificationsSection() {
  const certifications = useCVStore((state) => state.data.certifications)
  const heading = useCVStore((state) => state.data.headings.certifications)
  const addCertification = useCVStore((state) => state.addCertification)
  const updateCertification = useCVStore((state) => state.updateCertification)
  const removeCertification = useCVStore((state) => state.removeCertification)
  const updateHeading = useCVStore((state) => state.updateHeading)
  const moveItem = useCVStore((state) => state.moveItem)
  const removeConfirm = useConfirmRemove(removeCertification)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Certifications</h2>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="certifications-heading">
          Heading (shown on CV)
        </label>
        <input
          id="certifications-heading"
          className={formStyles.input}
          placeholder="Certifications"
          value={heading}
          onChange={(e) => updateHeading('certifications', e.target.value)}
        />
      </div>
      {certifications.map((item, index) => (
        <div key={item.id} className={listStyles.entry}>
          <div className={listStyles.entryHead}>
            <div className={listStyles.entryHeadLeft}>
              <span className={listStyles.entryIndex}>{String(index + 1).padStart(2, '0')}</span>
              <button
                type="button"
                className={listStyles.moveButton}
                onClick={() => moveItem('certifications', item.id, 'up')}
                disabled={index === 0}
                aria-label="Move this certification up"
              >
                ↑
              </button>
              <button
                type="button"
                className={listStyles.moveButton}
                onClick={() => moveItem('certifications', item.id, 'down')}
                disabled={index === certifications.length - 1}
                aria-label="Move this certification down"
              >
                ↓
              </button>
            </div>
            <button
              type="button"
              className={listStyles.removeButton}
              onClick={() => removeConfirm.requestRemove(item.id)}
              aria-label="Remove this certification"
            >
              Remove
            </button>
          </div>
          <div className={formStyles.grid}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`cert-name-${item.id}`}>
                Certification
              </label>
              <input
                id={`cert-name-${item.id}`}
                className={formStyles.input}
                placeholder="Certification Name"
                value={item.name}
                onChange={(e) => updateCertification(item.id, { name: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`cert-issuer-${item.id}`}>
                Issuer
              </label>
              <input
                id={`cert-issuer-${item.id}`}
                className={formStyles.input}
                placeholder="Issuing Organization"
                value={item.issuer}
                onChange={(e) => updateCertification(item.id, { issuer: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`cert-date-${item.id}`}>
                Date
              </label>
              <input
                id={`cert-date-${item.id}`}
                className={formStyles.input}
                placeholder="Month Year"
                value={item.date}
                onChange={(e) => updateCertification(item.id, { date: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`cert-url-${item.id}`}>
                Credential URL (optional)
              </label>
              <input
                id={`cert-url-${item.id}`}
                className={formStyles.input}
                placeholder="credential-link.com"
                value={item.url}
                onChange={(e) => updateCertification(item.id, { url: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className={listStyles.addButton} onClick={addCertification}>
        + Add certification
      </button>
      {removeConfirm.pendingId && (
        <ConfirmDialog
          title="Remove certification"
          message="This removes this certification. This can't be undone."
          confirmLabel="Remove"
          onConfirm={removeConfirm.confirm}
          onCancel={removeConfirm.cancel}
        />
      )}
    </section>
  )
}
