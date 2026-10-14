export default function Card({ titulo, children, atraso = 0 }) {
  return (
    <section style={{ '--entrada-atraso': `${atraso}ms` }} className="entrada-suave flex min-w-0 flex-col gap-2 rounded-2xl border border-line p-5 sm:p-6">
      <h3 className="text-[17px] font-extrabold">{titulo}</h3>
      {children}
    </section>
  )
}
