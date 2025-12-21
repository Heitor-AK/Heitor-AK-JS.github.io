<?php
require_once __DIR__ . "/GenericController.php";
require_once __DIR__ . "/../model/usuario.class.php";
class UsuarioController implements GenericController{
    private $conn;
    public function __construct($conn) {
        $this->conn = $conn;
    }
function cadastrar($dadosRecebidos){
    $usuario = new Usuario(
        null,
        $dadosRecebidos->nome,
        $dadosRecebidos->email,
        $dadosRecebidos->senha
    );
    $usuario->cadastrar($this->conn);

    echo json_encode([
        "erro" => false,
        "mensagem" => "Usuário cadastrado com sucesso"
    ]);
}

function listar($dadosRecebidos){
    $filtro = $dadosRecebidos->filtro ?? "";
    $usuarios = Usuario::listar($filtro, $this->conn);

    // Inclui o id para poder alterar/remover
    $usuariosFiltrados = array_map(function($u){
        return [
            "id" => $u->id,   // ADICIONADO
            "nome" => $u->nome,
            "email" => $u->email
        ];
    }, $usuarios);

    return $usuariosFiltrados;
}

function login($dadosRecebidos){
    if(!isset($dadosRecebidos->email) || !isset($dadosRecebidos->senha)){
        return ["erro"=>true, "mensagem"=>"Informe email e senha"];
    }

    $email = $dadosRecebidos->email;
    $senha = $dadosRecebidos->senha;

    $SQL = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha'";
    $resultado = $this->conn->query($SQL);

    if($resultado && $resultado->num_rows > 0){
        return ["erro"=>false, "mensagem"=>"Login efetuado"];
    } else {
        return ["erro"=>true, "mensagem"=>"Email ou senha incorretos"];
    }
}

function alterar($dadosRecebidos){
    $usuario = Usuario::pegaPorId($dadosRecebidos->id, $this->conn);
    if(!$usuario) return ["erro" => true, "mensagem" => "Usuário não encontrado"];

    $usuario->nome = $dadosRecebidos->nome ?? $usuario->nome;
    $usuario->email = $dadosRecebidos->email ?? $usuario->email;
    $usuario->alterar($this->conn);

    return ["erro" => false, "mensagem" => "Usuário alterado com sucesso"];
}

function remover($dadosRecebidos){
    $usuario = Usuario::pegaPorId($dadosRecebidos->id, $this->conn);
    if(!$usuario) return ["erro" => true, "mensagem" => "Usuário não encontrado"];

    $usuario->remover($this->conn);
    return ["erro" => false, "mensagem" => "Usuário removido com sucesso"];
}


}

?>