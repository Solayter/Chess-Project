<?php 

class Board
{
	var $storage;
	
	function __construct(Storage $storage)
	{
		$this->storage = $storage;
	}

	function newFigures($gameID)
	{
		$this->storage->newBoard('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR',$gameID);
		return $this->storage->load($gameID);
	}

	function getFigures($gameID)
	{
		return $this->storage->load($gameID);
	}

	function moveFigure($frCoord, $toCoord, $gameID)
	{
		$figures = $this->storage->load($gameID);
		$frFigure = $figures[$frCoord];
		$toFigure = $figures[$toCoord];
		if (!$this->canMove($frFigure,$toFigure)) return $figures;
		$figures[$frCoord] = '1';
		$figures[$toCoord] = $frFigure;
		$this->storage->save($figures,$gameID);
		return $this->storage->load($gameID);
	}

	function canMove($frFigure, $toFigure)
	{
		if (strpos('Kk', $toFigure) !== false) return false;
		$frColor = $this->getFigureColor($frFigure);
		$toColor = $this->getFigureColor($toFigure);
		return $frColor != $toColor;
	}

	function getFigureColor($figure)
	{
		if(strpos('RNBQKP', $figure) !== false) return 'white';
		if(strpos('rnbqkp', $figure) !== false) return 'black';
		return 'empty';
	}
	
}