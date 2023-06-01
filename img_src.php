<body></body>
<?php

        $div = [];
        $div["h"] = [
                "tagname" => "div",
                "textContent" => time()
        ];

        file_put_contents("test_timer.json", json_encode($div));

?>