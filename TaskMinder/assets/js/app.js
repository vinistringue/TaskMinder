const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Lista de tarefas (exemplo)
const tarefas = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];

// Rotas do servidor Express

// Rota para retornar a lista de tarefas
app.get('/tarefas', (req, res) => {
    res.json({ tarefas });
});

// Rota para adicionar uma nova tarefa à lista
app.post('/tarefas', (req, res) => {
    const novaTarefa = req.body.tarefa;
    if (novaTarefa) {
        tarefas.push(novaTarefa);
        res.json({ mensagem: 'Tarefa adicionada com sucesso!' });
    } else {
        res.status(400).json({ erro: 'A tarefa não pode estar em branco.' });
    }
});

// Rota para editar uma tarefa
app.put('/tarefas/:id', (req, res) => {
    const id = req.params.id;
    const novoNome = req.body.novoNome;
    if (id >= 0 && id < tarefas.length && novoNome) {
        tarefas[id] = novoNome;
        res.json({ mensagem: 'Tarefa editada com sucesso!' });
    } else {
        res.status(400).json({ erro: 'ID inválido ou novo nome em branco.' });
    }
});

// Rota para excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const id = req.params.id;
    if (id >= 0 && id < tarefas.length) {
        const tarefaRemovida = tarefas.splice(id, 1);
        res.json({ mensagem: `Tarefa "${tarefaRemovida}" excluída com sucesso!` });
    } else {
        res.status(400).json({ erro: 'ID inválido.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
