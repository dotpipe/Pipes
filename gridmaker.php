<?php

$square = 30;
 
$grid = @imagecreate($square, $square)
    or die("Cannot Initialize new GD image stream");//creates an image with the resolution of $square 

$background = imagecolorallocate($grid, 26, 143, 186);
$lines = imagecolorallocatealpha($grid, 0,0,0,0.5); //26, 143, 186);
//$background = imagecolorallocate($grid, 26, 143, 186);

imagesetthickness($grid, 5);
imageline($grid, 2, 2, 2, 2, $lines);

imageline($grid, 2, 0, 2, 4, $lines);

imagepng($grid, "grid.png");

?>
<style>
body
{
	background-image: url("./grid.png") repeat;
}

</style>
<body style="background-image:url('./grid.png')">
</body>