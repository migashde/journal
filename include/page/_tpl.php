<?$aTit=$this->html->tit();$sBase=$this->req->url('base');
$aTit[]='Зөв Хүн Электорат эвслийн албан ёсны сайт';
$sep=' - ';
$edited=6;
$f=$this->req->url('first');
$inAdmin=ADMURL==$f;
?><!DOCTYPE html><html lang="en-US"><head><meta charset="utf-8"/>
    <base href="<?=$sBase?>" />
    <title><?=join($sep,$aTit)?></title>
	<meta name="description" content="<?=$this->conf('description').($this->html->G['desc']?' '.$this->html->G['desc']:'')?>" />
    <meta name="keywords" content="<?=$this->conf('keywords').($this->html->G['keys']?', '.$this->html->G['keys']:'')?>" />
<?
	if($this->html->G['meta']) echo str_replace("\n","\n\t",$this->html->G['meta'])?>
	<link href="img/favicon.png" rel="shortcut icon" type="image/png" />
	<meta name="viewport" content="width=device-width<?=$this->html->G['scalable']||isset($_SESSION['fullsite'])?'':',initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'?>" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto+Mono:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
<?
$target=$inAdmin?'admin':'main';
array_unshift($this->html->A['css'],'style');
array_unshift($this->html->A['css'],'tools/swiper');
array_unshift($this->html->A['css'],$target);
array_unshift($this->html->A['js'],$target);
$suf=$this->coding?'?'.rand(1,999):($edited?'?'.$edited:'');
$this->html->css('mobile');
foreach($this->html->css() as $css):?>
	<link rel="stylesheet" type="text/css" href="<?=strpos($css,'://')?$css:$css.'.cs'.$suf?>" />
<?endforeach;
if($this->html->G['css']) echo "\t<style type=\"text/css\">".$this->html->G['css']."</style>\n";
?>
	<script type="text/javascript" src="jquery.j<?=$suf?>"></script>
	<script type="text/javascript" src="tools/swiper.j<?=$suf?>"></script>
</head>
<body>
	<?
	echo $this->html->G['pre'];
	if(!$this->html->G['noTpl']&&!$this->html->G['noHead']) $this->html->module($target.'>header');
	$siteContent=$this->html->msg().$siteContent;
	if($this->html->G['noTpl']) echo $siteContent;
	else echo '<div class="'.$target.'-body">'.$siteContent.'</div>';
	if(!$this->html->G['noTpl']&&!$this->html->G['noFoot']) $this->html->module($target.'>footer');
	echo $this->html->G['suf'];
	foreach($this->html->js() as $js):?><script type="text/javascript" src="<?=strpos($js,'://')?$js:$js.'.j'.$suf?>"></script><?endforeach;
	if($this->html->G['js']) echo '<script type="text/javascript">'.$this->html->G['js'].'</script>';
?>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-79508217-1"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','UA-79508217-1')</script>
</body></html>