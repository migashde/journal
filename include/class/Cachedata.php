<?php
defined('ROOT') or die('Access denied !!!');
class Cachedata{
	public function setting(){return $this->db->fetch('SELECT skey,sval FROM '.$this->db->tbl('setting'),2);}
	public function options($i){return $this->db->fetch('SELECT data_id,value FROM '.$this->db->tbl('datas').' WHERE grp='.$i.' ORDER BY ordering',2);}
	public function __get($s){return li($s);}
	public function __call($s,$a){return li($s,$a);}
}
?>