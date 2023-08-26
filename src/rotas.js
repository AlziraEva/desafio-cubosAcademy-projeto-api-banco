const express = require('express')
const { listarContaBancarias, criarContaBancaria, atualizarUsuario, excluirConta, cadastrarDeposito, cadastrarSaque, cadastrarTransferencia, listarSaldo, listarExtrato } = require('./controladores/funcao')
const { validarSenha } = require('./intermediarios')
const rota = express()

rota.get('/contas', validarSenha, listarContaBancarias) // validar a senha e  LISTAR CONTAS 
rota.post('/contas', criarContaBancaria) //CRIAR Conta Bancaria
rota.put('/contas/:numeroConta/usuario', atualizarUsuario) // atualizar usuario da conta
rota.delete('/contas/:numeroConta', excluirConta) //excluir conta bancaria
rota.post('/transacoes/depositar', cadastrarDeposito) // cadastrar DEPOSITO
rota.post('/transacoes/sacar', cadastrarSaque) //cadastrar SAQUE
rota.post('/transacoes/transferir', cadastrarTransferencia) //cadastrar TRANSFERENCIA
rota.get('/contas/saldo', listarSaldo) //validar a senha e Listar SALDO
rota.get('/contas/extrato', listarExtrato) //listar EXTRATO da conta

module.exports = rota