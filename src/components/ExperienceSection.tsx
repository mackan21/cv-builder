import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'
import listStyles from '../styles/list.module.css'
import { normalizePastedLines } from '../utils/text'

export function ExperienceSection() {
  const experience = useCVStore((state) => state.data.experience)
  const heading = useCVStore((state) => state.data.headings.experience)
  const addExperience = useCVStore((state) => state.addExperience)
  const updateExperience = useCVStore((state) => state.updateExperience)
  const removeExperience = useCVStore((state) => state.removeExperience)
  const updateHeading = useCVStore((state) => state.updateHeading)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Experience</h2>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="experience-heading">
          Heading (shown on CV)
        </label>
        <input
          id="experience-heading"
          className={formStyles.input}
          placeholder="Experience"
          value={heading}
          onChange={(e) => updateHeading('experience', e.target.value)}
        />
      </div>
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
                placeholder="Role Title"
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
                placeholder="Company Name"
                value={item.company}
                onChange={(e) => updateExperience(item.id, { company: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`location-${item.id}`}>
                Location
              </label>
              <input
                id={`location-${item.id}`}
                className={formStyles.input}
                placeholder="City"
                value={item.location}
                onChange={(e) => updateExperience(item.id, { location: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`exp-start-${item.id}`}>
                Start
              </label>
              <input
                id={`exp-start-${item.id}`}
                className={formStyles.input}
                placeholder="2024"
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
                placeholder="Present"
                value={item.end}
                onChange={(e) => updateExperience(item.id, { end: e.target.value })}
              />
            </div>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor={`description-${item.id}`}>
              Description (one bullet per line)
            </label>
            <textarea
              id={`description-${item.id}`}
              className={formStyles.textarea}
              placeholder="What you did and what changed because of it."
              value={item.description}
              onChange={(e) => updateExperience(item.id, { description: e.target.value })}
              onPaste={(e) => {
                e.preventDefault()
                const target = e.currentTarget
                const pasted = normalizePastedLines(e.clipboardData.getData('text'))
                const start = target.selectionStart
                const end = target.selectionEnd
                const newValue = item.description.slice(0, start) + pasted + item.description.slice(end)
                updateExperience(item.id, { description: newValue })
              }}
              rows={4}
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
