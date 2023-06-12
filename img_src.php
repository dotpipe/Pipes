<?php

        $full = json_decode(file_get_contents("./modals.json"));
        $full->hk->textContent = time();
        echo time();
        file_put_contents("./modals.json", json_encode($full));
?>
<script src="pipes.js"></script>
