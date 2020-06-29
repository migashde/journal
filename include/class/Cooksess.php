<?php
defined('ROOT') or die('Access denied !!!');
class Cooksess{
	public static $expire=86400;
	private $aConf=array();
	private $cookieArraySep='[|]';
	function __construct(){
		session_start();
		$this->aConf=$this->conf('cookie');
		session_set_cookie_params(self::$expire,$this->aConf['path'],$this->aConf['domain']);
	}
	public function cookie($mName,$val=null,$expire=null){
		if($val===null) $expire=-1;
		elseif($expire===null) $expire=self::$expire;
		elseif(is_string($expire)) $expire=$this->s2i($expire);
		if(is_array($val)) $val=join($this->cookieArraySep,$val);
		setcookie($mName,$val,time()+$expire,$this->aConf['path'],$this->aConf['domain']);
		return $this;
	}
	public function ckArray($sName){return explode($this->cookieArraySep,$this->get($sName));}
	public function is($sName){if(isset($_COOKIE[$sName])) return 1;if(isset($_SESSION[$sName])) return 2;return 0;}
	public function get($sName,$bCookie=true){
		$b=$this->is($sName);$r='';
		if($b==1&&$bCookie){
			$r=$_COOKIE[$sName];
			if(strpos($r,$this->cookieArraySep)) $r=explode($this->cookieArraySep,$r);
		}
		elseif($b==2) $r=$_SESSION[$sName];
		return $r;
	}
	public function set($mName,$mVal){
		if(is_array($mName)) eval('$_SESSION[\''.join('\'][\'',$mName).'\']=$mVal;');
		else $_SESSION[$mName]=$mVal;
		return $this;
	}
	public function rm($mName){
		if(is_array($mName)) eval('unset($_SESSION[\''.join('\'][\'',$mName).'\']);');
		else unset($_SESSION[$mName]);
		return $this;
	}
	public function s2i($s){
		$k=substr($s,-1);
		$n=floatval(substr($s,0,strlen($s)-1));
		if(!$n) $n=1;
		return $n*($k=='i'?60:($k=='h'?3600:($k=='d'?86400:($k=='m'?2592000:($k=='y'?31536000:1)))));
	}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}
?>