// Lista onde todas as tarefas serão guardadas
let listaDeTarefas = [];

// Pegando os elementos do HTML
const listaHTML = document.getElementById("listaTarefas");

// Função para salvar tarefa
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
        concluida: false,
        alertado: false // NOVO
    };

    // Adicionando a tarefa na lista
    listaDeTarefas.push(novaTarefa);

    // Atualiza a tela
    atualizarLista();

    // Limpa os campos
    limparCampos();
}

// Limpar todos os campos
function limparCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("descricao").value = "";
}

// Atualizar a lista na tela
function atualizarLista() {

    // Limpa tudo antes de redesenhar
    listaHTML.innerHTML = "";

    // Percorre todas as tarefas
    listaDeTarefas.forEach(function (tarefa, index) {

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

const modalcancelar = document.getElementById('modalTarefa');

modalcancelar.addEventListener('hidden.bs.modalcancelar', function () {
    limparCampos();
});

// Marcar como concluíd a tarefa
function marcarComoConcluida(posicao) {

    // Inverte o valor (true vira false e vice-versa)
    listaDeTarefas[posicao].concluida = !listaDeTarefas[posicao].concluida;

    // Atualiza tela
    atualizarLista();
}

// Função para verificar tarefas a cada minuto
function verificarTarefas() {

    const agora = new Date();

    listaDeTarefas.forEach(function (tarefa) {

        if (tarefa.concluida) return; // ignora tarefas concluídas

        // Junta data + hora da tarefa
        const dataHoraTarefa = new Date(tarefa.data + "T" + tarefa.hora);

        // Verifica se está no mesmo minuto
        if (
            !tarefa.alertado &&
            agora.getFullYear() === dataHoraTarefa.getFullYear() &&
            agora.getMonth() === dataHoraTarefa.getMonth() &&
            agora.getDate() === dataHoraTarefa.getDate() &&
            agora.getHours() === dataHoraTarefa.getHours() &&
            agora.getMinutes() === dataHoraTarefa.getMinutes()
        ) {
            alert(`Hora da tarefa: ${tarefa.titulo}`);
            tarefa.alertado = true;
        }
    });
}

// Executa a verificação a cada 60 segundos
setInterval(verificarTarefas, 60000);