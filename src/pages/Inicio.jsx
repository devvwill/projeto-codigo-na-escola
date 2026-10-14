import { Bookmark, CirclePlay, LayoutGrid, Star } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import Hero from '../components/Hero'
import QuickCard from '../components/QuickCard'

const dias = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
const diasEstudados = 5

const avisos = [
  'Prova de lógica na sexta-feira.',
  'Entregar a atividade de HTML até quarta.',
  'Laboratório aberto no contraturno.',
]

export default function Inicio() {
  return (
    <>
      <Hero nome="Will" aula="O que é um algoritmo?" />

      <h2 className="mb-4 text-[22px] font-extrabold">Acesso rápido</h2>
      <div className="mb-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <QuickCard icone={CirclePlay} titulo="Últimas aulas" texto="Continue de onde parou" atraso={60} />
        <QuickCard icone={LayoutGrid} titulo="Materiais" texto="6 links gratuitos" atraso={100} />
        <QuickCard icone={Bookmark} titulo="Trilhas de estudos" texto="0% concluído" atraso={140} />
        <QuickCard icone={Star} titulo="Favoritos" texto="0 itens salvos" cor="text-hi" atraso={180} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card titulo="Continuar de onde parou" atraso={160}>
          <p className="text-[22px] font-extrabold">O que é um algoritmo?</p>
          <p className="text-sm text-muted">Lógica · 12 min</p>
          <div role="progressbar" aria-label="Progresso da aula" aria-valuemin={0} aria-valuemax={100} aria-valuenow={40} className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="preencher-barra h-full w-[40%] rounded-full bg-linear-to-r from-acc to-sec" />
          </div>
          <Button>Continuar aula</Button>
        </Card>

        <Card titulo="Sequência de estudos" atraso={200}>
          <p className="text-[22px] font-extrabold">5 dias seguidos</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {dias.map((dia, i) => (
              <span
                key={i}
                className={`grid size-9 place-items-center rounded-full border text-[13px] font-bold ${
                  i < diasEstudados ? 'border-acc bg-acc text-bg' : 'border-line text-muted'
                }`}
              >
                {dia}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted">Estude hoje para manter a sequência.</p>
        </Card>

        <Card titulo="Missão do dia" atraso={240}>
          <p className="text-[22px] font-extrabold">Mostre seu nome na tela</p>
          <p className="text-sm text-muted">
            Escreva um programa simples que exiba seu nome. Leva uns 10 minutos.
          </p>
          <Button>Concluir missão</Button>
        </Card>

        <Card titulo="Avisos do professor" atraso={280}>
          <ul className="flex flex-col gap-2">
            {avisos.map((aviso) => (
              <li key={aviso} className="flex items-start gap-2.5">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-acc" />
                {aviso}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
