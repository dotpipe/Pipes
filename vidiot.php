<?php

	class vidiot {

		public $path;
		public $width;
		public $height;
		public $tableClass;

		function __construct($json)
		{
			$json = json_decode($json);
			$this->path = $json->path;
			$this->width = $json->width;
			$this->height = $json->height;
			$this->tableClass = $json->classes;
			$this->id = $json->id;
		}

		public function populate()
		{
			$this->path = './';
			$files = array_diff(scandir($this->path), array('.', '..'));
			$output = "";
			foreach ($files as $file)
			{
				if ($file == "vidiot.php" || $file == "pipes.js")
					continue;
				if (in_array(substr($file,-4),[".ogg",".mp4"]))
					$output .= ";$file";
				//$output .= "<input value'$file'>".$file."</input>";
			}
			$out = "<table><tr><td><h2 onclick='pipes(this)' incrIndex headers='mode:no-cors' insert='source' file-order='". substr($output,1) ."' file-index='0'>&lt;</h2></td>";
			$out .= '<td><p id="ths" onclick="pipes(this)" insert="ths"></p>';
			$out .= '<div> 
						<video width="'.$this->width.'" height="'.$this->height.'" loop id="'.$this->id.'" preload="auto" onmouseover="this.pause();" onmouseleave="this.play();" onclick="easy(media, m_seek);">
							<source id="source" type="video/mp4" src=""/>
						</video>
					</div></td>';
			$out .= "<td><h2 onclick='pipes(this)' decrIndex headers='mode:no-cors' insert='source' file-order='". substr($output,1) ."' file-index='0'>&gt;</h2></td></tr></table>";
			echo $out;
		}
		//<?=pipes_exec('vidiot.php');
	}
	$json = file_get_contents('vidiot.json');
	$vidiot = new vidiot($json);
	$vidiot->populate('./');      
	// "<=pipes_attr('attribute:value');                                                                                                                                                      
?>