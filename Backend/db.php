<?php
// Conexão com MySQL via PDO
$host = 'localhost';
$dbname = 'mysql:host=localhost;dbname=db_sagrado;port=3306'; // altere para o nome do seu banco
$username = 'root';    // altere conforme seu MySQL
$password = '123456';


try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro na conexão com o banco: ' . $e->getMessage()]);
    exit;
}

