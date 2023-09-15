<?php
session_start();    
$time = "json".time().".json";
file_put_contents($time, $_GET['modal']);
chmod($time, 777);
printf('<article><dyn class="download" id="breakthru" file="%s">Your file is %s</dyn></article>',$time,$time);
?>
