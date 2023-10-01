const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rotas do servidor Express

// Rota para retornar a lista de tarefas (exemplo)
app.get('/tarefas', (req, res) => {
    const tarefas = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];
    res.json({ tarefas });
});

// Rota para adicionar uma nova tarefa à lista (exemplo)
app.post('/tarefas', (req, res) => {
    const novaTarefa = req.body.tarefa;
    // Lógica para adicionar a nova tarefa à lista (você pode implementar aqui)
    res.json({ mensagem: 'Tarefa adicionada com sucesso!' });
});

// Rota para editar uma tarefa (exemplo)
app.put('/tarefas/:id', (req, res) => {
    const id = req.params.id;
    const novoNome = req.body.novoNome;
    // Lógica para editar a tarefa com o ID especificado (você pode implementar aqui)
    res.json({ mensagem: 'Tarefa editada com sucesso!' });
});

// Rota para excluir uma tarefa (exemplo)
app.delete('/tarefas/:id', (req, res) => {
    const id = req.params.id;
    // Lógica para excluir a tarefa com o ID especificado (você pode implementar aqui)
    res.json({ mensagem: 'Tarefa excluída com sucesso!' });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

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

// Função para adicionar uma tarefa à lista
function adicionarTarefa(tarefa, listaId) {
    const li = document.createElement("li");
    li.textContent = tarefa;

    const divBotoes = criarBotoesAcao();
    li.appendChild(divBotoes);

    const lista = document.getElementById(listaId);
    lista.appendChild(li);

    // Limpar o campo de texto após adicionar a tarefa
    document.getElementById("novaTarefa").value = "";
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

// Adicionar uma nova tarefa ao pressionar Enter no campo de texto
document.getElementById("novaTarefa").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const novaTarefa = this.value.trim();
        if (novaTarefa !== "") {
            adicionarTarefa(novaTarefa, "afazer");
        }
    }
});

// Inicializar funcionalidade de arrastar e soltar usando a biblioteca Sortable
const sortableLists = new Sortable(document.querySelectorAll(".list-group"), {
    animation: 150,
    onEnd: function (evt) {
        const item = evt.item;
        const tarefa = item.textContent.trim();
        const listaDestinoId = item.parentElement.id;

        // Verifique em qual lista a tarefa foi solta e atualize-a
        if (listaDestinoId === "afazer") {
            adicionarTarefa(tarefa, "afazer");
        } else if (listaDestinoId === "emandamento") {
            adicionarTarefa(tarefa, "emandamento");
        } else if (listaDestinoId === "concluidas") {
            adicionarTarefa(tarefa, "concluidas");
        }

        // Remova o item original (a tarefa arrastada) da lista de origem
        item.remove();
    },
});
