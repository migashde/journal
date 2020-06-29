<?
defined('ADMIN')&&$this->acc->admin or $this->req->url('@');
$aFilter=[
	'all'=>['Бүх файл','*','*'],
	'image'=>['Зураг дүрс','jpg,jpeg,png,gif,svg','image/jpeg,image/png,image/gif,image/svg+xml'],
	'document'=>['Документ','docx,doc,xls,xlsx,ppt,pptx,ppsx,pdf,txt','application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/pdf,text/plain'],
	'video'=>['Дүрс бичлэг','mp4,webm,flv','video/mp4,video/webm,video/x-flv'],
	'archive'=>['Архив','7z,rar,zip,tar,bz,bz2','application/x-7z-compressed,application/x-rar-compressed,application/zip,application/x-tar,application/x-bzip,application/x-bzip2'],
	'audio'=>['Дуу авиа','mp3,weba','audio/mp3,audio/webm'],
	'font'=>['Фонт','ttf,woff,woff2,otf,eot','application/x-font-ttf,application/x-font-woff,font/woff,font/woff2,font/otf,application/vnd.ms-fontobject'],
	'other'=>['Бусад','psd,swf','image/vnd.adobe.photoshop,application/x-shockwave-flash']
];
$tbl='files';
$allowExt='';
$filter=isset($_POST['filter'])?$_POST['filter']:'';
$sort=isset($_POST['sort'])?$_POST['sort']:'';
$fl=isset($_POST['fl'])?$_POST['fl']:false;
$aFltr=[];
foreach($aFilter as $k=>$a){
	$aFltr[$k]=$a[0];
	if(!$fl||($fl&&$filter==$k)) $allowExt.=','.$a[1];
}
$allowExt.=',';
if(isset($_POST['cmd'])){
	$cmd=$_POST['cmd'];
	$sort=$sort?:'uploaded';
	$aSort=['uploaded'=>'Сүүлд оруулснаар','last_used'=>'Сүүлд ашигласнаар','used'=>'Ашигласан тоогоор','size'=>'Файлын хэмжээгээр','ext'=>'Төрлөөр'];
	if(!isset($aSort[$sort])) $sort=key($aSort);
	switch($cmd){
		case 'tpl':{
			echo '<div class="fm-handler"><div class="fm-toolbar"><table><tr><td class="fm-upload"><label><input type="file" multiple="true" id="fm-file" /><input type="button" id="fm-fbtn" value="Файл upload хийх" /></label></td><td class="fm-search"><span>Хайлт:</span><div class="fm-filter">';
			if(!isset($noFilter)||!$noFilter) echo '<select id="fm-filter">'.$this->html->options($aFltr,$filter).'</select>';
			echo '<input type="text" placeholder="Хайх..." id="fm-search" /></div><span>Эрэмбэ:</span><div class="fm-sort"><select id="fm-sort">'.$this->html->options($aSort,$sort).'</select><label><input type="checkbox" id="fm-sorttype" /> Өсөхөөр</label></div></td></tr></table></div><div class="fm-list"></div><div class="fm-statusbar"><b id="fm-files">0</b> файл <a href="'.ADMURL.'/file" target="_blank">Файлын санд засвар хийх</a></div></div>';
		}break;
		case 'list':{
			$cond=[];
			$sort='`'.$sort.'`'.($_POST['asc']?'':' DESC');
			if($filter&&isset($aFilter[$filter])&&$aFilter[$filter][1]!='*') $cond[]='`ext` IN(\''.str_replace(',','\',\'',$aFilter[$filter][1]).'\')';
			if($search=trim(strip_tags($_POST['search']))){
				$search=$this->db->esc($search);
				$cond[]='(title LIKE "%'.$search.'%" OR tags LIKE "%'.$search.'%")';
			}
			$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($tbl).($cond?' WHERE '.join(' AND ',$cond):'').' ORDER BY '.$sort);
			while($r=$this->db->each($h)) echo '<div class="file'.($r['is_img']?' isimg':'').'" title="'.strip_tags($r['tags']).'" rel="'.$r['dir'].'/'.$r['filename'].'.'.$r['ext'].'" data-id="'.$r['id'].'"><img src="f/th/'.($r['is_img']?$r['thumb'].'.jpg':$r['ext'].'.png').'" alt="'.strip_tags($r['tags']).'" /><b>'.$r['title'].'</b></div>';
		}break;
		case 'upload':{
			if(isset($_FILES['file'])&&$_FILES['file']['tmp_name']){
				$this->core->load('Image','img',[CFILE.'th/']);
				$ext=strtolower(pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
				if(strpos($allowExt,','.$ext.',')===false){
					echo "Зөвшөөрөгдөөгүй формат байна. Зөвхөн дараах форматын файлуудыг оруулах боломжтой\n";
					foreach($aFilter as $k=>$a) if($a[1]!='*'&&(($fl&&$k==$filter)||!$fl)) echo "\t".$a[0].': ['.$a[1]."]\n";
				}
				else{
					$d=$this->str->rand(1);
					$this->img->is(CFILE.$d,2);
					$fn=$this->img->genFn();
					$data=[];
					$data['ext']=$ext;
					$data['filename']=$fn;
					$data['dir']=$d;
					$directMove=true;
					if(!$data['title']) $data['title']=str_ireplace('.'.$ext,'',$_FILES['file']['name']);
					$aExt=explode(',',$aFilter['image'][1]);
					$data['is_img']=in_array($ext,$aExt);
					if($data['is_img']){
						$dir=date('y');
						$fn=$this->img->genFn();
						$this->img->dir($dir)->name($fn)->size('120:120:xv')->crop($_FILES['file']['tmp_name']);
						$data['thumb']=$dir.'/'.$fn;
						list($w,$h)=getimagesize($_FILES['file']['tmp_name']);
						if($w>700||$h>500) $directMove=false;
					}
					$p=CFILE.$d.'/'.$data['filename'].'.'.$ext;
					if($directMove) move_uploaded_file($_FILES['file']['tmp_name'],$p);
					else{
						$this->img->path(CFILE)->dir($d)->name($data['filename'])->size('2000:2000:a')->upload('file');
						$data['ext']=$ext='jpg';
					}
					if($data['is_img']) $this->img->path(CFILE)->dir($d)->name($data['filename'])->size('208:150:f','t')->crop($p);
					$data['uploaded']=time();
					$data['size']=filesize($p);
					$this->db->modify('files',$data);
				}
			}
		}break;
		case 'hit':{
			$id=intval($_POST['id']);
			if($id) $this->db->modify('files',['used'=>'+1','last_used'=>time()],$id);
		}break;
	}
	die();
}
$this->css('prv/fm')->tit('Файлын сан');
$edit=$this->req->get('edit','int');
$sAct=$this->req->url('action');
if($del=$this->req->get('del','int')){
	$dat=$this->db->load($tbl,$del);
	if(!$dat) $this->req->url(['-'=>'del'],true);
	if(isset($_POST['confirm'])&&$_POST['confirm']=='ok'){
		$this->db->modify($tbl,$del);
		$p=CFILE.$dat['dir'].'/'.$dat['filename'].'.'.$dat['ext'];
		if(file_exists($p)) unlink($p);
		if($dat['is_img']&&$dat['thumb']){
			$p=CFILE.'th/'.$dat['thumb'].'.jpg';
			if(file_exists($p)) unlink($p);
		}
		$this->req->url(['-'=>'del'],true);
	}
	else $this->msg('<form method="post"><input type="hidden" value="ok" name="confirm" /><p><img src="f/th/'.($dat['is_img']?$dat['thumb'].'.jpg':$dat['ext'].'.png').'" /><br /><b>'.$dat['title'].' ['.$dat['dir'].'/'.$dat['filename'].'.'.$dat['ext'].']</b> файлыг үнэхээр устгах уу?</p><div class="btns"><input type="submit" value="Устгах" class="delete" /> <a href="'.$this->req->url(['-'=>'del']).'">Болих</a></div></form>','confirm');
}
if($edit){
	$data=$this->db->load($tbl,$edit);
	if(!$data) $this->req->url(['-'=>'edit'],true);
	$_SESSION['prevFile'.$edit]=$data['dir'].'/'.$data['filename'].'.'.$data['ext'];
	$_SESSION['prevThumb'.$edit]=$data['thumb'];
}
if(substr($sAct,0,4)=='save'){
	$data=$this->req->get('data');
	$tmp=$_FILES['file']['tmp_name'];
	if($tmp) $ext=strtolower(pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
	if(!$edit&&!$tmp) $this->msg('Файлаа сонгоно уу');
	elseif($tmp&&strpos($allowExt,','.$ext.',')===false){
		$msg="Зөвшөөрөгдөөгүй формат байна. Зөвхөн дараах форматын файлуудыг оруулах боломжтой\n";
		foreach($aFilter as $k=>$a) if($a[1]!='*') $msg.="<br /> &nbsp; &nbsp; ".$a[0].': ['.$a[1]."]";
		$this->msg($msg);
	} 
	else{
		if($_FILES['file']['tmp_name']){
			if($edit){
				$ps=$_SESSION['prevFile'.$edit];
				$pt=$_SESSION['prevThumb'.$edit];
				unset($_SESSION['prevFile'.$edit],$_SESSION['prevThumb'.$edit]);
				$p=CFILE.$ps;
				if(file_exists($p)) unlink($p);
				if($pt){
					$p=CFILE.'th/'.$pt.'.jpg';
					if(file_exists($p)) unlink($p);
				}
			}
			$d=$this->str->rand(2);
			$oFile=new File();
			$oFile->is(CFILE.$d,2);
			$ext=strtolower(pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION));
			$fn=$oFile->genFn();
			$data['ext']=$ext;
			$data['filename']=$fn;
			$data['dir']=$d;
			$directMove=true;
			if(!$data['title']) $data['title']=substr(str_ireplace('.'.$ext,'',$_FILES['file']['name']),0,300);
			$data['is_img']=(int)in_array($ext,['jpg','jpeg','gif','png']);
			if($data['is_img']){
				$this->load('Image','img',[CFILE.'th/']);
				$dir=date('yW');
				$fn=$this->img->genFn();
				$this->img->dir($dir)->name($fn)->size('120:120:xv')->crop($_FILES['file']['tmp_name']);
				$data['thumb']=$dir.'/'.$fn;
				list($w,$h)=getimagesize($_FILES['file']['tmp_name']);
				if($w>700||$h>500) $directMove=false;
			}
			if($directMove) move_uploaded_file($_FILES['file']['tmp_name'],CFILE.$d.'/'.$data['filename'].'.'.$ext);
			else{
				$this->img->path(CFILE)->dir($d)->name($data['filename'])->size('2000:2000:a')->upload('file');
				$data['ext']=$ext='jpg';
			}
			$data['size']=filesize(CFILE.$d.'/'.$data['filename'].'.'.$ext);
		}
		if(!$edit){
			$data['uploaded']=time();
			$data['last_used']=time();
		}
		$id=$this->db->modify($tbl,$data,$edit);
		if($edit) $id=$edit;
		$this->req->url(['-'=>'edit,upload,pg'],true);
	}
}?>
<div class="tab-content">
<form method="post" enctype="multipart/form-data" action="<?=$this->req->url(['-'=>'del'])?>">
<div class="form">
	<div><?if($edit&&$data['thumb']&&file_exists(CFILE.'th/'.$data['thumb'].'.jpg')):?><img src="f/th/<?=$data['thumb']?>.jpg" style="float:right;margin-bottom:-50px;" /><?endif?>
	<label class="label" for="file">Файлаа сонгоно уу</label><div><input type="file" name="file" id="file" accept="<?=$sAccept?>" /></div></div>
	<div><label class="label" for="title">Файлын нэр</label><div><input type="text" value="<?=str_replace('"','&quot;',$data['title'])?>" id="title" name="data[title]" maxlength="300" class="fld" /></div></div>
	<div><label class="label" for="tags">Хайлт хийх түлхүүр үгс</label><div><textarea class="fld" id="tags" name="data[tags]"><?=$data['tags']?></textarea></div></div>
