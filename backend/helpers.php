<?php
// backend/helpers.php
function cors() {
  $env = parse_ini_file(__DIR__ . '/.env');
  $allowed = array_map('trim', explode(',', $env['CORS_ALLOW_ORIGINS'] ?? '*'));
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
  $allow = in_array('*', $allowed) || in_array($origin, $allowed) ? $origin : $allowed[0] ?? '*';

  header("Access-Control-Allow-Origin: $allow");
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
  header('Access-Control-Allow-Credentials: true');
}

function json($data, int $status = 200) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data);
  exit;
}

function input(): array {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

function notFound() { json(['error' => 'Not found'], 404); }
function bad($msg='Bad request'){ json(['error'=>$msg],400); }

/** Basic pagination helper */
function paged(PDO $pdo, string $sql, array $params = [], int $page = 1, int $limit = 50) {
  $offset = max(0, ($page - 1) * $limit);
  $stmt = $pdo->prepare($sql . " LIMIT :limit OFFSET :offset");
  foreach ($params as $k => $v) {
    $stmt->bindValue(is_int($k)? $k+1 : $k, $v);
  }
  $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
  $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll();
}
