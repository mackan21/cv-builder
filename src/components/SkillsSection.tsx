import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'
import listStyles from '../styles/list.module.css'
import { InfoTooltip } from './InfoTooltip'
import { ConfirmDialog } from './ConfirmDialog'
import { useConfirmRemove } from '../hooks/useConfirmRemove'

export function SkillsSection() {
  const skillGroups = useCVStore((state) => state.data.skillGroups)
  const heading = useCVStore((state) => state.data.headings.skills)
  const addSkillGroup = useCVStore((state) => state.addSkillGroup)
  const updateSkillGroup = useCVStore((state) => state.updateSkillGroup)
  const removeSkillGroup = useCVStore((state) => state.removeSkillGroup)
  const updateHeading = useCVStore((state) => state.updateHeading)
  const removeConfirm = useConfirmRemove(removeSkillGroup)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Skills</h2>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="skills-heading">
          Heading (shown on CV)
        </label>
        <input
          id="skills-heading"
          className={formStyles.input}
          placeholder="Skills"
          value={heading}
          onChange={(e) => updateHeading('skills', e.target.value)}
        />
      </div>
      {skillGroups.map((group, index) => (
        <div key={group.id} className={listStyles.entry}>
          <div className={listStyles.entryHead}>
            <span className={listStyles.entryIndex}>{String(index + 1).padStart(2, '0')}</span>
            <button
              type="button"
              className={listStyles.removeButton}
              onClick={() => removeConfirm.requestRemove(group.id)}
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
              placeholder="Technical Skills, Soft Skills…"
              value={group.label}
              onChange={(e) => updateSkillGroup(group.id, { label: e.target.value })}
            />
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor={`skillgroup-items-${group.id}`}>
              Skills (comma-separated)
              <InfoTooltip text="Separate each skill with a comma, for example Communication, Project Management, Excel" />
            </label>
            <input
              id={`skillgroup-items-${group.id}`}
              className={formStyles.input}
              placeholder="Communication, Teamwork, Time Management…"
              value={group.items}
              onChange={(e) => updateSkillGroup(group.id, { items: e.target.value })}
            />
          </div>
        </div>
      ))}
      <button type="button" className={listStyles.addButton} onClick={addSkillGroup}>
        + Add skill category
      </button>
      {removeConfirm.pendingId && (
        <ConfirmDialog
          title="Remove skill category"
          message="This removes this skill category. This can't be undone."
          confirmLabel="Remove"
          onConfirm={removeConfirm.confirm}
          onCancel={removeConfirm.cancel}
        />
      )}
    </section>
  )
}
