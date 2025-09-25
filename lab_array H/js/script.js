// localStorage
const salvarProdutos = () => {
  localStorage.setItem("produtos", JSON.stringify(produtos));
};

const carregarProdutos = () => {
  const dados = localStorage.getItem("produtos");
  if (!dados) return null;
  try {
    const arr = JSON.parse(dados);
    return arr.map(p => ({
      id: Number(p.id),
      nome: String(p.nome),
      preco: Number(p.preco),
      quantidade: Number(p.quantidade)
    }));
  } catch (e) {
    console.error("Erro ao ler localStorage:", e);
    return null;
  }
};

let produtos = carregarProdutos() || [
  { id: 1, nome: "Mouse", preco: 59.9, quantidade: 12 },
  { id: 2, nome: "Teclado", preco: 99.9, quantidade: 5 },
  { id: 3, nome: "Monitor", preco: 799.9, quantidade: 2 },
  { id: 4, nome: "Cabo HDMI", preco: 29.9, quantidade: 30 },
  { id: 5, nome: "Pen Drive", preco: 49.9, quantidade: 0 },
  { id: 6, nome: "Webcam", preco: 199.9, quantidade: 4 },
  { id: 7, nome: "SSD 240GB", preco: 299.9, quantidade: 6 },
  { id: 8, nome: "HD Externo", preco: 499.9, quantidade: 3 },
  { id: 9, nome: "Notebook", preco: 3499.9, quantidade: 1 },
  { id: 10, nome: "Suporte de Notebook", preco: 89.9, quantidade: 0 }
];

salvarProdutos();

// funções principais
const listarProdutos = () => {
  const container = document.querySelector("#resultado");
  if (!container) return;
  container.innerHTML = "";

  const ulHTML = document.createElement("ul");

  produtos.forEach(prod => {
    const precoNum = Number(prod.preco) || 0;
    const liHTML = document.createElement("li");
    liHTML.textContent = `${prod.nome} - R$ ${precoNum.toFixed(2)} - Estoque: ${Number(prod.quantidade)}`;
    ulHTML.appendChild(liHTML);
  });

  container.appendChild(ulHTML);
};

const buscarProduto = () => {
  const divResultado = document.querySelector("#resultadoBusca");
  if (!divResultado) return;

  const campo = document.querySelector("#buscar");
  if (!campo) {
    divResultado.textContent = "Campo de busca não encontrado";
    return;
  }

  const termo = campo.value.trim().toLowerCase();
  if (!termo) {
    divResultado.textContent = "Digite o nome do produto";
    return;
  }

  const exato = produtos.find(p => p.nome.toLowerCase() === termo);
  if (exato) {
    divResultado.textContent = `Produto: ${exato.nome} | Preço: R$ ${Number(exato.preco).toFixed(2)} | Estoque: ${Number(exato.quantidade)}`;
    return;
  }

  const matches = produtos.filter(p => p.nome.toLowerCase().includes(termo));
  if (matches.length > 0) {
    divResultado.textContent = "Resultados:\n" + matches.map(m => `${m.nome} | R$ ${Number(m.preco).toFixed(2)} | Qtd: ${Number(m.quantidade)}`).join("\n");
    return;
  }

  divResultado.textContent = "Produto não encontrado";
};

const mostrarNomes = () => {
  const container = document.querySelector("#resultado");
  if (!container) return;
  const nomes = produtos.map(p => p.nome);
  container.textContent = "Nomes dos produtos:\n" + nomes.join(", ");
};

const calcularTotal = () => {
  const container = document.querySelector("#resultado");
  if (!container) return;

  const total = produtos.reduce((acc, p) => {
    const preco = Number(p.preco) || 0;
    const qtd = Number(p.quantidade) || 0;
    return acc + preco * qtd;
  }, 0);

  container.textContent = `Valor total do estoque: R$ ${total.toFixed(2)}`;
};

