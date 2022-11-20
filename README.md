# NG Cash

Este projeto se trata de uma aplicação Fullstack Monorepo construída como parte do teste técnico para vaga na [NGcash!](https://ng.cash/)  
Trata-se de um portal gerencial para ver, editar, cadastrar e remover clientes

# Stacks do projeto 🔍

<details> 
<summary>Possui as seguintes tecnologias</summary> <br>

📊 **Banco de dados:**
  - Relacional, construído com PostGreSQL e Sequelize como ORM;

🔙 **Back-end:**
 - Construído seguindo modelo REST, feito 100% em Typescript;
 
🐋 **Docker:**
 - Cada camada da aplicação (front, back e db) conta com um Dockerfile, além de orquestração docker para dar conta de subir tudo junto ao mesmo tempo;

 🔙 **Front-end:**
 - Feito em React, CSS e Bootstrap
 
 </details> 
 

## Instalação

Por se tratar de monorepo, recomenda-se a utilização de docker para a instalação e execução do projeto. Aqui farei o passo a passo em ambos os casos

<details> 
<summary>Com Docker</summary> </br>

Instale as dependências

```bash
  npm install ou npm i
```

Na pasta raiz, rode o comando para realizar o compose

   ```bash
  npm run compose:up:dev
``` 

Pronto! Agora é só esperar as camadas montarem! Pega um café enquanto isso ☕

</details> 


<details> 
<summary>Sem Docker</summary> </br>

Instale as dependências

```bash
  npm install ou npm i
```

Vá na pasta de cada camada e instale suas dependências

   ```bash
    cd packages/server
    npm i

    cd packages/web
    npm i
``` 
Para rodar a aplicação:

```bash
    cd packages/server
    npm run dev

    cd packages/web
    npm start
``` 

</details> 

#### Obs.:

Ao intalar o projeto e rodar, o servidor irá realizar um dump no banco de dados com o primeiro usuário para poder testar a aplicação sem problemas  
Credenciais  
```bash
    name: 'Primeiro Usuário',
    email: 'usuario@email.com',
    password: 'firstUserPassword'
``` 
## Rodando os testes

Para rodar os testes presentes na camada de back-end, rode o seguinte comando

```bash
  cd packages/server
  npm run test
```


## Documentação da API

<details>
<summary>Registro e login</summary> </br>

#### Registrar

```http
  POST /register
```

```bash
    "name": "Primeiro Usuário",
    "email": "usuario@email.com",
    "password": "firstUserPassword"
``` 

#### Logar

```http
  POST /login
```

```bash
    "email": "usuario@email.com",
    "password": "firstUserPassword"
``` 

</details>

<details>
<summary>Entidade Cliente</summary> </br>


#### Cadastrar cliente

```http
  POST /client
```

```bash
    "name": "Cliente",
    "cpf": "07938665029",
    "birthday": "16/06/1999",
    "rg": "319100467",
    "phone": "27994567859",
    "addresses": [
      {
        "zipcode": "29060670",
        "address": "Rua tal",
        "number": "880",
        "district": "Bairro Tal",
        "city": "Vitória",
        "state": "ES"
      },
    ]
``` 

#### Listar todos clientes

```http
  GET /client
```

#### Listar cliente por id

```http
  GET /client/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do cliente que você quer |


#### Editar cliente por id

```http
  PATCH /client/${id}
```

```bash
    "name": "Cliente X",
``` 

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do cliente que você quer editar|


#### Remover cliente por id

```http
  DELETE /client/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do cliente que você quer remover|


</details>

<details>
<summary>Entidade Endereço</summary> </br>

#### Cadastrar endereço

```http
  POST /address
```

```bash
  "zipcode": "29060670",
  "address": "Rua tal",
  "number": "880",
  "district": "Bairro Tal",
  "city": "Vitória",
  "state": "ES"
``` 

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do cliente que terá um novo endereço |



#### Listar todos endereços

```http
  GET /address
```

#### Listar endereço por id

```http
  GET /address/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do endereço que você quer |


#### Editar endereço por id

```http
  PATCH /address/${id}
```

```bash
    "address": "Rua fulano de tal",
	  "complement": "Na esquina"
``` 

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do endereço que você quer editar|


#### Remover endereço por id

```http
  DELETE /client/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do endereço que você quer remover|

</details>
