<?php
defined('ROOT') or die('Access denied !!!');
class Html{
	var $A=['js'=>[],'css'=>[]];
	var $G=['meta'=>'','pre'=>'','suf'=>'','js'=>'','css'=>'','tit'=>[],'keys'=>'','desc'=>'','noTpl'=>false,'full'=>false,'title'=>'','nmt'=>false,'scalable'=>false];
	var $aMsg=[];
	var $ext='.php';
	public function __construct(){}
	public function page($s){
		$a=explode('/',$s);
		$pre='_pre';
		for($i=0;$i<count($a);$i++){
			$b=$i?array_slice($a,0,$i):[];
			$b[]=$pre;
			$p=PAGE.join('/',$b).$this->ext;
			if(file_exists($p)) require_once $p;
		}
		require_once PAGE.$s.$this->ext;
	}
	public function sett($s,$type='str',$def=null){
		static $aSett=[];
		if(!$aSett) $aSett=$this->cch->set('setting')->get();
		$res=isset($aSett[$s])?$aSett[$s]:$def;
		switch($type){
			case 'str':case 'text':case 'string':$res=''.$res;break;
			case 'int':case 'integer':case 'num':case 'number':case 'numeric':$res=intval($res);break;
			case 'arr':case 'array':case 'massiv':if(strpos($res,'&')>0||strpos($res,'=')>0) parse_str($res,$res);else $res=explode(',',$res);
			foreach($res as $k=>$v){$v=trim($v);if($v==='') unset($res[$k]);}break;
			case 'bool':case 'boolean':$res=(bool)$res;break;
			case 'float':case 'flt':$res=floatval($res);break;
		}
		return $res;
	}
	public function isExists($pre=true){
		$a=$this->req->url('dirs');
		$pre=($pre===true?MODS:$pre);
		$b=false;
		while($a){
			$p=join('/',$a);
			if(file_exists($pre.$p.$this->ext)){$b=true;break;}
			$p.='/index';
			if(file_exists($pre.$p.$this->ext)){$b=true;break;}
			array_pop($a);
		}
		return $b?$p:false;
	}
	public function module($s='index',$a=[],$b=false){
		$s=str_replace(['>',' '],['/','_'],$s);
		$p=MODS.$s;
		if($a===true) return file_exists($p.$this->ext)||file_exists($p.'/index'.$this->ext);
		if(!file_exists($p.$this->ext)&&!file_exists($p.'/index'.$this->ext)) return '';
		if($a&&is_array($a)) foreach($a as $k=>$v) $$k=$v;
		$p=(file_exists($p.$this->ext)?$p:$p.'/index').$this->ext;
		if($b){ob_start();require $p;$c=ob_get_clean();return $c;}
		require $p;
		return $this;
	}
	public function js($s=null){if(!$s) return $this->A['js'];if(!in_array($s,$this->A['js'])) $this->A['js'][]=$s;return $this;}
	public function css($s=null){if(!$s) return $this->A['css'];if(!in_array($s,$this->A['css'])) $this->A['css'][]=$s;return $this;}
	public function both($s){if(!in_array($s,$this->A['css'])) $this->A['css'][]=$s;if(!in_array($s,$this->A['js'])) $this->A['js'][]=$s;return $this;}
	public function tit($s=null){if(!$s) return $this->G['tit'];array_unshift($this->G['tit'],$s);return $this;}
	public function msg($s=null,$a=[],$t='notice',$isPop=false){
		$k='msg-tansfer';
		if($s===true) return isset($_SESSION[$k]);
		if(is_string($a)){$t=$a;$a=[];}
		elseif(is_bool($a)){if($isPop===false) $isPop=$a;$a=[];}
		if(is_bool($t)){if($isPop===false) $isPop=$t;$t='notice';}
		if($s){
			if(is_array($a)&&$a) $s=str_replace(array_map(function($v){return '{'.strtolower($v).'}';},array_keys($a)),array_values($a),$s);
			if(!isset($_SESSION[$k])) $_SESSION[$k]=[];
			if(!isset($_SESSION[$k][$t])) $_SESSION[$k][$t]=[];
			$_SESSION[$k][$t][]=$s;
			if($isPop) $_SESSION['pop-msg']=$isPop;
			return $this;
		}
		else{
			$s='';
			if(isset($_SESSION[$k])&&$_SESSION[$k]){
				$s.='<div class="alert-msg'.(isset($_SESSION['pop-msg'])&&$_SESSION['pop-msg']?' pop-msg'.($_SESSION['pop-msg']!==true?'" onclick="location.href=\''.$_SESSION['pop-msg'].'\'':''):'').'">';
				foreach($_SESSION[$k] as $t=>$a){
					$s.='<div class="'.$t.'">';
					foreach($a as $msg) $s.='<div class="part">'.$msg.'</div>';
					$s.='</div>';
				}
				$s.='</div>';
			}
			unset($_SESSION[$k],$_SESSION['pop-msg']);
			return $s;
		}
	}
	public function has($type='form'){return isset($_SESSION['msg-tansfer'][$type])?count($_SESSION['msg-tansfer'][$type]):0;}
	public function options($a,$val=null,$b='--',$suf=''){
		$sHtml='';
		if($b){
			if($b=='--') $b='- Сонго -';
			$sHtml.='<option value="'.($a&&!key($a)?-1:0).'">'.$b.'</option>';
		}
		foreach($a as $k=>$v){
			$sAttr='';
			if($val!==null&&((is_array($val)&&in_array($k,$val))||(!is_array($val)&&$val==$k))) $sAttr=' selected="true" class="selected"';
			if(is_array($v)){
				if(isset($v['val'])){$h=$v['val'];unset($v['val']);}
				elseif(isset($v[0])){$h=$v[0];unset($v[0]);}
				else $h=array_shift($v);
				foreach($v as $kk=>$vv) $sAttr.=' '.$kk.'="'.str_replace('"','&quot;',$vv).'"';
			}
			else $h=$v;
			if(strpos($h,'##')!==false){
				list($cls,$h)=explode('##',$h);
				if(!$sAttr||strpos($sAttr)===false) $sAttr.=' class="'.$cls.'"';
				else $sAttr=str_replace(' class="',' class="'.$cls,$sAttr);
			}
			$sHtml.='<option value="'.$k.'"'.$sAttr.'>'.$h.$suf.'</option>';
		}
		return $sHtml;
	}
	public function chb($a,$sId='',$val=null,$sName='data',$sAttr=''){
		$sHtml='';
		foreach($a as $k=>$v){
			$sa='';$pre='';
			if(is_array($v)){
				if(isset($v['val'])){$h=$v['val'];unset($v['val']);}
				elseif(isset($v[0])){$h=$v[0];unset($v[0]);}
				else $h=array_shift($v);
				foreach($v as $kk=>$vv) $sa.=' '.$kk.'="'.str_replace('"','&quot;',$vv).'"';
			}
			else $h=$v;
			$sAttr=($s?str_replace(['#','$'],[$k,$h],' '.trim($s)):'').$sa;
			if($val!==null&&((is_array($val)&&in_array($k,$val))||(!is_array($val)&&$val==$k))) $sAttr.=' checked="true"';
			if(strpos($h,'&#8627;')){
				list($pre,$h)=explode('&#8627;',$h);
				$pre.='&#8627; ';
			}
			$sHtml.='<div>'.$pre.'<label><input type="checkbox" value="'.$k.'"'.$sAttr.' id="'.$sId.'-'.$k.'" name="'.$sName.'['.$sId.'][]" /> '.trim($h).'</label></div>';
		}
		return $sHtml;
	}
	public function date($time=null,$l=36000,$sFormat='Y, n сарын j. G:i'){
		if($time&&$time>time()) return $this->future($time-time(),$l,$sFormat);
		$zuruu=time()-intval($time);$sPre=$sSuf='';
		if(780*60>$zuruu&&($clr='#c33')){$sPre='<t style="color:'.$clr.'">';$sSuf='</t>';}
		if(!$l||$zuruu>$l) return str_replace(date('Y, '),'',date($sFormat,$time));
		if(!$time||(time()-$time)<0) return str_replace(date('Y, '),'',date($sFormat));
		if($zuruu<=2) return $sPre.'Дөнгөж сая'.$sSuf;
		if($zuruu<=4) return $sPre.'Саяхан'.$sSuf;
		if($zuruu<60) return $sPre.$zuruu.' секундын өмнө'.$sSuf;
		if($zuruu<=3600){
			$uldegdel=$zuruu%60;
			return $sPre.floor($zuruu/60).' минут'.($uldegdel?' '.$uldegdel.' секундын':'ын').' өмнө'.$sSuf;
		}
		$zuruu=ceil($zuruu/60);
		if($zuruu<1440){
			$uldegdel=$zuruu%60;
			return $sPre.floor($zuruu/60).' цаг'.($uldegdel?' '.$uldegdel.' минутын':'ийн').' өмнө'.$sSuf;
		}
		else{
			$d=round($zuruu/1440);
			if($d==1) return $sPre.'Өчигдөр '.date('G цаг i минут',$time).$sSuf;
			elseif($d==1) return $sPre.'Уржигдар '.date('G цаг i минут',$time).$sSuf;
			elseif($d>=7){
				$w=round($d/7);
				if($w>4){
					$m=round($d/30);
					if($m>11){$y=round($m/12,1);if($y<10) return $sPre.($y<1.3?'Ж':$y.' ж').'илийн өмнө'.$sSuf;}
					else return $sPre.($m==1?'С':$m.' с').'арын өмнө'.$sSuf;
				}
				else return $sPre.($w==1?'Д':$w.' д').'олоо хоногийн өмнө'.$sSuf;
			}
		}
		return $sPre.str_replace(date('Y, '),'',date($sFormat,$time)).$sSuf;
	}
	public function future($z,$l=null,$f='Y, n сар j. G:i'){
		if($l&&$z>$l) return date($f,$z+time());
		if($z<60) return $z.' секундын дараа';
		if($z<3600) return floor($z/60).' минут '.($z%60).' секундын дараа';
		if($z<86400){
			$m=round($z%3600/60);
			return floor($z/3600).' цаг '.($m?$m.' минутын ':'').'дараа';
		}
		if($z<86400*7){
			$d=round($z/86400);
			if($d==1) return 'Маргааш';
			elseif($d==2) return 'Нөгөөдөр';
			else return round($z/86400).' хоногийн дараа';
		}
		if($z<86400*30) return round($z/(86400*7)).' долоо хоногийн дараа';
		if($z<86400*365) return round($z/(86400*30)).' сарын дараа';
		return round($z/(86400*365),1).' жилийн дараа';
	}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}
?>