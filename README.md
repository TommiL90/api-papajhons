# Endpoints do serviço

| Método | Endpoint             | Responsabilidade                                  |
| ------ | -------------------- | ------------------------------------------------- |
| POST   | /users/register      | Criar um novo usuario                             |
| POST   | /users/login         | Logar                                             |
| GET    | /users               | Listar todos os filmes                            |
| GET    | /users/user          | Recuperar informação do usuario cadastrado        |
| PATCH  | /users/&lt;id&gt;    | Atualiza os dados de um usuario de forma dinâmica |
| DELETE | /users/&lt;id&gt;    | Deleta um usuario                                 |
| POST   | /contacts            | Criar um novo contato                             |
| GET    | /contacts            | Listar todos os contatos cadastrado pelo usuario  |
| PATCH  | /contacts/&lt;id&gt; | Atualiza os dados de um contato de forma dinâmica |
| DELETE | /contacts/&lt;id&gt; | Deleta um contato                                 |

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

- Deve ser possível listar todos os usuarios.

**_Regras de negócio_**

- Caso de sucesso:
  - **Retorno**: lista de objetos.
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

### **GET: /users/user**

- Deve ser possível recuperar a informação do usuario logado. Debe estar logado para accesar a sua infoomação

**_Regras de negócio_**

- Caso de sucesso:
  - **Retorno**: lista de objetos.
  - **Status**: 200 OK.
  - Exemplo de retorno:

```json
{
	{
		"id": 1,
		"name": "example",
		"email": "example@kenzie.com",
		"createdAt": "2023-05-24T14:20:10.212Z",
		"updatedAt": "2023-05-24T14:20:10.212Z",
		"deletedAt": null
	}
}
```

### **PATCH: /users/&lt;id&gt;**

- Deve ser possível atualizar um usuario pelo id recebido nos parâmetros da rota.

**_Regras de negócio_**

- Deve ser possível atualizar um usuario contendo os seguintes dados:

  - **name**: string.
  - **email**: string.

- Todos os dados são opcionais.

  - O usuario deve ser atualizado dinamicamente seguindo os dados enviados.

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados do usuario a ser atualizado.
  - **Retorno**: Um objeto contendo os dados do usuario atualizado.
  - **Status**: 200 OK.

**Exemplo de envio**:

```json
{
  "name": "example2",
  "email": "tomas@example.com"
}
```

**Exemplo de retorno**:

````json

{
	"id": 6,
	"name": "example2",
	"email": "tomas@example.com",
	"createdAt": "2023-05-27T21:18:22.348Z",
	"updatedAt": "2023-05-27T21:18:22.348Z",
	"deletedAt": null
}

- Não deve ser possível atualizar um usuario com um nome já existente:
  - **Envio**: Um objeto contendo um nome já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "email": "exemplo 1: PATCH"
}
````

**Exemplo de retorno**:

```json
{
  "message": "Email already in use."
}
```

### **DELETE: /users/&lt;id&gt;**

**_Regras de negócio_**

- Deve ser possível deletar um usuario pelo id recebido nos parâmetros da rota.

- Caso de sucesso:

  - **Envio**: Sem envio.
  - **Retorno**: Sem retorno.
  - **Status**: 204 NO CONTENT.

- Não deve ser possível deletar um usuario caso ele não exista:
  - **Envio**: Sem envio.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "user not found."
}
```

### **POST: /contacts**

- Usuario deve estar logado. Deve ser possível criar um contato contendo os seguintes dados:
  - **name**: string.
  - **email**: string.
  - **phone**: string.
  - **phone-alt**: string.

**_Regras de negócio_**

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados do contato a ser criado.
  - **Retorno**: Um objeto contendo os dados do usuario criado.
  - **Status**: 201 CREATED.

**Exemplo de envio**:

```json
{
  "name": "contact",
  "email": "client123@guoyre456.com",
  "phones": ["1234567891", "1234567891"]
}
```

**Exemplo de retorno**:

```json
{
	"id": 38,
	"name": "contact",
	"email": "client123@guoyre456.com",
	"phones": [
		{
			"id": 75,
			"phone": "1234567891",
			"contactId": 38
		},
		{
			"id": 76,
			"phone": "1234567891",
			"contactId": 38
		}
	],
	"registrationDate": "2023-05-29T15:38:12.853Z",
	"userId": 7
}
```

- Não deve ser possível criar um contato com um email já existente:
  - **Envio**: Um objeto contendo um nome já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
	"name": "contact",
	"email": "client123@guoyre456.com",
	"phones": [ "1234567891", "1234567891"],
}
```

