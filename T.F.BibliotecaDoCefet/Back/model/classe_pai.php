<?php
abstract class ClassePai {
    public $id;

    public function __construct($id) {
        $this->id = $id;
    }

    abstract function montaLinhaDados();
    abstract function toEntity($dados);
}
?>