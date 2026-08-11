import { useCVStore } from '../store/cvStore'
import formStyles from '../styles/form.module.css'

export function PersonalSection() {
  const data = useCVStore((state) => state.data)
  const setField = useCVStore((state) => state.setField)

  return (
    <section className={formStyles.section}>
      <h2 className={formStyles.sectionTitle}>Personal details</h2>
      <div className={formStyles.grid}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            className={formStyles.input}
            placeholder="Your Name"
            value={data.name}
            onChange={(e) => setField('name', e.target.value)}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className={formStyles.input}
            placeholder="Your Title"
            value={data.title}
            onChange={(e) => setField('title', e.target.value)}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={formStyles.input}
            placeholder="you@email.com"
            value={data.email}
            onChange={(e) => setField('email', e.target.value)}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            className={formStyles.input}
            placeholder="+1 234 567 8900"
            value={data.phone}
            onChange={(e) => setField('phone', e.target.value)}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="location">
            Location
          </label>
          <input
            id="location"
            className={formStyles.input}
            placeholder="City, Country"
            value={data.location}
            onChange={(e) => setField('location', e.target.value)}
          />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="linkedin">
            LinkedIn
          </label>
          <input
            id="linkedin"
            className={formStyles.input}
            placeholder="linkedin.com/in/yourname"
            value={data.linkedin}
            onChange={(e) => setField('linkedin', e.target.value)}
          />
        </div>
      </div>
    </section>
  )
}
