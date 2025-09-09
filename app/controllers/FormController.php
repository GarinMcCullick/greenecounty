<?php
//example api response

class FormController {
    public function index() {
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'ok',
            'message' => 'FormController working',
        ]);
    }
}
