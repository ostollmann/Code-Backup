<?php

$URI = array();
$URI['base'] = array();
$URI['params'] = array();

$URI['base'] = substr($_SERVER['REQUEST_URI'], 1);
if(strpos($URI['base'], "?") !== FALSE) {
	list($URI['base'], $URI['params']) = explode("?", $URI['base']);

	if(strpos($URI['params'], "&") !== FALSE) {
		$t = explode("&", $URI['params']);
		$URI['params'] = array();

		foreach($t as $key_value_pair) 
			array_push($URI['params'], explode("=", $key_value_pair));
	}
}

$URI['base'] = explode("/", $URI['base']);


/*
 * Include file according to first URI base parameter
 *
 */

if(file_exists('modules/'.$URI['base'][0].'.php'))
	require_once('modules/'.$URI['base'][0].'.php');
else
	require_once('modules/errors/resource_not_found.php');


function __() { echo("\n"); }
function __s($str) { return "<strong>".$str."</strong>"; }

?>