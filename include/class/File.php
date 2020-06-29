<?php
defined('ROOT') or die('Access denied !!!');
class File{
	private $sPath				= '';		// File folder-iin zam [path]
	private $sPrev				= '';
	private $co					= '?';		// Neg temdegt
	private $ca					= '*';		// Olon temdegt
	private $iDwaPerm			= 0777;		// Directory writeable permission mode
	private $iFwaPerm			= 0755;		// File writeable permission mode
	private $iDsPerm			= 0755;		// Directory secured permission mode
	private $iFsPerm			= 0644;		// File secured permission mode
	private $sGroup				= '';		// File folder group name
	private $sOwner				= '';		// File folder owner name
	private $bAdd				= false;	// File-d data bichihdee umnuh data deer nemj bichih eseh
	private $rHandle			= null;
	private $iSizePercision		= 2;		// File-iin hemjeeg buheltgehed garah butarhai toonii nariivchlaliin oron
	private $bSizeShortSuffix	= true;		// File-iin hemjeeg buheltgehed hemjeesiin neriig tovchloh eseh Jishee ni Byte -> B, Kilobyte -> Kb geh met
	private $bForceOverwrite	= false;	// File folder-iig huulah, zuuh mun neriig solihod ijil nerteig ni shuud darah eseh  
	private $bMove				= false;	// 
	private $sPattern			= '';
	private $iSetFilePerm		= 0644;
	private $iSetDirPerm		= 0755;
	public function __construct($p=''){if($p) $this->init($p);}
	/**
	 * File::set()
	 * $v => Permission-ii dugaar, file group-iin esvel file owner-iin ner, pattern-ii temdegt Esvel array baidlaar bugdiig neg dor 
	 * $s => 2 dahi parameter-iin utga ni daraah utguud baina
	 * 		wfp - File-iin bichigdeh bolomjtoi permission
	 * 		wdp - Folder-iin bichigdeh bolomjtoi permission
	 * 		sfp - File-iin zuvhun unshih bolomjtoi permission
	 * 		sdp - Folder-iin zuvhun unshih bolomjtoi permission
	 * 		fp - File::rdir() function-oor olnoor ni uurchluhud ashiglah File-iin permission
	 * 		dp - File::rdir() function-oor olnoor ni uurchluhud ashiglah Folder-iin permission
	 * 		one - Pattern-ii neg temdegt-iig tuluuluh char
	 * 		mlt - Pattern-ii olon temdegt-iig tuluuluh char
	 * 		fsp - File size percision
	 * 		fss - File size suffix is short
	*/
	public function set($v,$s){
		if(is_array($v)){
			foreach($v as $k=>$m) $this->set($m,$k);
			return $this;
		}
		switch($s){
			case 'wfp':{if(is_numeric($v)) $this->iFwaPerm=$v;}break;
			case 'wdp':{if(is_numeric($v)) $this->iDwaPerm=$v;}break;
			case 'sfp':{if(is_numeric($v)) $this->iFsPerm=$v;}break;
			case 'sdp':{if(is_numeric($v)) $this->iDsPerm=$v;}break;
			case 'fp':{if(is_numeric($v)) $this->iSetFilePerm=$v;}break;
			case 'dp':{if(is_numeric($v)) $this->iSetDirPerm=$v;}break;
			case 'one':case 'mlt':{if(strpos('@#$%^&*_?+~`":;-/',$v)!==false){if($s=='one') $this->co=$v;else $this->ca=$v;}}break;
			case 'fsp':{if(is_numeric($v)&&$v<=10&&$v>=0) $this->iSizePercision=$v;}break;
			case 'fss':{$this->bSizeShortSuffix=!!$v;}break;
		}
		return $this;
	}
	public function init($p){
		$this->sPath=$p;
		if(!$this->sPrev) $this->sPrev=$p;
		return $this;
	}
	/**
	 * File::rst()
	 * Umnuh zam-iig dahin sergeene
	*/
	public function rst(){
		$this->sPath=$this->sPrev;
		return $this;
	}
	public function clr(){
		$this->sPrev='';
		$this->rHandle=null;
		return $this;
	}
	public function is($p='',$mk=false){
		if(!is_string($p)){$mk=$p;$p='';}
		$this->_c($p);
		$d=strpos($p,'.',strrpos($p,'/'))?pathinfo($p,PATHINFO_DIRNAME):$p;
		if(!file_exists($p)){
			if(!$mk) return false;
			else $this->mk($d,is_bool($mk)?0:$mk);
		}
		if(!is_writable($d)) $this->unsec($p);
		return is_dir($p)?'d':'f';
	}
	public function rm($p=''){
		switch($this->_c($p)->is($p)){
			case 'd':return $this->rmDir($p);
			case 'f':return @unlink($p);
			default:return true;
		}
	}
	public function _c(&$p){
		if(!$p) $p=$this->sPath;
		$p=rtrim($p,'\/');
		return $this;
	}
	public function open($p='',$sec=false){
		if(!is_string($p)){$sec=$p;$p='';}
		$this->end()->rHandle=$this->_c($p)->is($p,$sec)=='d'?opendir($p):fopen($p,($this->bAdd?'a':'w').'+');
		return $this;
	}
	public function end(){
		if($b=$this->_rc()){
			if($b=='d') closedir($this->rHandle);
			else fclose($this->rHandle);
			$this->rHandle=null;
		}
		if($this->sPath) $this->sec();
		return $this;
	}
	public function read($h=null,$i=0){
		if(is_resource($i)){$h=$i;$i=0;}
		$r='';
		if(($b=$this->_rc($h))=='f'){
			if($i) $r=fread($h,$i);
			else while(!feof($h)){
				fseek($h,($i++)*2048);
				$r.=fread($h,2048);
			}
		}
		elseif($b=='d') $r=readdir($h);
		return $r;
	}
	public function write($s){
		if(!$this->rHandle){
			if($this->sPath) $this->open();
			else return $this;
		}
		fwrite($this->rHandle,$s);
		return $this;
	}
	public function genFn(){
		$s='';$i=0;
		while($i<25){if(($i-2)%7==0) $s.='-';$s.=strtoupper(base_convert(rand(0,35),10,36));$i++;}
		return $s;
	}
	public function add(){
		$this->bAdd=!$this->bAdd;
		return $this;
	}
	public function pattern($s){
		$this->sPattern=$s;
		return $this;
	}
	public function time($p='',$mod='m'){
		if($p&&strpos('_mac',$p)){$mod=$p;$p='';}
		$f='file';
		$r=0;
		if($this->_c($p)->is($p)) eval('$r='.$f.$mod.'time($p);');
		return $r;
	}
	private function _rc($r=null){
		if(!$r||!is_resource($r)) $r=$this->rHandle;
		if(!is_resource($r)) return null;
		$a=stream_get_meta_data($r);
		return strtolower($a['stream_type'])=='dir'?'d':'f';
	}
	public function ctype($p=''){
		require_once SETT.'contentTypes.php';
		if($this->_c($p)->is($p)!='d'&&$p) return gct(pathinfo($p,PATHINFO_EXTENSION));
	}
	/**
	 * File::rmDir()
	 * $p => path
	 * $s => filter   *key | *key* | key* | *k?y* | !*k?y
	 * $b => remove own
	*/
	public function rmDir($p='',$s='',$b=false){
		if($p&&strpos($p,DS)===false){
			if(is_bool($p)){$b=$p;$p=$s='';}
			else{$b=$s;$s=$p;$p='';}
		}
		if(is_bool($s)){$b=$s;$s='';}
		if($this->_c($p)->is($p)!=='d') return $this;
		$h=opendir($p);
		if(!$s&&$this->sPattern) $s=$this->sPattern;
		if($s){
			$n=substr($s,0,1)=='!';
			$z=$this->ptrn(trim($s,'!'));
		}
		while($i=readdir($h)){
			if($i!='.'&&$i!='..'){
				$r=$p.DS.$i;
				if(is_dir($r)) $this->rmDir($r,$s,true);
				elseif(($s&&$z&&(($n&&!preg_match($z,$i))||(!$n&&preg_match($z,$i))))||!$s){
					if(file_exists($r)) unlink($r);
				}
				else $b=false;
			}
		}
		closedir($h);
		if($b) rmdir($p);
		return $this;
	}
	public function move($to,$p=''){
		$this->bMove=true;
		$this->copy($to,$p);
		$this->bMove=false;
		return $this;
	}
 	public function copy($to,$p='',$pl=''){
 		$p=rtrim($p,DS);
 		if(!$pl){
 			$this->_c($p);
 			$this->is($to,true);
		}
 		$a=explode(DS,$p);
		$fn=array_pop($a);
		if($this->sPattern){
			$n=substr($this->sPattern,0,1)=='!';
			$z=$this->ptrn();
		}
 		if(!$pl&&$this->is($p)=='f'){
 			$np=rtrim($to,DS).DS.$fn;
 			if($this->is($np)=='f'){
 				$k=0;$ext=pathinfo($np,PATHINFO_EXTENSION);
 				$np=substr($np,0,strlen($np)-(strlen($ext)+1));
 				while($this->is($np.'_'.(++$k).'.'.$ext)=='f');
 				$np.='_'.$k.'.'.$ext;
			}
 			if((isset($n)&&(($n&&!preg_match($z,$fn))||(!$n&&preg_match($z,$fn))))||!isset($n)){
 				if($this->bMove) rename($p,$np);
				else copy($p,$np);
			}
 			return $this;
 		}
 		else{
			$pc=$p.DS.($pl?$pl.DS:'');
			$toc=rtrim($to,DS).DS.$fn.DS.($pl?$pl.DS:'');
			$this->mk($toc,-1);
 			$h=opendir($pc);
			while($f=readdir($h)){
				if(!in_array($f,array('.','..'))){
					if(is_dir($pc.$f)) $this->copy($to,$p,$pl.DS.$f);
					elseif((isset($n)&&(($n&&!preg_match($z,$f))||(!$n&&preg_match($z,$f))))||!isset($n)){
						if($this->bMove) rename($pc.$f,$toc.$f);
						else copy($pc.$f,$toc.$f);
					}
				}
			}
 		}
 		if($this->bMove) $this->rmDir($p.($pl?DS.$pl:''),true);
 		return $this;
 	}
 	public function rn($nn,$p='',$addSuf=0){
		if(!$addSuf) $nn=preg_replace('([^\w\d\-_~,\[\]\(\}\{\)])','',$nn);
 		if(!$nn||!($t=$this->_c($p)->is($p))) return $this;
 		$a=explode(DS,$p);
 		$ext='';$fn=array_pop($a);
 		if($t=='f'){
 			$ext='.'.pathinfo($p,PATHINFO_EXTENSION);
 			$fn=substr($fn,0,strlen($fn)-strlen($ext));
		}
		$p1=join(DS,$a).DS.$nn.($addSuf?'_'.$addSuf:'').$ext;
		if(($b=$this->is($p1))) return $this->rn($nn,$p,$addSuf+1);
		else rename($p,$p1);
		return $this;
 	}
 	public function fw(){$this->bForceOverwrite=true;return $this;}
	/**
	 * $bSec => 0|1|2 (0 - nohtaccess, 1 - Denied, 2 - Dir listing)
 	*/
	public function mk($p='',$bSec=1){
		if(is_numeric($p)&&$p>=0&&$p<3){$bSec=$p;$p='';}
		if(!$this->_c($p)->is($p)) mkdir($p,$this->iDwaPerm,true);
		if($bSec!=-1&&!$this->init($p.DS.'index.html')->is()){
			$this->write('<script type="text/javascript">location.href=\'/\';</script>')->end();
			if($bSec) $this->open($p.DS.'.htaccess')->write($bSec==1?'Deny from all':'Options -Indexes')->end();
		}
		$this->sec($p);
	}
	public function sec($p=''){
		if($b=$this->_c($p)->is($p)) chmod($p,$b=='d'?$this->iDsPerm:$this->iFsPerm);
		return $this;
	}
	public function unsec($p=''){
		if($b=$this->_c($p)->is($p)) chmod($p,$b=='d'?$this->iDwaPerm:$this->iFwaPerm);
		return $this;
	}
	public function size($p='',$byStr=false){
		if(is_bool($p)){$byStr=$p;$p='';}
		if($r=$this->_c($p)->is($p)){
			if($r=='f') $i=filesize($p);
			else $i=$this->rdir($p,'s');
		}
		else $i=0;
		return $byStr?$this->i2s($i):$i;
	}
	public function st($a){
		$this->aByteStrSett=$a;
		return $this;
	}
	/**
	 * $sTo => i|b|k|m|g|t|p|e|a|auto
	 * auto OR a - Auto select
	 * i - bit
	 * b - byte
	 * k - kilobyte
	 * m - megabyte
	 * g - gigabyte
	 * t - terabyte
	 * p - petabyte
	 * e - exabyte
	 * */
	public function i2s($i,$sTo='a'){
		if($sTo=='i') return ($i*8).' bit';
		$k=0;
		$a=array('Byte','Kilo','Mega','Giga','Tera','Peta','Exa');
		$b=$this->aByteStrSett;
		static $c=array();
		if(!$c) foreach($a as $r) $c[]=strtolower(substr($r,0,1));
		$j=isset($b[24])&&!$b[24]?1000:1024;
		$sTo=substr($sTo,0,1);
		if($sTo=='a') while($i>min($j,900)){$k++;$i/=$j;}
		else for(;$k<array_search($sTo,$c);$k++) $i/=$j;
		return round($i,isset($b['per'])&&is_numeric($b['per'])?$b['per']:2).' '.(isset($b['shrt'])&&!$b['shrt']?($a[$k].($k?strtolower($a[0]):'')):strtoupper($c[$k]).($k?$c[0]:''));
	}
	/**
	 * $mod => c|s|a|b|g|f|d|l|e|w|n|r|u|p
	 * c - Count all files and folders
	 * s - Calculate size of all files
	 * a - Tree structure to array
	 * b - Get all files and folders
	 * o - Get all files by option
	 * g - Get all files with size
	 * f - Count all only files
	 * d - Count all only directories
	 * l - Directory max level
	 * e - Directory min level
	 * n - Count not writeable directories
	 * w - Count writeable directories
	 * r - Set group
	 * u - Set owner
	 * p - Set permission
	 * first char is 'a|f|d|c|r|u|p' and more str is filter
 	*/
	public function rdir($p='',$mod='c',$o=0){
		if($p&&strpos($p,DS)===false){$mod=$p;$p='';}
		$f=substr($mod,0,1);$s=substr($mod,1);
		static $bp='',$z='',$os=false;
		$y=strpos('_abog',$f);
		if($y) static $v=array();
		else static $v=0;
		$def=$y?array():0;
		if($this->_c($p)->is($p)!='d') return $def;
		if(!$o){
			$v=$def;
			$bp=strlen($p);
		}
		$h=opendir($p);if(!$s&&$this->sPattern) $s=$this->sPattern;
		if($s){
			$n=substr($s,0,1)=='!';
			if(!$z) $z=$this->ptrn(trim($s,'!'));
		}
		while($i=readdir($h)){
			if($i!='.'&&$i!='..'){
				$r=$p.DS.$i;
				$d=is_dir($r);
				if((($s&&$z&&(($n&&!preg_match($z,$i))||(!$n&&preg_match($z,$i))))||!$s)){
					switch($f){
						case 'c':{$v++;break;}
						case 's':{if(!$d) $v+=filesize($r);break;}
						case 'a':{if(!$d){$t=trim(substr($p,$bp),DS);eval('$v[\'root\']'.($t?'[\''.str_replace(DS,'\'][\'',trim($t,DS)).'\']':'').'[]=$i;');}break;}
						case 'b':{$t=trim(substr($p,$bp),DS);$v[$t?$t:'root'][]=($d?'#':'').$i;break;}
						case 'g':{if(!$d){$t=trim(substr($p,$bp),DS);$v[$t?$t:'root'][$i]=filesize($r);}break;}
						case 'o':{if(!$d) $v[trim(substr($r,$bp),DS)]=$i;break;}
						case 'f':{if(!$d) $v++;break;}
						case 'd':{if($d) $v++;break;}
						case 'l':{$v=max($v,$o);break;}
						case 'e':{$os=true;$v=$o;break;}
						case 'n':{if($d&&!is_writable($r)) $v++;break;}
						case 'w':{if($d&&is_writable($r)) $v++;break;}
						case 'r':{chgrp($r,$this->sGroup);break;}
						case 'u':{chown($r,$this->sOwner);break;}
						case 'p':{chmod($r,$d?$this->iSetDirPerm:$this->iSetFilePerm);break;}
					}
				}
				if($d&&!$os) $this->rdir($r,$mod,$o+1);
			}
		}
		closedir($h);
		return $v;
	}
	private function ptrn($s){
		if(!$s&&$this->sPattern) $s=trim($this->sPattern,'!');
		$z='/^';
		$j=0;
		$t='[\.a-z0-9-_]{';
		for($i=0;$i<strlen($s);$i++){
			if($s[$i]==$this->co) $j++;
			else{
				if($j) $z.=$t.$j.'}';
				$j=0;
				$z.=$s[$i]==$this->ca?'([\S]*)':$s[$i];
			}
		}
		if($j) $z.=$t.$j.'}';
		return $z.'$/i';
	}
	public function __get($s){return li($s);}
}
?>