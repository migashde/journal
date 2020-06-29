<?php
defined('ROOT') or die('Access denied !!!');
class Request{
	public $aUrl=[];
	public $sUrlSep='.';
	public function __construct(){
		$isSecure=isset($_SERVER['HTTPS'])&&(strtolower($_SERVER['HTTPS'])=='on'||$_SERVER['HTTPS']==1);
		if(!$isSecure) $isSecure=isset($_SERVER['HTTP_X_FORWARDED_PROTO'])&&$_SERVER['HTTP_X_FORWARDED_PROTO']=='https';
		$this->aUrl['protocol']='http'.($isSecure?'s':'').'://';
		$this->aUrl['host']=$_SERVER['HTTP_HOST'];
		$a=explode('.',$this->aUrl['host']);
		$iDomains=count($a);
		$this->aUrl['domain']=join('.',array_slice($a,-2));
		$this->aUrl['subdomain']='';
		if($iDomains==2) $this->aUrl['host']='www.'.$this->aUrl['host'];
		elseif($iDomains>2){
			if($a[0]=='www'){array_shift($a);$iDomains--;}
			$this->aUrl['subdomain']=join('.',array_slice($a,0,$iDomains-2));
		}
		$this->aUrl['folder']=str_replace('/index.php','',$_SERVER['SCRIPT_NAME']);
		$this->aUrl['base']=trim($this->aUrl['protocol'].$this->aUrl['host'].$this->aUrl['folder'],'/ ').'/';
		$sUrl=substr($_SERVER['REQUEST_URI'],strlen($this->aUrl['folder']));
		$a=[];
		if(strpos($sUrl,'?')!==false){
			list($sUrl,$get)=explode('?',$sUrl,2);
			if($get){
				$m=explode('&',$get);
				foreach($m as $s){
					list($key,$val)=explode('=',$s,2);
					if(!$val) $a[]=$key;
					else $a[$key]=$val;
				}
			}
		}
		$aParts=explode('/',trim($sUrl,'/ '));
		$this->aUrl['curr']=ltrim($sUrl,'/').(isset($get)&&$get?'?'.$get:'');
		$this->aUrl['full']=$this->aUrl['base'].$this->aUrl['curr'];
		$aDirs=[];
		$b=[];
		foreach($aParts as $part){
			$pos=strpos($part,$this->sUrlSep);
			if($pos!==false&&$pos>0){
				list($p,$v)=explode($this->sUrlSep,$part,2);
				$b[$p]=$v;
			}
			else $aDirs[]=$part;
		}
		$this->aUrl['dirs']=$aDirs;
		$this->aUrl['path']=join('/',$aDirs);
		$this->aUrl['last']=$aDirs?$aDirs[count($aDirs)-1]:'';
		$this->aUrl['first']=array_shift($aDirs);
		unset($aDirs,$aParts);
		foreach($b as $k=>$v) $a[$k]=$v;
		$this->aUrl['args']=$this->_trim($a);
		$this->aUrl['params']=$this->aUrl['args'];
		foreach($_POST as $k=>$v) $this->aUrl['params'][$k]=$v;
		$this->aUrl['params']=$this->_trim($this->aUrl['params']);
		$a=isset($_POST['do'])&&is_array($_POST['do'])?array_keys($_POST['do']):[];
		$this->aUrl['action']=$a?$a[0]:'no';
	}
	public function subdoch($s){$this->url($this->base($s));}
	public function _trim($m){if(is_array($m)) return array_map(['Request','_trim'],$m);if(get_magic_quotes_gpc()) $m=stripslashes($m);return trim($m);}
	public function url($m=null,$b=false){
		if(is_string($m)&&array_key_exists($m,$this->aUrl)) return $this->aUrl[$m];
		if(is_numeric($m)) return isset($this->aUrl['dirs'][$m])?$this->aUrl['dirs'][$m]:'';
		if($m===true||(is_string($m)&&strpos($m,'://'))){while(@ob_end_clean());list($sHttp,$url)=explode('://',$m===true?$this->url('full'):$m);while(strpos($url,'//')) $url=str_replace('//','/',$url);header('Location:'.$sHttp.'://'.$url);die();}
		elseif(is_string($m)||$m===''){
			if($b!==null){$this->url([$m],true);return;}
			else return $this->url([$m],false);
		}
		$a=$this->url('args');
		if(isset($m[0])){
			if(!in_array('keep',$m)||in_array('clr',$m)) $a=[];
			if($m[0]=='clr'||$m[0]=='keep'||$m[0]=='full'){
				$m[1]=$m[0];unset($m[0]);
			}
		}
		if(isset($m['-'])){$c=is_array($m['-'])?$m['-']:explode('.',str_replace(',','.',$m['-']));foreach($c as $k) if(isset($a[$k])) unset($a[$k]);}
		$hash='';
		if(isset($m['#'])&&$m['#']){$hash=$m['#'];unset($m['#']);}
		if(isset($m['+'])&&$m['+']) $a=array_merge($a,$m['+']);
		$s=isset($m[0])?$m[0]:join('/',$this->url('dirs'));
		if(substr($s,0,1)=='@'){$s=ltrim($s,'@');$s=ADMURL.($s?'/'.$s:'');}
		$s=trim($s,'/ ');
		$bs=$this->url('base');
		$pre=in_array('full',$m)?$bs:'';
		$u=$g='';
		if($a){
			$c=[];
			foreach($a as $k=>$v) if($v!==''&&$k) $c[]=(is_numeric($k)?$v:$k.$this->sUrlSep.(is_array($v)?join(',',$v):$v));
			$g=join('/',$c);
		}
		$u.=$s.($g?'/'.$g:'').($hash?'#'.$hash:'');
		if($b){while(@ob_end_clean());header('Location:'.$bs.$u);die();}
		return $pre.$u;
	}
	public function get($s,$t=null,$d=null){
		$a=$this->url('params');$b=['int','bool','str','array','float','obj'];
		if($t!==null&&!in_array($t,$b)){$tmp=$d;$d=$t;$t=$tmp;}
		$r=isset($a[$s])?$a[$s]:$d;
		if(is_string($t)&&in_array($t,$b)){switch($t){
			case 'int':$r=(int)$r;break;
			case 'bool':$r=(bool)$r;break;
			case 'str':$r=(string)$r;break;
			case 'array':$r=is_array($r)?$r:($r!==null?explode(',',$r):[]);break;
			case 'float':$r=(float)$r;break;
			case 'obj':$r=(object)$r;break;
		}}
		return $r;
	}
	public function base($s){return $this->aUrl['protocol'].$s.'.'.$this->aUrl['domain'].'/'.($this->aUrl['folder']?$this->aUrl['folder'].'/':'');}
	public function ip(){
		if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) $a=explode(',',$_SERVER['HTTP_X_FORWARDED_FOR']);
		elseif(isset($_SERVER['HTTP_X_REAL_IP'])) $a=explode(',',$_SERVER['HTTP_X_REAL_IP']);
		elseif(isset($_SERVER['REMOTE_ADDR'])) $a=[$_SERVER['REMOTE_ADDR']];
		return trim(array_shift($a));
	}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}
?>