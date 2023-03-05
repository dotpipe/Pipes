<?php

require_once("filter.cryptography.gpg.php");

$gpg = new GPG();
$gpg('addencryptkey', "6EB8C56F1C7A0590F8CC11A8234EA1E033ABA635");
$r = $gpg('encrypt',"BLIMEY!!");
$gpg('adddecryptkey',"6EB8C56F1C7A0590F8CC11A8234EA1E033ABA635","");
echo $gpg('decrypt', $r);
echo $r;

?>