<div class="buttons<?=$edit?' editing':''?>"><?if($edit):?><a href="<?=$this->req->url(['-'=>'edit,list','+'=>['upload'=>'ok']])?>">Шинэ +1</a><?endif?><input type="submit" name="do[save]" class="main" value="<?=$edit?'SAVE':'ADD'?>" /> <input type="submit" name="do[saveedit]" value="Edit" /></div>
</div></form>
<?
$iCnt=$this->db->count($tbl);
if($iCnt){
	$this->db->pager($iCnt,['lmt'=>200]);
	echo '<h3 class="title">Файлын сан</h3>'.$this->db->pglinks().$this->db->pgdisp().'<div class="file-list">';
	$h=$this->db->fetch('SELECT * FROM '.$this->db->tbl($tbl).' ORDER BY last_used DESC'.$this->db->lmt());
	while($r=$this->db->each($h)) echo '<div class="file" title="'.strip_tags($r['tags']).'"><a href="f/'.$r['dir'].'/'.$r['filename'].'.'.$r['ext'].'"><img src="f/th/'.($r['is_img']?$r['thumb'].'.jpg':$r['ext'].'.png').'" alt="'.strip_tags($r['tags']).'" /><b>'.$r['title'].'</b></a><div><a href="'.$this->req->url(['+'=>['edit'=>$r['id']],'-'=>'del']).'" class="edit" title="Засах"></a><a href="'.$this->req->url(['+'=>['del'=>$r['id']],'-'=>'edit']).'" class="del" title="Устгах"></a></div></div>';
	echo '</div>'.$this->db->pglinks(true);
}
else echo '<div class="alerter show info"><div><p>Одоогоор ямар нэгэн файл оруулаагүй байна</p><p><a href="'.$this->req->url(['+'=>['upload'=>'ok']]).'">Файл оруулах</a></p></div></div>';
?>
</div>