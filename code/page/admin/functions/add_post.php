<?php

require_once "C://xampp/htdocs/test/functions/db.php";
require_once "loggedin.php";
require_once "src/class.upload.php";


if($loggedadmin == false) {
  header("Location: /test/admin/index.php");
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
  

  if(!empty($_POST['title'])&&!empty($_POST['content'])&&!empty($_FILES['media'])){
	  $foo = new Upload($_FILES['media']);
	  $cat = $_POST['cat'];
	  $title = $_POST['title'];
	  $content = $_POST['content'];
	  $number = '';

		if ($foo->uploaded) {
			$number = date("Ymdhis");

		    // save uploaded image with a new name,
		    // resized to 200px wide
		    $foo->file_new_name_body = 'image_resized_'.$number;
		    $foo->image_resize = true;
			$foo->image_ratio_crop = true;
		    $foo->image_convert = jpg;
		    $foo->image_x = 200;
		    $foo->image_ratio_y = true;
		    $foo->process('C://xampp/htdocs/test/uploads/images/thumbnail');
		    $foo->processed;

		    
		    $foo2 = new Upload($_FILES['media']);
			$foo2->file_new_name_body = 'image_'.$number;
			$foo2->image_resize = true;
			$foo2->image_ratio_crop = true;
			$foo2->image_convert = jpg;
			$foo2->image_x = 1000;
			$foo2->image_ratio_y = true;
			$foo2->process('C://xampp/htdocs/test/uploads/images/');
			if ($foo2->processed) {
			  echo 'image renamed, converted to JPG';
			  $foo2->clean();
			} else {
			  echo 'error : ' . $foo2->error;
			}
		    
		}

		$sql = "INSERT INTO media (path, full_path)
		VALUES ('/test/uploads/images/thumbnail/image_resized_".$number.".jpg', '/test/uploads/images/image_".$number.".jpg')";

		if ($connection->query($sql) === TRUE) {
		  $media = $connection->insert_id;
		} else {
		  $media = 0;
		}


		$sql = "INSERT INTO articles(cat_id, title, content, media, media_id)
	    VALUES (?,?,?,?,?)";

	    $stmt = $db->prepare($sql);


	    try {
	      $stmt->execute([$cat, $title, $content, $number.'.jpg', $media]);
	      header('Location: /test/index.php');

	      }

	     catch (Exception $e) {
	        $e->getMessage();
	        echo "Error";
	    }
	} else {
		header("Location: /test/admin/index.php");
	}

} else {
  header("Location: /test/admin/index.php");
}
  
?>