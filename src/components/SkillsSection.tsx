import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'

export function SkillsSection() {
  const skills = useCVStore((state) => state.data.skills)
  const setField = useCVStore((state) => state.setField)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Skills</h2>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="skills">
          Comma-separated
        </label>
        <input
          id="skills"
          className={formStyles.input}
          placeholder="Skill one, skill two, skill three"
          value={skills}
          onChange={(e) => setField('skills', e.target.value)}
        />
      </div>
    </section>
  )
}
