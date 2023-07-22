<!DOCTYPE html>

<script src="pipes.js"></script>

<body>
<script>
</script>
Modala Demonstration - 
<span id="hed-mod" style="width:100%"></span><br>
<br>
<br>
<span id="hed" style="width:100%"></span><br>
<dyn id="mod" class="modala" onclick="domContentLoad()" ajax="./modalzzz.json" insert="hed">Reload Top</dyn>
</body>

<?php $mod = file_get_contents("./modals.json"); ?>

<script>
    var value = <?= $mod ?>;
    modala(value, document.getElementById("hed-mod"));
</script>
<pipe insert="txt" class="json" ajax="./modal.json" id="t"></pipe>
<textarea id="txt"> </textarea>
