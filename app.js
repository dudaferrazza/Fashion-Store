const API = "https://api.escuelajs.co/api/v1";

// INDEX
async function carregarDestaques() {
    const container = document.getElementById("featured-list");
    if (!container) return;

    const resposta = await fetch(`${API}/products`);
    const produtos = await resposta.json();

    const tres = produtos.slice(0, 3);

    container.innerHTML = "";

    tres.forEach(produto => {
        container.innerHTML += `
            <article class="card">
                <div class="card-img-wrapper">
                    <img src="${produto.images[0]}" class="card-img">
                </div>
                <div class="card-content">
                    <span class="card-category">${produto.category.name}</span>
                    <h3 class="card-title">${produto.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${produto.price}</span>
                        <a href="detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
        `;
    });
}

// MENU
async function carregarProdutos() {
    const container = document.getElementById("products-list");
    if (!container) return;

    const resposta = await fetch(`${API}/products?limit=6`);
    const produtos = await resposta.json();

    mostrarProdutos(produtos);
}

function mostrarProdutos(produtos) {
    const container = document.getElementById("products-list");
    if (!container) return;

    container.innerHTML = "";

    produtos.forEach(produto => {
        container.innerHTML += `
            <article class="card">
                <div class="card-img-wrapper">
                    <img src="${produto.images[0]}" class="card-img">
                </div>
                <div class="card-content">
                    <span class="card-category">${produto.category.name}</span>
                    <h3 class="card-title">${produto.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${produto.price}</span>
                        <a href="detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
        `;
    });
}

// FILTRO
async function filterProducts(categoryId) {
    let url = `${API}/products`;

    if (categoryId) {
        url = `${API}/products/?categoryId=${categoryId}`;
    }

    const resposta = await fetch(url);
    const produtos = await resposta.json();

    mostrarProdutos(produtos);
}

async function carregarCategorias() {
    const select = document.getElementById("category-filter");
    if (!select) return;

    const resposta = await fetch(`${API}/categories`);
    const categorias = await resposta.json();

    categorias.forEach(cat => {
        select.innerHTML += `
            <option value="${cat.id}">${cat.name}</option>
        `;
    });
}

// DETAIL
async function carregarDetalhe() {
    const container = document.getElementById("product-detail");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const resposta = await fetch(`${API}/products/${id}`);
    const produto = await resposta.json();

    container.innerHTML = `
        <img src="${produto.images[0]}" class="detail-img">
        <div class="detail-info">
            <span class="card-category">Categoria: ${produto.category.name}</span>
            <h1>${produto.title}</h1>
            <div class="detail-price">R$ ${produto.price}</div>
            <p class="detail-description">${produto.description}</p>
            <button class="btn-primary">Adicionar ao Carrinho</button>
        </div>
    `;
}

// TEMA
function toggleTheme() {
    const html = document.documentElement;
    const atual = html.getAttribute("data-theme");

    if (atual === "light") {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

// EXECUTAR
carregarDestaques();
carregarProdutos();
carregarCategorias();
carregarDetalhe();