<?php

        $color = substr(dechex(time()),-6);
        $colored = '#'.$color;
	$text = "#" . strrev($color);
        echo "<input type='button' style='background-color:$colored;color:$text' value='AJAX Injection " . time() . "'></input>";

?>
