<?php
$request = $_SERVER['REQUEST_URI'];

if (preg_match('#^/greenecounty/public/api/form#', $request)) {
    require __DIR__ . '/../app/controllers/FormController.php';
    $controller = new FormController();
    $controller->index();
    exit;
}

$indexFile = __DIR__ . '/angular/index.html';
if (file_exists($indexFile)) {
    echo file_get_contents($indexFile);
} else {
    http_response_code(500);
    echo "<h1>Angular build not found. Run npm run build</h1>";
}
