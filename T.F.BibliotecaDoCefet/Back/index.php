<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 86400");

  require_once __DIR__ . "/controller/GenericController.php";
  require_once __DIR__ . "/controller/LivroController.php";
  require_once __DIR__ . "/controller/UsuarioController.php";
  $metodo = $_SERVER['REQUEST_METHOD'];
  $modulo = @$_GET['modulo'];
  $controller = null;
  $mysqli = new mysqli("localhost", "root", "", "biblioteca");
  // localhost/index.php?modulo=livro
  switch($modulo) {
    case "usuario":
        $controller = new UsuarioController($mysqli);
        break;
    case "livro":
        $controller = new LivroController($mysqli);
        break;
    default: 
        return json_encode("{erro: true, mensagem: 'Módulo Inválido'}");
  }
    if ($modulo === "usuario" && ($_GET['acao'] ?? "") === "login") {
        $email = $_POST['email'] ?? null;
        $senha = $_POST['senha'] ?? null;

        $dadosRecebidos = (object)[
            "email" => $email,
            "senha" => $senha
        ];
    } else {
        $dadosRecebidos = json_decode(file_get_contents("php://input", true));
    }
  switch($metodo) {
    case "POST":
    $acao = $_GET['acao'] ?? "";

    switch($acao){
        case "cadastrar":
            $resposta = $controller->cadastrar($dadosRecebidos);
            echo json_encode($resposta); // retorna JSON
            exit;
        case "listar":
            $filtro = $dadosRecebidos->filtro ?? "";
            echo json_encode($controller->listar((object)["filtro" => $filtro]));
            exit;
        case "alterar":
            echo json_encode($controller->alterar($dadosRecebidos));
            exit;
        case "remover":
            echo json_encode($controller->remover($dadosRecebidos));
            exit;
        case "retirada":
            $resposta = $controller->registrarRetirada($dadosRecebidos);
            echo json_encode($resposta);
            exit;
        case "login":
            echo json_encode($controller->login($dadosRecebidos));
            exit;
        default:
            echo json_encode(["erro"=>true, "mensagem"=>"Ação inválida"]);
            exit;
    }
    case "GET":
        //Para passar o filtro para o método get é preciso passar pela URL. EX: http://localhost/front/index.php?modulo=livro&filtro=Harry Porter
        $filtro = "";
        if(isset($_GET) && $_GET["filtro"]) {
            $filtro = $_GET["filtro"];
        }
        echo json_encode($controller->listar($filtro));
        exit;
    case "PUT":
        $acao = $_GET['acao'] ?? "";
        if($acao == "retirada") {
            echo json_encode($controller->registrarRetirada($dadosRecebidos));
        } else {
            echo json_encode($controller->alterar($dadosRecebidos));
        }
        exit;
    case "DELETE":
        $controller->remover($dadosRecebidos);
        echo json_encode(["erro"=>false, "mensagem"=> "Removido com sucesso!"]);
        exit;
  }

