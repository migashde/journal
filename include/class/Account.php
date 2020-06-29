<?php
defined('ROOT') or die('Access denied !!!');
class Account{
	public  $id					= null;
	public  $a					= [];
	public  $sTbl				= 'admins';
	private $sSessKey			= 'legal_acc-data';
	private $sCookieKey			= '_AUTO_LOGIN_KEY';
	private $aSessionHandle		= [];
	public  $admin				= false;
	public  $editor				= false;
	public function __construct(){
		$this->_start();
		$this->admin=intval($this->id)===1;
		$this->editor=intval($this->id)<4;
	}
	public function initSess(){if(!isset($_SESSION[$this->sSessKey])) $this->_reset();$this->a=$this->_data();}
	public function update($a){
		if(!$this->logged()) return $this;
		$this->db->modify($this->sTbl,$a,$this->id);
		$this->aSessionHandle=array_merge($this->aSessionHandle,$a);
		return $this;
	}
	public function name($a=[],$bFullName=false){if(is_bool($a)){$bFullName=$a;$a=[];}$a=$a?:$this->a;return '<div class="user'.($bFullName?' fullnamed':'').'"><img src="'.$this->img($a).'" /><b>'.($bFullName?'<span>'.$a['firstname'].'</span> ':'').$a['lastname'].'</b></div>';}
	public function img($a=[]){$a=$a?:$this->a;return 'u/'.(isset($a['image'])&&file_exists(AVTR.$f.$a['image'].'.jpg')?$a['image']:'blank_'.(isset($a['gender'])?($a['gender']=='m'?'':'fe').'male':'unknown')).'.jpg';}
	public function byup($a=[]){
		if($this->id) return true;
		if(!isset($a['u'],$a['p'])||!$a['u']||!$a['p']) return false;
		$u=$this->db->esc($a['u']);
		$p=isset($a['h'])?$a['p']:$this->encrypt($a['p']);
		if(!$u||!$p) return false;
		$fld='username';
		if(strpos($u,'@')) $fld='email';
		elseif(is_numeric($u)) $fld='phone';
		return $this->_login('('.($fld!='username'?'`'.$fld.'`="'.$u.'" OR ':'').'`username`="'.$u.'") AND `password`="'.$p.'"',isset($a['r'])&&$a['r']||in_array('r',$a));
	}
	public function byid($id){return $this->_login($id);}
	public function byemail($email){return $this->_login('`email`="'.$this->db->esc($email).'"');}
	public function byphorem($phoneOrEmail){return $this->_login('`email`="'.$this->db->esc($phoneOrEmail).'" OR phone="'.$this->db->esc($phoneOrEmail).'"');}
	public function logged(){return (bool)$this->id;}
	public function is(){return $this->logged();}
	public function logout(){$this->_data(null)->_cookie(null);}
	public function f($s=null,$v=null){if($s&&$v!==null){$this->a[$s]=$v;return $this;}return is_null($s)?$this->a:(isset($this->a[$s])?$this->a[$s]:null);}
	public function encrypt($s){return md5($s);}
	public function reload(){return $this->byid($this->id);}
	private function _login($s,$b=true){
		$a=$this->db->load($this->sTbl,$s);
		$isReload=is_numeric($s);
		if($a&&($i=intval($a['id']))){
			if($b) $this->_cookie(md5($i.$a['username'].$a['email']).base_convert($i,10,36));
			if(!$isReload) $this->db->modify($this->sTbl,['logins'=>'+1'],$i);
			$this->_data($a);
			return true;
		}
		return false;
	}
	private function _start(){$this->initSess();if(!$this->a||!($this->id=intval($this->a['id']))) $this->_force();}
	private function _force(){
		if($this->id) return true;
		if(!($s=$this->_cookie())) return false;
		if(strlen($s)<33) return false;
		$md5=substr($s,0,32);
		if(!($s=intval(base_convert(substr($s,32),36,10)))) return false;
		if(!($a=$this->db->load($this->sTbl,$s))) return false;
		if(md5($s.$a['username'].$a['email'])!=$md5) return false;
		$this->_data($a);
		return true;
	}
	private function _data($m=true){
		$this->aSessionHandle=&$_SESSION[$this->sSessKey];
		if($m===true) return $this->aSessionHandle[0];
		elseif($m===null) $this->_reset();
		elseif(is_array($m)&&isset($m['id'])){$this->aSessionHandle[0]=$this->a=$m;$this->aSessionHandle[1]=$this->id=intval($m['id']);}
		return $this;
	}
	private function _cookie($m=true){
		if($m===true) return isset($_COOKIE[$this->sCookieKey])?$_COOKIE[$this->sCookieKey]:'';
		else $this->cs->cookie($this->sCookieKey,(string)$m,$m===null?-1:'1m');
		return $this;
	}
	private function _reset(){$_SESSION[$this->sSessKey]=[[],0];}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}
?>