<?php declare (strict_types = 1);
	namespace src;

	require_once './src/pasm.php';

	class H2No {

		public $h2no;
		public $result;
		public $res_temp;
		public $db;

		function __construct(string $file)
		{	
			$this->result = [];
			{
				try
				{
					$temp = json_encode(file_get_contents($file));
					$this->db = json_decode($temp);
				}
				catch (e)
				{
					echo $file. " does not exist.";
					exit(0);
				}
			}
		}

		public function control_db($res)
		{
			if (is_object($res))
				$res = (json_encode($res));
			if (!is_array($res))
				$res = json_decode($res);
			$this->res_temp = ($res);
		}

		/**
		  * Delete
		  * Match elements from NoSQL
		  * query and return results.
		  *
		  * @method delete
		  * @param kv key/value array
		  * @param db H2No Database Name (default: h2no)
		  * @param c_table name of table (top-level key)
		 */
		public function crud($kv, $cmd, $c_table)
		{
			$this->control_db($this->db);
			{
				$this->result = $this->res_temp;

				if ($cmd == "c" && $this->res_temp->$c_table != null)
				{
					$ky = array_key_first($kv);
					$this->res_temp->$c_table->$ky = $kv[$ky];
					array_merge_recursive(array($this->result),array($this->res_temp->$c_table));
				}
				foreach ($this->res_temp as $key => $val)
				{
					if ($key != $c_table)
						continue;
					$vs = $val;
					
					foreach ($val as $k => $v)
					{
						if ($kv == $k && $cmd == "d")
							unset($this->result->$c_table->$k);
						elseif ($kv != $k && $cmd == "r")
							unset($this->result->$c_table->$k);
						elseif (!is_string($kv) && $kv->$k != null && $cmd == "u")
							$this->result->$c_table->$k = $this->result->$c_table->$k;
					}
					array_merge_recursive([$this->result],array($vs));
				}
			}
			return $this->result;
		}

		/**
		  * Save
		  * Save Results back to file
		  *
		 */
		public function save($file)
		{
			$temp = $this->result;
			file_put_contents($file, json_encode($temp));
			return $this->db;
		}

		public function load_db($file)
		{
			$temp = file_get_contents($file);
			$this->db = json_decode($temp);
			return $this->db;
		}
	}

/*
$h2no = new H2No(("./cache.json"));
($h2no->crud('ajax', 'd', 'vidiot'));
var_dump($h2no->result);
$h2no->save("./cash.json");

var_dump($h2no->crud(['ajax1' => 'cash.json'], 'c', 'vidiot'));
	
var_dump($h2no->result);
*/
?>