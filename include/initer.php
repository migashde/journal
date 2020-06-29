<?php
define('ADMURL','adminpanel');
ob_start();
define('DS',DIRECTORY_SEPARATOR);
define('ROOT',dirname(__FILE__).DS);
define('CLS',ROOT.'class'.DS);
define('PAGE',ROOT.'page'.DS);
define('CDIR',ROOT.'cache'.DS);
define('PGCCH',CDIR.'page'.DS);
define('MODS',ROOT.'module'.DS);
define('CONF',ROOT.'conf'.DS);
define('STATDIR',dirname(ROOT).DS.'sdata'.DS);
define('CSS',STATDIR.'css'.DS);
define('CSDIR',dirname(ROOT).DS.'cs'.DS);
define('FONT',STATDIR.'font'.DS);
define('FILES',STATDIR.'file'.DS);
define('CAND',FILES.'c'.DS);
define('EVNT',FILES.'e'.DS);
define('NEWS',FILES.'n'.DS);
define('AVTR',FILES.'u'.DS);
define('CFILE',FILES.'f'.DS);

require_once CLS.'Loader.php';
$oObj=new Loader();
$oObj->launch();
?>