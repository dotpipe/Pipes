<?php

class GPG {

	public $JSON;
	private $id;

	function __invoke(string $json_filename, string $command, $param1 = "", $param2 = "", $param3 = "")
	{
		$this->JSON = json_encode($json_filename);
		if (!isset($this->id))
			$this->id = gnupg_init();
		$tempFuncCall = 'gnu_pg'.$command;

		$one_string = ["addencryptkey","decrypt","encrypt","encryptsign",
			"export","gettrustlist","import","keyinfo","listsignatures","setarmor","seterrormode","setsignmode","sign"];
		$two_strings = ["adddecryptkey","addsignkey","decryptverify"];
		$three_strings = ["verify"];
		if (in_array($command,$one_string))
		{
			return $this->id->$tempFuncCall($this->id, $param1);
		}
		else if (in_array($command,$two_strings))
		{
			return $this->id->$tempFuncCall($this->id, $param1, $param2);
		}
		else if (in_array($command,$three_strings))
		{
			return $this->id->$tempFuncCall($this->id, $param1, $param2, $param3);
		}
		else if ($command != "init")
		{
			try
			{
				return $this->id->$tempFuncCall($this->id);
			}
			catch ($ee)
			{
				echo "Command does not exist";
			}
		}
	}
}

?>