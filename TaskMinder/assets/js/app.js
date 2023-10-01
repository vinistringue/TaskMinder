const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Lista de tarefas (exemplo)
const tarefas = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];

// Função para obter a lista de tarefas
function obterTarefas(req, res) {
    res.json({ tarefas });
}

// Função para adicionar uma nova tarefa à lista
function adicionarTarefa(req, res) {
    const novaTarefa = req.body.tarefa;
    if (novaTarefa) {
        tarefas.push(novaTarefa);
        res.json({ mensagem: 'Tarefa adicionada com sucesso!' });
    } else {
        res.status(400).json({ erro: 'A tarefa não pode estar em branco.' });
    }
}

// Função para editar uma tarefa
function editarTarefa(req, res) {
    const id = req.params.id;
    const novoNome = req.body.novoNome;
    if (id >= 0 && id < tarefas.length && novoNome) {
        tarefas[id] = novoNome;
        res.json({ mensagem: 'Tarefa editada com sucesso!' });
    } else {
        res.status(400).json({ erro: 'ID inválido ou novo nome em branco.' });
    }
}

// Função para excluir uma tarefa
function excluirTarefa(req, res) {
    const id = req.params.id;
    if (id >= 0 && id < tarefas.length) {
        const tarefaRemovida = tarefas.splice(id, 1);
        res.json({ mensagem: `Tarefa "${tarefaRemovida}" excluída com sucesso!` });
    } else {
        res.status(400).json({ erro: 'ID inválido.' });
    }
}

// Definindo as rotas

// Rota para retornar a lista de tarefas
app.get('/tarefas', obterTarefas);

// Rota para adicionar uma nova tarefa à lista
app.post('/tarefas', adicionarTarefa);

// Rota para editar uma tarefa
app.put('/tarefas/:id', editarTarefa);

// Rota para excluir uma tarefa
app.delete('/tarefas/:id', excluirTarefa);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Evento para adicionar tarefa quando a tecla Enter for pressionada
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const novaTarefa = document.getElementById('novaTarefa').value;
        if (novaTarefa.trim() !== '') {
            // Realize uma solicitação HTTP POST para adicionar a tarefa
            fetch('/tarefas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tarefa: novaTarefa }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.mensagem);
                    document.getElementById('novaTarefa').value = '';
                    // Atualize a lista de tarefas na interface do usuário aqui, se necessário
                })
                .catch((error) => {
                    console.error('Erro ao adicionar tarefa:', error);
                });
        }
    }
});
