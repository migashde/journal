<!doctype html>
<html>
	<head>
		<base href="<?=$folder?>/" />
		<meta charset="utf8" />
		<title>Test</title>
		<link type="text/css" rel="stylesheet" href="data/css/my.css" />
		<script type="text/javascript" src="data/js/my.js"></script>
		<?php
		if($aCss){
			foreach($aCss as $css) echo '<link type="text/css" rel="stylesheet" href="data/css/'.$css.'.css" />
		';
		}
		if($aJs){
			foreach($aJs as $js) echo '<script type="text/javascript" src="data/js/'.$js.'.js"></script>
		';
		}
		?>
	</head>
	<body>
		<?=$siteContent?>
	</body>
</html>