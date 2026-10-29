export default function DesignIcon({ nome, className = '' }) {
  return <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center ${className}`}><img src={`/images/figma/${nome}.svg`} alt="" /></span>
}
