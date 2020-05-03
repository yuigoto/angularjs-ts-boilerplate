# AngularJS TypeScript Boilerplate

> Um boilerplate para projetos AngularJS (1.7.x) com Gulp, Bootstrap 4, SCSS e TypeScript.

O AngularJS está, muito em breve, chegando no seu EOL. Enquanto isso não 

----------------------------------------------------------------------

## Dependências

- **NodeJS** `v8.x.x+`
- **TypeScript** `v3.3.x+`

----------------------------------------------------------------------

## Como Usar

Clone o repositório e dê `npm install` para que todas as dependências sejam instaladas. Depois disso, execute qualquer um destes comandos:

- `npm run start` para executar o projeto em modo de desenvolvimento local;
- `npm run build` para buildar o projeto para produção;

Caso tenha o `gulp-cli` instalado globalmente, você também pode executar tasks exportadas no `gulpfile.js`.

----------------------------------------------------------------------

## Estrutura

- `src` 
  - `assets`
    > Contém pastas de assets, como imagens, fontes e outros itens.
  - `scss`
    > Coloque os arquivos SCSS aqui. Carregue-os dentro de `main.scss` para que sejam compilados.
  - `static`
    > Contém views e HTMLs estáticos, sem controllers.
  - `ts`
    - `base`
      > Contém as views da aplicação e seus controllers. Agrupamos as views HTML e controllers TS para facilitar localização.
      > 
      > Por convenção:
      > - Views possuem seus nomes em caixa baixa e separados por ponto (ex.: `base.home.html`);
      > - Controllers possuem seus nomes em CamelCase (ex.: `BaseHome.ts`);
      > 
      > _Sinta-se livre, porém, para alterar estas convenções em seu projeto._
    - `core`
      > Contém módulos (factories, filters, services, etc.) que não possuem views/templates HTML.
    - `dummy`
      > Contém exemplos de código para componentes, filtros, diretivas, etc.
    - `global`
      > Contém tudo o que deve ser global e carregado/transpilado antes de tudo.

----------------------------------------------------------------------

## Autores

Veja `AUTHORS.md` para maiores informações.

----------------------------------------------------------------------

## Licença

Este projeto está licenciado sob a `Licença MIT`. Veja o arquivo `LICENSE.md` para maiores detalhes sobre a licença (em inglês).

----------------------------------------------------------------------

_©2020 Fabio Y. Goto_
