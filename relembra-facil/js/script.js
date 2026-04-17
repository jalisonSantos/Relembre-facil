// Lista onde todas as tarefas serão guardadas
let listaDeTarefas = [];

// Pegando os elementos do HTML
const listaHTML = document.getElementById("listaTarefas");

// ==========================
// FUNÇÃO PARA SALVAR TAREFA
// ==========================
function salvarTarefa() {

    // Pegando valores digitados pelo usuário
    const titulo = document.getElementById("titulo").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const descricao = document.getElementById("descricao").value;

    // Validação: verificar se todos os campos foram preenchidos
    if (titulo === "" || data === "" || hora === "" || descricao === "") {
        alert("Preencha todos os campos!");
        return; // Para a função aqui
    }

    // Regra de negócio: só permitir tarefas do ano atual
    const anoAtual = new Date().getFullYear();
    const anoEscolhido = new Date(data).getFullYear();

    if (anoEscolhido !== anoAtual) {
        alert("A data deve ser do ano atual!");
        return;
    }

    // Criando um objeto (tarefa)
    const novaTarefa = {
        titulo: titulo,
        data: data,
        hora: hora,
        descricao: descricao,
        concluida: false // começa como não concluída
    };

    // Adicionando a tarefa na lista
    listaDeTarefas.push(novaTarefa);

    // Atualiza a tela
    atualizarLista();

    // Limpa os campos
    limparCampos();
}

// ==========================
// LIMPAR CAMPOS
// ==========================
function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("descricao").value = "";
}

// ==========================
// ATUALIZAR LISTA NA TELA
// ==========================
function atualizarLista() {

    // Limpa tudo antes de redesenhar
    listaHTML.innerHTML = "";

    // Percorre todas as tarefas
    listaDeTarefas.forEach(function(tarefa, index) {

        // Cria um item da lista
        const item = document.createElement("li");

        // Se estiver concluída, adiciona uma classe
        if (tarefa.concluida === true) {
            item.classList.add("concluida");
        }

        // Conteúdo do item
        item.innerHTML = `
            <div>
                <strong>${tarefa.titulo}</strong><br>
                ${tarefa.data} - ${tarefa.hora}<br>
                <small>${tarefa.descricao}</small>
            </div>
            <button onclick="marcarComoConcluida(${index})">✔</button>
        `;

        // Adiciona na tela
        listaHTML.appendChild(item);
    });
}

// ==========================
// MARCAR COMO CONCLUÍDA
// ==========================
function marcarComoConcluida(posicao) {

    // Inverte o valor (true vira false e vice-versa)
    listaDeTarefas[posicao].concluida = !listaDeTarefas[posicao].concluida;

    // Atualiza a tela
    atualizarLista();
}