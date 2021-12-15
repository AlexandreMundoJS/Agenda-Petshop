const Atendimento = require('../models/atendimentos')
module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    });

    app.get('/atendimentos/:id', (req, res)=> {
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id, res);
    })

    app.get('/atendimentos/busca/:cliente', (req, res)=> {
        const nome = req.params.cliente;
        Atendimento.buscaPorNome(nome, res);
    })
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res)
        // res.send("Você está na rota de atendimentos e está realizando um POST")
    });

    app.patch('/atendimentos/:id', (req, res)=>{
        const id = parseInt(req.params.id);
        const valores = req.body;
        Atendimento.altera(id, valores, res);
    });
    app.delete('/atendimentos/:id', (req, res)=>{
        const id = parseInt(req.params.id);
        Atendimento.deleta(id, res);
    })
}