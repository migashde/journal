<?php
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl('volunteers').' ORDER BY time DESC');
if($this->db->num($h)){
	echo '<table class="grid"><tr><th>#</th><th>Овог нэр</th><th>Утас</th><th>И-мэйл</th><th>Бүртгүүлсэн огноо</th></tr>';
	while($r=$this->db->each($h)){
		echo '<tr'.($r['seen']?'':' class="new"').'><td class="num"></td><td>'.$r['firstname'].' '.$r['lastname'].'</td><td>'.($r['phone']?:'-').'</td><td>'.($r['email']?:'-').'</td><td>'.date('Y-m-d H:i',$r['time']).'</td></tr>';
	}
	echo '</table>';
}
else echo '<p style="padding:0 20px;">Одоогоор сайн дурын дэмжигчээр бүртгэл илгээгээгүй байна</p>';