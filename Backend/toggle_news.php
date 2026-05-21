<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../Backend/db.php';

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
if (!$id) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID da notícia não informado.']);
    exit;
}

try {
    // pega estado atual
    $stmt = $db->prepare("SELECT highlight FROM news WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Notícia não encontrada.']);
        exit;
    }
    $novo = $row['highlight'] ? 0 : 1;
    $stmt = $db->prepare("UPDATE news SET highlight = ? WHERE id = ?");
    $stmt->execute([$novo, $id]);

    echo json_encode(['success' => true, 'highlight' => $novo]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
