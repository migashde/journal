<?php
defined('ROOT') or die('Access denied !!!');
class Database{
	private $conn				= null;
	public  $sQuery				= '';
	private $sPrefix			= '';
	private $sSuffix			= '';
	private $sCharset			= '';
	private $sCollation			= '';
	private $sCurrTblName		= '';
	public  $sBase				= '';
	private $aConf				= [];
	private $aPgInfo			= [];
	private $aPgrKeys			= ['page'=>'pg','limit'=>'lmt'];
	private $aLinkText			= ['first'=>['&#171;','Хамгийн эхний хуудас'],'prev'=>['Өмнөх','Өмнөх хуудас'],'next'=>['Дараах','Дараагийн хуудас'],'last'=>['&#187;','Хамгийн сүүлийн хуудас'],'dot'=>'&middot;&middot;&middot;'];
	private $aTree				= [];
	private $iTime				= 0;
	private $aQueries			= [];
	private $lastTable			= '';
	private $lastId				= 0;
	public $aAffecteds			= [];
	public function __construct(){
		$aSett=$this->conf('database');
		$this->sPrefix=$aSett['prefix'];
		$this->sSuffix=$aSett['suffix'];
		$this->sCharset=$aSett['charset'];
		$this->sCollation=$aSett['collation'];
		$this->aConf=$aSett['conf'];
	}
	public function &connect(){
		if($this->coding) $this->iTime=microtime(true);
		if($this->conn) return $this;
		$a=$this->aConf;
		if(isset($a['curr'],$a[$a['curr']])) $c=$a[$a['curr']];
		else $c=array_pop($a);
		$this->sBase=$c['base'];
		$this->conn=mysqli_connect($c['host'],$c['user'],$c['pass'],$c['base'],$c['port']);
		if(!$this->conn) trigger_error(mysqli_connect_errno().'. '.mysqli_connect_error());
		if($this->conn&&$this->sCharset) mysqli_query($this->conn,'SET NAMES "'.$this->esc($this->sCharset).'"'.($this->sCollation?' COLLATE "'.$this->esc($this->sCollation).'"':''));
	}
	private function _error(){trigger_error(mysqli_errno($this->conn).'. '.mysqli_error($this->conn).'</code></p><p><b>Query: </b><code>'.$this->sQuery,E_USER_WARNING);}
    public function esc($m){
        if(is_array($m)) return array_map(['Database','esc'],$m);
    	if(!$this->conn) @$this->connect();
		if(function_exists('mysqli_real_escape_string')) $m=mysqli_real_escape_string($this->conn,$m);
		elseif(function_exists('mysqli_escape_string')) $m=mysqli_escape_string($this->conn,$m);
		else $m=addslashes($m);
        return $m;
    }
	public function query($sSql='',$isLog=false){
		if(!$sSql) $sSql=$this->sQuery;
		$this->sQuery=$sSql;
		if(!$sSql){throw new Exception('Query хоосон байна');}
		if(!$this->conn) $this->connect();
		if($this->coding) $i=microtime(true);
		$aRes=mysqli_query($this->conn,$sSql);
		if(!$aRes) $this->_error();
		if($this->coding){
			$m=round(microtime(true)-$i,6);
			$this->aQueries[]='<div style="color:#f'.str_repeat(dechex(15-min(max(round($m*10),0),15)),2).';"><pre>'.$sSql.'</pre> in <b>'.($m*1000).'</b>ms</div>';
		}
		return $aRes;
	}
	/**
	 * 0 - Numeric array
	 * 1 - One field
	 * 2 - Two field
	 * 3 - No indexed array
	 * 4 - One row
	 * 5 - Resource
	 * 6 - Assoc array
	 * 7 - Tree array
	 * 8 - Tree option
	 * 9 - as table
	 */
	public function fetch($s,$i=5){
		$i=intval($i);
		if($i>9||$i<0) $i=5;
		$h=$this->query($s);
		if($i===5) return $h;
		elseif($i==9) return $this->toGrid($h);
		$a=[];
		if($iCnt=mysqli_num_rows($h)){
			if($i==7||$i==8){
				$f=mysqli_fetch_field_direct($h,2);
				while($r=mysqli_fetch_assoc($h)){
					$mid=$r['main_id'];unset($r['main_id']);
					if(!isset($a[$mid])) $a[$mid]=[];
					$a[$mid][]=$r;
				}
				if($i==8) $a=$this->toTree($a,['val'=>$f,'lvl'=>true]);
				return $a;
			}
			else while($r=mysqli_fetch_array($h,$i<=3?MYSQLI_NUM:MYSQLI_ASSOC)){
				if($i===4||($i===3&&$iCnt==1)){$a=$r;break;}
				elseif($i===1) return $r[0];
				if($i===2) $a[$r[0]]=$r[1];
				elseif($i===3) $a[]=$r[0];
				else $a[]=$r;
			}
		}
		elseif($i===1) return 0;
		return (array)$a;
	}
	public function w($m){
		if(is_array($m)) $m=join(' AND ',$m);
		if(!$m) $m='1';
		return ' WHERE '.$m;
	}
 	public function get($s,$i=5){
 		$s=preg_replace_callback('/{([^}]+)}/i',[$this,'tbl'],$s);
 		return $this->fetch($s,$i);
 	}
	public function tbl($s){
		if(is_array($s)) $s=array_pop($s);
		$as='';
		if(strpos($s,' ')) list($s,$as)=explode(' ',$s,2);
		$this->lastTable=$s;
		return '`'.$this->sPrefix.$s.$this->sSuffix.'`'.($as?' AS '.str_ireplace('AS ','',$as):'');
	}
	public function modify($s,$a=[],$c=null,$ret=false){
		if(!is_array($a)){$c=$a;$a=null;}
		if($c&&is_numeric($c)) $c='id='.$c;
		$tbl=$s;
		$s=$this->tbl($s);
		if(!$a&&$c) $this->sQuery='DELETE FROM '.$s.' WHERE '.$c;
		else{
			if(is_array($a)&&$a) $a=$this->esc($a);
			else return null;
			if(!$c){
				$u='';
				if(isset($a['ondup'])&&$a['ondup']){$u=' ON DUPLICATE KEY UPDATE '.$this->_a2ups($a['ondup']);unset($a['ondup']);}
				$this->sQuery='INSERT INTO '.$s.'(`'.join('`,`',array_keys($a)).'`) VALUES(\''.join('\',\'',array_values($a)).'\')'.$u;
			}
			else $this->sQuery='UPDATE '.$s.' SET '.$this->_a2ups($a).' WHERE '.$c;
		}
		if($ret) return $this->sQuery;
		$res=$this->query();
		if(!$c) return $this->lastId;
		else{
			$cnt=mysqli_affected_rows($this->conn);
			$this->aAffecteds[$tbl]=$cnt;
			return $cnt;
		}
	}
	public function num($hRes){return intval(mysqli_num_rows($hRes));}
	private function _a2ups($a){
		if(!is_array($a)) return $a;
		$b=[];
		foreach($a as $k=>$v){
			if($v=='!') $w='NOT `'.$k.'`';
			elseif($v===null) $w='NULL';
			else{
				$c=substr($v,0,1);
				$s=trim(substr($v,1));
				if($c=='`') $w='\''.str_replace('\'','\\\'',$s).'\'';
				elseif($c=='@') $w='`'.$s.'`';
				else $w=is_numeric($s)&&$c=='-'?'GREATEST(0,`'.$k.'`'.$c.$s.')':(in_array($c,['+','*','/'])&&is_numeric($s)?'`'.$k.'`'.$c.$s:($c=='#'&&$s?$s:'\''.$v.'\''));
			}
			$b[]='`'.$k.'`='.$w;
		}
		return join(',',$b);
	}
	public function load($s,$c,$f='*'){
		if(is_bool($c)||!$c) return null;
		$c=is_numeric($c)?'id='.$c:(is_array($c)?join(' AND ',$c):$c);
		if(!$c) $c='1';
		return $this->fetch('SELECT '.$f.' FROM '.$this->tbl($s).($c?' WHERE '.$c:'').' LIMIT 1',($f!='*'&&!strpos($f,',')?1:4));
	}
	public function count($s,$c='1'){if(is_array($c)) $c=join(' AND ',$c);if(!$c) $c='1';return $this->fetch('SELECT COUNT(*) FROM '.$this->tbl($s).' WHERE '.$c,1);}
	public function each($h,$i=MYSQLI_ASSOC){return mysqli_fetch_array($h,$i);}
	public function pager($cnt,$a=[]){
		$p=intval(isset($a['pg'])?$a['pg']:$this->req->get($this->aPgrKeys['page'],'int',1));
		if(!$p) $p=1;
		$l=intval($this->req->get($this->aPgrKeys['limit'],'int',isset($a['lmt'])?$a['lmt']:100));
		if(!$l) $l=100;
		$t=$cnt&&is_numeric($cnt)?ceil($cnt/$l):0;
		if(isset($a['smart'])&&$p>$t) $p=$t?$t:1;
		$this->aPgInfo['from']=($p-1)*$l+1;
		$this->aPgInfo['to']=$this->aPgInfo['from']+$l-1;
		if($this->aPgInfo['to']>$cnt) $this->aPgInfo['to']=$cnt;
		$this->aPgInfo['page']=$p;
		$this->aPgInfo['cnt']=$cnt;
		$this->aPgInfo['lmt']=min($l,$this->aPgInfo['cnt']);
		$this->aPgInfo['pages']=$t;
		$this->aPgInfo=array_merge($a,$this->aPgInfo);
	}
	public function lmt(){return ' LIMIT '.(($this->aPgInfo['page']-1)*$this->aPgInfo['lmt']).','.$this->aPgInfo['lmt'];}
	public function pglinks($iOffset=5,$fixed=false,$rm=''){
		if(is_string($iOffset)){$rm=$iOffset;$iOffset=5;}
		if(is_string($fixed)){$rm=$fixed;$fixed=false;}
		$s='';static $called=false;
		if($iOffset===true){$fixed=true;$iOffset=5;}
		if($this->aPgInfo['pages']>1){
			$s.='<div class="page-link'.($fixed?' fx':'').($called?' b':'').'">';
			$a=[];
			$o=floor(($iOffset-1)/2);
			$min=$this->aPgInfo['page']>$o+1?($this->aPgInfo['pages']>$this->aPgInfo['page']+$o?$this->aPgInfo['page']-$o:max($this->aPgInfo['pages']-$iOffset+1,1)):1;
			$max=min($min+$iOffset-1,$this->aPgInfo['pages']);
			if($this->aPgInfo['page']>2) $a['first']=$this->gl(1,$rm);
			if($this->aPgInfo['page']>1) $a['prev']=$this->gl($this->aPgInfo['page']-1,$rm);
			if($min>1) $a['...']=false;
			for($i=$min;$i<=$max;$i++) $a[$i]=$i==$this->aPgInfo['page']?true:$this->gl($i,$rm);
			if($max<$this->aPgInfo['pages']) $a['....']=false;
			if($this->aPgInfo['page']<$this->aPgInfo['pages']) $a['next']=$this->gl($this->aPgInfo['page']+1,$rm);
			if($this->aPgInfo['page']<$this->aPgInfo['pages']-1) $a['last']=$this->gl($this->aPgInfo['pages'],$rm);
			foreach($a as $t=>$l){
				$b=isset($this->aLinkText[$t]);
				$s.=sprintf(!is_bool($l)?'<a href="'.$l.'"'.($b?' class="'.$t.'" title="'.$this->aLinkText[$t][1].'"':'').'>%s</a>':($l?'<b>%s</b>':'<i>%s</i>'),$b?$this->aLinkText[$t][0]:(substr($t,0,3)=='...'?$this->aLinkText['dot']:(is_numeric($t)?number_format($t):$t)));
			}
			$s.='</div>';
		}
		$called=true;
		return $s;
	}
	private function gl($i,$rm=''){
		if(is_numeric($this->aPgrKeys['page'])||!$this->aPgrKeys['page']){
			if(!$this->aPgrKeys['page']) $k=1;
			else $k=$this->aPgrKeys['page'];
			$a=$this->req->url('dirs');
			$a[$k]=$i;
			$u=[join('/',$a),'keep'];
		}
		else $u=['+'=>[$this->aPgrKeys['page']=>$i],'-'=>$rm];
		return rawurldecode($this->req->url($u));
	}
	public function pginfo($s){return isset($this->aPgInfo[$s])?$this->aPgInfo[$s]:null;}
	public function pgdisp($s1='',$s2='',$private=false){
		if($s1===true){$private=true;$s1='';}
		if($s2===true){$private=true;$s2='';}
		if(!$this->aPgInfo['cnt']) return '';
		$s='';
		if(!$private){
			if(!$s1) $s1='Нийт %s';
			elseif(strpos($s1,'%s')===false) $s1.=' %s';
			$s.='<span>'.sprintf($s1,'<b>'.number_format($this->aPgInfo['cnt']).'</b>');
			if($this->aPgInfo['pages']>1){
				if(!$s2) $s2='%s-г харуулав';
				elseif(strpos($s2,'%s')===false) $s2=' %s'.$s2;
				$s.='. &nbsp; '.sprintf($s2,number_format($this->aPgInfo['from']).($this->aPgInfo['from']<$this->aPgInfo['to']?($this->aPgInfo['to']-$this->aPgInfo['from']==1?', ':' - ').number_format($this->aPgInfo['to']):''));
			}
			$s.='</span>';
		}
		if($this->pginfo('cnt')>2){
			$lmts=[10,20,30,50,100];
			if(isset($this->aPgInfo['max'])&&$this->aPgInfo['max']>100) while($this->aPgInfo['max']>max($lmts)) $lmts[]=max($lmts)+50;
			if(!in_array($this->aPgInfo['lmt'],$lmts)) $lmts[]=$this->aPgInfo['lmt'];
			sort($lmts);
			if($this->pginfo('cnt')>current($lmts)){
				$aLmt=[];
				foreach($lmts as $i) $aLmt[$i]=$i;
				$h='<select onchange="location.href=\''.$this->req->url(['+'=>[$this->aPgrKeys['limit']=>'{lmt}'],'-'=>'pg']).'\'.replace(\'{lmt}\',this.value)">'.$this->html->options($aLmt,$this->aPgInfo['lmt']).'</select>';
				$s.='<div>Хуудас бүрт '.$h.($private?'':'-р хувааж '.number_format($this->aPgInfo['pages']).' хуудсанд харуулав').'</div>';
			}
		}
		return $s?'<div class="page-info">'.$s.'</div>':'';
	}
	public function toTree($a,$b=[],$k=0,$l=0){
		if(!$k) $this->aTree=[];
		if(is_array($a)&&isset($a[$k])&&is_array($a[$k])){
			foreach($a[$k] as $d){
				if(isset($b['val'])){
					if(strpos($b['val'],',')){
						$t=explode(',',$b['val']);
						$v=[];
						foreach($t as $f) if(isset($d[$f])) $v[$f]=$d[$f];
					}
					elseif(isset($d[$b['val']])) $v=($l&&isset($b['lvl'])?str_repeat(' &nbsp;',$l*4).($b['lvl']===true?' &#8627; ':$b['lvl']):'').$d[$b['val']];
					else $v=$d;
				}
				else $v=$d;
				if(isset($b['lvl'],$b['fld'])){
					$c=explode(',',$b['fld']);
					foreach($c as $f) if(isset($v[$f])) $v[$f]=($l?str_repeat(' &nbsp;',$l*4).($b['lvl']===true?' &#8627; ':$b['lvl']):'').$v[$f];
				}
				if(isset($b['key'],$d[$b['key']])) $k=$d[$b['key']];
				elseif(isset($d['id'])) $k=$d['id'];
				else $k=count($this->aTree);
				$this->aTree[$k]=$v;
				if(isset($a[$k])) $this->toTree($a,$b,$k,$l+1);
			}
		}
		return $this->aTree;
	}
	public function __destruct(){
		if($this->conn) mysqli_close($this->conn);
		if(0&&$this->coding&&$this->aQueries){
			$this->aQueries=array_map(function($v){$v=preg_replace('/(FROM|JOIN|UPDATE|INTO) \`([^\`]+)\`/i','\\1 <span>`\\2`</span>',$v);return str_ireplace([' FROM ',' WHERE ',' ORDER BY ',' GROUP BY ',' LIMIT ',' LEFT JOIN ',' INNER JOIN ',' OUTER JOIN ',' SET ',' VALUES ',' AND ',' OR '],["\n\tFROM ","\n\tWHERE ","\n\tORDER BY ","\n\tGROUP BY ","\nLIMIT ","\n\t\tLEFT JOIN ","\n\t\tINNER JOIN ","\n\t\tOUTER JOIN ","\n\tSET ","\n\tVALUES ","\n\t\tAND ","\n\t\tOR "],$v);},$this->aQueries);
			echo '<div class="db-log"><div><div>Query time: '.round((microtime(true)-$this->iTime)*1000,6).'ms | '.count($this->aQueries).' queries run</div><ol class="queries"><li>'.join('</li><li>',$this->aQueries).'</li></ol></div></div>';
		}
	}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}
?>