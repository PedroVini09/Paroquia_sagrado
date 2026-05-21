<?php
require '/../Backend/db.php';

$title = $_POST['title'] ?? '';
$content = $_POST['content'] ?? '';
$author = $_POST['author'] ?? '';
$highlight = isset($_POST['highlight']) ? 1 : 0;

if (empty($title) || empty($content)) {
    http_response_code(400);
    echo "Título e conteúdo são obrigatórios.";
    exit;
}

if (isset($_POST['id']) && !empty($_POST['id'])) {
    // Atualizar notícia existente
    $stmt = $db->prepare("UPDATE news SET title = ?, content = ?, author = ?, highlight = ? WHERE id = ?");
    $stmt->execute([$title, $content, $author, $highlight, $_POST['id']]);
    echo "Notícia atualizada com sucesso.";
} else {
    // Criar nova notícia
    $stmt = $db->prepare("INSERT INTO news (title, content, author, highlight) VALUES (?, ?, ?, ?)");
    $stmt->execute([$title, $content, $author, $highlight]);
    echo "Notícia criada com sucesso.";
}
?>
