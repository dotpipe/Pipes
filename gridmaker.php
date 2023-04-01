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
    cliX = event.x;
    cliY = event.y;
}

function grow(evd) {
	evd.target.style.width = evd.clientX
	evd.target.style.height = evd.clientY
}

function mover(evd) {
	evd.target.style.marginLeft = cliX
	evd.target.style.marginTop = cliY
	//evd.target.addEventListener("mousemove", mover)
}

document.addEventListener("drag", mover);

document.addEventListener("dblclick", (ev) => {
	const baseSquare = document.createElement("input");
	baseSquare.style.border = "10px dashed black";
	printMousePos(ev);
	baseSquare.setAttribute("draggable",true)
	baseSquare.style.position = "absolute"
	baseSquare.style.marginLeft = cliX;
	baseSquare.style.marginTop = cliY;
	
	document.body.appendChild(baseSquare);
	this.addEventListener("dragend", (e) => {
		printMousePos(e)
		console.log(e)
		e.target.style.marginLeft = e.x
		e.target.style.marginTop = e.y
		document.body.appendChild(e.target)
		var bases = document.getElementsByTagName("input")
		
		bases.prototype.foreach((ev) => {
			document.body.appendChild(ev.cloneNode(false))
			printMousePos(ev)
			ev.style.marginLeft = cliX
			ev.style.marginTop = cliY
		});
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