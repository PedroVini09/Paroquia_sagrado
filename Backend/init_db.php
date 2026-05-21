<?php
// Conexão com MySQL via PDO
$host = 'localhost';
$dbname = 'mysql:host=localhost;dbname=db_sagrado;port=3306'; // altere para o nome do seu banco
$username = 'root';    // altere conforme seu MySQL
$password = '123456';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "✅ Conectado ao MySQL com sucesso!<br>";

    // Criação das tabelas (ajustado do SQLite → MySQL)
    $queries = [

        // Tabela de usuários
        "CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

        // Tabela de notícias
        "CREATE TABLE IF NOT EXISTS news (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            highlight BOOLEAN DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    ];

    foreach ($queries as $sql) {
        $db->exec($sql);
    }

    echo "✅ Tabelas criadas (ou já existentes) com sucesso!";

} catch (PDOException $e) {
    die("❌ Erro ao conectar ou criar tabelas: " . $e->getMessage());
}
?>
