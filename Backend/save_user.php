<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../Backend/db.php';

$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');
$id = isset($_POST['id']) && $_POST['id'] !== '' ? intval($_POST['id']) : null;

if ($username === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Nome de usuário e senha são obrigatórios.']);
    exit;
}

try {
    if ($id) {
        // atualizar (se senha for enviada, atualiza; se não, mantém)
        $stmt = $db->prepare("SELECT password FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $existing = $stmt->fetch();

        if (!$existing) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Usuário não encontrado.']);
            exit;
        }

        $fields = "username = ?";
        $params = [$username];

        if ($password !== '') {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $fields .= ", password = ?";
            $params[] = $hash;
        }

        $params[] = $id;
        $sql = "UPDATE users SET $fields WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        echo json_encode(['success' => true, 'message' => 'Usuário atualizado com sucesso.']);
    } else {
        // criar
        // verifica duplicado
        $stmt = $db->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['success' => false, 'error' => 'Nome de usuário já existe.']);
            exit;
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->execute([$username, $hash]);

        echo json_encode(['success' => true, 'message' => 'Usuário criado com sucesso.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
