const moment = require('moment');
const conexao = require('../infra/connection')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, "DD/MM/YYYY").format('YYYY-MM-DD HH:MM:SS');

        const validateDate = moment(data).isSameOrAfter(dataCriacao);
        const validateCustomer = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: validateDate,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: validateCustomer,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length;

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };
            const sql = 'INSERT INTO Atendimentos SET ?';

            conexao.query(sql, atendimentoDatado, (err, results) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos';
        conexao.query(sql, (err, resultados)=>{
            if (err){
                res.status(400).json(err)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
        conexao.query(sql, (err, resultados)=>{
            const atendimento = resultados[0]
            if (err){
                res.status(400).json(err)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }
    
    buscaPorNome(cliente, res){
        const sql = `SELECT * FROM Atendimentos WHERE cliente LIKE '%${cliente}%'`;
        conexao.query(sql, (err, resultados)=>{
            // const atendimento = resultados[0]
            if (err){
                res.status(400).json(err)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    altera(id, valores, res){
        if (valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`;

        conexao.query(sql, [valores, id], (err, resultados)=>{
            if (err){
                res.status(400).json(err)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }
    deleta(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?';
        conexao.query(sql, id, (err, resultados)=>{
            if (err){
                res.status(400).json(err)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento;