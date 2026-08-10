import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'
import listStyles from '../styles/list.module.css'

export function SkillsSection() {
  const skillGroups = useCVStore((state) => state.data.skillGroups)
  const addSkillGroup = useCVStore((state) => state.addSkillGroup)
  const updateSkillGroup = useCVStore((state) => state.updateSkillGroup)
  const removeSkillGroup = useCVStore((state) => state.removeSkillGroup)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Skills</h2>
      {skillGroups.map((group, index) => (
        <div key={group.id} className={listStyles.entry}>
          <div className={listStyles.entryHead}>
            <span className={listStyles.entryIndex}>{String(index + 1).padStart(2, '0')}</span>
            <button
              type="button"
              className={listStyles.removeButton}
              onClick={() => removeSkillGroup(group.id)}
              aria-label="Remove this skill group"
            >
              Remove
            </button>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor={`skillgroup-label-${group.id}`}>
              Category
            </label>
            <input
              id={`skillgroup-label-${group.id}`}
              className={formStyles.input}
              placeholder="Frontend, Backend, Verktyg…"
              value={group.label}
              onChange={(e) => updateSkillGroup(group.id, { label: e.target.value })}
            />
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor={`skillgroup-items-${group.id}`}>
              Skills (comma-separated)
            </label>
            <input
              id={`skillgroup-items-${group.id}`}
              className={formStyles.input}
              placeholder="Vue, React, TypeScript…"
              value={group.items}
              onChange={(e) => updateSkillGroup(group.id, { items: e.target.value })}
            />
          </div>
        </div>
      ))}
      <button type="button" className={listStyles.addButton} onClick={addSkillGroup}>
        + Add skill category
      </button>
    </section>
  )
}
