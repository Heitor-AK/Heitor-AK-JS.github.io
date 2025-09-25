/* function produto(id, nome, preco, quantidade) {
  this.id = id
  this.nome = nome
  this.preco = preco
  this.quantidade = quantidade
}
produto.prototype.toString = function (){
  return `${this.nome}, ${this.preco}` 
} */

const produtos = [
  // new produto(1, "Mouse", 59.9, 12),

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


const listarProdutos = () => {
  document.querySelector("#resultado").innerHTML="" //APAGAR O QUE ESTIVER NO RESULTADO

  const ulHTML = document.createElement("ul") //CRIAR UMA LISTA

  produtos.forEach(prod => {
    const liHTML= document.createElement("li") //ADICIONAR UM LI POR ELEMENTO
    liHTML.textContent = "Nome: "+prod.nome+"                        Preço: "+prod.preco+"                        Quantidade: "+prod.quantidade;
    ulHTML.appendChild(liHTML)
   });
   document.querySelector("#resultado").appendChild(ulHTML) // ADICIONAR A LISTA NA PÁGINA
}


const mostrarNomes = () => { produtos.map(nom => nom.nome);
const liHTML= document.createElement("li") //ADICIONAR UM LI POR ELEMENTO
    liHTML.textContent = "Nome: "+ nom;
    ulHTML.appendChild(liHTML)
}

const calcularTotal = () => {

}

const verificarEsgotados = () => {

}

const verificarPrecos = () => {

}

const buscarProduto = () => {

}

const btnLista = document.querySelector("#listaProdutos")
btnLista.addEventListener("click", listarProdutos)

const btnMostrar = document.querySelector("#mostrarProdutos")
btnLista.addEventListener("click", mostrarProdutos)