<?php
session_start();
unset($_SESSION['login']);
unset($_SESSION['type']);
unset($_SESSION['id']);
session_destroy();

header("Location: ".$folder);
exit;
?>