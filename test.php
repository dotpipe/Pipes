<!DOCTYPE html>

<script src="pipes.js"></script>

<body>
<script>
</script>
<span id="hed" style="width:100%"></span><br>
Modals Demonstration - <dyn class="redirect" ajax="http://www.github.com/wise-penny/pipes"><u>GitHub</u></dyn> +
<dyn id="donate" class="redirect" ajax="https://paypal.me/thexiv"><u>Donate (I collect $1 donations. It's a hobby!)</u></dyn>

</body>

<?php $mod = file_get_contents("./modals.json"); ?>

<script>
    var value = <?= $mod ?>;
    modala(value, document.body);
</script>
<textarea> <?= $mod ?></textarea>