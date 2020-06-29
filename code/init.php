<?php

// print_r($_SERVER);
$folder=str_replace('/index.php','',$_SERVER['PHP_SELF']);

$path=trim(substr($_SERVER['REQUEST_URI'],strlen($folder)),'/');
define('DS',DIRECTORY_SEPARATOR);
define('ROOT',dirname(__FILE__).DS);

if($_SERVER['QUERY_STRING'] != '') {
	$path = str_replace('?'.$_SERVER['QUERY_STRING'],'',$path);
}

if ($path == '') {
	$path = 'posts';
}
$myPath=ROOT.'page'.DS.$path.'.php';

ob_start();
$aCss=$aJs=[];

require_once "config.php";
session_start();

global $loggedin;
if(!isset($_SESSION['login']) || empty($_SESSION['login'])){
  $loggedin = false;
} else {
  $loggedin = true;
}

if(file_exists($myPath)){
	require_once $myPath;
}
else{
	require_once ROOT.'page'.DS.'notfound.php';
}
$siteContent=ob_get_clean();
require ROOT.'_tpl.php';

?>