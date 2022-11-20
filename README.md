# NG Cash

Este projeto se trata de uma aplicação Fullstack Monorepo construída como parte do teste técnico para vaga na [NGcash!](https://ng.cash/)  
Trata-se de um banco digital, onde é possivel se cadastradar, e ver suas transferências com os seguintes filtros:
Transferências por data e transferências enviadas ou recebidas.
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

Aqui vai o passo a passo de como rodar a aplicação no seu PC.

<details> 
<summary>Linux</summary> </br>

Na pasta raiz, rode o comando para realizar o compose

   ```bash
  docker-compose up -d
``` 

Agora é só esperar o compose finalizar Pega um copo de água enquanto isso 🥤

Depois de finalizado, acesse o [link](https://localhost:3000/) para visualizar a aplicação.

</details> 

