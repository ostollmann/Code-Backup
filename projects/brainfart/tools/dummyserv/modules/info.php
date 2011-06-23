<?php

echo("<pre>");
echo("<hr />");
echo "URI: ";__();
var_dump($URI['base']);
echo "Params: ";__();
var_dump($URI['params']);

$request['method'] = $_SERVER['REQUEST_METHOD'];



echo(__s("REQUEST_URI: ").$_SERVER['REQUEST_URI']);__();

echo(__s("REQUEST_METHOD: ").$_SERVER['REQUEST_METHOD']);__();
__();

echo(__s("GET:"));__();
var_dump($_GET);
__();

echo(__s("POST:"));__();
var_dump($_POST);
__();

echo(__s("FILES:"));__();
var_dump($_FILES);
__();

echo(__s("HEADERS:"));__();
var_dump(getallheaders());
__();

echo("<hr />");
echo("</pre>");

?>