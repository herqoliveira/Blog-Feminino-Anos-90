// Pega os elementos
const abrirModalBtn = document.getElementById("abrirModalBtn");
const modal = document.getElementById("modalPost");
const fecharModalBtn = document.getElementById("fecharModalBtn");

// Abrir o modal
abrirModalBtn.onclick = function () {
    modal.style.display = "block";
};

// Fechar pelo X
fecharModalBtn.onclick = function () {
    modal.style.display = "none";
};

// Fechar clicando fora do conteúdo
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
// Pega elementos do formulário
const tituloPost = document.getElementById("tituloPost");
const conteudoPost = document.getElementById("conteudoPost");
const publicarBtn = document.getElementById("publicarBtn");
const postsContainer = document.getElementById("postsContainer");

// Ação do botão PUBLICAR
publicarBtn.onclick = function () {
    const titulo = tituloPost.value.trim();
    const conteudo = conteudoPost.value.trim();

    if (titulo === "" || conteudo === "") {
        alert("Por favor, preencha título e conteúdo.");
        return;
    }

    // Criar novo post em HTML
    const novoPost = document.createElement("article");

    novoPost.innerHTML = `
        <h2>${titulo}</h2>
        <p class="date">Postado em: ${new Date().toLocaleString()}</p>
        <p>${conteudo}</p>
        <hr>
    `;

    // Adicionar no topo
    postsContainer.prepend(novoPost);
    // Salvar no localStorage
    function salvarPosts() {
        localStorage.setItem("postsJéssica", postsContainer.innerHTML);
    }

    salvarPosts();


    // Limpar modal
    tituloPost.value = "";
    conteudoPost.value = "";

    // Fechar modal
    modal.style.display = "none";
};
// Carregar posts ao abrir o site
window.onload = function() {
    const postsSalvos = localStorage.getItem("postsJéssica");
    if (postsSalvos) {
        postsContainer.innerHTML = postsSalvos;
    }
};