const verificarEsgotados = () => {
  const container = document.querySelector("#resultado");
  if (!container) return;

  const esgotados = produtos.filter(p => Number(p.quantidade) === 0);
  if (esgotados.length > 0) {
    const nomes = esgotados.map(p => p.nome).join(", ");
    container.textContent = `🚨 Produtos esgotados: ${nomes}`;
  } else {
    container.textContent = "✅ Nenhum produto esgotado";
  }
};

const verificarPrecos = () => {
  const container = document.querySelector("#resultado");
  if (!container) return;

  let texto = "💸 Preços dos produtos:\n";
  produtos.forEach(p => {
    texto += `${p.nome}: R$ ${Number(p.preco).toFixed(2)}\n`;
  });

  const todosAcimaDe10 = produtos.every(p => Number(p.preco) > 10);
  texto += todosAcimaDe10
    ? "\nTodos os produtos têm preço justo"
    : "\n⚠️ Há produtos com preço muito baixo";

  container.textContent = texto;
};

// adicionar e desconto
const adicionarProduto = (nome, preco, quantidade) => {
  const container = document.querySelector("#resultado");
  if (!nome || nome.toString().trim() === "") {
    if (container) container.textContent = "Digite um nome válido";
    return;
  }
  const precoNum = Number(preco);
  const qtdNum = Number(quantidade);
  if (isNaN(precoNum) || isNaN(qtdNum)) {
    if (container) container.textContent = "Preço ou quantidade inválidos";
    return;
  }
  const id = produtos.length ? (Math.max(...produtos.map(p => Number(p.id))) + 1) : 1;
  produtos.push({ id, nome: String(nome), preco: precoNum, quantidade: qtdNum });
  salvarProdutos();
  if (container) container.textContent = `Produto ${nome} adicionado com sucesso`;
  listarProdutos();
};

const aplicarDesconto = (percentual) => {
  const container = document.querySelector("#resultado");
  const pct = Number(percentual);
  if (isNaN(pct) || pct < 0 || pct > 100) {
    if (container) container.textContent = "Percentual inválido (0 a 100)";
    return;
  }
  produtos = produtos.map(p => {
    const novoPreco = Number((Number(p.preco) * (1 - pct / 100)).toFixed(2));
    return { ...p, preco: novoPreco };
  });
  salvarProdutos();
  if (container) container.textContent = `Desconto de ${pct}% aplicado`;
  listarProdutos();
};

window.listarProdutos = listarProdutos;
window.buscarProduto = buscarProduto;
window.mostrarNomes = mostrarNomes;
window.calcularTotal = calcularTotal;
window.verificarEsgotados = verificarEsgotados;
window.verificarPrecos = verificarPrecos;
window.adicionarProduto = adicionarProduto;
window.aplicarDesconto = aplicarDesconto;

const btnLista = document.querySelector("#listaProdutos");
if (btnLista) btnLista.addEventListener("click", listarProdutos);

const btnBuscar = document.querySelector("#buscar + button");
if (btnBuscar) btnBuscar.addEventListener("click", buscarProduto);

const btnAdicionar = document.querySelector("#btnAdicionarProduto");
if (btnAdicionar) {
  btnAdicionar.addEventListener("click", () => {
    adicionarProduto(
      document.querySelector("#novoNome").value,
      document.querySelector("#novoPreco").value,
      document.querySelector("#novoQtd").value
    );
  });
}
const btnAplicarDesconto = document.querySelector("#btnAplicarDesconto");
if (btnAplicarDesconto) {
  btnAplicarDesconto.addEventListener("click", () => {
    aplicarDesconto(document.querySelector("#desconto").value);
  });
}

const limparLocalStorage = () => {
  localStorage.removeItem("produtos");
  alert("LocalStorage apagado, recarregue a página para usar os valores padrão do array");
};

window.limparLocalStorage = limparLocalStorage;