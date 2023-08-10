<!DOCTYPE html>
<head><title>PipesJS+Modala</title>
<style>
.pipe-grid {
	display: inline-grid;
	grid-template-columns: auto auto auto;
	grid-gap:10px;
}

.pipe-grid-child {
	border-radius: 50% 20% / 10% 40%;
	vertical-align: center;
}
</style>
</head>
<script src="pipes.js"></script>

<body>
<script>
</script>
Modala Demonstration - 
<span id="hed-mod" style="width:100%"></span><br>
<br>
<br>
<pipe id="mod" class="modala" ajax="./modals.json" insert="hed-mod"></pipe>
<div id="hed" class="pipe-grid" style="width:100%"></div><br>
<button id="mod" class="dyn-one pipe modala" ajax="./modal.json" insert="hed">Load Bottom</button><br>
</body>

<pipe insert="txt" class="json" ajax="./modal.json" id="t"></pipe>
<textarea id="txt" rows="100" cols="120" style="float:left"> </textarea>
