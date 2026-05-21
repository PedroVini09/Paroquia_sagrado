<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../Backend/db.php';

try {
    $stmt = $db->query("SELECT id, username, created_at FROM users ORDER BY id DESC");
    $users = $stmt->fetchAll();
    echo json_encode($users);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
