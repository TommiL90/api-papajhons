# 🚀 E-commerce-Express-API

Esta é uma API RESTful desenvolvida com Node.js, Express, Prisma, PostgreSQL, Redis e Docker, projetada para gerenciar uma loja de produtos.

A API permite que os usuários se cadastrem como clientes ou administradores, façam login na aplicação, atualizem ou excluam suas informações de perfil e visualizem a lista de produtos disponíveis. Os usuários administradores têm acesso completo a todas as rotas, enquanto os usuários normais podem acessar todas as rotas de leitura, exceto a rota de listagem de usuários e ordens de produtos criadas. Além disso, os usuários normais não têm permissão para realizar operações de escrita, como criar usuários, editar usuários e criar ordens de compra.

---

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
  - [Rodando a API](#34-rodando-a-api)
- [Documentação da API](#4-documentação-da-api)
- [Estrutura da API](#5-estrutura-da-api)
- [Teste](#5-estrutura-da-api)

---

## 1. Visão Geral

O projeto foi totalmente desenvolvido em TypeScript, utilizando Node.js como plataforma principal, e o framework Express como a escolha principal para construção da aplicação. Para a serialização dos dados das requisições, optou-se por utilizar a biblioteca Zod.

Em relação ao banco de dados, foi escolhido o PostgreSQL como sistema relacional, sendo o Prisma responsável pelo gerenciamento das consultas. Além disso, o Redis foi utilizado para o gerenciamento de cache das rotas mais acessadas.

Para a execução dos bancos de dados, adotou-se o Docker como solução, proporcionando um ambiente isolado e facilmente replicável para o desenvolvimento e implantação da aplicação.

Com o objetivo de manter uma arquitetura limpa e escalável, foram aplicados conceitos como o padrão Repository Pattern, Factory Pattern e os princípios SOLID. 

A API cumple os seguintes requerimentos: 


## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível o usuário admin obter o um histórico de ordens de produtos de um usuario;
- [x] Deve ser possível o usuário buscar produtos pelo nome;
- [x] Deve ser possível ser possível cadastrar uma academia;
- [x] Deve ser possível o gerenciamento de produtos (criação, deleção, atualização);
- [x] Deve ser possível a busca de produtos com paginação e com a possibilidade de utilização de filtros;
- [x] Deve ser possível a busca por de produto por id;
- [x] Deve ser possível a busca de produtos por categoria;
- [x] Deve ser possível o gerenciamento de usuários (criação, deleção, atualização, leitura);
- [x] Deve ser possível a geração de pedido de compras com produtos selecionados;
- [x] Deve ser possível permitir filtrar pedidos gerados; 

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder se cadastrar com um username duplicado;
- [x] O usuário não pode criar uma categoria con nome existente;
- [x] Usuários administradores têm acesso completo a todas as rotas;
- [x] Usuários normais podem acessar todas as rotas de leitura;
- [x] Usuários normais não podem acessar a rota de listagem de usuários;
- [x] Usuários normais não podem acessar a rota de listagem de ordens de produtos criadas;
- [x] Usuários normais não têm permissão para criar usuários;
- [x] Usuários normais não têm permissão para editar, ver o perfil ou deletar outros usuários;
- [x] Usuários normais têm permissão para criar ordens de compra;
- [x] Apenas rota de listagem de produtos e listagem de um produto não precisa autentição;
- [x] Um produto só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);


Segue os links para mais informações sobre as tecnologias utilizadas:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [Docker](https://www.docker.com/)

---

## 2. Diagrama ER

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

[Diagrama do projeto com suas relações!](https://dbdiagram.io/d/E-commerce-65bf06c7ac844320ae63729e)

---

## 3. Início Rápido

[Voltar para o topo](#motor-shop-api)

### 3.1. Instalando dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

`npm install`


### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

`cp .env.example .env`

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha, a porta do localhost, a chave secreta para criação do hash da senha, o SMTP_USER e o SMTP_PASS para ser utilizado como e-mail que enviará a recuperação de senha, a url base do Back-End e a url base do Front-End para ser utilizada a recuperação de senha.

Levante banco de dados Postgree y Redis:

`docker compose up -d`


### 3.3. Migrations

Migre as entidases e popule o banco de dados:

`npx prisma migrate deploy && npx prisma db seed`


### 3.4. Rodando a API

Para rodar a API localmente use o comando:

`npm run dev`

Segue abaixo os comandos para a build do projeto:

`npm run build`

e

`npm run start`

## 4. Documentação da API

[Voltar para o topo](#tabela-de-conteúdos)

Um arquivo JSON do Insomnia está incluído para importar e testar todas as rotas disponíveis.
A seguir estão os objetos necessários para cada rota de escrita mais relevantes. As rotas de edição seguem a mesma estrutura, mas cada chave é opcional. O gerenciamento de pedidos de compra, nas rotas de escrita, só pode ser criado e gerenciado nos seguintes estados: criado, pago, enviado, entregue e com erro:


### Criar um novo produto
- **POST - /products**
```json
{
  "title": "Some shirt",
  "description": "Some description",
  "price": "19.99",
  "stock": 100,
  "sku": 123456,
  "brand": "BrandXYZ",
  "categoryId": "categoryId123",
  "imgUrl": "https://example.com/image.jpg"
}
```
### Iniciar uma nova sessão
- **POST - /session**
```json
{
 "email": "admin3@mail.com",
"password": "123456"
}
```

### Criar um novo usuario
- **POST - /users**
```json
{
{
 "username": "user94",
 "firstName": "user",
 "lastName": "user",
 "email": "user94@mail.com",
 "password": "T12345"
}
}
```

### Criar uma nova categoria
- **POST - /categories**
```json
{
 "name": "Category 3"
}
```

### Criar uma nova ordem de compra
- **POST - /purchase-orders**
```json
{
 "userId": "d50ac1a9-9abc-4947-8674-9b955f4296c0",
 "createOrderItems": [
  {
   "productId": "00035976-3c92-4e1e-8f63-b7eca36dbaac",
   "price": "22.22",
   "quantity": 5
  },
  {
   "productId": "00035976-3c92-4e1e-8f63-b7eca36dbaac",
   "price": "22.22",
   "quantity": 3
  },
  {
   "productId": "00035976-3c92-4e1e-8f63-b7eca36dbaac",
   "price": "22.22",
   "quantity": 5
  }
]
}
```
### Pagar uma ordem de compra
- **patch - /purchase-orders**
### Enviar uma ordem de compra
- **patch - /purchase-orders**
### Entregar uma ordem de compra
- **patch - /purchase-orders**


## Consultas com Opções de Paginação e Filtragem

A seguir estão as consultas necessárias para cada rota de leitura que oferece opções de paginação e filtragem:

### Consultar Produtos

- **GET - /products**
  Filtro por nome de produto ou categoria.
  ```json
  - query: string opcional.
  - page: número da página, opcional.
  - take: quantidade de produtos por página, opcional.
  - categoryId: ID da categoria, opcional.
  ```


### Paginar Usuários

- **GET - /users**
  ```json
  - page: número da página, opcional.
  - take: quantidade de usuários por página, opcional.
  ```

---

## 5. Estrutura da API

[Voltar para o topo](#tabela-de-conteúdos)

### Índice

- [Users]
  - POST - /user
  - GET - /user/:userId
  - GET - /user/all
  - PATCH - /user/:userId
  - DELETE - /user/:userId
  - POST - /session/:userId
- [Products]
  - POST - /products
  - GET - /products
  - GET - /products/:id
  - PATCH - /products/:id
  - DELETE - /products/:id
- [Categories]
  - POST - /category
  - GET - /category
  - GET - /category/:categoryId
  - PATCH - /category/:categoryId
  - DELETE - /category/:categoryId
- [Purchase-orders]
  - POST - /purchase-orders/create
  - PATCH - /purchase-orders/send
  - PATCH - /purchase-orders/pay
  - PATCH - /purchase-orders/delivered
  - GET - /purchase-orders/:purchaseOrderId
  - GET - /purchase-orders/user/:userId


---
## 6.Testes Unitários e de Integração

[Voltar para o topo](#tabela-de-conteúdos)

<h4 align="center">🚧 Em construção... 🚀</h4>
---

## Autor do projeto

- Tomás Lillo Sanhueza [GitHub](https://github.com/TommiL90) - [LinkedIn](https://www.linkedin.com/in/tomasbenjamin/) - [Portafolio](https://tomidev.vercel.app)
