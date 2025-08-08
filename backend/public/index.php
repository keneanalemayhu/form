<?php
// backend/public/index.php
require __DIR__ . '/../db.php';
require __DIR__ . '/../helpers.php';

cors();
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    json(['ok' => true]);
}

$path = strtok($_SERVER['REQUEST_URI'], '?');
$method = $_SERVER['REQUEST_METHOD'];
$pdo = db();

/* ---- CHURCHES ---- */
if ($path === '/api/churches') {
    if ($method === 'GET') {
        $rows = $pdo->query("SELECT * FROM churches ORDER BY church_name")->fetchAll();
        json($rows);
    }
    if ($method === 'POST') {
        $b = input();
        if (empty($b['church_name'])) bad('church_name required');
        $stmt = $pdo->prepare("INSERT INTO churches (church_name) VALUES (:n)");
        $stmt->execute([':n' => $b['church_name']]);
        json(['church_id' => (int)$pdo->lastInsertId()], 201);
    }
}

if (preg_match('#^/api/churches/(\d+)$#', $path, $m)) {
    $id = (int)$m[1];
    if ($method === 'PUT' || $method === 'PATCH') {
        $b = input();
        $stmt = $pdo->prepare("UPDATE churches SET church_name=COALESCE(:n, church_name) WHERE church_id=:id");
        $stmt->execute([':n' => $b['church_name'] ?? null, ':id' => $id]);
        json(['updated' => true]);
    }
    if ($method === 'DELETE') {
        $stmt = $pdo->prepare("DELETE FROM churches WHERE church_id=:id");
        $stmt->execute([':id' => $id]);
        json(['deleted' => (bool)$stmt->rowCount()]);
    }
}

