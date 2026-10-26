export default function SectionHeading({ eyebrow, title, copy, dark = false, number, className = '' }) {
  return (
    <div className={`section-heading${dark ? ' section-heading--dark' : ''} ${className}`}>
      <div className="section-heading__eyebrow"><span className="eyebrow">{eyebrow}</span>{number && <span className="section-heading__number">{number}</span>}</div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}
