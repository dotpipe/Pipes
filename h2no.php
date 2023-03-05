<?php declare (strict_types = 1);
	namespace src;

	require_once './src/pasm.php';

	class H2No {

		public static $h2no;
		public static $result;
		public static $db;

		function __construct(string $file)
		{	
			$sha256 = "";
			H2No::$result = [];
			try
			{
				if (file_exists($file))
				{
					H2No::$h2no = new PASM();
				}
				try
				{
					$temp = json_encode(file_get_contents($file));
					H2No::$h2no::$stack = json_decode($temp);
				}
				catch (e)
				{
					H2No::$h2no::restore($file);
				}
				H2No::$db = H2No::$h2no::$stack;
			}
			catch (e){exit(0);}
			H2No::$h2no::verified();
			if (H2No::$h2no::$checksum == "a2b1ddd23dcda40accd3ae4a1faa6b22d7570c299f1bb4afeeeaf8860e9a5aba")
			{
				echo 'PASM Verified as Version ' . H2No::$h2no::$version;
			}
			else
			{
				echo 'PASM version was unaquirable' . H2No::$h2no::$version;
				exit();
			}
		}

		public static function check_db($array)
		{
			return ($array == [1]) ? H2No::$db : $array;
		}

		public static function control_db($_db)
		{
			if (is_string($_db) || !is_a($_db,'stdClass'))
				$_db = json_decode($_db);
			return array($_db);
		}
		/**
		  * Delete
		  * Match elements from NoSQL
		  * query and return results.
		  *
		  * @method delete
		  * @param kv key/value array
		  * @param db H2No Database Name (default: h2no)
		 */
		public static function crud($kv, $cmd, $array = [1])
		{
			$_db = H2No::check_db($array);
			$_db = H2No::control_db($_db);
			
			if ($cmd == "u" || ($cmd == "c" && is_array($kv) && !empty($kv)))
			{
				// $_db = (!is_array($_db)) ? array($_db) : $_db;
				H2No::$result = array_merge_recursive(array($_db), $kv);
				array_shift(H2No::$result);
			}
			else
			{
				if ($cmd == 'd')
				foreach (array_keys($_db) as $key)
				{
					
					{
						if ($kv != $key)
							H2No::$result[$key] = $_db[$key];
						else if (is_array($_db[$key]))
							H2No::$result[$key] = crud($kv, $cmd,$_db[$key]);
					}
					if ($cmd == 'r')
					{
						echo $_db[$key];
						if ($kv == $key)
							H2No::$result[$key] = $_db[$key];
						else if (is_array($_db[$key]))
							H2No::$result[$key] = crud($kv, $cmd,$_db[$key]);
					}
				}
			}
			return H2No::$result;
		}

		/**
		  * Save
		  * Save Results back to file
		  *
		 */
		public static function save($file)
		{
			$temp = H2No::$result;
			file_put_contents($file, json_encode($temp));
			return H2No::$db;
		}

		public static function load_db($file)
		{
			$temp = H2No::$h2no::restore($file);
			H2No::$db = json_decode($temp);
			return H2No::$db;
		}
	}
$h2no = new H2No(("./cache.json"));
var_dump($h2no->crud('ajax', 'r'));
// var_dump($h2no->crud(['vidiot' => ['ajax' => 'cash.json']], 'c'));

$h2no->save("./cash.json");

	
?>