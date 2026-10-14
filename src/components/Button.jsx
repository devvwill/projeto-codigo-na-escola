export default function Button({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      {...props}
      type={type}
      className={`ui-button self-start rounded-full bg-acc px-6 py-3 font-bold text-bg hover:bg-acc/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}
