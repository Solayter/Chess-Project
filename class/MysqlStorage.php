<?php

class MysqlStorage implements Storage
{
	var $pdo;

	function __construct($dns, $user, $pass)
	{
		$this->pdo = new PDO($dns, $user, $pass);
	}

	function newBoard($figures,$gameID)
	{
		$this->pdo
			->prepare('INSERT INTO Board (figures,id) VALUES(?,?)')
			->execute(array($figures,$gameID));
		return $this->load($gameID);
	}
	
	function save($figures,$gameID)
	{
		$this->pdo
			->prepare('UPDATE Board SET figures= ? WHERE id= ?')
			->execute(array($figures,$gameID));
		return $this->load($gameID);
	}

//	function load($gameID)
//	{
//		return $this->pdo
//				->prepare('SELECT figures FROM Board WHERE id = ?')
//				->execute(array($gameID))
//				->fetch()[0];
//	}
	
			//------------------------------------------------//
			
	function load($gameID)
	{
		$stmt = $this->pdo->prepare("SELECT figures FROM Board WHERE id=? ");
		$stmt->bindValue(1, $gameID, PDO::PARAM_INT);
		$stmt->execute();
		return $stmt->fetch()[0];
	}
	
	
	
	
	
	
	
	
	
}