<?php
session_start();
	class cache {

		public $path;
		public $width;
		public $height;
		public $tableClass;
		public $rand_file;

		function __construct($json)
		{
			$h = "";
			$output = "";
			$counter = 0;
			$q_str = "";
			foreach($json as $array)
			{
				$q_str = "";
				srand(time());
				$this->rand_file[] = random_int(0,9999999999);
				// $h = "<script src='pipes.js'></script>";
				// $h .= "<div class='$this->tableClass' w3-include-html='$rand_file[$counter].html'>";
				$ech0 = $this->rand_file[$counter].".html";
				$temp = [];
				foreach($array as $key => $value)
				{
					$temp[$key] = $value;
				}
				exec("php -f ".$array->ajax." json=".$temp['json'] ." > $ech0");
				$counter++;
				echo file_get_contents($ech0);
				unlink($ech0);
			}

		}
	}
	
	$json = null;

	if (PHP_SAPI === 'cli' && count($argv) > 1)
	{
		$args = explode('=',$argv[1]);
		list($key, $value) = $args;
		$json = json_decode(file_get_contents($value.".json"));
		new cache($json);
	}
	else
	{
		if (isset($_POST['json']))
			$json = json_decode(file_get_contents($_POST['json'].".json"));
		else if (isset($_GET['json']))
			$json = json_decode(file_get_contents($_GET['json'].".json"));
		new cache($json);
	}
?>