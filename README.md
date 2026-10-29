# Código na Escola

Interface de uma plataforma educativa para estudantes da rede pública, construída com React, JavaScript, Tailwind CSS e Vite.

## Executar localmente

Com Node.js e npm instalados:

```sh
npm ci
npm run dev
```

Abra o endereço exibido no terminal.

## Gerar a versão de produção

```sh
npm run build
npm run preview
```

## Organização

- `src/pages`: login, início, aulas, painel do aluno e player.
- `src/components`: elementos reutilizáveis da interface.
- `src/hooks`: animação e estado compartilhado de perfil e conclusão de aulas.
- `src/data`: aulas, notificações e código das ilustrações.
- `src/index.css`: tema, estilos globais e animações.

## Estado do projeto

O projeto contém somente o frontend. As áreas de alunos e professores usam dados demonstrativos e os formulários de login não autenticam contas.

No login, clique em **Explorar demonstração** para acessar o protótipo. A navegação usa o hash da URL:

- `#/inicio`: página inicial.
- `#/aulas`: lista de aulas com busca e filtros.
- `#/aula/variaveis`: player, conteúdo e exercício de variáveis.
- `#/painel`: perfil, progresso, gráfico semanal e conquistas.
- `#/notificacoes`: notificações e filtro de não lidas.

O sino abre o painel de notificações; o avatar abre o menu do perfil. Perfil, aulas concluídas e notificações lidas ficam salvos apenas no navegador (`localStorage`). Os números de experiência, sequência, gráfico e conquistas são demonstrativos.

Os vídeos e materiais de apoio ainda precisam ser adicionados. O player informa essa pendência ao tentar reproduzir. O exercício de variáveis está disponível na aba **Exercício**.

As animações respeitam a preferência do dispositivo por movimentos reduzidos.


## Área de professores (demonstração)

Execute `npm run dev`. No login, clique em **Acesso de professor** e depois em **Explorar demonstração do professor**. Não é necessário criar conta nem informar senha para visualizar as telas.

- `#/professor/entrar`: interface de login do professor.
- `#/professor/turmas`: turmas e atividades para corrigir.
- `#/professor/turma/3b`: alunos, progresso, busca e exportação CSV.
- `#/professor/correcao/3b`: correção de respostas de exemplo.
- `#/professor/atividades`: atividades demonstrativas.
- `#/professor/relatorios`: resumo por turma.
- `#/professor/materiais`: estado vazio, aguardando os materiais reais.

Os dados fictícios ficam em `src/data/professor.js`. As correções de demonstração são salvas apenas neste navegador (`localStorage`), sem envio de dados. O CSV exporta os alunos exibidos, respeitando a busca.

A navegação do professor está separada da navegação do aluno, mas isso é apenas uma demonstração visual. A autenticação e a autorização real de acesso às turmas deverão ser implementadas no backend por quem assumir essa parte. As telas administrativas do Figma não fazem parte da área do professor.
