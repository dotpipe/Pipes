<!DOCTYPE html>

<script src="pipes.js"></script>

<body>
<script>
</script>
Modala Demonstration - 
<span id="hed-mod" style="width:100%"></span><br>
<br>
<br>
<dyn id="mod" class="modala" onclick="domContentLoad()" ajax="./modals.json" insert="hed-mod">Reload Top</dyn>
<span id="hed" style="width:100%"></span><br>
<dyn id="mod" class="modala" onclick="domContentLoad()" ajax="./modal.json" insert="hed">Reload Top</dyn>
</body>

<script>
//    modala(value, document.getElementById("hed-mod"));
</script>
<pipe insert="txt" class="json" ajax="./modal.json" id="t"></pipe>
<textarea id="txt"> </textarea>
