<?php
$request = $_SERVER['REQUEST_URI'];

//mock API Endpoint this would hit FormController()
if (preg_match('#api/form#', $request)) {
    require __DIR__ . '/../app/controllers/FormController.php';
    $controller = new FormController();
    $controller->index();
    exit;
}

// Serve Angular app for all other routes this way we only do api endpoint routing in php and angular will do routing for pages / app navigation since its a SPA
$indexFile = __DIR__ . '/angular/index.html';
if (file_exists($indexFile)) {
    echo file_get_contents($indexFile);
} else {
    http_response_code(500);
    echo "<h1>Angular build not found. Run npm run build</h1>";
}
