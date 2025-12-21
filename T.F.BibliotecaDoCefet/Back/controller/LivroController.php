<?php
require_once __DIR__ . "/GenericController.php";
require_once __DIR__ . "/../model/livro.class.php";

class LivroController implements GenericController {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

function cadastrar($dadosRecebidos){
    $livro = new Livro(
        null,
        $dadosRecebidos->titulo,
        $dadosRecebidos->autor,
        $dadosRecebidos->editora,
        $dadosRecebidos->anoPublicacao,
        $dadosRecebidos->genero,
        $dadosRecebidos->localizacao,
        $dadosRecebidos->ISSN
    );

    $res = $livro->cadastrar($this->conn); // agora retorna JSON
    return $res;
}

function registrarRetirada($dadosRecebidos){
    if(!isset($dadosRecebidos->ISSN)){
        return ["erro"=>true, "mensagem"=>"ISSN não informado"];
    }

    $livro = Livro::pegaPorISSN($dadosRecebidos->ISSN, $this->conn);
    if(!$livro){
        return ["erro"=>true, "mensagem"=>"Livro não encontrado"];
    }

    $livro->registrarRetirada($this->conn);
    return ["erro"=>false, "mensagem"=>"Retirada registrada com sucesso"];
}

    function listar($filtro) {
        return Livro::listar($filtro, $this->conn);
    }

function alterar($dadosRecebidos){
    if(!isset($dadosRecebidos->ISSN)){
        return ["erro"=>true, "mensagem"=>"ISSN não informado"];
    }

    $livro = Livro::pegaPorISSN($dadosRecebidos->ISSN, $this->conn);

    if(!$livro){
        return ["erro"=>true, "mensagem"=>"Livro não encontrado"];
    }

    // atualiza os campos recebidos
    $livro->titulo = $dadosRecebidos->titulo ?? $livro->titulo;
    $livro->autor = $dadosRecebidos->autor ?? $livro->autor;
    $livro->editora = $dadosRecebidos->editora ?? $livro->editora;
    $livro->anoPublicacao = $dadosRecebidos->anoPublicacao ?? $livro->anoPublicacao;
    $livro->genero = $dadosRecebidos->genero ?? $livro->genero;
    $livro->localizacao = $dadosRecebidos->localizacao ?? $livro->localizacao;

    $livro->alterar($this->conn);

    return ["erro"=>false, "mensagem"=>"Livro alterado com sucesso"];
}

function remover($dadosRecebidos){
    if(!isset($dadosRecebidos->ISSN)){
        return ["erro"=>true, "mensagem"=>"ISSN não informado"];
    }

    $livro = Livro::pegaPorISSN($dadosRecebidos->ISSN, $this->conn);

    if(!$livro){
        return ["erro"=>true, "mensagem"=>"Livro não encontrado"];
    }

    $livro->remover($this->conn);
    return ["erro"=>false, "mensagem"=>"Livro removido com sucesso"];
}


}
?>