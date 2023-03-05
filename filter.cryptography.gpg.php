<?php
class GPG {
	private $id;
	function __invoke(string $command, string ...$params) : mixed//, $param2 = "", $param3 = "")
	{
		if ($command === "init")
		{
			echo "Cannot invoke object within stdClass";
			return;
		}
		if (!isset($this->id)) { $this->id = gnupg_init(); }
		$tempFuncCall = 'gnupg_'.$command;
		try
		{
			return $tempFuncCall($this->id, ...$params);
		}
		catch (e)
		{
			echo "Command does not exist";
		}
	}
}
?>