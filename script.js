// ---------------- MODAL ----------------

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

// ---------------- POSTS ----------------

// Pega elementos do formulário
const tituloPost = document.getElementById("tituloPost");
const conteudoPost = document.getElementById("conteudoPost");
const publicarBtn = document.getElementById("publicarBtn");
const postsContainer = document.getElementById("postsContainer");

// Função para carregar posts do servidor
async function carregarPostsDoServidor() {
    const resposta = await fetch("http://localhost:3000/posts");
    const posts = await resposta.json();

    postsContainer.innerHTML = ""; // limpar

    posts.forEach(post => {
        const artigo = document.createElement("article");
        artigo.innerHTML = `
            <h2>${post.titulo}</h2>
            <p class="date">Postado por: ${post.autor} em ${post.data}</p>
            <p>${post.conteudo}</p>
            <hr>
        `;
        postsContainer.appendChild(artigo);
    });
}

// Carregar posts ao iniciar o site
window.onload = carregarPostsDoServidor;

// Publicar novo post
publicarBtn.onclick = async function () {
    const titulo = tituloPost.value.trim();
    const conteudo = conteudoPost.value.trim();

    if (titulo === "" || conteudo === "") {
        alert("Por favor, preencha título e conteúdo.");
        return;
    }

    // Enviar para o servidor
    const resposta = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            titulo: titulo,
            conteudo: conteudo
        })
    });

    const resultado = await resposta.json();

    if (resultado.status === "ok") {
        // Recarregar posts
        carregarPostsDoServidor();

        // Limpar modal
        tituloPost.value = "";
        conteudoPost.value = "";
        modal.style.display = "none";
    } else {
        alert("Erro ao publicar!");
    }
};
