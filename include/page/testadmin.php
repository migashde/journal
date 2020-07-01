<?php
if(!$this->acc->logged()) $this->req->url('test3');
else{
  if($this->acc->admin){
    if(isset($_POST['filedata'])){
      list($mime,$str)=explode(';base64,',$_POST['filedata'],2);
      $mime=str_replace('data:','',$mime);
      if($mime=='image/png'){
        $fn=$this->file->genFn();
        $d=$this->str->rand(1);
        if(!file_exists(CFILE.$d.DS)) mkdir(CFILE.$d.DS,0777);
        $p=CFILE.$d.DS.$fn.'.png';
        file_put_contents($p,base64_decode($str));
        $this->core->load('Image','img',[CFILE.'t/']);
        $dir=date('y');
        $thumb=$this->file->genFn();
        $this->img->dir($dir)->name($thumb)->size('120:120:xv')->crop($p);
        $thumb=$dir.'/'.$thumb;
        $this->db->modify('files',['dir'=>$d,'filename'=>$fn,'title'=>$fn,'size'=>filesize($p),'uploaded'=>time(),'is_img'=>1,'ext'=>'png','thumb'=>$thumb]);
        echo 'f/'.$d.'/'.$fn.'.png';
      }
      die();
    }
    $a=$this->req->url('dirs');
    array_shift($a);
    $fp=$a[0];
    define('ADMIN',true);
    $this->tit('Админ хуудас');
    $this->module('testadmin/'.array_shift($a));
  }
  else $this->req->url('');
}
?>