let { identificadorDaConta, banco, saques, contas, depositos, transferencias } = require('../bancodedados')
const { format } = require('date-fns')

const listarContaBancarias = (req, res) => { //Listar contas bancárias
    res.status(200).json(contas)

}

const criarContaBancaria = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    // Verificar se todos os campos foram informados (todos são obrigatórios)
    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' })
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório' })
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória' })
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório' })
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' })
    }

    //CPF e E-mail deve ser um campo único.
    const cpfIgual = contas.find(conta => conta.usuario.cpf === cpf)
    if (cpfIgual) {
        return res.status(409).json({ mensagem: 'Já existe uma conta com o cpf informado!' })
    }
    const emailIgual = contas.find(conta => conta.usuario.email === email)
    if (emailIgual) {
        return res.status(409).json({ mensagem: 'Já existe uma conta com o e-mail informado!' })
    }

    // criação de nova conta
    const novaConta = {
        numero: identificadorDaConta++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novaConta)
    res.status(201).json()
}

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    // Verificar se o numero da conta passado como parametro na URL é válida
    const numeroContaValido = contas.find(conta => conta.numero === Number(numeroConta))
    if (!numeroContaValido) {
        return res.status(404).json({ mensagem: 'número da conta invalida' })
    }

    // Verificar se foi passado todos os campos no body da requisição
    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' })
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório' })
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória' })
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório' })
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' })
    }

    // Se o CPF for informado, verificar se já existe outro registro com o mesmo CPF
    const novoArrayconta = contas.filter(conta => conta.numero !== numeroContaValido.numero)
    const cpfIgual = novoArrayconta.find(conta => conta.usuario.cpf === cpf)
    if (cpfIgual) {
        return res.status(409).json({ mensagem: 'Já existe uma conta com o cpf informado!' })
    }

    // Se o E-mail for informado, verificar se já existe outro registro com o mesmo E-mail  
    const emailIgual = novoArrayconta.find(conta => conta.usuario.email === email)
    if (emailIgual) {
        return res.status(409).json({ mensagem: 'Já existe uma conta com o email informado!' })
    }
    numeroContaValido.usuario.nome = nome
    numeroContaValido.usuario.cpf = cpf
    numeroContaValido.usuario.data_nascimento = data_nascimento
    numeroContaValido.usuario.telefone = telefone
    numeroContaValido.usuario.email = email
    numeroContaValido.usuario.senha = senha

    return res.status(204).json()
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params

    // Verificar se o numero da conta passado como parametro na URL é válida
    const numeroContaValido = contas.find(conta => conta.numero === Number(numeroConta))
    if (!numeroContaValido) {
        return res.status(404).json({ mensagem: 'número da conta invalida' })
    }

    //Permitir excluir uma conta bancária apenas se o saldo for 0 (zero)
    if (numeroContaValido.saldo > 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' })
    }

    //Remover a conta do objeto de persistência de dados.
    contas = contas.filter(conta => conta.numero !== Number(numeroConta))

    return res.status(204).json()
}

const cadastrarDeposito = (req, res) => {
    //Verificar se a conta bancária informada existe
    const { numero_conta, valor } = req.body
    const numeroContaExiste = contas.find(conta => conta.numero === Number(numero_conta))
    if (!numeroContaExiste) {
        return res.status(404).json({ mensagem: 'O número da conta é inválido' })
    }

    //Não permitir depósitos com valores negativos ou zerados
    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero' })
    }

    // Verificar se o numero da conta e o valor do deposito foram informados no body
    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' })
    }

    //Somar o valor de depósito ao saldo da conta encontrada
    numeroContaExiste.saldo += valor

    //registrar deposito
    const novaData = new Date()
    const dataFormat = format(novaData, "yyyy-MM-dd HH:mm:ss")
    const registroDeposito = {
        data: dataFormat, //"data": "2021-08-10 23:40:35"
        numero_conta,
        valor
    }
    depositos.push(registroDeposito)
    return res.status(201).json()
}

