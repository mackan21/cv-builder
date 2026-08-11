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
            autoComplete="name"
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
            autoComplete="organization-title"
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
            type="email"
            className={formStyles.input}
            placeholder="you@email.com"
            autoComplete="email"
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
            type="tel"
            className={formStyles.input}
            placeholder="+1 234 567 8900"
            autoComplete="tel"
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
            type="url"
            className={formStyles.input}
            placeholder="linkedin.com/in/yourname"
            autoComplete="url"
            value={data.linkedin}
            onChange={(e) => setField('linkedin', e.target.value)}
          />
        </div>
      </div>
    </section>
  )
}
