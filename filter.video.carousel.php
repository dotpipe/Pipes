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
	$out = "<table><tr><td class='".$json->class."'><h2><dyn incrIndex headers='mode:no-cors' insert='source' file-order='". substr($output,1) ."'>&lt;</dyn></h2></td>";
	$out .= '<td><div> 
				<video width="'.$json->width.'" height="'.$json->height.'" loop id="'.$json->id.'" preload="auto" onmouseover="this.pause();" onmouseleave="this.play();" onclick="easy(media, m_seek);">
					<source id="source" type="video/mp4" src="" file-index="0"/>
				</video>
			</div></td>';
	$out .= "<td class='" . $json->class ."'><h2><dyn decrIndex headers='mode:no-cors' insert='source' file-order='". substr($output,1) ."'>&gt;</dyn></h2></td></tr></table>";
	echo $out;
}

$json = null;

if (PHP_SAPI == 'cli' && count($argv) > 1)
{
	$args = explode('=',$argv[1]);
	list($key, $value) = $args;
	$json = json_decode(file_get_contents($value.".json"));
}
else
{
	if ($_SERVER['REQUEST_METHOD'] == 'POST')
		$json = json_decode(file_get_contents($_POST['json'].".json"));
	else if (isset($_GET))
		$json = json_decode(file_get_contents($_GET['json'].".json"));
}

structure($json);

?>