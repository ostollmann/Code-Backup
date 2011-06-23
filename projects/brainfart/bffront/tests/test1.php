<?php
define("SYSPATH", "");
require_once(dirname(__FILE__) . '/simpletest/autorun.php');

require_once('../application/classes/controller/test.php');
require_once('../application/bootstrap.php');

//foreach (glob("classes/*.php") as $filename)
//{
//    require_once $filename;
//}

class Test1 extends UnitTestCase {
	function test() {
		echo("test");
	}

}

echo("test");
?>
