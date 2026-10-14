import Button from '../components/Button'
import Card from '../components/Card'
import CourseProgress from '../components/CourseProgress'
import QuickAccess from '../components/QuickAccess'

const dias = [
  { nome: 'Segunda-feira', sigla: 'S' },
  { nome: 'Terça-feira', sigla: 'T' },
  { nome: 'Quarta-feira', sigla: 'Q' },
  { nome: 'Quinta-feira', sigla: 'Q' },
  { nome: 'Sexta-feira', sigla: 'S' },
  { nome: 'Sábado', sigla: 'S' },
  { nome: 'Domingo', sigla: 'D' },
]
const diasEstudados = 5

const cursoEmAndamento = {
  curso: 'Lógica de programação',
  aula: 'O que é um algoritmo?',
  duracao: '12 min',
  progresso: 40,
}

const avisos = [
  'Prova de lógica na sexta-feira.',
  'Entregar a atividade de HTML até quarta.',
  'Laboratório aberto no contraturno.',
]

export default function Inicio() {
  return (
    <>
      <header className="mb-5">
        <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">Olá, Will! Vamos continuar?</h1>
      </header>

      <CourseProgress {...cursoEmAndamento} />
      <QuickAccess />

      <section aria-labelledby="rotina-titulo" className="mt-8">
        <h2 id="rotina-titulo" className="mb-4 text-lg font-extrabold">Sua rotina de estudos</h2>
        <div className="grid gap-4 xl:grid-cols-3">
          <Card titulo="Sequência de estudos" atraso={100}>
            <p className="text-[22px] font-extrabold">{diasEstudados} dias seguidos</p>
            <ul aria-label="Dias de estudo na semana" className="mt-1 flex flex-wrap gap-2">
              {dias.map((dia, i) => (
                <li
                  key={dia.nome}
                  aria-label={`${dia.nome}: ${i < diasEstudados ? 'estudou' : 'não estudou'}`}
                  className={`grid size-9 place-items-center rounded-full border text-[13px] font-bold ${
                    i < diasEstudados ? 'border-acc bg-acc text-bg' : 'border-line text-muted'
                  }`}
                >
                  {dia.sigla}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">Estude hoje para manter a sequência.</p>
          </Card>

          <Card titulo="Missão do dia" atraso={140}>
            <p className="text-[22px] font-extrabold">Mostre seu nome na tela</p>
            <p className="text-sm text-muted">
              Escreva um programa simples que exiba seu nome. Leva uns 10 minutos.
            </p>
            <Button>Concluir missão</Button>
          </Card>

          <Card titulo="Avisos do professor" atraso={180}>
            <ul className="flex flex-col gap-2">
              {avisos.map((aviso) => (
                <li key={aviso} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-acc" />
                  {aviso}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </>
  )
}
