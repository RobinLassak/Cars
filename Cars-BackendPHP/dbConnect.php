<?php 
class DbConnect {
    private $server;
    private $dbname;
    private $user;
    private $pass;
    private $options = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false
    );

    public function __construct() {
        // Načtení přihlašovacích údajů z login.php
        $loginData = include('./login.php');
        $this->server = $loginData['server'];
        $this->dbname = $loginData['dbname'];
        $this->user = $loginData['user'];
        $this->pass = $loginData['pass'];
    }

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' .$this->dbname . ';charset=utf8', $this->user, $this->pass, $this->options);
            return $conn;
        } catch(PDOException $e) {
            echo "Database error " . $e->getMessage();
        }

    }
}


?>