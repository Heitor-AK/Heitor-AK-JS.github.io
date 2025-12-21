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


    public function toEntity($dados){
    return new Livro(
        $dados['id'],
        $dados['titulo'],
        $dados['autor'],
        $dados['editora'],
        $dados['anoPublicacao'],
        $dados['genero'],
        $dados['localizacao'],
        $dados['ISSN'],
        $dados['disponibilidade']
    );
}

public function cadastrar($conn){
   $SQL = "INSERT INTO livros 
       (titulo, autor, editora, anoPublicacao, genero, localizacao, ISSN, disponibilidade)
       VALUES (
           '$this->titulo',
           '$this->autor',
           '$this->editora',
           '$this->anoPublicacao',
           '$this->genero',
           '$this->localizacao',
           '$this->ISSN',
           '$this->disponibilidade'
       )";

   $resultado = $conn->query($SQL);

   if($resultado){
       $this->id = $conn->insert_id;
       return ["erro"=>false,"mensagem"=>"Livro cadastrado com sucesso"];
   } else {
       return ["erro"=>true,"mensagem"=>"Erro ao cadastrar livro: ".$conn->error];
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
            ISSN = '$this->ISSN'
        WHERE id = $this->id";
        $conn->query($SQL);
    }

public function remover($conn){
    $SQL = "DELETE FROM livros WHERE ISSN = '$this->ISSN'";
    $conn->query($SQL);
}

    static public function pegaPorId($id, $conn) {
        $SQL = "SELECT * FROM livros WHERE id = $id";
        $resultado = $conn->query($SQL);
        if($resultado){
            $dados = $resultado->fetch_array();
            return new Livro(
                $dados['id'],
                $dados['titulo'],
                $dados['autor'],
                $dados['editora'],
                $dados['anoPublicacao'],
                $dados['genero'],
                $dados['localizacao'],
                $dados['ISSN'],
                $dados['disponibilidade']
            );

        }
        /*$arquivo = fopen("database/livros.txt"
        , "r");
        while(!feof($arquivo)){
            $linha = fgets($arquivo);
            if(empty($linha))
                continue;
            $dados = explode(self::SEPARADOR, $linha);
            if($dados[0] == $id){
                fclose($arquivo);
                return $this->toEntity($dados);
            }
        }
        fclose($arquivo);*/
    }

public function registrarRetirada($conn){
    $SQL = "UPDATE livros 
            SET disponibilidade = 'Não' 
            WHERE ISSN = '$this->ISSN'";
    $conn->query($SQL);
}


public function __construct(    
    $id,
    $titulo,
    $autor,
    $editora,
    $anoPublicacao,
    $genero,
    $localizacao,
    $ISSN,
    $disponibilidade="Sim")
     {
    parent::__construct($id);
    $this->titulo = $titulo;
    $this->autor = $autor;
    $this->editora = $editora;
    $this->anoPublicacao = $anoPublicacao;
    $this->genero = $genero;
    $this->localizacao = $localizacao;
    $this->ISSN = $ISSN;
    $this->disponibilidade = $disponibilidade;
}

static public function pegaPorISSN($issn, $conn) {
    $SQL = "SELECT * FROM livros WHERE ISSN = '$issn'";
    $resultado = $conn->query($SQL);

    if($resultado && $resultado->num_rows > 0){
        $dados = $resultado->fetch_array();

        return new Livro(
    $dados['id'],
    $dados['titulo'],
    $dados['autor'],
    $dados['editora'],
    $dados['anoPublicacao'],
    $dados['genero'],
    $dados['localizacao'],
    $dados['ISSN'],
    $dados['disponibilidade']
    );

    }

    return null;
}


static public function listar($filtro, $conn) {

    $filtro = $conn->real_escape_string($filtro);

    $SQL = "SELECT * FROM livros 
            WHERE titulo LIKE '%$filtro%'
               OR autor LIKE '%$filtro%'
               OR genero LIKE '%$filtro%'";

    $resultado = $conn->query($SQL);
    $retorno = [];

    while($dados = $resultado->fetch_array()){
        $retorno[] = new Livro(
    $dados['id'],
    $dados['titulo'],
    $dados['autor'],
    $dados['editora'],
    $dados['anoPublicacao'],
    $dados['genero'],
    $dados['localizacao'],
    $dados['ISSN'],
    $dados['disponibilidade']
    );
    }

    return $retorno;
}

    function montaLinhaDados()
    {
        return $this->id.self::SEPARADOR.
               $this->titulo.self::SEPARADOR.
               $this->autor.self::SEPARADOR.
               $this->editora.self::SEPARADOR.
               $this->anoPublicacao.self::SEPARADOR.
               $this->genero.self::SEPARADOR.
               $this->localizacao.self::SEPARADOR.
               $this->ISSN;
    }
}
?>