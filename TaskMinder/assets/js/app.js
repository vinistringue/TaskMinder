const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Função para adicionar uma tarefa à lista
function adicionarTarefa(tarefa) {
    const li = document.createElement("li");
    li.textContent = tarefa;

    const divBotoes = criarBotoesAcao();
    li.appendChild(divBotoes);

    listaTarefas.appendChild(li);
}

// Função para criar um botão de ação para uma tarefa
function criarBotoesAcao() {
    const divBotoes = document.createElement("div");
    divBotoes.className = "botoes-acao";

    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.className = "btn btn-info btn-sm";
    editarBtn.addEventListener("click", editarTarefa);

    const concluirBtn = document.createElement("button");
    concluirBtn.textContent = "Concluir";
    concluirBtn.className = "btn btn-success btn-sm";
    concluirBtn.addEventListener("click", concluirTarefa);

    const excluirBtn = document.createElement("button");
    excluirBtn.textContent = "Excluir";
    excluirBtn.className = "btn btn-danger btn-sm";
    excluirBtn.addEventListener("click", excluirTarefa);

    divBotoes.appendChild(editarBtn);
    divBotoes.appendChild(concluirBtn);
    divBotoes.appendChild(excluirBtn);

    return divBotoes;
}

// Função para editar uma tarefa
function editarTarefa() {
    const novoNome = prompt("Editar a tarefa:", this.parentElement.parentElement.firstChild.textContent);
    if (novoNome !== null) {
        this.parentElement.parentElement.firstChild.textContent = novoNome;
    }
}

// Função para marcar uma tarefa como concluída
function concluirTarefa() {
    this.parentElement.parentElement.firstChild.style.textDecoration = "line-through";
}

// Função para excluir uma tarefa
function excluirTarefa() {
    this.parentElement.parentElement.remove();
}

// Configuração do servidor Express
app.get('/', (req, res) => {
    res.send('Bem-vindo ao TaskMinder!');
});

app.get('/tarefas', (req, res) => {
    // Lógica para retornar a lista de tarefas (você pode implementar aqui)
    res.json({ tarefas: [] });
});

app.post('/tarefas', (req, res) => {
    // Lógica para adicionar uma nova tarefa à lista (você pode implementar aqui)
    res.json({ mensagem: 'Tarefa adicionada com sucesso!' });
});

app.put('/tarefas/:id', (req, res) => {
    // Lógica para editar uma tarefa (você pode implementar aqui)
    res.json({ mensagem: 'Tarefa editada com sucesso!' });
});

app.delete('/tarefas/:id', (req, res) => {
    // Lógica para excluir uma tarefa (você pode implementar aqui)
    res.json({ mensagem: 'Tarefa excluída com sucesso!' });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
