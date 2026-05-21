<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../Backend/db.php';

try {
    $stmt = $db->prepare("SELECT id, title, summary, content, author, link, platform, image, created_at FROM news WHERE highlight = 1 ORDER BY created_at DESC LIMIT 5");
    $stmt->execute();
    $rows = $stmt->fetchAll();
    echo json_encode($rows);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
