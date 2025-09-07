<?php

// This is just to better illustrate MVC design pattern, I know all we are doing is importing index.html
// but to better outline the proper flow and separation of concerns this is what I have done for the interview.

$indexFile = __DIR__ . '/../../public/angular/index.html';

if (file_exists($indexFile)) {
    $html = file_get_contents($indexFile);

    // Adjust <base href> so Angular looks for scripts and styles in the correct folder
    // Replace '/' with the actual path relative to the Apache root
    $html = str_replace('<base href="/">', '<base href="/greenecounty/public/angular/">', $html);

    echo $html;
} else {
    echo "<h1>Angular build not found. Run ng build --configuration production</h1>";
}
