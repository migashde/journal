<?php
defined('ROOT') or die('Access denied !!!');
class Loader{
	private static $instance;
	public $core=null;
	public $coding=true;
	public $debug=true;
	private $aConf=[];
	public function __construct(){
		self::$instance=&$this;
		$this->core=&$this;
		spl_autoload_register(['Loader','autoload']);
		require_once CONF.'config.php';
		$this->coding=(isset($CONF['coding'])&&$CONF['coding'])||(isset($_COOKIE['coder'])&&$_COOKIE['coder']=='Otgoo');
		$this->debug=isset($CONF['debug'])&&$CONF['debug'];
		set_time_limit($CONF['execution_time']);
		date_default_timezone_set($CONF['timezone']);
		switch($this->debug){
			case 'onlyerror':{ini_set('display_errors','on');error_reporting(E_ERROR);break;}
			case 'full':{ini_set('display_errors','on');error_reporting(E_ALL);break;}
			case 'no':{ini_set('display_errors','off');error_reporting(0);break;}
		}
		$this->aConf=$CONF;
		$this->load([
			'cs'	=> 'Cooksess',
			'str'	=> 'Strings',
			'req'	=> 'Request',
			'file'	=> 'File',
			'cch'	=> 'Cache',
			'db'	=> 'Database',
			'acc'	=> 'Account',
			'html'	=> 'Html'
		]);
	}
	public function conf($s){
		$a=$this->aConf;
		$b=explode('.',$s);
		while($b&&($k=array_shift($b))) $a=isset($a[$k])?$a[$k]:'';
		return $a;
	}
	public function launch(){
		header('Content-type: text/html; charset=utf-8');
		$f=$this->req->aUrl['first'];$inAdmin=false;
		if($f=='admin') $this->req->url('');
		elseif($f==ADMURL){$inAdmin=true;$this->html->page('admin');}
		else{
			if(!$f) $this->html->page('index');
			elseif($p1=$this->html->isExists(PAGE)) $this->html->page($p1);
			else $this->html->module('main>notfound');
		}
		$siteContent=ob_get_contents();
		while(@ob_end_clean());
		ob_start();
		require_once PAGE.'_tpl.php';
		if($this->coding) foreach($this->html->css() as $css){$oCss=new Css('@'.$css);$oCss->write();}
	}
	public function load($mClass,$sVar='',array $aParams=[]){
		if(is_array($mClass)){
			foreach($mClass as $k=>$m){
				if(!is_array($m)) $m=[$m];
				$this->load(array_shift($m),$k,$m);
			}
			return $this;
		}
		if(is_array($sVar)){$aParams=$sVar;$sVar='';}
		$cn=$sVar?:strtolower($mClass);
		$o=new ReflectionClass($mClass); 
		$this->{$cn}=$o->newInstanceArgs($aParams);
		return $this;
	}
	public static function autoload($s){$p=CLS.str_replace(['_','\\'],'/',$s).'.php';if(file_exists($p)) require_once $p;else die('"<b>'.$s.'</b>" class not found!!!');}
	public static function &get_instance(){return self::$instance;}
}
function &li($s,$a=null){
	$o=Loader::get_instance();
	if($a!==null){
		$r=new ReflectionMethod($o,$s);
		return $r->invokeArgs($o,$a);
	}
	else return $o->$s;
}
?>