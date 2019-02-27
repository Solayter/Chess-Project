<?php

include 'class/Storage.php';
include 'class/MysqlStorage.php';
include 'class/Board.php';

//$storage = new SessionStorage('map'); //- хранение в сессии браузера
//$storage = new FileStorage('figures.txt'); // - хранение в файле
$storage = new MysqlStorage('mysql:host=localhost;dbname=nabokin_a_a;charset=utf8', 'nabokin_a_a', 'NewPass18');
$board = new Board($storage);

if (isset($_GET['newFigures'])) 
	echo $board->newFigures($_GET['gameID']);

if (isset($_GET['getFigures']))
	echo $board->getFigures($_GET['gameID']);

if (isset($_GET['moveFigure']))
	echo $board->moveFigure($_GET['frCoord'], $_GET['toCoord'], $_GET['gameID']);


?>