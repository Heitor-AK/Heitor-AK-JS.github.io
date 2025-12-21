<?php
require_once __DIR__ . "/classe_pai.php";
class Usuario extends ClassePai {

    public $id;
    public $nome;
    public $email;
    public $senha;

    public function toEntity($dados){
        return new Usuario(
            $dados[0],
            $dados[1],
            $dados[2]
        );
    }

    public function cadastrar($conn){
        $SQL = "INSERT INTO usuarios (nome, email, senha) VALUES (
            '$this->nome',
            '$this->email',
            '$this->senha'
        )";
        $resultado = $conn->query($SQL);
        if($resultado){
            $this->id = $conn->insert_id;
        }
    }

    public function alterar($conn){
        $SQL = "UPDATE usuarios SET 
            nome = '$this->nome',
            email = '$this->email',
            senha = '$this->senha'
        WHERE id = $this->id";
        $conn->query($SQL);
    }

    public function remover($conn){
        $SQL = "DELETE FROM usuarios WHERE id = $this->id";
        $resultado = $conn->query($SQL);
        if(!$resultado){
            echo "Erro ao remover: " . $conn->error;
        }
    }

static public function pegaPorId($id, $conn) {
    $SQL = "SELECT * FROM usuarios WHERE id = $id";
    $resultado = $conn->query($SQL);
    if($resultado && $resultado->num_rows > 0){
        $dados = $resultado->fetch_array(MYSQLI_ASSOC);
        return new Usuario(
            $dados['id'],
            $dados['nome'],
            $dados['email'],
            $dados['senha']
        );
    }
    return null; // se não encontrar
}

    public function __construct($id, $nome, $email, $senha) {
        parent::__construct($id, "database/usuarios.txt");
        $this->nome = $nome;
        $this->email = $email;
        $this->senha = $senha;
    }

static public function listar($filtro, $conn) {
    $SQL = "SELECT * FROM usuarios WHERE nome LIKE '%$filtro%' OR email LIKE '%$filtro%'";
    $resultado = $conn->query($SQL);
    $retorno = [];
    while($dados = $resultado->fetch_array()){
        $usuario = new Usuario(
            $dados['id'],
            $dados['nome'],
            $dados['email'],
            $dados['senha']
        );
        array_push($retorno, $usuario);
    }
    return $retorno;
}


        public function montaLinhaDados()
    {
        return $this->id.self::SEPARADOR.
            $this->nome.self::SEPARADOR.
            $this->email.self::SEPARADOR.
            $this->senha;
    }

}   
?>