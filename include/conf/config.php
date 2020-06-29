<?php
$a=explode(':',$_SERVER['HTTP_HOST']);
$a=explode('.',array_shift($a));
if(count($a)==1) $s=array_pop($a);
else{
	$a=array_slice($a,-3);
	if(count($a)==2) array_unshift($a,'');
	else $a[0]='';
	$s=join('.',$a);
}
define('DOMAIN',$s);
$CONF=[
	'execution_time'	=> 50,						// in second
	'timezone'			=> 'Asia/Ulaanbaatar',
	'coding'			=> true,					// false | true
	'debug'				=> 'no',				// no | full | onlyerror
	'cookie'			=> [
		'path'				=> '/',
		'domain'			=> DOMAIN
	],
	'database'			=> [
		'charset'		=> 'utf8mb4',
		'collation'		=> 'utf8mb4_general_ci',
		'prefix'		=> 'elect_',
		'suffix'		=> '',
		'conf'			=> [
			'curr'			=> 'local',
			'local'			=> [
				'host'			=> 'localhost',
				'port'			=> 3306,
				'base'			=> 'electorat',
				'user'			=> 'root',
				'pass'			=> ''
			],
			'remote'		=> [
				'host'			=> 'localhost',
				'port'			=> 3306,
				'base'			=> 'zuvhuts3_electorat',
				'user'			=> 'zuvhuts3_root',
				'pass'			=> 'lHo[*;9HsQ&?o_#{]E'
			]
		]
	]
];
?>
