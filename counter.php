<?php

session_start();
//if ($_SERVER["HTTP_REFERER"] != "http://g0d.me/grove/index.html")
{
//    	var_dump($_SESSION); //["HTTP_REFERER"];
//    	return;
}
$totals = json_decode(file_get_contents("counter.json"));

$totals->total++;

$singular = "h" . hash("sha256", $_SERVER["REMOTE_ADDR"]);

if (isset($totals->$singular))
        $totals->$singular++;
else 
{
        $totals = array_merge($totals, [ $singular => 1 ]);
}
$testing = $totals->$singular;

foreach($totals as $k)
{
	$total++;
}
$total--;

$all = $totals->total;

$totals = file_put_contents("counter.json", json_encode($totals));

echo "You visited " . $testing . " Times<br>";

echo "Seen " . $total . " visitors <br>";

echo "Totaling " . $all . " Visits";

?>