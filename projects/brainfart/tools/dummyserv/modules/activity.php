<?php

if(!ctype_digit($URI['base'][1]))
	error("Invalid activity ID: ".$URI['base'][1]."!");
else
	echo activity($URI['base'][1]);
	
function activity($id) {
	$activity = array(
		"id" => $id,
		"name" => "Brainfart.com Launch Party",
		"address" => "Zinistr. 7, 8004 Zurich, Switzerland",
		"type" => "43",
		"certified" => "1",
		"owner" => "o1iver",
		"ownerID" => "39489",
		"description" => "After six months of development and three months of beta testing we are now launching brainfart.com. Wanting to start with a bang we have organized a big party where some lucky person will be chosen to press the Go-Live-Button and start our great endeavour.\n\nThe party is open to anyone!\n\nBring your friends!",
		"activitydatetime" => "201106012000-201106020400",
		"creationdatetime" => "201105121732",
		"lasteditdatetime" => "null",
		);
		
	return json_encode($activity);
}


function error($msg) {
	echo "ERROR: " . $msg;
}


?>