<?php
defined('ROOT') or die('Access denied !!!');
define('NCDIR',CDIR.'normal'.DS);
define('PCDIR',CDIR.'private'.DS);
class Cache extends File{
	private $sPath					= '';
	private $aParams				= [];
	private $isPrivate				= false;
	private $isPlain				= false;
	private $sExt					= '';
	private $mData					= null;
	private $shortArrayVal			= 20;
	private $forceBeautify			= false;
	public function set(){
		if(!function_exists('func_get_args')){trigger_error('<b>func_get_args</b> function not defined',E_USER_ERROR);return;}
		$a=func_get_args();
		if($a){
			$this->sPath=str_replace('/',DS,array_shift($a));
			list($f)=explode(DS,$this->sPath);
			$fc=substr($this->sPath,0,1);
			$this->isPrivate=!!($fc=='#');
			$this->isPlain=!!(substr($this->sPath,-1)=='@');
			$this->sPath=trim($this->sPath,'#@^%'.DS);
			$this->aParams=$a;
			$this->mData=[];
		}
		return $this;
	}
	public function p($noExt=false){
		$tmp=$this->aParams;
		foreach($tmp as $k=>$v){if(empty($v)) unset($tmp[$k]);}
		return ($this->isPrivate?PCDIR:NCDIR).($this->sPath?$this->sPath:'main').($tmp?DS.join(DS,$tmp):'').($noExt?'':'.'.($this->sExt?$this->sExt:($this->isPlain?'txt':'php')));
	}
	public function beau(){$this->forceBeautify=!$this->forceBeautify;return $this;}
	public function shv($i){$this->shortArrayVal=$i;return $this;}
	public function ext($s){$this->sExt=$s;return $this;}
	public function get($reCache=false){
		$p=$this->p();
		if($reCache) $this->rm();
		if(!$this->is($p)) $this->make();
		return require $p;
	}
	public function data($m){$this->mData=$m;return $this;}
	public function add(){parent::add();return $this;}
	public function make(){
		$a=explode(DS,$this->sPath);
		$fn=strtolower(array_shift($a));
		$fn.=join('',array_map('ucfirst',$a));
		if(!$this->mData){
			$oData=new Cachedata();
			$o=new \ReflectionMethod($oData,$fn);
			$this->mData=$o->invokeArgs($oData,$this->aParams);
		}
		$this->init($this->p())->open(1);
		$this->write($this->isPlain?$this->mData."\n":"<"."?php return ".$this->a2s($this->mData).'?'.'>');
		return $this;
	}
	public function a2s($aData=[],$i=1){
		if(!is_array($aData)) return $this->v2s($aData);
		$sTmp='[';$l=0;$c=count($aData)>$this->shortArrayVal;$z=' => ';
		$nl=true;$b=false;$e=false;
		foreach($aData as $k=>$v){
			$b=$k!==$l;
			if($b) $l=-100;
			if($nl&&$b) $nl=false;
			$e=(!$nl&&$c)||$this->forceBeautify;
			$sTmp.=($e?"\n".str_repeat("\t",$i):'').(!$b?'':$this->v2s($k).($e?$z:trim($z))).$this->a2s($v,$i+1).",";
			if(is_numeric($k)) $l++;
		}
		$sTmp=trim($sTmp,',');
		$sTmp.=($e?"\n".str_repeat("\t",$i-1):'')."],";
		return trim($sTmp,',');
	}
	public function v2s($m){
		if(is_bool($m)) return $m?'true':'false';
		if(is_numeric($m)) return $m;
		if(is_string($m)) return "'".$this->strip($m)."'";
		if(is_null($m)) return 'null';
		return $m;
	}
	public function bulkRm($dir,$aFiles=[]){
		$d=(substr($dir,0,1)=='#'?PCDIR:NCDIR).trim($dir,'#').DS;
		foreach($aFiles as $f=>$ext){
			if(is_numeric($f)&is_string($ext)){$f=$ext;$ext='';}
			$p=$d.$f.'.'.($ext?$ext:'php');
			if(file_exists($p)) unlink($p);
		}
		return $this;
	}
	public function rd($p){if($p) $this->set('^'.$p);$this->rmDir($this->p(true));}
	public function strip($s){return str_replace(["\\","'"],["\\\\","\'"],$s);}
	public function rm(){
		$p=$this->p();
		if($this->is($p)) unlink($p);
		return $this;
	}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}
?>