<?php
require_once __DIR__ . "/classe_pai.php";
class Livro extends ClassePai {

    public $titulo;
    public $autor;
    public $editora;
    public $anoPublicacao;
    public $genero;
    public $localizacao;
    public $ISSN;
    public $disponibilidade;
    public $URL;

    public function toEntity($dados){
        return new Livro(
            $dados[0],
            $dados[1],
            $dados[2],
            $dados[3],
            $dados[4],
            $dados[5],
            $dados[6],
            $dados[7],
            $dados[8],
            $dados[9]
        );
    }

    public function cadastrar($conn){
        $SQL = "INSERT INTO livros (titulo, autor, editora, anoPublicacao, genero, localizacao, ISSN, disponibilidade, URL) VALUES (
            '$this->titulo',
            '$this->autor',
            '$this->editora',
            '$this->anoPublicacao',
            '$this->genero',
            '$this->localizacao',
            '$this->ISSN',
            '$this->disponibilidade',
            '$this->URL'
        )";
        $resultado = $conn->query($SQL);
        if($resultado){
            $this->id = $conn->insert_id;
        }
    }

    public function alterar($conn){
        $SQL = "UPDATE livros SET 
            titulo = '$this->titulo',
            autor = '$this->autor',
            editora = '$this->editora',
            anoPublicacao = '$this->anoPublicacao',
            genero = '$this->genero',
            localizacao = '$this->localizacao',
            ISSN = '$this->ISSN',
            URL = '$this->URL'
        WHERE id = $this->id";
        $conn->query($SQL);
    }
    static public function pegaPorId($id, $conn) {
        $SQL = "SELECT * FROM livros WHERE id = $id";
        $resultado = $conn->mysql_query($SQL);
        if($resultado){
            $dados = $conn->fetch_array($resultado);
            return new Livro(
                $dados['id'],
                $dados['titulo'],
                $dados['autor'],
                $dados['editora'],
                $dados['anoPublicacao'],
                $dados['genero'],
                $dados['localizacao'],
                $dados['ISSN'],
                $dados['disponibilidade'],
                $dados['URL']
            );
        }
    }

    public function __construct($id, $titulo, $autor, $editora, $anoPublicacao, $genero, $localizacao, $ISSN, $disponibilidade, $URL) {
        parent::__construct($id, "database/livros.txt");
        $this->titulo = $titulo;
        $this->autor = $autor;
        $this->editora = $editora;
        $this->anoPublicacao = $anoPublicacao;
        $this->genero = $genero;
        $this->localizacao = $localizacao;
        $this->ISSN = $ISSN;
        $this->disponibilidade = $disponibilidade;
        $this->URL = $URL;
    }

    static public function listar($filtroNome, $conn) {
        $SQL = "SELECT * FROM livros WHERE titulo LIKE '%$filtroNome%'";
        $resultado = $conn->query($SQL);
        $retorno = [];
        while($dados = $resultado->fetch_array()){
            $livro = new Livro(
                $dados['id'],
                $dados['titulo'],
                $dados['autor'],
                $dados['editora'],
                $dados['anoPublicacao'],
                $dados['genero'],
                $dados['localizacao'],
                $dados['issn'],
                $dados['disponibilidade'],
                $dados['url']
            );
            array_push($retorno, $livro);
        }
        return $retorno;
    }
}
?>