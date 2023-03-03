<?php

class GPG {

	private $id;

	function __invoke(string $command, $param1 = "", $param2 = "", $param3 = "")
	{
		if (!isset($this->id))
			$this->id = gnupg_init();
		$tempFuncCall = 'gnupg_'.$command;

		// id is already used here in these, just extend with $param1
		$one_string = ["addencryptkey","decrypt","encrypt","encryptsign",
			"export","gettrustlist","import","keyinfo","listsignatures","setarmor","seterrormode","setsignmode","sign"];
		// id is already used here in these, just extend with $param1 and $param2
		$two_strings = ["adddecryptkey","addsignkey","decryptverify"];
		// id is already used here in these, just extend with $param1, $param2 and $param3
		$three_strings = ["verify"];
		if (in_array($command, $one_string) && $param1 != "")
		{
			return $tempFuncCall($this->id, $param1);
		}
		else if (in_array($command, $two_strings) && $param2 != "")
		{
			return $tempFuncCall($this->id, $param1, $param2);
		}
		else if (in_array($command, $three_strings) && $param3 != "")
		{
			return $tempFuncCall($this->id, $param1, $param2, $param3);
		}
		else if (strtolower($command) != "init")
		{
			try
			{
				return $tempFuncCall($this->id);
			}
			catch (e)
			{
				echo "Command does not exist";
			}
		}
		else if (strtolower($command) == "init")
		{
			echo "Command is not allowed. Instantiation created the object.";
		}
	}
}

$gpg = new GPG();
$gpg('addencryptkey', "6EB8C56F1C7A0590F8CC11A8234EA1E033ABA635");
$r = $gpg('encrypt',"BLIMEY!!");
$gpg('adddecryptkey',"6EB8C56F1C7A0590F8CC11A8234EA1E033ABA635","RTYfGhVbN!3$");
echo $gpg('decrypt', $r);
echo $r;
?>