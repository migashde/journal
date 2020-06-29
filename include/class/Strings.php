<?
defined('ROOT') or die('Access denied !!!');
class Strings{
	function __construct(){
		
	}
	public function rand($l,$b=true){
		$s='';$c='_-+';
		$j=0;
		for($i=1;$i<=$l;$i++){
			$r=mt_rand(0,$b?38:35);
			if(($j>2||$i==1||$i==10)&&$r>35) $r=mt_rand(0,35);
			if($r>35) $j++;
			$s.=$r<36?base_convert($r,10,36):$c[$r-36];
		}
		return $s;
	}
	public function b64encrypt($s){
		$s=str_replace('+',',',base64_encode($s));
		$l=strlen($s);$s=trim($s,'=');
		$l-=strlen($s);
		$s=strrev($s);
		return substr($s,0,3).$l.substr($s,3);
	}
	public function b64decrypt($s){
		$s=str_replace(',','+',$s);
		$l=substr($s,3,1);
		return base64_decode(strrev(substr($s,0,3).substr($s,4)).str_repeat('=',$l));
	}
	public function isHex($s){return dechex(hexdec($s))==$s;}
	public function isColor($s){
		$oCss=new Css();
		if($oCss->isColorName(strtolower($s))) return $s;
		$s=ltrim($s,'#');
		if(in_array(strlen($s),[3,6])&&$this->isHex($s)) return $s;
		return '';
	}
	public function isLight($s,$percent=50){
		$s=trim($s,'#');
		if(!(in_array(strlen($s),[3,6])&&$this->isHex($s))){
			$oCss=new Css();
			$s=$oCss->getColorCode($s);
		}
		if($s){
			$a=[];
			if(strlen($s)==3){
				$a[]=hexdec(str_repeat(substr($s,0,1),2));
				$a[]=hexdec(str_repeat(substr($s,1,1),2));
				$a[]=hexdec(str_repeat(substr($s,2,1),2));
			}
			else{
				$a[]=hexdec(substr($s,0,2));
				$a[]=hexdec(substr($s,2,2));
				$a[]=hexdec(substr($s,4,2));
			}
			$p=255*$percent/100;$z=255-$p;$m=max($a[0],$a[1],$a[2]);
			foreach($a as $i) if($m-$i>$z||$i<$p) return false;
			return true;
		}
		return false;
	}
	public function isDark($s,$percent=50){return $this->isLight($s,100-$percent);}
	public function toLatin($s){
		$a=explode('.','a.b.v.g.d.ye.yo.j.z.i.i.k.l.m.n.o.u.p.r.s.t.u.u.f.h.ts.ch.sh.sch.i.y.i.e.yu.ya.а.б.в.г.д.е.ё.ж.з.и.й.к.л.м.н.о.ө.п.р.с.т.у.ү.ф.х.ц.ч.ш.щ.ъ.ы.ь.э.ю.я');
		$a1=array_slice($a,35);$a2=array_slice($a,0,35);
		$s=str_replace($a1,$a2,$s);
		$a1=array_map('mb_strtoupper',$a1);$a2=array_map('ucfirst',$a2);
		return str_replace($a1,$a2,$s);
	}
	public function crop($s,$l=1){
		$c='utf-8';$a=[];$sl=mb_strlen($s,$c);
		for($i=0;$i<$sl;$i+=$l) $a[]=mb_substr($s,$i,$l,$c);
		return $a;
	}
	public function totime($date){
		list($y,$m,$d,$h,$i,$s)=explode('-',str_replace([' ',':'],'-',$date));
		return mktime($h,$i,$s,$m,$d,$y);
	}
	public function phone($i,$sep='-',$noLink=false){
		if($sep===true){$noLink=true;$sep='-';}
		$s=$i;
		$i=preg_replace('/[^0-9]/','',$i);
		if(strlen($i)==11&&substr($i,0,3)=='976') $i=substr($i,3);
		$i=substr($i,0,8);
		$s=preg_replace('/([0-9]{4})([0-9]{4})/','$1'.$sep.'$2',$i);
		return $noLink?$s:'<a href="tel:'.$i.'">'.$s.'</a>';
	}
	public function a2xml($a,$t=1){
		$s=$t==1?"\n".'<data>':'';
		foreach($a as $k=>$b){
			$tag=is_numeric($k)?'item':$k;
			$s.="\n".str_repeat("\t",$t).'<'.$tag.(is_numeric($k)?' key="'.$k.'"':'').'>'.(is_array($b)?$this->a2xml($b,$t+1)."\n".str_repeat("\t",$t):(is_bool($b)?($b?'true':'false'):substr($b,0,1)=='<'?'<![CDATA['.$b.']]>':$b)).'</'.$tag.'>';
		}
		return $s.($t==1?"\n".'</data>':'');
	}
	public function parseToken($s){
		return $s;
	}
	public function generateStr($l=30,$b=5,$f=2,$t=0,$c='-'){
		$r='';$mi=0;$ma=35;$k=$f*2;
		if(!is_numeric($t)||$t<0||$t>2){$c=$t;$t=0;}
		$l=floor(($l-$k)/$b)*$b+$k;
		if($t==1) $ma=9;
		elseif($t==2) $mi=10;
		$l=max($l,$k+$b);
		for($i=1;$i<=$l;$i++){
			$r.=strtoupper(base_convert(rand($mi,$ma),10,36));
			if($i==$f||$i==$l-$f||($i>$f&&$i<$l-$f&&($i-$f)%$b==0)) $r.=$c;
		}
		return trim($r,$c);
	}
	public function num2str($i,$b=false){
		$dd=0;
		if($b===2||$b===3){$dd=$b-1;$b=false;}
		$t=$i;
		$a=explode('.','.нэг.хоёр.гурав.дөрөв.тав.зургаа.долоо.найм.ес.арав.хорь.гуч.дөч.тавь.жар.дал.ная.ер.нэгэн.хоёр.гурван.дөрвөн.таван.зургаан.долоон.найман.есөн.арван.хорин.гучин.дөчин.тавин.жаран.далан.наян.ерэн.зуу.зуун.мянга.сая.тэрбум.их наяд.тунамал.их ингүүмэл.ялгаруулагч.тэг');
		if(!$i) return array_pop($a);$k=-1;$r=[];$p=$b?18:0;
		$fn=function($r,$i,$j,$b) use($a,$p){$w=[];if($i){$h=floor($i/100);$t=floor($i%100/10);$n=$i%10;if($h){$w[]=$a[$h==1?(int)$b:$h+18];$w[]=$a[!$t&&!$n&&!$j&&!$p?37:38];}if($t) $w[]=$a[$t+(!$n&&!$j?$p+9:27)];if($n&&((!$b&&$r&&($n>1||($n==1&&($h||$t))))||$b||!$r)) $w[]=$a[$n==1&&!$h&&!$t?($j?0:$p)+1:($j?$n+18:$p+$n)];if($j) $w[]=$a[$j+38].(!$r&&$p&&$j==1?'н':'');}$r=array_merge($w,$r);return $r;};
		do{$r=$fn($r,$i%1000,++$k,$i>=1000);}while($i=floor($i/1000));
		if($dd){
			$t=$t%1000;
			$n=substr(rtrim($t,'0'),-1);
			$r[]=(strlen($t)-strlen($n))<2&&(($n==1&&rtrim($t,'0')==$t)||in_array($n,[4,9]))?($dd==1?'дэх':'дүгээр'):($dd==1?'дахь':'дугаар');
		}
		$c='utf8';
		$r[0]=mb_strtoupper(mb_substr($r[0],0,1,$c),$c).mb_substr($r[0],1,6,$c);
		return join(' ',$r);
	}
	public function d_r($i,$dd=2){
		$i=$i%1000;
		$n=substr(rtrim($i,'0'),-1);
		$r=[$i];
		$r[]=(strlen($i)-strlen($n))<2&&(($n==1&&rtrim($i,'0')==$i)||in_array($n,[4,9]))?($dd==1?'дэх':'дүгээр'):($dd==1?'дахь':'дугаар');
		return join(' ',$r);
	}
	public function toStr($m){
		if(is_numeric($m)) return $this->num2str($m,3);
		else{
			$m=str_replace('/','-',$m);
			list($y,$m,$d)=explode('-',$m);
			return $y.' оны '.$m.'-р сарын '.$d.'-н'.(in_array($d%10,[1,4,9])?'ий':'ы').' өдөр';
		}
	}
	public function roman($n,$up=true){
		$n=intval($n);$r='';
		$a=['M'=>1000,'CM' =>900,'D'=>500,'CD'=>400,'C'=>100,'XC'=>90,'L'=>50,'XL'=>40,'X'=>10,'IX'=>9,'V'=>5,'IV'=>4,'I'=>1];
		foreach($a as $l=>$i){$r.=str_replace($l,floor($n/$i));$n%=$i;}
		return $up?$r:strtolower($r);
	}
}
?>