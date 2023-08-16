<!DOCTYPE html>
<head id="daTop"><title>PipesJS+Modala</title>
<link rel="stylesheet" href="filter.knob.css">
<style>
.pipe-grid {
	display: inline-grid;
	grid-template-columns: auto auto auto;
	grid-gap: 10px;
}

.pipe-grid-child {
	border-radius: 50% 20% / 10% 40%;
	vertical-align: center;
}

</style>
</head>
<script src="pipes.js"></script>


<body style="background-color:lightgray">
<table>
<tr><td colspan="3" style="border-bottom:3px solid black">
<b style="margin-left:20px;">Modala Demonstration</b>
	<pipe id="counter" method="GET" class="plain-text" ajax="counter.php" query="addr:<?= $_SERVER['REMOTE_ADDR']; ?>" insert="counter"></pipe>	
	<pipe class="modala" ajax="./git.json" insert="great" id="great"></pipe>
</td>
</tr>
<tr>
<td>
	<span id="hed-mod" style="width:100%"></span><br>
</td>
</tr>
</table>
<br>
<br>
<pipe id="mod" class="modala" ajax="./modals.json" insert="hed-mod"></pipe>
<div id="hed" class="pipe-grid" style="width:100%"></div><br>
<button id="mod" class="dyn-one pipe modala" ajax="./modal.json" insert="hed">Load Bottom</button><br>
</body>

<pipe insert="txt" class="json" ajax="./modal.json" id="t"></pipe>
<textarea id="txt" rows="100" cols="120" style="float:left"> </textarea>
