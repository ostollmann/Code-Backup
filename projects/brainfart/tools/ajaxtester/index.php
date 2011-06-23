<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ajaxtester</title>
<script src="jquery-1.4.4.js" type="text/javascript"></script>

<script>
	$(document).ready(
		function(){
			$('.body').load('body.php');
		}
	);
</script>

</head>
<body>
	<div class="body">
		Hello This is the page body!
	</div>
</body>