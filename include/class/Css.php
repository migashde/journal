<?php 
class Css{
	private $a			= [];
	private $aData		= [];
	private $sCode		= '';
	private $minimize	= false;
	private $aSpecials	= ['co','z','fm','fw','fh'];
	private $result		= '';
	private $allRes		= '';
	public  $ext		= 'cs';
	private $measure	= 'rem';
	private $cssExt		= 'css';
	private $beautify	= false;
	private $path		= '';
	private $pre		= '';
	private $only		= '';
	private $aPrefix	= ['ms',					'khtml',				'webkit',					'o',						'moz',					''];
	private $both		= [
							'r'=>'right',			'l'=>'left',			't'=>'top',					'b'=>'bottom'
						];
	private $right		= [
							'n'=>'none',			'bl'=>'block',			'a'=>'absolute',			'au'=>'auto',				'h'=>'hidden',			'v'=>'visible',
							'ib'=>'inline-block',	'tb'=>'table',			're'=>'relative',			's'=>'static',				'f'=>'fixed',			'no'=>'normal',
							'c'=>'center',			'nw'=>'nowrap',			'p'=>'pointer',				'so'=>'solid',				'do'=>'dotted',			'da'=>'dashed',
							'in'=>'inherit',		'!'=>'!important',		'tr'=>'transparent',		'nr'=>'no-repeat',			'rx'=>'repeat-x',		'ry'=>'repeat-y',
							'rp'=>'repeat',			'sc'=>'scroll',			'u'=>'underline',			'm'=>'middle',				'j'=>'justify',			'up'=>'uppercase',
							'tc'=>'table-cell',		'to'=>'table-row',		'tl'=>'table-column',		'is'=>'inset',				'op'=>'opacity',		'bd'=>'bold',
							'nd'=>'no-drop',		'pr'=>'progress',		'bh'=>'both',				'bb'=>'border-box',			'i'=>'italic',			'sm'=>'small-caps',
							'cs'=>'closest-side',	'p3'=>'preserve-3d',	'cb'=>'content-box',		'pb'=>'padding-box',		'it'=>'initial',		'ln'=>'linear',
							'es'=>'ease',			'ei'=>'ease-in',		'eo'=>'ease-out',			'io'=>'ease-in-out',		'if'=>'infinite',		'st'=>'stretch',
							'fs'=>'flex-start',		'fe'=>'flex-end',		'bs'=>'baseline',			'sb'=>'space-between',		'sa'=>'space-around',	'se'=>'step-end',
							'ss'=>'step-start',		'el'=>'ellipsis',		'cl'=>'clip',				'db'=>'double',				'gr'=>'groove',			'os'=>'outset',
							'rd'=>'ridge',			'ob'=>'oblique',		'wr'=>'wrap-reverse',		'rr'=>'row-reverse',		'cr'=>'column-reverse',	'cm'=>'column',
							'sp'=>'separate',		'hi'=>'hide',			'sh'=>'show',				'ex'=>'expanded',			'sx'=>'semi-expanded',	'ee'=>'extra-expanded',
							'ue'=>'ultra-expanded',	'cd'=>'condensed',		'sd'=>'semi-condensed',		'ed'=>'extra-condensed',	'ud'=>'ultra-condensed','av'=>'avoid',
							'aw'=>'always',			'bw'=>'break-word',		'su'=>'super',				'an'=>'alternate',			'rs'=>'reverse',		'fw'=>'forwards',
							'bk'=>'backwards',		'pd'=>'paused',			'rg'=>'running',			'cv'=>'cover',				'ca'=>'capitalize',		'de'=>'default',
							'cp'=>'collapse',		'un'=>'unset',			'ro'=>'round',				'pc'=>'space',				'fi'=>'fill',			'fr'=>'first',
							'ls'=>'last',			'ae'=>'allow-end',		'fo'=>'force-end',			'lt'=>'line-through',		'ov'=>'overline',		'lw'=>'lowercase',
							'tt'=>'text-top',		'xb'=>'text-bottom',	'pw'=>'pre-wrap',			'pe'=>'pre',				'pl'=>'pre-line',		'br'=>'break-all',
							'ke'=>'keep-all',		'aa'=>'antialiased',	'po'=>'portrait',			'la'=>'landscape',			'il'=>'inline',			'pv'=>'progressive',
							'rl'=>'interlace',		'me'=>'medium',			'hr'=>'col-resize',			'vr'=>'row-resize',			'ch'=>'crosshair',		'wa'=>'wait',
							'ws'=>'sw-resize',		'er'=>'se-resize',		'co'=>'contain',			'fl'=>'flex',				'sv'=>'space-evenly',	'wp'=>'wrap',
							'ifl'=>'inline-flex'
						];
	private $left		= [
							'p'=>'padding',			'm'=>'margin',			'bo'=>'border',				'ba'=>'background',			'd'=>'display',			'cu'=>'cursor',
							'c'=>'color',			'po'=>'position',		'a'=>'attachment',			'w'=>'width',				'h'=>'height',			're'=>'repeat',
							's'=>'style',			'de'=>'decoration',		'tr'=>'transform',			'tx'=>'text',				'si'=>'size',			'we'=>'weight',
							'v'=>'visibility',		'o'=>'overflow',		'ws'=>'white-space',		'i'=>'image',				'fl'=>'float',			'f'=>'font',
							'fs'=>'font-size',		'sh'=>'shadow',			'ra'=>'radius',				'al'=>'align',				'sp'=>'spacing',		've'=>'vertical',
							'ls'=>'list-style',		'ts'=>'font-style',		'fm'=>'font-family',		'z'=>'z-index',				'ol'=>'outline',		'ti'=>'text-indent',
							'lh'=>'line-height',	'co'=>'content',		'rs'=>'resize',				'cl'=>'clear',				'va'=>'variant',		'or'=>'origin',
							'tl'=>'table-layout',	'cn'=>'counter',		'rt'=>'reset',				'ic'=>'increment',			'cs'=>'caption-side',	'cp'=>'collapse',
							'ec'=>'empty-cells',	'ad'=>'adjust',			'bi'=>'page-break-inside',	'pb'=>'page-break-before',	'pa'=>'page-break-after','sr'=>'source',
							'sl'=>'slice',			'n'=>'nav',				'dw'=>'down',				'id'=>'index',				'le'=>'letter',			'od'=>'order',
							'of'=>'offset',			'qu'=>'quotes',			'wb'=>'word-break',			'ww'=>'word-wrap',			'sk'=>'speak',			'fw'=>'font-weight',
							'ta'=>'text-align',		'fr'=>'flex-wrap',		'fg'=>'flex-grow',			'fh'=>'flex-shrink',		'fb'=>'flex-basis',		'fd'=>'flex-direction',
							'ff'=>'flex-flow',		'jc'=>'justify-content','ai'=>'align-items',		'ac'=>'align-content'
						];
	private $extended	= [
							'br'=>'border-radius',	'bs'=>'box-shadow',		'bc'=>'background-clip',	'ts'=>'text-shadow',		'tr'=>'transition',		'us'=>'user-select',
							'um'=>'user-modify',	'tf'=>'transform',		'to'=>'transform-origin',	'am'=>'animation',			'bz'=>'box-sizing',		'bi'=>'background-image',
							'op'=>'opacity',		'xo'=>'text-overflow',	'pr'=>'perspective',		'po'=>'perspective-origin',	'fs'=>'transform-style','bv'=>'backface-visibility',
							'tt'=>'transition-timing-function',				'tp'=>'transition-property','td'=>'transition-duration','tl'=>'transition-delay','ad'=>'animation-delay',
							'ar'=>'animation-direction',					'au'=>'animation-duration',	'af'=>'animation-fill-mode','ac'=>'animation-iteration-count',
							'an'=>'animation-name',	'ap'=>'animation-play-state',	'at'=>'animation-timing-function','as'=>'align-self','ai'=>'align-items',
							'al'=>'align-content',	'tz'=>'tab-size',		'cl'=>'columns',			'cc'=>'column-count',		'cg'=>'column-gap',
							'cr'=>'column-rule',	'cf'=>'column-fill',	'fi'=>'filter',				'cw'=>'column-width',		'bi'=>'border-image',	'hp'=>'hanging-punctuation',
							'xl'=>'text-align-last','ds'=>'text-decoration-style','dl'=>'text-decoration-line','dc'=>'text-decoration-color',				'pp'=>'appearance',
							'sm'=>'font-smoothing'
						];
	private $extendedV	= [
							'zi'=>'zoom-in',		'zo'=>'zoom-out',		'lg'=>'linear-gradient',	'cg'=>'grab',
							'cb'=>'grabbing',		'rg'=>'radial-gradient'
						];
	private $fns		= [
							'ct'=>'contrast',		'hr'=>'hue-rotate',		'bl'=>'blur',				'gs'=>'grayscale',			'sc'=>'scale',			'bn'=>'brightness',
							'sr'=>'saturate',		'sp'=>'sepia',			'ro'=>'rotate',				'rx'=>'rotateX',			'ry'=>'rotateY',		'rz'=>'rotateZ',
							'tr'=>'translate',		'tx'=>'translateX',		'ty'=>'translateY',			'tz'=>'translateZ',			'sx'=>'skewX',			'sy'=>'skewY',
							'sk'=>'skew',			'sz'=>'skewZ',			'cb'=>'cubic-bezier',		'st'=>'steps',				're'=>'rect',			'cx'=>'scaleX',
							'cy'=>'scaleY',			'cz'=>'scaleZ',			'ma'=>'matrix',				'ca'=>'calc',				'm3'=>'matrix3d',		't3'=>'translate3d',
							'c3'=>'scale3d',		'r3'=>'rotate3d',		'pe'=>'perspective',		'ds'=>'drop-shadow'
						];
	private $fType		= ['t'=>['truetype','ttf'],	'w'=>'woff',	'w2'=>'woff2',	'e'=>['embedded-opentype','eot'],	'o'=>['opentype','otf'],'s'=>'svg','j'=>'json'];
	private $names		= [
							'aliceblue'=>'f0f8ff',	'aqua'=>'0ff',			'antiquewhite'=>'faebd7',	'aquamarine'=>'7fffd4',		'azure'=>'f0ffff',		'beige'=>'f5f5dc',
							'bisque'=>'ffe4c4',		'black'=>'0',			'blanchedalmond'=>'ffebcd',	'blue'=>'00f',				'blueviolet'=>'8a2be2',	'brown'=>'a52a2a',
							'burlywood'=>'deb887',	'cadetblue'=>'5f9ea0',	'chartreuse'=>'7fff00',		'chocolate'=>'d2691e',		'coral'=>'ff7f50',		'cornflowerblue'=>'6495ed',
							'cornsilk'=>'fff8dc',	'crimson'=>'dc143c',	'cyan'=>'0ff',				'darkblue'=>'00008b',		'darkcyan'=>'008b8b',	'darkgoldenrod'=>'b8860b',
							'darkgray'=>'a9',		'darkgreen'=>'006400',	'darkkhaki'=>'bdb76b',		'darkmagenta'=>'8b008b',	'darkorange'=>'ff8c00',	'darkolivegreen'=>'556b2f',
							'darkorchid'=>'9932cc',	'darkred'=>'8b0000',	'darksalmon'=>'e9967a',		'darkseagreen'=>'8fbc8f',	'darkviolet'=>'9400d3',	'darkslateblue'=>'483d8b',
							'deeppink'=>'ff1493',	'deepskyblue'=>'00bfff','darkslategray'=>'2f4f4f',	'darkturquoise'=>'00ced1',	'dimgray'=>'69',		'dodgerblue'=>'1e90ff',
							'firebrick'=>'b22222',	'floralwhite'=>'fffaf0','forestgreen'=>'228b22',	'fuchsia'=>'f0f',			'gainsboro'=>'dc',		'ghostwhite'=>'f8f8ff',
							'gold'=>'ffd700',		'goldenrod'=>'daa520',	'gray'=>'80',				'green'=>'008000',			'greenyellow'=>'adff2f','honeydew'=>'f0fff0',
							'hotpink'=>'ff69b4',	'indianred'=>'cd5c5c',	'indigo'=>'4b0082',			'ivory'=>'fffff0',			'khaki'=>'f0e68c',		'lavender'=>'e6e6fa',
							'lawngreen'=>'7cfc00',	'lightblue'=>'add8e6',	'lemonchiffon'=>'fffacd',	'lavenderblush'=>'fff0f5',	'lightcoral'=>'f08080',	'lightcyan'=>'e0ffff',
							'lightgray'=>'d3',		'lightgreen'=>'90ee90',	'lightpink'=>'ffb6c1',		'lightsalmon'=>'ffa07a',	'lightskyblue'=>'87cefa','lightseagreen'=>'20b2aa',
							'lightslategray'=>'789','lightyellow'=>'ffffe0','lime'=>'0f0',				'limegreen'=>'32cd32',		'linen'=>'faf0e6',		'magenta'=>'f0f',
							'maroon'=>'800000',		'mediumblue'=>'0000cd',	'lightsteelblue'=>'b0c4de',	'mediumorchid'=>'ba55d3',	'mediumpurple'=>'9370db','mediumaquamarine'=>'66cdaa',
							'mediumseagreen'=>'3cb371',						'mediumslateblue'=>'7b68ee','mediumspringgreen'=>'00fa9a',						'mediumturquoise'=>'48d1cc',
							'mediumvioletred'=>'c71585',					'midnightblue'=>'191970',	'mintcream'=>'f5fffa',		'mistyrose'=>'ffe4e1',	'moccasin'=>'ffe4b5',
							'navajowhite'=>'ffdead','navy'=>'000080',		'oldlace'=>'fdf5e6',		'olive'=>'808000',			'olivedrab'=>'6b8e23',	'orange'=>'ffa500',
							'orangered'=>'ff4500',	'orchid'=>'da70d6',		'palegoldenrod'=>'eee8aa',	'palegreen'=>'98fb98',		'paleturquoise'=>'afeeee','palevioletred'=>'db7093',
							'papayawhip'=>'ffefd5',	'peachpuff'=>'ffdab9',	'peru'=>'cd853f',			'pink'=>'ffc0cb',			'plum'=>'dda0dd',		'powderblue'=>'b0e0e6',
							'purple'=>'800080',		'rebeccapurple'=>'639',	'red'=>'f00',				'rosybrown'=>'bc8f8f',		'royalblue'=>'4169e1',	'saddlebrown'=>'8b4513',
							'salmon'=>'fa8072',		'sandybrown'=>'f4a460',	'seagreen'=>'2e8b57',		'seashell'=>'fff5ee',		'sienna'=>'a0522d',		'silver'=>'c0',
							'skyblue'=>'87ceeb',	'slateblue'=>'6a5acd',	'slategray'=>'708090',		'snow'=>'fffafa',			'springgreen'=>'00ff7f','steelblue'=>'4682b4',
							'tan'=>'d2b48c',		'teal'=>'008080',		'thistle'=>'d8bfd8',		'tomato'=>'ff6347',			'turquoise'=>'40e0d0',	'violet'=>'ee82ee',
							'wheat'=>'f5deb3',		'white'=>'f',			'whitesmoke'=>'f5',			'yellow'=>'ff0',			'yellowgreen'=>'9acd32','lightgoldenrodyellow'=>'fafad2'
						];
	private $aMediaFeatures	= [
							'ar'=>'aspect-ratio',	'c'=>'color',			'ci'=>'color-index',		'dr'=>'device-aspect-ratio','dh'=>'device-height',	'dw'=>'device-width',
							'g'=>'grid',			'h'=>'height',			'xar'=>'max-aspect-ratio',	'xc'=>'max-color',		'xci'=>'max-color-index','xda'=>'max-device-aspect-ratio',
							'xdh'=>'max-device-height','xdw'=>'max-device-width','xh'=>'max-height',	'xm'=>'max-monochrome',		'xr'=>'max-resolution',	'xw'=>'max-width',
							'nar'=>'min-aspect-ratio','nc'=>'min-color',	'nci'=>'min-color-index',	'nda'=>'min-device-aspect-ratio','ndw'=>'min-device-width',
							'ndh'=>'min-device-height','nh'=>'min-height',	'nm'=>'min-monochrome',		'nr'=>'min-resolution',		'nw'=>'min-width',		'm'=>'monochrome',
							'o'=>'orientation',		'ob'=>'overflow-block',	'oi'=>'overflow-inline',	'r'=>'resolution',			'uf'=>'update-frequency','w'=>'width','s'=>'scan'
						];
	private $aMediaTypes	= [
							's'=>'screen',			'a'=>'all',				'p'=>'print',				'e'=>'speech'
						];
	private $aImgExt		= [
							'p'=>'png',				'g'=>'gif',				'j'=>'jpg',					'e'=>'jpeg',				's'=>'svg',				'i'=>'ico'
						];
	private $aPreChars	= ['>','~','+',':','-',' ','^','\\','['];
	public function __construct($p=''){
		$this->confFile=CONF.'css.php';
		$this->aData=require $this->confFile;
		if($p){if(substr($p,0,1)=='@') $this->read(str_replace('/',DS,$p));else $this->sCode=$p;}
	}
	public function code($s){$this->sCode=$s;return $this;}
	public function read($p){$this->path=trim($p,'/@');$p=$this->p();$this->sCode=file_exists($p)?file_get_contents($p):'';return $this;}
	public function write($force=false){if(!$this->path){if($force)$this->path=time();else return $this->output();}$a=explode(DS,str_replace('/',DS,$this->path));$p=CSS.$this->path.'.css';$p1=$this->p();$b=$force||!file_exists($p)||(file_exists($p1)&&(filemtime($p1)>=filemtime($p)||filemtime($p1)<=filemtime($this->confFile)));if($b){$fn=array_pop($a);$d=rtrim(CSS.join(DS,$a),DS);if(!is_dir($d)){mkdir($d,0777,true);$this->secure($d);}else chmod($d,0777);$h=fopen($p,'w+');fwrite($h,$this->get());fclose($h);chmod($d,0755);$this->clear();return $this;}}
	public function output(){echo $this->get();$this->clear();return $this;}
	public function get(){if($this->sCode) $a=explode('@CSS',$this->sCode);foreach($a as $k=>$s){if(!$k%2){$this->sCode=$s;$this->convert();}else $this->result=$s;$this->allRes.=$this->result;}if($this->minimize||$this->beautify) $this->allRes=str_replace(["\n","\t","\r",'  ','	'],'',$this->allRes);if($this->beautify) $this->allRes=str_replace([';','{',"\t}",',','>','+','~','. ~ '],[";\n\t"," {\n\t","}\n",', ',' > ',' + ',' ~ ','.~'],$this->allRes);return $this->allRes;}
	public function clear(){$this->sCode=$this->result=$this->allRes=$this->path=$this->pre='';return $this;}
	public function reset(){$this->clear()->aData=$thia->a=[];$this->measure='px';$this->ext='cs';$this->minimize=true;return $this;}
	public function unpack(){$this->minimize=false;return $this;}
	public function beauty(){if($this->beautify=!$this->beautify) $this->minimize=false;return $this;}
	public function ext($s=''){$this->ext=$s;return $this;}
	public function measure($s){$this->measure=$s;return $this;}
	public function params($m){if(is_array($m)){$this->aData=array_merge($this->aData,$m);return $this;}$a=explode(',',$m);foreach($a as $b){if(!$b) continue;list($var,$val)=explode('=',$b,2);$this->aData[trim($var,'$')]=strpos($val,'>')?explode('>',$val):$val;}return $this;}
	public function convert(){error_reporting(0);ini_set('display_errors','off');$a=explode('|',str_replace(["\n","\t","\r",'	'],'',$this->sCode));if(!$a) return $this;$t=count($a);$c='';if($t%2==0||substr($a[0],0,1)=='$') $this->params(array_shift($a));if($t>1){for($i=0;$i<$t;$i++){$pre=$this->pre;$sp=substr($a[$i],0,3);if(in_array($sp,['@kf','@ff','@im','@ch','@md','@me'])){$c.=$sp=='@me'&&(++$i)?'}':$this->{str_replace('@','_',$sp)}(trim(substr($a[$i],3)),$a[++$i]);continue;}$b=explode(',',$a[$i]);$e=[];foreach($b as $d){if(in_array($f=substr($d,0,1),['/','+'])){$s=$e[]=$pre.$this->_parse(substr($d,1));if($f=='/') $this->pre=$s;}else $e[]=$this->pre=$this->_parse($d);}$i++;if(isset($a[$i]))$c.=join(',',$e).$this->_decode($a[$i])->_get();}}$this->result=$c;unset($c,$a);return $this;}
	public function secure($p){$h=fopen($p.DS.'.htaccess','w+');fwrite($h,"Options -Indexes");fclose($h);$h=fopen($p.DS.'index.html','w+');fwrite($h,'Go away');fclose($h);return true;}
	public function decode($s){$this->_decode($s);return join(';',$this->a);}
	public function isColorName($s){return isset($this->names[$s]);}
	public function getColorCode($s){return isset($this->names[$s])?$this->names[$s]:'';}
	private function p(){return CSDIR.$this->path.($this->ext?'.'.$this->ext:'');}
	private function _parse($s){if(strpos($s,'$')!==false){$a=$this->aData;$b=explode('$',$s);$s=array_shift($b);foreach($b as $i=>$p){preg_match('/([a-zA-Z_]*)/',$p,$m);$var=$m[1];$p=substr($p,strlen($var));preg_match('/([0-9]*)/',$p,$m);$ind=$m[1];if(isset($a[$var])&&$a[$var]&&(($is=is_array($a[$var]))&&is_numeric($i=intval($ind))&&isset($a[$var][$i])||!is_array($a[$var]))) $s.=$is?$a[$var][$i]:$a[$var];$s.=substr($p,strlen($ind));}}return $s;}
	private function _get(){$c='{'.($this->a?join(';',$this->a).';':'').'}'."\n";$this->a=[];if($this->beautify) $c=str_replace(':',': ',$c);return $c;}
	private function _decode($s){if($s){$a=explode(',',$s);foreach($a as $p){if(!$p) continue;$v=0;if(strpos($p,'=')) list($s,$v)=explode('=',$p,2);else $s=$p;$this->_calc(str_replace('.',',',$s),is_int($v)?ltrim($v,'0'):$v);}}return $this;}
	private function _calc($s,$v='0'){$r=false;if(in_array($s,$this->aSpecials)) $r=true;if(!$r) $v=str_replace(['.',':'],[',','.'],$v);if(substr($s,0,1)=='-'&&strlen($s)<4){$this->a[]=$this->_extend(substr($s,1),$v);return;}$s=$this->_q($s);$fv=substr($v,0,1);$cv=substr($v,1);$b=false;if(($fv=='-'&&isset($this->extendedV[substr($cv,0,2)]))||($b=($fv=='$'&&isset($this->aData[$cv])&&substr($this->aData[$cv],0,1)=='-'&&isset($this->extendedV[substr($this->aData[$cv],0,2)])))) return $this->_extendV($s,$b?$this->aData[$cv]:$v);$this->a[]=$s.':'.($r?str_replace('&',',',$v):$this->_rr($v));return $this;}
	private function _q($s){$p=explode(',',$s);$s='';foreach($p as $k) $s.=($s?'-':'').$this->_l($k);return $s;}
	private function _extendV($s,$v){$r=[];foreach(explode('&',$v) as $v){$c=substr(($vv=ltrim($v,'-')),0,2);if(!isset($this->extendedV[$c])) $r[]=$this->_rr($v);else{$a=$b=[];if(strlen($vv)>2){$a=explode(';',substr($vv,2));foreach($a as $k=>$v){$q=explode(',',$v);$t=[];foreach($q as $v) $t[]=$this->_r(str_replace('`',';',$v));$b[$k]=join(' ',$t);}}$r[]=$this->extendedV[$c].($b?'('.join(',',$b).')':'');}}foreach($this->aPrefix as $g) $this->a[]=$s.':'.($g?'-'.$g.'-':'').join(',',$r);return $this;}
	private function _rr($v){$a=explode('&',$v);$v='';foreach($a as $r){if($v) $v.=',';$w='';foreach(explode(',',$r) as $k) $w.=($w!=''?(substr($k,0,1)=='@'?'-':' '):'').$this->_r($k);$v.=$w;}return trim($v);}
	private function _kf($fn,$c){$r='';$t='';$a=explode('->',$c);$this->only='moz';foreach($a as $l){list($k,$cs)=explode('=>',$l);$ak=explode(';',$k);foreach($ak as $k=>$v) $ak[$k]=(is_numeric($v)?$v.'%':$v);$t.=join(',',$ak).$this->_decode($cs)->_get();}foreach($this->aPrefix as $p){$pre=($p?'-'.$p.'-':$p);$r.='@'.$pre.'keyframes '.$fn.'{'.($p=='moz'?$t:str_replace('-moz-',$pre,$t)).'}';}$this->only='';return $r;}
	private function _ff($fn,$c){
		$a=explode(',',$c);
		$p=isset($a[1])&&$a[1]?rtrim($a[1],'/'):'';
		$l=strlen($p)-strlen(trim($p,']'));
		$l=str_repeat(']',$l);
		$p=trim($p,']');
		$r='@font-face{'.$this->_l('fm').':"'.$fn.'";';
		$s=$a[0];
		if($p&&strpos($p,'@')!==false) list($p,$fn)=explode('@',$p);
		if($p) $p.='/';
		if(strpos($a[0],'#')!==false){$s=str_replace('#','',$s);$r.='src:'.$this->_font($l.'#'.$p.$fn).';';}
		if($s){$t=[];for($i=0;$i<strlen($s);$i++) $t[]=substr($s,$i,1).$p.$fn;$r.='src:'.$this->_font($l.join(']',$t)).';';}
		$b=['ts','f,we'];
		for($i=2;$i<4;$i++) $r.=$this->_q($b[$i-2]).':'.$this->_rr(isset($a[$i])&&$a[$i]?$a[$i]:'no').';';
		return $r.'}';
	}
	private function _im($fn,$p){
		if($fn){
			$oCss=new Css('@'.$fn);
			$oCss->write();
		}
		return '@import url("'.$p.'");'."\n";
	}
	private function _ch($fn,$c){return '@charset "'.strtoupper($c).'";';}
	private function _md($fn,$s){
		$a=explode(',',$s);
		$s='';$tmp=[];
		foreach($a as $b){
			$c=explode('&',$b);
			$t=[];
			foreach($c as $d){
				if(strpos($d,'=')||($r=in_array($d,['g','m']))){
					if($r){$k=$d;$v='';}
					else list($k,$v)=explode('=',$d,2);
					$t[]='('.(isset($this->aMediaFeatures[$k])?$this->aMediaFeatures[$k]:$k).(in_array($k,['g','m'])?'':':'.($this->aMediaFeatures[$k]&&(strpos($k,'h')!==false||strpos($k,'w')!==false||$k=='o'||$k=='s')?$this->_r($v):$v)).')';
				}
				else{
					$k=substr($d,0,1);$q='';
					if($k=='!') $q='not ';
					elseif($k=='#') $q='only ';
					$d=trim($d,'#!');
					if(!$d) $d='s';
					$t[]=$q.isset($this->aMediaTypes[$d])?$this->aMediaTypes[$d]:$d;
				}
			}
			$tmp[]=join(' and ',$t);
		}
		return '@media '.trim(join(',',$tmp)).'{';
	}
	private function _l($s){if($b=(substr($s,0,1)=='*')) $s=ltrim($s,'*');$c='';$p=explode(',',$s);foreach($p as $k) $c.=($c?'-':'').(isset($this->left[$s])?$this->left[$s]:(isset($this->both[$s])?$this->both[$s]:str_replace(';',',',$s)));return ($b?'*':'').$c;}
	private function _r($v){
		if(!$v) return 0;
		$f=substr($v,0,1);
		if($f!='('&&$f!=']'&&$f!='^'&&strpos($v,'/')){
			$a=explode('/',$v);
			foreach($a as $k=>$b) $a[$k]=$this->_r($b);
			return join('/',$a);
		}
		$c=substr($v,1);
		if($f=='('){
			$a=$this->aData;
			eval('$r='.preg_replace_callback('/\$([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/',function($m) use($a){return isset($a[$m[1]])?(is_array($a[$m[1]])?'$a[\''.$m[1].'\']':$a[$m[1]]):0;},str_replace(';',',',substr($c,0,strlen($c)-1))).';');
			return $this->_r($r);
		}
		if($f=='$'){
			$r='$this->aData';
			$v=substr($v,1);
			if(strpos($v,'[')){
				$a=explode('[',str_replace([']','(',')'],['','['],$v));
				if(strpos($v,'(')) $op=array_pop($a);
				foreach($a as $k) $r.='['.(!is_numeric($k)?'\''.$k.'\'':$k).']';
			}
			else $r.='[\''.$v.'\']';
			eval('$r=isset('.$r.')?'.$r.':\'notset\';');
			if(isset($op)) $r=$this->cop($r,$op);
			return $this->_r($r);
		}
		if($f=='^'){
			$l=strlen($c)-strlen($c=ltrim($c,'^'));
			list($e,$c)=explode('/',$c,2);
			list($c,$suf)=explode('?',$c,2);
			return 'url("'.str_repeat('../',$l).'img/'.$c.'.'.$this->aImgExt[$e].($suf?'?'.$suf:'').'")';
		}
		if($f=='?') return $this->_fn($c);
		if($f=='@') return isset($this->extended[$c])?$this->extended[$c]:$this->_q(str_replace('-',',',$c));
		if($f==']') return $this->_font($c);
		if($f!='0'&&!strpos($v,'e')&&is_numeric($v)) return $v==0?0:($v>2000?$v:$v.$this->measure);
		if($f=='#'&&strlen($c)<3) $v=$f.str_repeat($c,3);
		if($f=='~') return str_replace(';',',',$c);
		if(in_array(strlen($v),[3,6])&&strtolower(ltrim($v,'0'))==dechex(hexdec(strtolower($v)))) return '#'.strtoupper($v);
		if(in_array($f,['r','h'])&&strpos($c,';')){
			$a=explode(';',$c,4);
			if($b=isset($a[3])) $a[3]/=100;
			return ($f=='r'?'rgb':'hsl').($b?'a':'').'('.join(',',$a).')';
		}
		return isset($this->right[$v])?$this->right[$v]:$this->_l($v);
	}
	private function _fn($v){
		$fn=substr($v,0,2);
		$a=[];
		foreach(explode('`',substr($v,2)) as $k=>$arg) $a[]=str_replace(':','.',$arg).(substr($arg,-1)!='%'?$this->_fnSuf($fn,$k):'');
		return (isset($this->fns[$fn])?$this->fns[$fn]:$fn).'('.join(',',$a).')';
	}
	private function _fnSuf($fn,$n=null){
		if(in_array($fn,['ct','gs','bn','sr','sp'])) return '%';
		if(in_array($fn,['tr','tx','ty','tz','t3','re','bl'])||($fn=='ds'&&$n<3)) return $this->measure;
		if(in_array($fn,['hr','ro','rx','ry','rz','sk','sz','sx','sy'])||($fn=='r3'&&$n==3)) return 'deg';
		return '';
	}
	private function _font($s){
		$full=strpos($s,'*')!==false;
		$s=str_replace('*','',$s);
		$l=strlen($s);
		$s=ltrim($s,']');$l2=strlen($s);
		$l=$l-$l2;
		$a=explode(']',$s);
		$c='';
		foreach($a as $s){
			$f=substr($s,0,1);
			$s=substr($s,1);$h='';
			if($f=='#'){$f='e';$s.='#iefix';}
			if(strpos($s,'#')) list($s,$h)=explode('#',$s);
			$t=$this->fType[$f];
			//$c.='url("'.($l?str_repeat('../',$l):'').(is_array($t)?$t[1]:$t).$s.$f.'.]'.($h?'#'.$h:'').'")'.($h?'':' format("'.(is_array($t)?$t[0]:$t).'")').',';
			$c.='url("'.rtrim($full?$this->req->base('www'):($l?str_repeat('../',$l):''),'/').'font/'.$s.'.'.(is_array($t)?$t[1]:$t).($h?'#'.$h:'').'")'.($h?'':' format("'.(is_array($t)?$t[0]:$t).'")').',';
		}
		return rtrim($c,',');
	}
	private function _x($v){
		$v=trim($v,'#');
		if(strlen($v)==6) return $v;
		return $v[0].$v[0].$v[1].$v[1].$v[2].$v[2];
	}
	private function _extend($s,$v){
		$t='';$p=isset($this->extended[$s])?$this->extended[$s]:$s;
		$v=$this->_rr($v);
		if($s=='op') $v=intval($v);
		foreach($this->aPrefix as $b){
			if($this->only&&$this->only!=$b) continue;
			$t.=($b?'-'.$b.'-':'').$p.':'.($s=='op'?$v/100:$v).';';
		}
		if((($this->only&&$this->only=='ms')||!$this->only)&&$s=='op'){
			$tm='filter:Alpha(Opacity='.$v.');';
			$t.=$tm.'-ms-'.$tm.'-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity='.$v.')";';
		}return trim($t,';');
	}
	private function cop($r,$op){
		$r=strtolower($r);
		$f=substr($r,0,1);
		$a=[255,255,255];
		if($f=='#') $r=trim($r,'#');
		if(in_array($f,['r','h'])&&strpos($r,';')) $a=explode(';',trim(substr($r,1),';'));
		elseif(isset($this->names[$r])){$f='r';$r=trim($this->names[$r],'#');}
		if(strlen($r)<3) $r=str_repeat($r,3);
		if(in_array(strlen($r),[3,6])&&strtolower(ltrim($r,'0'))==dechex(hexdec(strtolower($r)))){$a=$this->h2r($r);$f='r';}
		$a[3]=$op;
		return $f.join(';',$a);
	}
	public function h2r($s){
		$l=strlen($s);$a=[255,255,255];
		if(!in_array($l,[3,6])) return $a;
		$l=$l==3?1:2;
		for($i=1;$i<4;$i++) $a[$i-1]=hexdec($this->_hd($s,$i,$l));
		return $a;
	}
	private function _hd($s,$o,$l=2){return str_repeat(substr($s,$l*($o-1),$l),3-$l);}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}?>