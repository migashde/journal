<?php
$key=$this->req->url(1);
$aPage=$this->db->load('pages','alias="'.$this->db->esc($key).'"');
if(!$aPage) $this->module('main/notfound');
echo '<h2>'.$r['title'].'</h2><div class="content">'.$r['content'].'</div>';
?>