<?php
header('Content-Type: application/json');
require_once 'C:/xampp/htdocs/Paroquia/Backend/db.php';// Corrigido o caminho
session_start();

$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

if ($username === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Usuário e senha são obrigatórios.']);
    exit;
}

try {
    // Aqui usamos $pdo em vez de $db
    $stmt = $pdo->prepare("SELECT id, username, password, role FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Se você não estiver usando password_hash(), desative temporariamente o verify:
        if (password_verify($password, $user['password']) || $password === $user['password']) {
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            echo json_encode(['success' => true, 'message' => 'Login bem-sucedido.']);
        } else {
            http_response_code(401);
            echo json_encode(['success' => false, 'error' => 'Usuário ou senha inválidos.']);
        }
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Usuário ou senha inválidos.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
