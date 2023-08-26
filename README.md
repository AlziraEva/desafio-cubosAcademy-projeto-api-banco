# Cubos Bank API


![status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)

## Sobre o Projeto

A **Cubos Bank API** é uma aplicação backend que simula as operações bancárias de um banco digital. Foi desenvolvida como parte de um desafio do modúlo 2 da Cubos Academy, para implementar funcionalidades básicas de um sistema bancário.

## Funcionalidades

- Listar todas as contas bancárias registradas
- Criar uma nova conta bancária
- Atualizar os detalhes do usuário associado a uma conta
- Excluir uma conta bancária (apenas se saldo for zero)
- Realizar depósitos em uma conta
- Realizar saques de uma conta
- Realizar transferências entre contas
- Obter o saldo de uma conta
- Obter o extrato de transações de uma conta
  
## Endpoints

- **GET /contas**: Lista todas as contas bancárias registradas.

- **POST /contas**: Cria uma nova conta bancária.

- **PUT /contas/:numeroConta/usuario**: Atualiza os detalhes do usuário associado a uma conta.

- **DELETE /contas/:numeroConta**: Exclui uma conta bancária (apenas se saldo for zero).

- **POST /transacoes/depositar**: Realiza um depósito em uma conta.

- **POST /transacoes/sacar**: Realiza um saque de uma conta.

- **POST /transacoes/transferir**: Realiza uma transferência entre contas.

- **GET /contas/saldo**: Obtém o saldo de uma conta.

- **GET /contas/extrato**:  Obtém o extrato de transações de uma conta.

## Layout
![api em ação](https://github.com/AlziraEva/desafio-cubosAcademy-projeto-api-banco/assets/138158823/0a7434cc-1e4e-407a-bf8e-4be4fa81561a)

## Como Executar o Projeto

1. Certifique-se de ter o Node.js, Git, VSCode instalados em sua máquina.
2. Clone este repositório: `git clone git@github.com:AlziraEva/desafio-cubosAcademy-projeto-api-banco.git`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm run dev` 
5. Teste as Rotas: Uma ferramenta para testar APIs é o insomnia. A API estará disponível em: `http://localhost:3000`

## Tecnologias Utilizadas

- Node.js
- Express.js
- Nodemon (para reiniciar automaticamente o servidor durante o desenvolvimento)
- Date-fns (para formatação de datas)

## Contribuidores

- [Alzira Eva](https://github.com/AlziraEva)

## Como Contribuir para o Projeto

1. Faça um fork deste repositório
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
3. Faça commit das suas alterações: `git commit -m 'Adiciona nova feature'`
4. Envie as alterações para o seu fork: `git push origin feature/nova-feature`
5. Abra um pull request neste repositório

## Autor

<a href="https://www.linkedin.com/in/alzira-eva-cavalcanti-alves-a62b97135"/>
 <img style="border-radius: 50%;" src="https://github.com/AlziraEva/desafio-cubosAcademy-projeto-api-banco/assets/138158823/a4b19708-4f71-4154-a98e-763d90bae228" width="100px;" alt=""/>
 <br />
 <sub><b>Alzira Eva</b></sub></a> <a href="https://www.linkedin.com/in/alzira-eva-cavalcanti-alves-a62b97135" title="Alzira Eva">✨</a>
 <br />


## Licença

Feito com por Alzira Eva 👋🏽 [Entre em contato!](https://www.linkedin.com/in/alzira-eva-cavalcanti-alves-a62b97135)
