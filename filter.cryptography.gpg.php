<?php
class GPG {
	private $id;
	function __invoke(string $command, string ...$params) //, $param2 = "", $param3 = "")
	{
		if ($command === "init")
		{
			echo "Cannot invoke object within stdClass";
			return null;
		}
		if (!isset($this->id)) { $this->id = gnupg_init(); }
		$tempFuncCall = 'gnupg_'.$command;
		try
		{
			return $tempFuncCall($this->id, ...$params);
		}
		catch (Exception $e)
		{
			echo "Command does not exist";
		}
	}
}
?>
