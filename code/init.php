<?php
$folder=str_replace('/index.php','',$_SERVER['PHP_SELF']);

$path=trim(substr($_SERVER['REQUEST_URI'],strlen($folder)),'/');
define('DS',DIRECTORY_SEPARATOR);
define('ROOT',dirname(__FILE__).DS);

ob_start();
$aCss=$aJs=[];
$myPath=ROOT.'page'.DS.$path.'.php';
if(file_exists($myPath)){
	require_once $myPath;
}
else{
	require_once ROOT.'page'.DS.'notfound.php';
}
$siteContent=ob_get_clean();
require ROOT.'_tpl.php';

?>