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

ob_start();
$aCss=$aJs=[];
$tpl = '';

require_once "config.php";
session_start();

if(substr($path,0,5) === 'admin') {
	if(!isset($_SESSION['login']) || empty($_SESSION['login']) || $_SESSION['type'] != 'admin'){
		$path = 'login';
    } else {
    	$tpl = 'admin';
    	if($path === 'admin'){
    		$path = 'admin/index';
    	}
    }
}

global $loggedin;
if(!isset($_SESSION['login']) || empty($_SESSION['login'])){
  $loggedin = false;
} else {
  $loggedin = true;
}

$myPath=ROOT.'page'.DS.$path.'.php';

if(file_exists($myPath)){
	require_once $myPath;
}
else{
	require_once ROOT.'page'.DS.'notfound.php';
}
$siteContent=ob_get_clean();
require ROOT.'_tpl'.$tpl.'.php';

?>