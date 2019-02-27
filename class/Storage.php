<?php

interface Storage
{
	
	function newBoard($figures,$gameID);
	function save($figures,$gameID);
	function load($gameID);
	
}
