const express = require('express'); // Importa o módulo Express.js
const app = express(); // Cria uma instância do aplicativo Express
const port = process.env.PORT || 3000; // Define a porta para o servidor

app.use(express.json()); // Habilita o uso de JSON no Express

// Define uma rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Define uma rota para servir o arquivo app.js
app.get('/assets/js/app.js', (req, res) => {
    res.sendFile(__dirname + '/assets/js/app.js');
});

// Inicie o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
