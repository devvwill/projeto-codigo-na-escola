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

- `src/pages`: páginas inicial e de login.
- `src/components`: elementos reutilizáveis da interface.
- `src/hooks`: lógica compartilhada de animação.
- `src/data`: exemplo de código apresentado nas ilustrações.
- `src/index.css`: tema, estilos globais e animações.

## Estado do projeto

O projeto é um protótipo de frontend. A tela de login ainda não autentica contas, e os dados da página inicial são demonstrativos.

Em `src/App.jsx`, a variável `mostrarLogin` seleciona temporariamente a tela exibida: `true` para login e `false` para início.

As animações respeitam a preferência do dispositivo por movimentos reduzidos.
