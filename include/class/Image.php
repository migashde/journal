<?php
defined('ROOT') or die('Access denied !!!');
class Image extends File{
	private $aSize				= [];
	private $sOutputType		= 'jpg';
	private $sDir				= '';
	private $sPath				= '';
	private $sName				= '';
	private $iLimit				= 0;
	private $sKey				= '';
	private $aNames				= [];
	private $aData				= [];
	private $aSupported			= ['image/jpeg','image/png','image/gif'];
	private $iFrom				= 0;
	private $iColor				= null;
	private $rImg				= null;
	private $bgClr				= 'f';
	private $iQuality			= 100;
	private $aFilters			= [];
	private $aFilterDef			= [
									'contrast'			=> -10,
									'brightness'		=> -10,
									'colorize'			=> [200,0,0,80],
									'smooth'			=> 20,
									'pixelate'			=> 3
								  ];
 	private $aWatermark			= [];
 	private $sRmSessKey			= 'prev_fns';
 	private $iWidth				= 0;
 	private $iHeight			= 0;
 	private $aUploadInfo		= [];
 	private $aArea				= [];
	public function __construct($path='',$a=[]){
		if($path) $this->sPath=$path;
		if($a){
			foreach($a as $k=>$v){
				if(!is_array($v)){if($k=='size') $v=explode(',',$v);else $v=[$v];}
				foreach($v as $vv) $this->$k($vv);
			}
		}
		$this->aData=$_FILES;
		$this->iLimit=ini_get('max_file_uploads');
	}
	public function name($s=null){if($s===null) return $this->sName?$this->sName:($this->sName=$this->genFn());$this->sName=$s===true?$this->genFn():$s;return $this;}
	public function dir($s=null){if($s===null) return $this->sDir;$this->sDir=rtrim($s,'\/');return $this;}
	public function path($s=null){if($s===null) return $this->sPath;$this->sPath=rtrim($s,'\/').DS;return $this;}
	public function type($s=null){if($s===null) return $this->sOutputType;$this->bgClr=$s=='png'?'tr':'f';$this->sOutputType=$this->isExt($s)?:'jpeg';return $this;}
	public function lmt($i=null){if($i===null) return $this->iLimit;$this->iLimit=$i;return $this;}
	public function from($i=null){if($i===null) return $this->iFrom;$this->iFrom=$i;return $this;}
	public function bg($s=null){if($s===null) return $this->bgClr;$this->bgClr=$s;return $this;}
	public function hq($i=null){if($i===null) return $this->iQuality;$this->iQuality=max(0,min($i,100));return $this;}
	public function addRm($fn){if(!isset($_SESSION[$this->sRmSessKey])) $_SESSION[$this->sRmSessKey]=[];if(!is_array($fn)) $fn=[$fn];$_SESSION[$this->sRmSessKey]=$fn;return $this;}
	public function size($m,$sDir=''){
		if(is_string($m)) $m=explode(':',$m);
		elseif(is_numeric($m)) $m=[$m,$m,'f'];
		elseif($m===true) $m=[2000,2000,'f'];
		if(is_array($m)&&count($m)==2) array_unshift($m,$m[0]);
		$this->aSize[$sDir]=(array)$m;
		return $this;
	}
	public function isExt($s){
		if($s=='jpg') $s='jpeg';
		if(in_array('image/'.$s,$this->aSupported)) return $s;
		else return false;
	}
	public function area($a=null){if($a===null) return $this->aArea;$this->aArea=$a;return $this;}
	public function ext(){return $this->sOutputType=='jpeg'?'jpg':$this->sOutputType;}
	public function key($s=null){if($s===null) return $this->sKey;$this->sKey=$s;return $this;}
	public function wmark($a=null){if($a===null) return $this->aWatermark;$this->aWatermark[]=is_array($a)?$a:['img'=>$a];return $this;}
	public function toOpt($a,$b=[],$keys=0){
		if(is_array($a)){
			foreach($a as $kk=>$vv){
				$kk=($keys?$keys.'+':'').$kk;
				if(is_array($vv)) $b=$this->toOpt($vv,$b,$kk);
				else $b[$kk]=$vv;
			}
		}
		elseif($a) $b[$keys]=$a;
		return $b;
	}
	public function upload($key=''){
		if($key) $this->key($key);
		if(!$this->sPath) return false;
		$aNames=$this->toOpt($this->aData[$this->sKey]['name']);
		$aTypes=$this->toOpt($this->aData[$this->sKey]['type']);
		$this->aUploadInfo['size']=array_sum($this->toOpt($this->aData[$this->sKey]['size']));
		$iCnt=0;
		foreach($this->toOpt($this->aData[$this->sKey]['tmp_name']) as $key=>$tmp){
			if(!in_array($aTypes[$key],$this->aSupported)) continue;
			if(++$iCnt>$this->iLimit) break;
			$suf=null;$path='';
			if(!is_numeric($key)){
				$a=explode('+',$key);
				if(is_numeric($a[count($a)-1])) $suf=array_pop($a);
				$path=join(DS,$a);
			}
			$this->crop($tmp,$path,$suf);
		}
		$this->aUploadInfo['count']=$iCnt;
		return $this;
	}
	public function info($s){return isset($this->aUploadInfo[$s])?$this->aUploadInfo[$s]:"";}
	public function crop($fn,$path='',$suf=null){
		$d=$this->source($fn);
		if($d===null) return null;
		$path=trim($path,'\/');
		if($path) $path.=DS;
		$this->sDir=trim($this->sDir,'\/');
		if($this->sDir) $this->sDir.=DS;
		if(!$this->aSize) $this->aSize['']=[$d['w'],$d['h'],'f'];
		$rm=isset($_SESSION[$this->sRmSessKey])?$_SESSION[$this->sRmSessKey]:[];
		$fn=$this->name().($suf!==null?(is_numeric($suf)?$this->iFrom+$suf+1:$suf):'');
		if(!isset($this->aUploadInfo['files'])) $this->aUploadInfo['files']=[];
		foreach($this->aSize as $dir=>$aSize){
			if($dir) $dir.=DS;
			$p=$this->sPath.$path.$dir.$this->sDir;
			if($this->is($p,2)){
				$pw=$cw=$aSize[0];$ph=$ch=$aSize[1];
				$sh=$d['h'];$sw=$d['w'];
				if($this->aArea) $this->setIm($cw,$ch)->fill($this->bgClr)->merge($d['src'],0,0,$this->aArea['x1'],$this->aArea['y1'],$cw,$ch,$this->aArea['width'],$this->aArea['height'])->addFilters();
				else{
					$cx=$cy=$sx=$sy=0;$a=[];
					for($i=0;$i<strlen($aSize[2]);$i++) $a[]=$aSize[2][$i];
					$wa=in_array('w',$a)?1:(in_array('W',$a)?2:(in_array('v',$a)?3:(in_array('V',$a)?4:3)));
					$ha=in_array('h',$a)?1:(in_array('H',$a)?2:(in_array('x',$a)?3:(in_array('X',$a)?4:3)));
					$ve=in_array('t',$a)?'t':(in_array('b',$a)?'b':'c');
					$ho=in_array('l',$a)?'l':(in_array('r',$a)?'r':'c');
					if(in_array('o',$a)){$wa=$ha=3;$ve=$ho='c';}
					if(in_array('f',$a)) $wa=$ha=1;
					if(in_array('a',$a)) $wa=$ha=2;
					$h=$sw/$sh>$cw/$ch;$th=round($sh/($sw/$cw));$tw=round($sw/($sh/$ch));
					if($h){if($ha==2||$ha==3){if($ch>$sh){$ch=$sh;$cw=round($sw/($sh/$ch));if($wa==1||$wa==4){$cw=$pw;$ch=round($cw/$sw*$sh);}}else $ch=$th;}else $cw=$tw;}
					else{if($wa==2||$wa==3){if($cw>$sw){$cw=$sw;$ch=round($sh/($sw/$cw));if($ha==1||$ha==4){$ch=$ph;$cw=round($ch/$sh*$sw);}}else $cw=$tw;}else $ch=$th;}
					$this->setIm($cw,$ch)->fill($this->bgClr)->merge($d['src'],0,0,0,0,$cw,$ch,$sw,$sh)->addFilters();
					if($wa==3||$wa==1) $sx=$cw-$pw;
					if($ha==3||$ha==1) $sy=$ch-$ph;
					if($sx||$sy){
						$tmp=$this->rImg;
						$this->setIm($pw,$ph)->fill($this->bgClr);
						if($sx>=0&&$sy>0){
							$x=$sx;$y=$sy;
							if($ho=='c'){if($x) $x/=2;}elseif($ho=='l') $x=0;
							if($ve=='c'){if($y) $y/=2;}elseif($ve=='t') $y=0;
							$this->merge($tmp,0,0,$x,$y,$pw,$ph,$cw-$sx,$ch-$sy);
						}
						else $this->layer($tmp,$ho,$ve);
					}
				}
				$this->watermark()->create($p.$fn);
				$dir=trim($dir,DS);
				if(!$dir) $dir='global';
				$this->aUploadInfo['files'][$dir]=[$cw,$ch,filesize($p.$fn.'.'.$this->ext())];
			}
			if($rm) foreach($rm as $rfn){if(file_exists($p.$rfn.'.'.$this->ext())) unlink($p.$rfn.'.'.$this->ext());}
		}
		if($rm) unset($_SESSION[$this->sRmSessKey]);
		return true;
	}
	public function setIm($w,$h){
		$this->rImg=imagecreatetruecolor($w,$h);
		$this->iWidth=imagesx($this->rImg);
		$this->iHeight=imagesy($this->rImg);
		$this->fill($this->bgClr);
		return $this;
	}
	public function getIm(){return $this->rImg;}
	public function fill($x=0,$y=0,$clr='f'){
		if(is_string($x)){$clr=$x;$x=$y=0;}
		if($clr=='tr') return $this;
		imagefill($this->rImg,$x,$y,is_numeric($clr)?$clr:$this->color($clr));
		return $this;
	}
	public function color($m=null,$alpha=null){
		if(is_null($m)) $m=$this->bgClr;
		if(!is_array($m)){
			if(is_numeric($m)){$this->iColor=$m;return $this;}
			elseif(is_string($m)){
				if(substr($m,0,1)=='='){$m=intval(trim($m,'='));$m=[$m,$m,$m];}
				else{if($m=='tr'){$m=[0,0,0];$alpha=0;}else $m=$this->hex2rgb($m);}
			}
		}
		if(!(is_array($m)&&count($m)==3)) $m=[0,0,0];
		return is_numeric($alpha)?imagecolorallocatealpha($this->rImg,$m[0],$m[1],$m[2],min(max(0,$alpha),127)):imagecolorallocate($this->rImg,$m[0],$m[1],$m[2]);
	}
	public function merge($src,$x1,$y1,$x2,$y2,$w1,$h1,$w2,$h2){imagecopyresampled($this->rImg,$src,$x1,$y1,$x2,$y2,$w1,$h1,$w2,$h2);return $this;}
	public function realXY($x,$y,$layerW,$layerH){
		if(is_numeric($x)){if($x<0) $x=$this->iWidth-$layerW+$x;}
		else switch($x){
			case 'l':case 'left':{$x=0;break;}
			case 'r':case 'right':{$x=$this->iWidth-$layerW;break;}
			default:{$x=($this->iWidth-$layerW)/2;break;}
		}
		if(is_numeric($y)){if($y<0) $y=$this->iHeight-$layerH+$y;}
		else switch($y){
			case 't':case 'top':{$y=0;break;}
			case 'b':case 'bottom':{$y=$this->iHeight-$layerH;break;}
			default:{$y=($this->iHeight-$layerH)/2;break;}
		}
		return array($x,$y);
	}
	public function layer($src,$x='c',$y='c'){
		if(is_array($src)){$w=$src['w'];$h=$src['h'];$src=$src['src'];}
		elseif(is_string($src)) return $this->layer($this->source($src),$x,$y);
		else{$w=imagesx($src);$h=imagesy($src);}
		list($x,$y)=$this->realXY($x,$y,$w,$h);
		imagecopy($this->rImg,$src,$x,$y,0,0,$w,$h);
		return $this;
	}
	public function watermark(){
		if(!$this->aWatermark||!is_array($this->aWatermark)) return $this;
		foreach($this->aWatermark as $a){
			if(isset($a['img'])){
				if((!isset($a['w'])||$a['w']<=$this->iWidth)&&(!isset($a['h'])||$a['h']<=$this->iHeight)){
					if((!isset($a['maxw'])||$a['maxw']>=$this->iWidth)&&(!isset($a['maxh'])||$a['maxh']>=$this->iHeight)){
						$x=isset($a['x'])?$a['x']:'c';
						$y=isset($a['y'])?$a['y']:'c';
						$this->layer(WMARK.$a['img'].'.png',$x,$y);
					}
				}
			}
			elseif(isset($a['txt'])){
				$clr=isset($a['clr'])?(is_numeric($a['clr'])?$a['clr']:$this->color($a['clr'],isset($a['alpha'])?$a['alpha']:null)):0;
				$this->addText($a['txt'],$a['x'],$a['y'],isset($a['angle'])?$a['angle']:0,$clr,isset($a['size'])?$a['size']:14,isset($a['font'])?$a['font']:'default');
			}
		}
		return $this;
	}
	public function addText($txt,$x='r',$y='b',$angle=0,$txtClr=0,$fontSize=14,$fontName='default'){
		$b=(function_exists('imagettftext')?true:false);
		$x=$pos[0];$y=$pos[1];$p=isset($pos[2])?$pos[2]:0;
        if($b){
			$fn=FONT.$fontName.".ttf";
			if(!(is_numeric($x)&&$x>=0&&is_numeric($y)&&$y>=0)){
	        	$a=imagettfbbox($fontSize,$angle,$fn,$txt);
    	    	list($x,$y)=$this->realXY($x,$y,abs($a[2]-$a[0]),abs($a[5]-$a[1]));
  			}
        	imagettftext($this->rImg,$fontSize,$angle,$x,$y,$txtClr,$fn,$txt);
        }
	}
	public function addFilters(){
		foreach($this->aFilters as $filter=>$params){
			if($filter=='saturate'){$this->saturate();continue;}
			if($params===true) $params=$this->aFilterDef[$filter];
			$const=strtoupper('img_filter_'.$filter);
			if(!defined($const)) continue;
			array_unshift($params,constant($const));
			array_unshift($params,$this->rImg);
			call_user_func_array('imagefilter',$params);
		}
		return $this;
	}
	public function filter($sFilterName,$params=[]){if(is_array($sFilterName)){foreach($sFilterName as $filter=>$a) $this->aFilters[$filter]=$a;}else $this->aFilters[$sFilterName]=$params;return $this;}
	public function create($path=null){
		$s=$this->sOutputType;
		$s=$this->isExt($s)?:'jpeg';
		if(!$path){$path=null;header('Content-type: image/'.$s);}
		else $path.='.'.$this->ext();
		switch($s){
			case 'jpeg':imagejpeg($this->rImg,$path,$this->iQuality);break;
			case 'png':imagepng($this->rImg,$path,max(1,min(9,$this->iQuality>9?round($this->iQuality/100):$this->iQuality)));break;
			case 'gif':imagegif($this->rImg,$path);break;
			case 'bmp':imagewbmp($this->rImg,$path);break;
			default:imagejpeg($this->rImg,$path,$this->iQuality);break;
		}
		return $this->done();
	}
	public function source($fn){
		$a=getimagesize($fn);$mime=trim(str_replace('image/','',$a['mime']));
		$b=array('w'=>$a[0],'h'=>$a[1],'t'=>$a[2],'mime'=>$mime,'src'=>null);
		switch($mime){
			case 'jpeg':$b['src']=imagecreatefromjpeg($fn);break;
			case 'png':$b['src']=imagecreatefrompng($fn);break;
			case 'gif':$b['src']=imagecreatefromgif($fn);break;
			case 'bmp':$b['src']=imagecreatefromwbmp($fn);break;
			default:return null;
		}
		return $b;
	}
	public function done(){imagedestroy($this->rImg);return $this;}
	public function saturate(){
		list($w,$h)=getimagesize($this->rImg);
		for($x=0;$x<$w;$x++){
			for($y=0;$y<$h;$y++){
				$rgb=imagecolorat($this->rImg,$x,$y);$r=($rgb>>16)&0xFF;$g=($rgb>>8)&0xFF;$b=$rgb&0xFF;
				list($h,$s,$v)=$this->rgb2hsv($r,$g,$b);$s=$s*1.5;if($s>1)$s=1;list($r,$g,$b)=$this->hsv2rgb($h,$s,$v);
				imagesetpixel($this->rImg,$x,$y,imagecolorallocatealpha($this->rImg,$r,$g,$b,($rgb&0xFF000000)>>24));
			}
		}
		return $this;
	}
    public function realHexColor($s){
		$s=trim($s,'#');
		if(strlen($s)<3) $s=str_repeat($s,3);
		if(strlen($s)==3) $s=$s[0].$s[0].$s[1].$s[1].$s[2].$s[2];
		return $s;
    }
    public function hex2rgb($s){
    	$a=[];$i=0;$s=$this->realHexColor($s);
    	do{$a[]=hexdec(substr($s,$i*2,2));}while(++$i<3);
    	return $a;
    }
	public function rgb2hsv($r,$g,$b){$r/=255;$g/=255;$b/=255;$mi=min($r,$g,$b);$ma=max($r,$g,$b);$ch=$ma-$mi;$v=$ma;if($ch==0){$h=0;$s=0;}else{$s=$ch/$ma;$chr=((($ma-$r)/6)+($ch/2))/$ch;$chg=((($ma-$g)/6)+($ch/2))/$ch;$chb=((($ma-$b)/6)+($ch/2))/$ch;if($r==$ma) $h=$chb-$chg;elseif($g==$ma) $h=(1/3)+$chr-$chb;elseif($b==$ma) $h=(2/3)+$chg-$chr;if($h<0) $h++;if($h>1) $h--;}return array($h,$s,$v);}
	public function hsv2rgb($h,$s,$v){if($s==0){$r=$g=$b=$v*255;}else{$h*=6;$i=floor($h);$v1=$v*(1-$s);$v2=$v*(1-$s*($h-$i));$v3=$v*(1-$s*(1-($h-$i)));if(!$i){$r=$v;$g=$v3;$b=$v1;}elseif($i==1){$r=$v2;$g=$v;$b=$v1;}elseif($i==2){$r=$v1;$g=$v;$b=$v3;}elseif($i==3){$r=$v1;$g=$v2;$b=$v;}elseif($i==4){$r=$v3;$g=$v1;$b=$v;}else{$r=$v;$g=$v1;$b=$v2;}$r*=255;$g*=255;$b*=255;}return array($r,$g,$b);}
    public function rect($c,$w,$h,$fill=true,$x=0,$y=0){
    	if($fill) imagefilledrectangle($this->rImg,$x,$y,$x+$w,$y+$h,$c);
		else imagerectangle($this->rImg,$x,$y,$x+$w,$y+$h,$c);
		return $this;
	}
    public function pixel($x,$y,$c){
    	imagesetpixel($this->rImg,$x,$y,$c);
    	return $this;
    }
    public function line($x1,$y1,$x2,$y2,$c){
    	imageline($this->rImg,$x1,$y1,$x2,$y2,$c);
    	return $this;
    }
    public function darkwhite($c,$i=20){
    	if(!is_array($c)) $c=$this->hex2rgb($c);
    	return [min($c[0]+$i,255),min($c[1]+$i,255),min($c[2]+$i,255)];
    }
    public function rotate($angle){
    	$clr=$this->color('255=');
    	$this->rImg=imagerotate($this->rImg,$angle,$clr);
    	return $this;
    }
    public function trim($bg='f'){
    	$l=$t=$r=$b=0;
    	$c=$this->color($this->hex2rgb($bg));
    	$xi=0;$xa=$this->iWidth;
    	$yi=0;$ya=$this->iHeight;
    	$ts=$bs=$rs=$ls=false;
    	for($x=$xi;$x<$xa;$x++){for($y=$yi;$y<$ya;$y++) if(imagecolorat($this->rImg,$x,$y)!=$c){$l=$x;$ls=true;break;}if($ls) break;}
    	for($x=$xa-1;$x;$x--){for($y=$yi;$y<$ya;$y++) if(imagecolorat($this->rImg,$x,$y)!=$c){$r=$x+1;$rs=true;break;}if($rs) break;}
    	for($y=$yi;$y<$ya;$y++){for($x=$xi;$x<$xa;$x++) if(imagecolorat($this->rImg,$x,$y)!=$c){$t=$y;$ts=true;break;}if($ts) break;}
    	for($y=$ya-1;$y;$y--){for($x=$xi;$x<$xa;$x++) if(imagecolorat($this->rImg,$x,$y)!=$c){$b=$y+1;$bs=true;break;}if($bs) break;}
    	$w=$r-$l;$h=$b-$t;
    	$im=imagecreatetruecolor($w,$h);
    	imagecopyresampled($im,$this->rImg,0,0,$l,$t,$w,$h,$w,$h);
    	$this->rImg=$im;
    	return $this;
    }
    public function txtTo($s,$a=[]){
    	$ff=FONT.(isset($a['font'])?$a['font']:'default').'.ttf';
    	$fs=isset($a['size'])?$a['size']:12;
    	$ag=isset($a['rotate'])?$a['rotate']:0;
    	$pd=isset($a['pad'])?$a['pad']:10;
    	$bg=$this->realHexColor(isset($a['bg'])?$a['bg']:'f');
    	$tc=$this->hex2rgb(isset($a['clr'])?$a['clr']:'0');
    	$b=imagettfbbox($fs,$ag,$ff,$s);
    	$ap=explode(' ',$pd);
    	switch(count($ap)){
    		case 1:$pt=$pr=$pb=$pl=$ap[0];break;
    		case 2:$pt=$pb=$ap[0];$pr=$pl=$ap[1];break;
    		case 3:$pt=$pb=$ap[0];$pr=$pl=$ap[1];$pb=$ap[2];break;
    		case 4:$pt=$ap[0];$pr=$ap[1];$pb=$ap[2];$pl=$ap[3];break;
    	}
		$w=$pl+abs($b[2]-$b[0])+$pr;
		$h=$pt+abs($b[5]-$b[1])+$pb;
		$this->bg($bg)->setIm($w,$h);
		imagettftext($this->rImg,$fs,$ag,$pl+$b[0],$pt-$b[5],$this->color($tc),$ff,$s);
		//$this->trim();
		if(isset($a['out'])&&$this->isExt($a['out'])){
			$this->sOutputType=$this->isExt($a['out']);
			$this->create();
		}
		else return $this->rImg;
    }
	public function captcha($data){
		$r='rand';
		$fs=isset($data['size'])?$data['size']:20;
		$fn=isset($data['font'])?($data['font']==$r?$r:$data['font']):'captcha';
		$oX=isset($data['padx'])?$data['padx']:20;
		$oY=isset($data['pady'])?$data['pady']:10;
		$cl=isset($data['clr'])?$data['clr']:'#283850';
		$an=isset($data['angle'])?$data['angle']:0;
		$bg=isset($data['bg'])?$data['bg']:'a';
		if(isset($data['txt'])) $s=isset($data['txt']);
		else{
			$s='';
			$l=isset($data['len'])?$data['len']:6;
			for($i=1;$i<=$l;$i++){
				$b=rand(1,100)%2;
				$t=base_convert(mt_rand(0,35),10,36);
				if($b) $t=strtoupper($t);
				$s.=$t;
			}
		}
		$b=$fs===$r||$fn===$r||$an===$r||$cl===$r;
		$_SESSION['captcha_code']=$s;
		if($b){
			$aRand=[];$maxh=0;$maxw=0;
			for($i=0;$i<strlen($s);$i++){
				if($fs===$r) $aRand[$i]['size']=rand(14,40);
				if($fn===$r) $aRand[$i]['font']='font'.rand(1,20);
				if($an===$r) $aRand[$i]['angle']=rand(0,40)*(mt_rand(0,1)?1:-1);
				$sz=$fs===$r?$aRand[$i]['size']:$fs;
				$a=imagettfbbox($sz,$an===$r?$aRand[$i]['angle']:$an,FONT.($fn===$r?$aRand[$i]['font']:$fn).'.ttf',$s[$i]);
				$aRand[$i]['width']=abs($a[2]-$a[0]);
				$maxw+=$aRand[$i]['width'];
				$maxh=max($maxh,abs($a[5]-$a[1]));
			}
			$w=$maxw+(strlen($s)*5);$h=$maxh;
		}
		else{
			$a=imagettfbbox($fs,0,FONT.$fn.'.ttf',$s);
			$w=abs($a[2]-$a[0]);
			$h=abs($a[5]-$a[1]);
		}
		$w+=$oX*2;$h+=$oY*2;
		$this->setIm($w,$h)->rect($this->color(),$w,$h);
		for($i=0;$i<($w*$h)/3;$i++) $this->pixel(mt_rand(0,$w),mt_rand(0,$h),$this->color($bg===$r?[mt_rand(180,255),mt_rand(180,255),mt_rand(180,255)]:$bg));
		for($i=0;$i<($w*$h)/150;$i++) $this->line(mt_rand(0,$w),mt_rand(0,$h),mt_rand(0,$w),mt_rand(0,$h),$this->color($bg===$r?[mt_rand(180,255),mt_rand(180,255),mt_rand(180,255)]:$bg));
		if($b){
			$szn=0;
			for($i=0;$i<strlen($s);$i++){
				$sz=isset($aRand[$i]['size'])?$aRand[$i]['size']:$fs;
				$szn+=(isset($aRand[$i]['width'])?$aRand[$i]['width']:$sz)+5;
				$fo=isset($aRand[$i]['font'])?$aRand[$i]['font']:$fn;
				$tc=$this->color($cl===$r?[mt_rand(20,120),mt_rand(20,120),mt_rand(20,120)]:$cl);
				$ng=isset($aRand[$i]['angle'])?$aRand[$i]['angle']:$an;
				$this->addText($s[$i],$oX+$szn,$oY,$ng,$tc,$sz,$fo);
			}
		}
		else $this->addText($s,$oX-3,$oY+$fs,$an,$this->color($cl),$fs,$fn);
		$this->create();
		exit();
	}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}
?>