**Exemplo de retorno**:

```json
{
  "message": "Email already in use."
}
```

### **GET: /contacts**

- Deve ser possível listar todos os contatos armazenados no banco de dados cadastrados pelo usuario.

**_Regras de negócio_**

- Caso de sucesso:
  - **Retorno**: lista de objetos.
  - **Status**: 200 OK.
  - Exemplo de retorno:

```json
{
 [
	{
		"id": 12,
		"name": "contact",
		"email": "client123@dfigiuguoye.com",
		"registrationDate": "2023-05-28T12:42:21.675Z",
		"userId": 7,
		"phones": [
			{
				"id": 23,
				"phone": "1234567891",
				"contactId": 12
			},
			{
				"id": 24,
				"phone": "1234567891",
				"contactId": 12
			}
		]
	},
	{
		"id": 14,
		"name": "Tomas Lillo",
		"email": "gabriel@kenzie.com.br",
		"registrationDate": "2023-05-28T16:51:42.097Z",
		"userId": 7,
		"phones": [
			{
				"id": 27,
				"phone": "9949373292",
				"contactId": 14
			},
			{
				"id": 28,
				"phone": "9949373292",
				"contactId": 14
			}
		]
	}
    //...
  ]
}
```


### **PATCH: /contacts/&lt;id&gt;**

- Deve ser possível atualizar um usuario pelo id recebido nos parâmetros da rota. usuario deve estar logado

**_Regras de negócio_**

- Deve ser possível atualizar um usuario contendo os seguintes dados:

  - **name**: string.
  - **email**: string.
  - **email**: obj({
    - **id**: number
    - **phone**: string
    - **contactId**: number
  })

- Todos os dados são opcionais.

  - O contato deve ser atualizado dinamicamente seguindo os dados enviados.

- Caso de sucesso:
  - **Envio**: Um objeto contendo os dados do usuario a ser atualizado.
  - **Retorno**: Um objeto contendo os dados do usuario atualizado.
  - **Status**: 200 OK.

**Exemplo de envio**:

```json
{
	"name": "contact",
	"email": "client123@guoyre456.com",
	"phones": [
		{
			"id": 75,
			"phone": "1234567891",
			"contactId": 38
		},
		{
			"id": 76,
			"phone": "1234567891",
			"contactId": 38
		}
	]
}
```

**Exemplo de retorno**:

````json

{
	"name": "contact",
	"email": "client123@guoyre456.com",
	"phones": [
		{
			"id": 75,
			"phone": "1234567891",
			"contactId": 38
		},
		{
			"id": 76,
			"phone": "1234567891",
			"contactId": 38
		}
	]
}

- Não deve ser possível atualizar um contato com um email já existente:
  - **Envio**: Um objeto contendo um nome já existente.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 409 UNIQUE.

**Exemplo de envio**:

```json
{
  "email": "exemplo 1: PATCH"
}
````

**Exemplo de retorno**:

```json
{
  "message": "Email already in use."
}
```

### **DELETE: /contacts/&lt;id&gt;**

**_Regras de negócio_**

- Deve ser possível deletar um contact pelo id recebido nos parâmetros da rota.

- Caso de sucesso:

  - **Envio**: Sem envio.
  - **Retorno**: Sem retorno.
  - **Status**: 204 NO CONTENT.

- Não deve ser possível deletar um usuario caso ele não exista:
  - **Envio**: Sem envio.
  - **Retorno**: Um objeto contendo uma mensagem de erro.
  - **Status**: 404 NOT FOUND.

**Exemplo de retorno**:

```json
{
  "message": "contact not found."
}
```
