<html>
<head>
<title>
</title>

<script>

var cliX = 0;
var cliY = 0;
var widthX = 0;
var heightY = 0;
function printMousePos(event) {
//  document.body.textContent =
    cliX = event.clientX;
    cliY = event.clientY;
}

function grow(evd) {
	evd.target.style.width = evd.clientX
	evd.target.style.height = evd.clientY
	//this.removeEventListener("mousemove", grow)
}

document.addEventListener("mousemove", grow);

document.addEventListener("mousedown", (ev) => {
	var baseSquare = document.createElement("input");
	baseSquare.style.border = "10px dashed black";
	printMousePos(ev);
	baseSquare.style.clientX = cliX;
	baseSquare.style.clientY = cliY;

	document.body.appendChild(baseSquare);
//	this.addEventListener("drag", grow);
	this.addEventListener("mouseup", () => {
		this.removeEventListener("mousemove",grow)
	});
	

});

</script>

</head>
<?php

$square = 30;
 
$grid = @imagecreate($square, $square)
    or die("Cannot Initialize new GD image stream");//creates an image with the resolution of $square 

$background = imagecolorallocate($grid, 26, 143, 186);
$lines = imagecolorallocatealpha($grid, 0,0,0,0.5); //26, 143, 186);
//$background = imagecolorallocate($grid, 26, 143, 186);

imagesetthickness($grid, 2);
imageline($grid, 2, 2, 2, 2, $lines);

imageline($grid, 2, 0, 2, 2, $lines);

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
</html>