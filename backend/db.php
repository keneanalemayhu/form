<?php
// backend/db.php
function db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;

  $env = parse_ini_file(__DIR__ . '/.env');
  $dsn = sprintf(
    'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
    $env['DB_HOST'] ?? '127.0.0.1',
    $env['DB_PORT'] ?? '3306',
    $env['DB_NAME'] ?? 'media_team'
  );
  $user = $env['DB_USER'] ?? 'root';
  $pass = $env['DB_PASS'] ?? '';

  $pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
  return $pdo;
}
