const saida = document.getElementById("saidaUsuarios");

// função para listar todos os usuários
function listarUsuarios() {
  fetch("http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=usuario&acao=listar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filtro: "" })
  })
  .then(res => res.json())
  .then(dados => mostrarUsuarios(dados));
}

// Listar todos usuários ao clicar no botão
document.getElementById("listarUsuarios").onclick = listarUsuarios;

// Consultar usuários por filtro
document.getElementById("consultarUsuarios").onclick = () => {
  const filtro = document.getElementById("buscaUsuario").value;

  fetch("http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=usuario&acao=listar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filtro: filtro })
  })
  .then(res => res.json())
  .then(dados => {
    mostrarUsuarios(dados);
    // Limpa o campo de busca
    document.getElementById("buscaUsuario").value = "";
  });
};


// cadastrar usuário
document.getElementById("cadastrarUsuario").onclick = () => {
  const usuario = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value
  };

  fetch("http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=usuario&acao=cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  })
  .then(() => {
    alert("Usuário cadastrado com sucesso");
    // Limpa os campos
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";

    listarUsuarios(); // atualiza a lista
  });
};

// alterar usuário
function alterarUsuario(id) {
  const nome = prompt("Digite o novo nome:");
  const email = prompt("Digite o novo email:");

  fetch("http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=usuario&acao=alterar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, nome: nome, email: email })
  })
  .then(() => {
    alert("Usuário alterado com sucesso");
    listarUsuarios(); // atualiza a lista
  });
}

// remover usuário
function removerUsuario(id) {
  if(!confirm("Deseja realmente remover este usuário?")) return;

  fetch("http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=usuario&acao=remover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id })
  })
  .then(() => {
    alert("Usuário removido com sucesso");
    listarUsuarios(); // atualiza a lista
  });
}

// função para mostrar usuários com botões
function mostrarUsuarios(usuarios){
  saida.innerHTML = "";

  if(usuarios.length === 0){
    saida.innerHTML = "Nenhum usuário encontrado";
    return;
  }

  usuarios.forEach(u => {
    saida.innerHTML += `
      <p>
        <strong>Nome:</strong> ${u.nome} <br>
        <strong>Email:</strong> ${u.email} <br>
        <button onclick="alterarUsuario(${u.id})">Alterar</button>
        <button onclick="removerUsuario(${u.id})">Remover</button>
      </p>
      <hr>
    `;
  });
}