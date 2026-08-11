import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'
import listStyles from '../styles/list.module.css'

export function EducationSection() {
  const education = useCVStore((state) => state.data.education)
  const heading = useCVStore((state) => state.data.headings.education)
  const addEducation = useCVStore((state) => state.addEducation)
  const updateEducation = useCVStore((state) => state.updateEducation)
  const removeEducation = useCVStore((state) => state.removeEducation)
  const updateHeading = useCVStore((state) => state.updateHeading)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Education</h2>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="education-heading">
          Heading (shown on CV)
        </label>
        <input
          id="education-heading"
          className={formStyles.input}
          placeholder="Education"
          value={heading}
          onChange={(e) => updateHeading('education', e.target.value)}
        />
      </div>
      {education.map((item, index) => (
        <div key={item.id} className={listStyles.entry}>
          <div className={listStyles.entryHead}>
            <span className={listStyles.entryIndex}>{String(index + 1).padStart(2, '0')}</span>
            <button
              type="button"
              className={listStyles.removeButton}
              onClick={() => removeEducation(item.id)}
              aria-label="Remove this education entry"
            >
              Remove
            </button>
          </div>
          <div className={formStyles.grid}>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`degree-${item.id}`}>
                Degree / programme
              </label>
              <input
                id={`degree-${item.id}`}
                className={formStyles.input}
                placeholder="Degree or Programme"
                value={item.degree}
                onChange={(e) => updateEducation(item.id, { degree: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`school-${item.id}`}>
                School
              </label>
              <input
                id={`school-${item.id}`}
                className={formStyles.input}
                placeholder="School Name"
                value={item.school}
                onChange={(e) => updateEducation(item.id, { school: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`edu-location-${item.id}`}>
                Location
              </label>
              <input
                id={`edu-location-${item.id}`}
                className={formStyles.input}
                placeholder="City"
                value={item.location}
                onChange={(e) => updateEducation(item.id, { location: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`edu-start-${item.id}`}>
                Start
              </label>
              <input
                id={`edu-start-${item.id}`}
                className={formStyles.input}
                placeholder="2021"
                value={item.start}
                onChange={(e) => updateEducation(item.id, { start: e.target.value })}
              />
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`edu-end-${item.id}`}>
                End
              </label>
              <input
                id={`edu-end-${item.id}`}
                className={formStyles.input}
                placeholder="2024"
                value={item.end}
                onChange={(e) => updateEducation(item.id, { end: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className={listStyles.addButton} onClick={addEducation}>
        + Add education
      </button>
    </section>
  )
}
