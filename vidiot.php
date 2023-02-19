<?php

	class vidiot {

		public $path;
		public $width;
		public $height;
		public $tableClass;

		function structure($json)
		{
			$json = json_decode($json);

			$this->path = $json->path;
			$this->width = $json->width;
			$this->height = $json->height;
			$this->tableClass = $json->class;
			$this->id = $json->id;
			$output = "";
			if ($this->path != "")
			{
				$output = $this->populate();
			}
		}
	}
	$json = file_get_contents('vidiot.json');
	$vidiot = new vidiot($json);
	echo $vidiot->populate();
?>