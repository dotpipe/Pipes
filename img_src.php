<?php

        $div = [
                "tagname" => "div",
                "textContent" => time()
        ];

		echo json_encode($div);
        file_put_contents("test_timer.json", json_encode($div));

?>
