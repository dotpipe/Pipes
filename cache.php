<?php

	class cache {

		public $path;
		public $width;
		public $height;
		public $tableClass;
		public $rand_file;

		function __construct($json)
		{
			$json = json_decode($json);
			$h = "";
			$output = "";
			$counter = 0;
			foreach($json as $array)
			{
				srand(time());
				$this->rand_file[] = random_int(0,9999999999);
				// $h = "<script src='pipes.js'></script>";
				// $h .= "<div class='$this->tableClass' w3-include-html='$rand_file[$counter].html'>";
				$ech0 = $this->rand_file[$counter].".html";
				exec("php -f ".$array->ajax." > $ech0");
				$counter++;
				echo file_get_contents($ech0);
				unlink($ech0);
			}

		}
	}
	$json = file_get_contents('cache.json');
	$cache = new cache($json);
?>