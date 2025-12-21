const saida = document.querySelector("#saidaBusca");
const btnConsultarLivros = document.querySelector("#consultarLivros")
const btnListarTodosLivros = document.querySelector("#listarLivros")
const btnCadastrarLivro = document.querySelector("#cadastrarLivro")
const btnRegistrarRetirada = document.querySelector("#registrarRetirada")

/**
 * Função construtora de Exemplares da Biblioteca
 * @param {*} issn 
 * @param {*} titulo 
 * @param {*} autor 
 * @param {*} editora 
 * @param {*} ano 
 * @param {*} genero 
 * @param {*} local 
 * @param {*} disponibilidade 
 */
function Livro(issn, titulo, autor, editora, ano, genero, local, disponibilidade) {
    this.issn = issn
    this.titulo = titulo
    this.autor = autor
    this.editora = editora
    this.ano = ano
    this.genero = genero
    this.local = local
    this.disponivel = disponibilidade
}

/**
 * Função que deverá pegar os dados do formulário e gerar um novo 
 * exemplar na lista de livros da biblioteca
 * 
 */

async function cadastrarExemplar() {

  const issn = document.querySelector("#novoIssn").value;
  const titulo = document.querySelector("#novoTitulo").value;
  const autor = document.querySelector("#novoAutor").value;
  const editora = document.querySelector("#novoEditora").value;

  const ano = parseInt(document.querySelector("#novoAno").value);

  if (isNaN(ano)) {
    alert("Informe um ano válido");
    return;
  }

  const genero = document.querySelector("#novoGenero").value;
  const local = document.querySelector("#novoLocal").value;

  const dados = {
    titulo: titulo,
    autor: autor,
    editora: editora,
    anoPublicacao: ano,
    genero: genero,
    localizacao: local,
    ISSN: issn
  };

    const resposta = await fetch(
    "http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=livro&acao=cadastrar",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    }
    );


  const retorno = await resposta.json();
  alert(retorno.mensagem);
    document.querySelector("#novoIssn").value = "";
    document.querySelector("#novoTitulo").value = "";
    document.querySelector("#novoAutor").value = "";
    document.querySelector("#novoEditora").value = "";
    document.querySelector("#novoAno").value = "";
    document.querySelector("#novoGenero").value = "";
    document.querySelector("#novoLocal").value = "";

  listarTodos();
}

/**
 * Função que deverá pegar o parâmetro de filtro e listar todos os 
 * exemplares que satisfizerem a condição
 */
async function consultarLivros() {

    const filtro = document.querySelector("#busca").value;
    saida.innerHTML = "";

    const resposta = await fetch(
        `http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=livro&filtro=${encodeURIComponent(filtro)}`
    );

    const livros = await resposta.json();

    if (livros.length === 0) {
        saida.innerHTML = "Nenhum livro encontrado.";
        return;
    }

    exibeDadosNaTela(livros);
      document.querySelector("#busca").value = "";
}


/**
 * Função que deverá listar na tela todos os livros do acervo
 */
async function listarTodos() {
    const resposta = await fetch('http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=livro&filtro=');
    const livros = await resposta.json();
    console.log(livros[0])
    exibeDadosNaTela(livros);
}

function exibeDadosNaTela(livros) {
    saida.innerHTML = ""; // limpa antes de mostrar

    livros.forEach(livro => {
        saida.innerHTML += `
        <p>
            <strong>ISSN:</strong> ${livro.ISSN} <br>
            <strong>Título:</strong> ${livro.titulo} <br>
            <strong>Autor:</strong> ${livro.autor} <br>
            <strong>Gênero:</strong> ${livro.genero} <br>
            <strong>Ano:</strong> ${livro.anoPublicacao} <br>
            <strong>Disponível:</strong> ${livro.disponibilidade} <br>
            <button onclick="alterarLivro('${livro.ISSN}')">Alterar</button>
            <button onclick="removerLivro('${livro.ISSN}')">Remover</button>
        </p><hr>`;
    });
}

/**
 * Função que deverá marcar o exemplar como indisponível no acervo
 */
async function registrarRetirada() {
    const issn = document.querySelector("#idLivroRetirada").value;

    if (!issn) {
        alert("Informe o ISSN do livro");
        return;
    }

    const dados = {
        ISSN: issn
    };

    const resposta = await fetch(
        "http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=livro&acao=retirada",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }
    );

    const retorno = await resposta.json();
    alert(retorno.mensagem);
  document.querySelector("#idLivroRetirada").value = "";
  listarTodos();
}

function alterarLivro(issn) {
    const titulo = prompt("Digite o novo título:");
    const autor = prompt("Digite o novo autor:");
    const genero = prompt("Digite o novo gênero:");
    const ano = parseInt(prompt("Digite o novo ano de publicação:"));

    const dados = {
        ISSN: issn,
        titulo: titulo,
        autor: autor,
        genero: genero,
        anoPublicacao: ano
    };

    fetch("http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=livro&acao=alterar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(retorno => {
        alert(retorno.mensagem);
        listarTodos(); // atualiza a lista
    });
}

async function removerLivro(issn) {
    if(!confirm("Deseja realmente remover este livro?")) return;

    const dados = { ISSN: issn };

    const resposta = await fetch(
        "http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=livro&acao=remover",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }
    );

    const retorno = await resposta.json();
    alert(retorno.mensagem);
    listarTodos();
}

/* 
 * Bloco de chamada de eventos
 */ 
btnCadastrarLivro.addEventListener("click", cadastrarExemplar)
btnConsultarLivros.addEventListener("click", consultarLivros)
btnListarTodosLivros.addEventListener("click", listarTodos)
btnRegistrarRetirada.addEventListener("click", registrarRetirada)