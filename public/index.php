<?php
// Front controller
$request = $_SERVER['REQUEST_URI'];

if ($request === '/greenecounty/public/form') {
    require __DIR__ . '/../app/controllers/FormController.php';
    $controller = new FormController();
    $controller->index();
} else {
    http_response_code(404);
    echo "Page not found.";
}
