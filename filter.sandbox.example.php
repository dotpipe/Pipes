<?php
        session_start();

        $sessid = session_id();

        $ajax = $_GET['file'];

        file_put_contents("$sessid.json", $ajax, JSON_PRETTY_PRINT);

?>