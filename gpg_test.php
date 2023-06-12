<?php
require_once("filter.cryptography.gpg.php");

$gpg = new GPG();

$gpg('addencryptkey', "E53837598F63BBF23AD8AE4B135222FE64D69255");
$r = $gpg('encrypt',"I would be willing to tell you the future plans and success of pipes if you are interested. I believe it is a Billion dollar idea and more. There is no need for the bismuth here, I will just say it. I cannot lie on this because it just truly is my greatest software package. I have done a lot of good stuff. Even created my own math algorithms. One that beats the price daily expectation weeks in advance. I am always proud of my software. So to extend this to you, Mr. Wozniak, I ask for 780,000,000. We will talk after you have read this, I hope.");
$gpg('adddecryptkey',"E53837598F63BBF23AD8AE4B135222FE64D69255","");
echo $gpg('decrypt', $r);
echo $r;
?>