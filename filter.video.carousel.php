<?php

function structure($json)
{
	$output = populate($json->path, $json->exts);
	carousel($json, $output);
}

function populate($path, $file_exts)
{
	$files = array_diff(scandir($path), array('.', '..'));
	$output = "";
	foreach ($files as $file)
	{
		if (in_array(substr($file,-4),($file_exts)))
			$output .= ";$path/$file";
	}
	return $output;
}

function carousel($json, $output)
{
	$out = "<table><tr><td><h2 onclick='pipes(this)' incrIndex headers='mode:no-cors' insert='source' file-order='". substr($output,1) ."'>&lt;</h2></td>";
	$out .= '<td><p id="ths" onclick="pipes(this)" insert="ths"></p>';
	$out .= '<div> 
				<video width="'.$json->width.'" height="'.$json->height.'" loop id="'.$json->id.'" preload="auto" onmouseover="this.pause();" onmouseleave="this.play();" onclick="easy(media, m_seek);">
					<source id="source" type="video/mp4" src="" file-index="0"/>
				</video>
			</div></td>';
	$out .= "<td><h2 onclick='pipes(this)' decrIndex headers='mode:no-cors' insert='source' file-order='". substr($output,1) ."'>&gt;</h2></td></tr></table>";
	echo $out;
}


if (PHP_SAPI == 'cli' && count($argv) > 1)
{
	$args = explode('=',$argv[1]);
	list($key, $value) = $args;
	$json = json_decode(file_get_contents($value.".json"));
}
else
	$json = json_decode(file_get_contents($_GET['json'].".json"));
structure($json);

?>