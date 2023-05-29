# Endpoints do serviço

| Método | Endpoint          | Responsabilidade                                  |
| ------ | ----------------- | ------------------------------------------------- |
| POST   | /users/register   | Criar um novo usuario                             |
| POST   | /users/login      | Logar                                             |
| GET    | /users            | Listar todos os filmes                            |
| GET    | /users/user       | Recuperar informação do usuario cadastrado        |
| PATCH  | /users/&lt;id&gt; | Atualiza os dados de um usuario de forma dinâmica |
| DELETE | /users/&lt;id&gt; | Deleta um usuario                                 |
| POST   | /contacts         | Criar um novo contato                             |
| GET    | /users            | Listar todos os contatos cadastrado pelo usuario  |
| PATCH  | /users/&lt;id&gt; | Atualiza os dados de um contato de forma dinâmica |
| DELETE | /users/&lt;id&gt; | Deleta um contato                                 |

## **Tabelas**

As tabelas devem seguir as seguintes especificações:

- **Nome da tabela**: users.
- **Colunas da tabela**:

  - **id**: inteiro, auto incrementável e chave primária.
  - **name**: string, tamanho máximo 50, chave obrigatória.
  - **email**: string, tamanho máximo 100, única e chave obrigatória.
  - **password**: string, hasheada e chave obrigatória.
  - **createdAt**: date.
  - **updatedAt**: date.
  - **deletedAt**: date e default null.
  - **contacts**: relação com tabela contacts de 1:N

  
- **Nome da tabela**: phones.
- **Colunas da tabela**:

  - **id**: inteiro, auto incrementável e chave primária.
  - **name**: string, tamanho máximo 50, chave obrigatória.
  - **email**: string, tamanho máximo 100, única e chave obrigatória.
  - **password**: string, hasheada e chave obrigatória.
  - **createdAt**: date.
  - **updatedAt**: date.
  - **deletedAt**: date e default null.
  - **contactId**: inteiro, chave estrangeira, obrigatória

- **Nome da tabela**: contacts.
- **Colunas da tabela**:
  - **id**: inteiro, auto incrementável e chave primária.
  - **name**: string, tamanho máximo 50, chave obrigatória.
  - **email**: string, tamanho máximo 100, única e chave obrigatória.
  - **phones**: Cadena de strings, chave opcional, relacão 1:N com tabela ´phones´.
  - **registrationDate**: date de registro, gera automaticamente.
  - **userId**: inteiro, chave estrangeira, obrigatória


## Requisitos do Serviço

Esse serviço precisa possuir uma API REST para que os demais serviços consigam criar, listar, atualizar e deletar filmes de um banco de dados.

- O banco de dados deve ser **PostgreSQL**.
- O diagrama sobre a tabla de ver feito.

### **POST: /users/register**

- Deve ser possível criar um usuario contendo os seguintes dados:
  - **name**: string.
  - **password**: string.
  - **email**: inteiro.


**_Regras de negócio_**

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados do usuario a ser criado.
  - **Retorno**: Um objeto contendo os dados do usuario criado.
  - **Status**: 201 CREATED.

**Exemplo de envio**:

```json
{
	"name": "examplee",
	"password": "123456",
	"email": "example@example.com"
}
```

**Exemplo de retorno**:

```json
{
	"id": 6,
	"name": "example",
	"email": "example@example.com",
	"createdAt": "2023-05-27T21:18:22.348Z",
	"updatedAt": "2023-05-27T21:18:22.348Z",
	"deletedAt": null
}
```

- Não deve ser possível criar um usuario com um email já existente:
  - **Envio**: Um objeto contendo um nome já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
	"name": "examplee",
	"password": "123456",
	"email": "example@example.com"
}
```

**Exemplo de retorno**:

```json
{
	"message": "Email already in use."
}
```

### **GET: /users**

- Deve ser possível listar todos os filmes armazenados no banco de dados.

**_Regras de negócio_**

- Deve conter paginação utilizando os query params **page** e **perPage**.
- Deve conter ordenação utilizando os query params **sort** e **order**.

- Caso de sucesso:
  - **Retorno**: Objeto de paginação.
  - **Status**: 200 OK.
  - Exemplo de retorno:

```json
{
 [
	{
		"id": 1,
		"name": "example",
		"email": "example@kenzie.com",
		"createdAt": "2023-05-24T14:20:10.212Z",
		"updatedAt": "2023-05-24T14:20:10.212Z",
		"deletedAt": null
	},
	{
		"id": 2,
		"name": "example2",
		"email": "example2@kenzie.com",
		"createdAt": "2023-05-24T15:21:38.040Z",
		"updatedAt": "2023-05-24T15:21:38.040Z",
		"deletedAt": null
	},
	{
		"id": 3,
		"name": "example2",
		"email": "example25642@kenzie.com",
		"createdAt": "2023-05-25T03:19:49.137Z",
		"updatedAt": "2023-05-25T03:19:49.137Z",
		"deletedAt": null
	}
    //...
  ]
}
```

### **PATCH: /users/&lt;id&gt;**

- Deve ser possível atualizar um usuario pelo id recebido nos parâmetros da rota.

**_Regras de negócio_**

- Deve ser possível atualizar um filme contendo os seguintes dados:

  - **name**: string.
  - **description**: string.
  - **duration**: inteiro.
  - **price**: inteiro.

- Todos os dados são opcionais.

  - O filme deve ser atualizado dinamicamente seguindo os dados enviados.

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados do filme a ser atualizado.
  - **Retorno**: Um objeto contendo os dados do filme atualizado.
  - **Status**: 200 OK.

**Exemplo de envio**:

```json
{
  "duration": 180,
  "name": "exemplo 1: PATCH",
  "description": "Atualizado!"
}
```

**Exemplo de retorno**:

```json
{
  "id": 1,
  "name": "exemplo 1: PATCH",
  "description": "Atualizado!",
  "duration": 180,
  "price": 50
}
```

- Não deve ser possível atualizar um filme caso ele não exista:
  - **Envio**: Um objeto contendo os dados do filme.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de envio**:

```json
{
  "description": "nova descrição"
}
```

**Exemplo de retorno**:

```json
{
  "message": "Movie not found."
}
```

- Não deve ser possível atualizar um filme com um nome já existente:
  - **Envio**: Um objeto contendo um nome já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "name": "exemplo 1: PATCH"
}
```

**Exemplo de retorno**:

```json
{
  "message": "Movie already exists."
}
```

### **DELETE: /movies/&lt;id&gt;**

**_Regras de negócio_**

- Deve ser possível deletar um filme pelo id recebido nos parâmetros da rota.

- Caso de sucesso:

  - **Envio**: Sem envio.
  - **Retorno**: Sem retorno.
  - **Status**: 204 NO CONTENT.

- Não deve ser possível deletar um filme caso ele não exista:
  - **Envio**: Sem envio.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "Movie not found."
}
```
