var map;
var divSquare = '<div id ="s$coord" class="square $color"></div>';
var divFigure = '<div id ="f$coord" class="figure">$figure</div>';
var isDragging = false;
var isFlipped = false;

$(function () {
	start();
	$('.buttonFlip').click(flipBoard);
	console.log('aaaaa');
	setInterval('showFiguresPHP()',1000);
});

function start() {
	map = new Array(64);
	addSquares();
	showFiguresPHP();
	document.getElementById("gameID").innerHTML = "Номер игровой сессии: " + sessionStorage.getItem("gameID");
	
}

function flipBoard() {
	isFlipped = !isFlipped;
	start();
}

function setDraggable() {
	$('.figure').draggable({
		start: function (event,ui) {
					isDragging = true;
				}
	});
}

function setDroppable() {
	$('.square').droppable({
		drop:   function(event,ui) {
					var frCoord = ui.draggable.attr('id').substring(1);
					var toCoord = this.id.substring(1);
					moveFigure(frCoord, toCoord);
					moveFigurePHP(frCoord, toCoord);
					isDragging = false;
				}
	});
}
function moveFigure(frCoord, toCoord) {
	
	console.log('move from ' + frCoord + ' to ' + toCoord);
	figure = map[frCoord];
	showFigureAt(frCoord, '1');
	showFigureAt(toCoord, figure);
}

function addSquares() {
	console.log('addSquares');
	$('.board').html('');
	for (var coord = 0; coord < 64; coord++)
		$('.board').append(divSquare
			.replace('$coord', isFlipped ? 63 - coord : coord)
			.replace('$color',
				isBlackSquareAt(coord) ? 'black' : 'white'));
	setDroppable();
}

function showFigures(figures) {
	for (var coord = 0; coord < 64; coord++)
		showFigureAt(coord, figures.charAt(coord));
}


function showFigureAt(coord, figure) {
	if(map[coord] == figure) return;
	map[coord] = figure;
	$('#s' + coord).html(divFigure
		.replace('$coord', coord)
		.replace('$figure', getChessSymbole(figure)));
	setDraggable();
}

function getChessSymbole(figure) {
	switch (figure) {
		case 'K' : return '&#9812;';
		case 'Q' : return '&#9813;';
		case 'R' : return '&#9814;';
		case 'B' : return '&#9815;';
		case 'N' : return '&#9816;';
		case 'P' : return '&#9817;';

		case 'k' : return '&#9818;';
		case 'q' : return '&#9819;';
		case 'r' : return '&#9820;';
		case 'b' : return '&#9821;';
		case 'n' : return '&#9822;';
		case 'p' : return '&#9823;';
		default  : return '';
	}
}

function isBlackSquareAt(coord) {
	return (coord % 8 + Math.floor(coord / 8)) % 2;
}

function newFiguresPHP() {
	$.get('chess.php?newFigures' +
			'&gameID=' + Number(sessionStorage.getItem("gameID")),
		showFigures_New);
}

function showFigures_New(figures){
	
	showFigures(figures);
}

function moveFigurePHP(frCoord, toCoord) {
	
	$.get('chess.php?moveFigure' + 
			'&frCoord=' + frCoord +
			'&toCoord=' + toCoord +
			'&gameID=' + Number(sessionStorage.getItem("gameID")),
		showFigures_Move);
}

function showFigures_Move(figures)
{
	if(sessionStorage.getItem("flag") == true){
		sessionStorage.setItem("flag","false");
		console.log(sessionStorage.getItem("flag"));
	}
	else{
		sessionStorage.setItem("flag","true");
		console.log(sessionStorage.getItem("flag"));
	}
	
	console.log(sessionStorage.getItem("flag"));
	
	sessionStorage.setItem("board",figures);
	showFigures(figures);
}

function showFiguresPHP() {
	if (isDragging) return;
	$.get('chess.php?getFigures' +
			'&gameID=' + Number(sessionStorage.getItem("gameID")), 
		showFigures_Show);
}

function showFigures_Show(figures){
	if (sessionStorage.getItem("board") != figures){
		if(sessionStorage.getItem("flag") == "true")
			sessionStorage.setItem("flag","false");
		else
			sessionStorage.setItem("flag","true");
		sessionStorage.setItem("board", figures);
	}
	
	
	if(sessionStorage.getItem("flag") == "true")
		sessionStorage.setItem("turn", "Ходят белые");
	else
		sessionStorage.setItem("turn", "Ходят черные");
	showFigures(figures);
	//console.log(sessionStorage.getItem("flag"));
	//document.getElementById("flag").innerHTML = sessionStorage.getItem("turn");
}

function randomID(){
	return Math.round(Math.random()*100000);
}

function newGame() {
	sessionStorage.setItem("gameID",randomID());
	window.location = "board.html";
	console.log(Number(sessionStorage.getItem("gameID")));
	newFiguresPHP();
	
	sessionStorage.setItem("flag", true);
	
	console.log(sessionStorage.getItem("flag"));

}

function joinGame() {
	sessionStorage.setItem("gameID", document.getElementById("input").value);
	window.location = "board.html";
	console.log(Number(sessionStorage.getItem("gameID")));
}
