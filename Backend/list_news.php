<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../Backend/db.php';

$title = trim($_POST['title'] ?? '');
$summary = trim($_POST['summary'] ?? '');
$content = trim($_POST['content'] ?? '');
$link = trim($_POST['link'] ?? '');
$platform = trim($_POST['platform'] ?? '');
$image = trim($_POST['image'] ?? '');
$highlight = isset($_POST['highlight']) && ($_POST['highlight'] === '1' || $_POST['highlight'] === 'true' || $_POST['highlight'] == 1) ? 1 : 0;
$id = isset($_POST['id']) && $_POST['id'] !== '' ? intval($_POST['id']) : null;

if ($title === '' || $content === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Título e conteúdo são obrigatórios.']);
    exit;
}

try {
    if ($id) {
        $stmt = $db->prepare("UPDATE news SET title = ?, summary = ?, content = ?, link = ?, platform = ?, image = ?, highlight = ? WHERE id = ?");
        $stmt->execute([$title, $summary, $content, $link, $platform, $image, $highlight, $id]);
        echo json_encode(['success' => true, 'message' => 'Notícia atualizada com sucesso.']);
    } else {
        $stmt = $db->prepare("INSERT INTO news (title, summary, content, author, link, platform, image, highlight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        // author opcional — se houver sessão, pode preencher; aqui deixamos vazio ou nulo
        $author = $_SESSION['username'] ?? null;
        $stmt->execute([$title, $summary, $content, $author, $link, $platform, $image, $highlight]);
        echo json_encode(['success' => true, 'message' => 'Notícia criada com sucesso.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
