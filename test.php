<!DOCTYPE html>

<script src="pipes.js"></script>

<body>
<script>
</script>

<span id="hed" style="width:100%"></span><br>
Modala Demonstration - <link ajax="http://www.github.com/wise-penny/pipes"><u>GitHub</u></dyn> +
<link id="donate" ajax="https://paypal.me/thexiv"><u>Donate (I collect $1 donations. It's a hobby!)</u></dyn>

<?php $mod = file_get_contents("./modals.json"); ?>

<script>
    var value = <?= $mod ?>;
    modala(value, document.body);
        //        "onclick": "modala(this,'hed-mod', undefined, true)",
</script>
<textarea> <?= $mod ?></textarea>