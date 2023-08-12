<?php

session_start();

//touch("counter.json");
$totals = [];
$file = file_get_contents("counter.json");
if ($file)
	$totals = json_decode($file);
if (!isset($totals->total))
	$totals = [ "total" => 1 ];


$addr = (!empty($_GET)) ? $_GET["addr"] : $_POST["addr"];

$singular = hash("ripemd160", $addr);

$merger = [];

if (!empty($totals->$singular))
        $totals->$singular++;
else
{
        $totals["$singular"] = 1;
}

$real = 0;

$t = 0;
foreach ($totals as $k)
{
	if ($t > 0)
		$real += $k;
	else
		$t++;
}
$real--;
$all = 0;

foreach ($totals as $k)
{
	$all++;
}

$all--;

$you = $totals->{"$singular"};

file_put_contents("counter.json", json_encode($totals));

echo "You visited " . $you . " Times ";

echo "Seen " . $all . " visitors ";

echo "Totaling " . $real . " Visits";

?>
