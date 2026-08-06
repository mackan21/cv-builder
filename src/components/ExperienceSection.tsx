import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'
import listStyles from '../styles/list.module.css'

export function ExperienceSection() {
  const experience = useCVStore((state) => state.data.experience)
  const addExperience = useCVStore((state) => state.addExperience)
  const updateExperience = useCVStore((state) => state.updateExperience)
  const removeExperience = useCVStore((state) => state.removeExperience)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Experience</h2>
      {experience.map((item, index) => (
        <div key={item.id} className={listStyles.entry}>
          <div className={listStyles.entryHead}>
            <span className={listStyles.entryIndex}>{String(index + 1).padStart(2, '0')}</span>
            <button
              type="button"
              className={listStyles.removeButton}
              onClick={() => removeExperience(item.id)}
              aria-label="Remove this experience"
            >
              Remove
            </button>
          </div>
          <div className={formStyles.grid}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`role-${item.id}`}>
                Role
              </label>
              <input
                id={`role-${item.id}`}
                className={formStyles.input}
                value={item.role}
                onChange={(e) => updateExperience(item.id, { role: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`company-${item.id}`}>
                Company
              </label>
              <input
                id={`company-${item.id}`}
                className={formStyles.input}
                value={item.company}
                onChange={(e) => updateExperience(item.id, { company: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`exp-start-${item.id}`}>
                Start
              </label>
              <input
                id={`exp-start-${item.id}`}
                className={formStyles.input}
                value={item.start}
                onChange={(e) => updateExperience(item.id, { start: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`exp-end-${item.id}`}>
                End
              </label>
              <input
                id={`exp-end-${item.id}`}
                className={formStyles.input}
                value={item.end}
                onChange={(e) => updateExperience(item.id, { end: e.target.value })}
              />
            </div>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor={`description-${item.id}`}>
              Description
            </label>
            <textarea
              id={`description-${item.id}`}
              className={formStyles.textarea}
              value={item.description}
              onChange={(e) => updateExperience(item.id, { description: e.target.value })}
              rows={3}
            />
          </div>
        </div>
      ))}
      <button type="button" className={listStyles.addButton} onClick={addExperience}>
        + Add experience
      </button>
    </section>
  )
}
