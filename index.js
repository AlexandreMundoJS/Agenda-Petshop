const customExpress = require('./config/customExpress');
const connection = require('./infra/connection');
const Tabelas = require('./infra/tables');

connection.connect((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Conectado na porta 3307");
        Tabelas.init(connection);
        const app = customExpress();

        app.listen(5000, (req, res) => {
            console.log("Servidor rodando na porta 5000");
        })
    }
});