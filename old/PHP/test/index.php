<?php 

	if($_POST['number'] == 42)
	{
		echo "Richtige Zahl!";	
	}
	else
	{
		$i = 0;
		 while($i != 1000*10000000000)
		 {
		 	$i++;
		 	echo $i."<br />";
		 }
	}



?>