<?php

        $full = json_decode(file_get_contents("./modals.json"));
        $full->hk->textContent = time();
        $color = substr(dechex(time()),-6);
        $colored = '#'.$color;
        echo "<i style='color:$colored'>".time()."</i>";
        file_put_contents("./modals.json", json_encode($full));
?>
