const btnLogin = document.querySelector("#btnLogin");
const mensagemLogin = document.querySelector("#mensagemLogin");

btnLogin.addEventListener("click", async () => {
    const email = document.querySelector("#emailLogin").value;
    const senha = document.querySelector("#senhaLogin").value;

    if (!email || !senha) {
        mensagemLogin.innerText = "Preencha todos os campos!";
        return;
    }

    const dados = new URLSearchParams();
    dados.append("email", email);
    dados.append("senha", senha);

    try {
        const resposta = await fetch(
            "http://localhost/Meus Códigos PHP/T.F.BibliotecaDoCefet/Back/index.php?modulo=usuario&acao=login",
            {
                method: "POST",
                body: dados
            }
        );

        const retorno = await resposta.json();

        if (retorno.erro) {
            mensagemLogin.innerText = retorno.mensagem;
        } else {
            alert("Login realizado com sucesso!");
            window.location.href = "../livros/index.html";
        }
    } catch (error) {
        mensagemLogin.innerText = "Erro na conexão com o servidor.";
    }
});