/* ---- SPECIALTIES ---- */
if ($path === '/api/specialties') {
    if ($method === 'GET') {
        $rows = $pdo->query("SELECT * FROM media_specialties ORDER BY specialty_name")->fetchAll();
        json($rows);
    }
    if ($method === 'POST') {
        $b = input();
        if (empty($b['specialty_name'])) bad('specialty_name required');

        $stmt = $pdo->prepare("
      INSERT INTO media_specialties (specialty_name, description)
      VALUES (:n, :d)
      ON DUPLICATE KEY UPDATE description = VALUES(description)
    ");
        $stmt->execute([':n' => $b['specialty_name'], ':d' => $b['description'] ?? null]);

        $row = $pdo->prepare("SELECT * FROM media_specialties WHERE specialty_name = :n");
        $row->execute([':n' => $b['specialty_name']]);
        json($row->fetch(), 201);
    }
}

if (preg_match('#^/api/specialties/(\d+)$#', $path, $m)) {
    $id = (int)$m[1];
    if ($method === 'PUT' || $method === 'PATCH') {
        $b = input();
        $stmt = $pdo->prepare("UPDATE media_specialties SET 
      specialty_name=COALESCE(:n, specialty_name),
      description=COALESCE(:d, description)
      WHERE specialty_id=:id");
        $stmt->execute([':n' => $b['specialty_name'] ?? null, ':d' => $b['description'] ?? null, ':id' => $id]);
        json(['updated' => true]);
    }
    if ($method === 'DELETE') {
        $stmt = $pdo->prepare("DELETE FROM media_specialties WHERE specialty_id=:id");
        $stmt->execute([':id' => $id]);
        json(['deleted' => (bool)$stmt->rowCount()]);
    }
}

/* ---- PARTICIPANTS ---- */
if ($path === '/api/participants') {
    if ($method === 'GET') {
        $q = [];
        $sql = "SELECT p.*, c.church_name
            FROM participants p
            LEFT JOIN churches c ON c.church_id = p.church_id
            WHERE 1=1";
        if (!empty($_GET['church_id'])) {
            $sql .= " AND p.church_id = :cid";
            $q[':cid'] = (int)$_GET['church_id'];
        }
        if (!empty($_GET['q'])) {
            $sql .= " AND (p.name LIKE :kw OR p.email LIKE :kw)";
            $q[':kw'] = '%' . $_GET['q'] . '%';
        }
        $sql .= " ORDER BY p.created_at DESC";
        $page  = (int)($_GET['page']  ?? 1);
        $limit = (int)($_GET['limit'] ?? 50);
        json(paged($pdo, $sql, $q, $page, $limit));
    }

    if ($method === 'POST') {
        $b = input();
        if (empty($b['name'])) bad('name required');

        $stmt = $pdo->prepare("INSERT INTO participants
      (name, fathers_name, age, gender, phone_number, email, church_id)
      VALUES (:name,:fn,:age,:gender,:phone,:email,:church_id)");
        $stmt->execute([
            ':name'      => $b['name'],
            ':fn'        => $b['fathers_name'] ?? null,
            ':age'       => $b['age'] ?? null,
            ':gender'    => $b['gender'] ?? null,
            ':phone'     => $b['phone_number'] ?? null,
            ':email'     => $b['email'] ?? null,
            ':church_id' => $b['church_id'] ?? null,
        ]);

        $pid = (int)$pdo->lastInsertId();
        $full = $pdo->prepare("
      SELECT p.*, c.church_name
      FROM participants p
      LEFT JOIN churches c ON c.church_id = p.church_id
      WHERE p.participant_id = :id
    ");
        $full->execute([':id' => $pid]);
        json($full->fetch(), 201);
    }
}

if (preg_match('#^/api/participants/(\d+)$#', $path, $m)) {
    $pid = (int)$m[1];
    if ($method === 'GET') {
        $stmt = $pdo->prepare("SELECT * FROM participants WHERE participant_id=:id");
        $stmt->execute([':id' => $pid]);
        $p = $stmt->fetch();
        if (!$p) notFound();

        $skills = $pdo->prepare("SELECT s.specialty_id, s.specialty_name
      FROM participant_skills ps
      JOIN media_specialties s ON s.specialty_id=ps.specialty_id
      WHERE ps.participant_id=:id
      ORDER BY s.specialty_name");
        $skills->execute([':id' => $pid]);

        $td = $pdo->prepare("SELECT detail_id, current_skill_level, expectations_from_training
      FROM participant_training_details WHERE participant_id=:id");
        $td->execute([':id' => $pid]);

        $p['skills'] = $skills->fetchAll();
        $p['training'] = $td->fetch() ?: null;
        json($p);
    }
    if ($method === 'PUT' || $method === 'PATCH') {
        $b = input();
        $stmt = $pdo->prepare("UPDATE participants SET
      name=COALESCE(:name, name),
      fathers_name=COALESCE(:fn, fathers_name),
      age=COALESCE(:age, age),
      gender=COALESCE(:gender, gender),
      phone_number=COALESCE(:phone, phone_number),
      email=COALESCE(:email, email),
      church_id=COALESCE(:church_id, church_id)
      WHERE participant_id=:id");
        $stmt->execute([
            ':name' => $b['name'] ?? null,
            ':fn' => $b['fathers_name'] ?? null,
            ':age' => $b['age'] ?? null,
            ':gender' => $b['gender'] ?? null,
            ':phone' => $b['phone_number'] ?? null,
            ':email' => $b['email'] ?? null,
            ':church_id' => $b['church_id'] ?? null,
            ':id' => $pid
        ]);
        json(['updated' => true]);
    }
    if ($method === 'DELETE') {
        $stmt = $pdo->prepare("DELETE FROM participants WHERE participant_id=:id");
        $stmt->execute([':id' => $pid]);
        json(['deleted' => (bool)$stmt->rowCount()]);
    }
}

/* ---- PARTICIPANT SKILLS ---- */
if (preg_match('#^/api/participants/(\d+)/skills$#', $path, $m)) {
    $pid = (int)$m[1];

    if ($method === 'GET') {
        $stmt = $pdo->prepare("
      SELECT s.specialty_id, s.specialty_name
      FROM participant_skills ps
      JOIN media_specialties s ON s.specialty_id = ps.specialty_id
      WHERE ps.participant_id = :id
      ORDER BY s.specialty_name
    ");
        $stmt->execute([':id' => $pid]);
        json($stmt->fetchAll());
    }

    if ($method === 'POST') {
        $b = input();

        $resolveId = function (array $one) use ($pdo): int {
            if (!empty($one['specialty_id'])) {
                return (int)$one['specialty_id'];
            }
            if (!empty($one['specialty_name'])) {
                $q = $pdo->prepare("SELECT specialty_id FROM media_specialties WHERE specialty_name = :n");
                $q->execute([':n' => $one['specialty_name']]);
                $sid = (int)$q->fetchColumn();
                if (!$sid) bad("specialty_name '{$one['specialty_name']}' does not exist");
                return $sid;
            }
            bad('Provide specialty_id or specialty_name');
            return 0;
        };

        $skillsInput = [];
        if (!empty($b['skills']) && is_array($b['skills'])) {
            $skillsInput = $b['skills'];
        } else {
            $skillsInput = [$b];
        }

        $chkP = $pdo->prepare("SELECT 1 FROM participants WHERE participant_id = :id");
        $chkP->execute([':id' => $pid]);
        if (!$chkP->fetchColumn()) bad("participant_id $pid does not exist");

        $pdo->beginTransaction();
        try {
            $ins = $pdo->prepare("
        INSERT IGNORE INTO participant_skills (participant_id, specialty_id)
        VALUES (:pid, :sid)
      ");
            $chkS = $pdo->prepare("SELECT 1 FROM media_specialties WHERE specialty_id = :id");

            foreach ($skillsInput as $one) {
                $sid = $resolveId($one);

                $chkS->execute([':id' => $sid]);
                if (!$chkS->fetchColumn()) bad("specialty_id $sid does not exist");

                $ins->execute([':pid' => $pid, ':sid' => $sid]);
            }

            $pdo->commit();
        } catch (Throwable $e) {
            $pdo->rollBack();
            bad('Bulk insert failed: ' . $e->getMessage());
        }

        $list = $pdo->prepare("
      SELECT s.specialty_id, s.specialty_name
      FROM participant_skills ps
      JOIN media_specialties s ON s.specialty_id = ps.specialty_id
      WHERE ps.participant_id = :id
      ORDER BY s.specialty_name
    ");
        $list->execute([':id' => $pid]);
        json(['added' => true, 'skills' => $list->fetchAll()], 201);
    }

    if ($method === 'DELETE') {
        // DELETE /api/participants/:id/skills?specialty_id=#
        if (empty($_GET['specialty_id'])) bad('specialty_id required');
        $stmt = $pdo->prepare("
      DELETE FROM participant_skills
      WHERE participant_id = :pid AND specialty_id = :sid
    ");
        $stmt->execute([':pid' => $pid, ':sid' => (int)$_GET['specialty_id']]);
        json(['deleted' => (bool)$stmt->rowCount()]);
    }
}

/* ---- TRAINING DETAILS ---- */
if (preg_match('#^/api/participants/(\d+)/training$#', $path, $m)) {
    $pid = (int)$m[1];
    if ($method === 'GET') {
        $stmt = $pdo->prepare("SELECT detail_id, current_skill_level, expectations_from_training
      FROM participant_training_details WHERE participant_id=:id");
        $stmt->execute([':id' => $pid]);
        json($stmt->fetch() ?: []);
    }
    if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
        $b = input();
        $stmt = $pdo->prepare("INSERT INTO participant_training_details
      (participant_id, current_skill_level, expectations_from_training)
      VALUES (:id, :lvl, :exp)
      ON DUPLICATE KEY UPDATE
        current_skill_level=VALUES(current_skill_level),
        expectations_from_training=VALUES(expectations_from_training)");
        $stmt->execute([
            ':id' => $pid,
            ':lvl' => $b['current_skill_level'] ?? 'Beginner',
            ':exp' => $b['expectations_from_training'] ?? null,
        ]);
        json(['saved' => true], 201);
    }
}

if ($path === '/api/lookup' && $method === 'GET') {
    $churches = $pdo->query("SELECT church_id, church_name FROM churches ORDER BY church_name")->fetchAll();
    $specialties = $pdo->query("SELECT specialty_id, specialty_name FROM media_specialties ORDER BY specialty_name")->fetchAll();
    json(['churches' => $churches, 'specialties' => $specialties]);
}

notFound();