const cadastrarSaque = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    //Verificar se a conta bancária informada existe
    const contaExiste = contas.find(conta => conta.numero === Number(numero_conta))
    if (!contaExiste) {
        return res.status(404).json({ mensagem: 'O número da conta é inválido' })
    }

    //Não permitir saque com valores negativos ou zerados
    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor que zero' })
    }

    //Verificar se o numero da conta, o valor do saque e a senha foram informados no body
    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, valor e senha são obrigatórios!' })
    }

    //Verificar se a senha informada é uma senha válida para a conta informada
    if (senha !== contaExiste.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha invalida!' })
    }

    //Verificar se há saldo disponível para saque
    if (valor > contaExiste.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente' })
    }

    //Subtrair o valor sacado do saldo da conta encontrada
    contaExiste.saldo -= valor

    //registrar saque
    const novaData = new Date()
    const dataFormat = format(novaData, "yyyy-MM-dd HH:mm:ss")
    const registroSaque = {
        data: dataFormat,
        numero_conta,
        valor
    }
    saques.push(registroSaque)
    return res.status(201).json()
}

const cadastrarTransferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    //Verificar se o número da conta de origem, de destino, senha da conta de origem e valor da transferência foram informados no body
    if (!numero_conta_origem || !valor || !senha || !numero_conta_destino) {
        return res.status(400).json({ mensagem: 'O número da conta de origem, número da conta de destino, valor e senha são obrigatórios!' })
    }

    //Verificar se a conta bancária de origem informada existe
    const existeContaOrigem = contas.find(conta => conta.numero === Number(numero_conta_origem))
    if (!existeContaOrigem) {
        return res.status(404).json({ mensagem: 'O número da conta de origem é inválido' })
    }

    //Verificar se a conta bancária de destino informada existe
    const existeContaDestino = contas.find(conta => conta.numero === Number(numero_conta_destino))
    if (!existeContaDestino) {
        return res.status(404).json({ mensagem: 'O número da conta de destino é inválido' })
    }

    //Verificar se a senha informada é uma senha válida para a conta de origem informada
    if (senha !== existeContaOrigem.usuario.senha) {
        return res.status(401).json({ mensagem: 'Senha invalida!' })
    }

    //Verificar se há saldo disponível na conta de origem para a transferência
    if (valor > existeContaOrigem.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' })
    }

    //Subtrair o valor da transfência do saldo na conta de origem
    existeContaOrigem.saldo -= valor

    //Somar o valor da transferência no saldo da conta de destino
    existeContaDestino.saldo += valor

    //registrar transferencia
    const novaData = new Date()
    const dataFormat = format(novaData, "yyyy-MM-dd HH:mm:ss")
    const registroTransferencia = {
        data: dataFormat,
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(registroTransferencia)
    return res.status(201).json()
}

const listarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query
    //Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
    if (!numero_conta || !senha) {
        return res.status(401).json({ mensagem: 'Número da conta e senha precisam ser informados' })
    }

    //Verificar se a conta bancária informada existe
    const existeConta = contas.find(conta => conta.numero === Number(numero_conta))
    if (!existeConta) {
        return res.status(401).json({ mensagem: 'Conta bancária não encontrada' })
    }

    //Verificar se a senha informada é uma senha válida
    if (existeConta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha informada invalida' })
    }

    //Exibir o saldo da conta bancária em questão
    return res.status(200).json({ saldo: existeConta.saldo })
}

const listarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query
    //Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'Número da conta e senha precisam ser informados' })
    }

    //Verificar se a conta bancária informada existe
    const existeConta = contas.find(conta => conta.numero === Number(numero_conta))
    if (!existeConta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada' })
    }

    //Verificar se a senha informada é uma senha válida
    if (existeConta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha informada invalida' })
    }

    //Retornar a lista de transferências, depósitos e saques da conta em questão.
    const transferenciasRecebidas = transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta)
    const transferenciasEnviadas = transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta)
    const saque = saques.filter(saque => saque.numero_conta === numero_conta)
    const deposito = depositos.filter(deposito => deposito.numero_conta === numero_conta)

    const extrato = {
        deposito,
        saque,
        transferenciasEnviadas,
        transferenciasRecebidas
    }
    return res.status(200).json(extrato)
}

module.exports = {
    listarContaBancarias,
    criarContaBancaria,
    atualizarUsuario,
    excluirConta,
    cadastrarDeposito,
    cadastrarSaque,
    cadastrarTransferencia,
    listarSaldo,
    listarExtrato
}
