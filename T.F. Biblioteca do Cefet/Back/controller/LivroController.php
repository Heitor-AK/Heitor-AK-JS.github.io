<?php
  require_once __DIR__ . "/GenericController.php";
require_once __DIR__ . "/../model/livro.class.php";
class LivroController implements GenericController{
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
            $dadosRecebidos->ano,
            $dadosRecebidos->genero,
            $dadosRecebidos->local,
            $dadosRecebidos->issn,
            "Sim",
            $dadosRecebidos->url
        );
        $livro->cadastrar($this->conn);
    }

    function listar($dadosRecebidos){
        return Livro::listar($dadosRecebidos, $this->conn);
    }
    function alterar($dadosRecebidos){
        $livro = Livro::pegaPorId($dadosRecebidos->id, $this->conn);
        $livro->titulo = $dadosRecebidos["titulo"];
        $livro->autor = $dadosRecebidos["autor"];
        $livro->editora = $dadosRecebidos["editora"];
        $livro->anoPublicacao = $dadosRecebidos["anoPublicacao"];
        $livro->genero = $dadosRecebidos["genero"];
        $livro->localizacao = $dadosRecebidos["localizacao"];
        $livro->ISSN = $dadosRecebidos["ISSN"];
        $livro->URL = $dadosRecebidos["URL"];
        $livro->alterar($this->conn);
    }
    function remover($dadosRecebidos){
       $livro = Livro::pegaPorId($dadosRecebidos->id, $this->conn);
       $livro->remover($this->conn);
    }
}

?>