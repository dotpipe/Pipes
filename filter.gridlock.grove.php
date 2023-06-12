<?php declare (strict_types = 1);

	$modal = file_get_contents("./modals.json");

	$modal = array_merge($modal, [ $token => $_POST[$token] ]);

	try {
		file_put_contents("./modals.json", json_encode($modal));
	} catch (Exception $e) {
		file_put_contents("./modals.json", json_encode($modal));
	}
	finally  {
		try {
			file_put_contents("./modals.json", json_encode($modal));
		} catch (Exception $e) {
			echo "File is Busy or Links are broken in application<br><hr>";
			echo "Try again later, thanks! eyb!";
		}
	}

?>