/* Grid */
var linesGrid = {
checkSquares: [],
init: function()
{
	if (!this.ready) {
		this.obj = ID("grid");
		this.squares = [];
	}
	this.unselect();
	for (x = 0; x < 9; x++) {
		if (!this.ready) {
			this.squares[x] = [];
		}
		for (y = 0; y < 9; y++) {
			if (this.ready) {
				this.squares[x][y].deleteBall();
			} else {
				this.squares[x][y] = new Square(x, y);
			}
		}
	}
	Preview.init();
	Scores.init();
	if (this.ready) {
		cookies.remove("savedgame");
	} else {
		cookies.path = "/lines";
		cookies.keep("savedgame", 30);
		cookies.keep("highscores", 1000);
	}
	this.ready = true;
    onClickOrTap(ID("next-turn"), function() {
        linesGrid.turn();
    });
	this.loadGame();
},
reset: function()
{
	for (x = 0; x < 9; x++) {
		for (y = 0; y < 9; y++) {
			var item = this.squares[x][y];
			item.step = null;
			item.from = null;
		}
	}
	pathfinder.init();
},
unselect: function()
{
	if (this.selected) {
		classNameOf(this.selected.obj).remove("selected");
		this.selected = null;
	}
},
add: function()
{
	var empty = [];
	for (x = 0; x < 9; x++) {
		for (y = 0; y < 9; y++) {
			var item = this.squares[x][y];
			if (!item.ball) {
				empty.push(item);
			}
		}
	}
	if (empty.length) {
		var n = Math.floor(Math.random() * empty.length - 0,01);
		empty[n].createBall(Preview.use());
		this.checkSquares.push(empty[n]);
	}
},
turn: function()
{
	for (var i = 0; i < 3; i++) {
		this.add();
	}
	this.makeTurn = false;
	animation.onfinish = "linesGrid.checkLines()";
	animation.start();
},
checkLines: function()
{
	var item = this.checkSquares.shift();
	if (item && item.ball) {
		var same = item.findSame();
		if (same.items.length > 4) {
			same.fire();
		} else {
			this.checkLines();
		}
	} else if (this.makeTurn) {
		this.turn();
	} else {
		if (this.selected) {
			this.selected.select();
		}
		this.saveGame();
	}
},
saveGame: function()
{
	var balls = [];
	for (x = 0; x < 9; x++) {
		for (y = 0; y < 9; y++) {
			var item = this.squares[x][y].ball;
			if (item) {
				var coords = x.toString() + y.toString();
				balls.push(coords + item.color);
			}
		}
	}
	if (balls.length < 81) {
		var saved = balls.join("-") + "~" + Preview.items.join("-") + "~" + Scores.value;
		cookies.set("savedgame", saved);
	} else {
		cookies.remove("savedgame");
		alert("Game over");
	}
},
loadGame: function()
{
	var summary = cookies.get("savedgame");
	if (summary) {
		var values = summary.split("~");
		var balls = values[0].split("-");
		for (var i = 0, lim = balls.length; i < lim; i++) {
			var str = balls[i];
			var x = parseInt(str.charAt(0));
			var y = parseInt(str.charAt(1));
			this.squares[x][y].createBall(str.substr(2));
		}
		Preview.items = values[1].split("-");
		Preview.update();
		Scores.value = parseInt(values[2]);
		Scores.obj.innerHTML = Scores.value;
		this.makeTurn = false;
		animation.start();
	} else {
		this.makeTurn = true;
		this.turn();
	}
	highscores.init();
}
}

/* Colors for next turn */
var Preview = {
colors: ["yellow","green","red","blue","violet","aqua","pink"],
init: function()
{
	var list = ID("preview");
	this.nodes = getNodesOf(list);
	this.items = [];
	for (var i = 0; i < 3; i++) {
		this.add();
	}
	this.update();
},
add: function()
{
	var c = Math.floor(Math.random() * this.colors.length);
	this.items.push(this.colors[c]);
},
use: function()
{
	var color = this.items.shift();
	this.add();
	this.update();
	return color;
},
update: function()
{
	for (var i = 0; i < 3; i++) {
		this.nodes[i].className = this.items[i];
	}
}
}

/* Find path for ball */
var pathfinder = {
init: function()
{
	this.items = [];
	this.size = 0;
},
add: function(item)
{
	this.size = this.items.push(item);
},
process: function()
{
	var i = 0;
	while (i < this.size) {
		this.items[i].findSteps();
		i++;
	}
}
}

/* Square */
function Square(x, y)
{
	this.x = x;
	this.y = y;
	var obj = document.createElement("div");
	obj.className = "square";
	obj.style.left = x * 69 - 2 + "px";
	obj.style.top = y * 69 - 1 + "px";
	this.obj = ID("grid").appendChild(obj);
    onClickOrTap(this.obj, processEvent(this, "click"));
	this.ball = null;
}
Square.prototype = {
createBall: function(color, state)
{
	this.ball = new Ball(color, state);
	this.ball.parent = this;
	this.obj.appendChild(this.ball.obj);
	animation.items.push(this.ball);
},
deleteBall: function()
{
	if (this.ball) {
		this.obj.removeChild(this.ball.obj);
		this.ball = null;
	}
	if (this == linesGrid.selected) {
		linesGrid.unselect();
	}
},
click: function()
{
	if (this.ball && this.ball.state == 7) {
		this.select();
	}
	if (!this.ball && !animation.disableClick && linesGrid.selected && this.step) {
		this.invite();
	}
},
select: function()
{
	linesGrid.reset();
	this.step = 1;
	pathfinder.add(this);
	pathfinder.process();
	linesGrid.unselect();
	linesGrid.selected = this;
	classNameOf(this.obj).add("selected");
},
invite: function()
{
	var clone = linesGrid.selected.ball;
	this.createBall(clone.color, 0 - this.step);
	clone.aim = 0;
	animation.items.push(clone, this.ball);
	var last = this.from;
	while (last.step > 1) {
		last.createBall(clone.color, 7 + last.step);
		last.ball.aim = 0;
		animation.items.push(last.ball);
		last = last.from;
	}
	linesGrid.makeTurn = true;
	linesGrid.checkSquares.push(this);
	linesGrid.unselect();
	animation.onfinish = "linesGrid.checkLines()";
	animation.start();
},
findSteps: function()
{
	this.checkStep(this.x - 1, this.y);
	this.checkStep(this.x + 1, this.y);
	this.checkStep(this.x, this.y - 1);
	this.checkStep(this.x, this.y + 1);
},
checkStep: function(x, y)
{
	var column = linesGrid.squares[x];
	if (!column) return false;
	var item = column[y];
	var value = this.step + 1;
	if (item && !item.ball && (!item.step || item.step > value)) {
		item.step = value;
		item.from = this;
		pathfinder.add(item);
	}
},
findSame: function()
{
	var sameMax = new Line(this);
	var sameDiagonalDown = new Line(this);
	sameDiagonalDown.addLine(-1, -1);
	sameDiagonalDown.addLine(1, 1);
		sameMax.replace(sameDiagonalDown.items);
	var sameDiagonalUp = new Line(this);
	sameDiagonalUp.addLine(-1, 1);
	sameDiagonalUp.addLine(1, -1);
		sameMax.replace(sameDiagonalUp.items);
	var sameVertical = new Line(this);
	sameVertical.addLine(0, -1);
	sameVertical.addLine(0, 1);
		sameMax.replace(sameVertical.items);
	var sameHorizontal = new Line(this);
	sameHorizontal.addLine(-1, 0);
	sameHorizontal.addLine(1, 0);
		sameMax.replace(sameHorizontal.items);
	var directCross = false;
	if (sameHorizontal.items.length > 2) {
		sameMax.replace(this.findCross(-1, 0, 0));
		sameMax.replace(this.findCross(1, 0, 0));
		directCross = true;}
	if (sameVertical.items.length > 2) {
		sameMax.replace(this.findCross(0, -1, 0));
		sameMax.replace(this.findCross(0, 1, 0));
		directCross = true}
	if (directCross) {
		sameMax.replace(this.findCross(0, 0, 0));
	}
	var diagonslCross = false;
	if (sameDiagonalDown.items.length > 2) {
		sameMax.replace(this.findCross(-1, -1, 1));
		sameMax.replace(this.findCross(1, 1, 1));
		diagonslCross = true;}
	if (sameDiagonalUp.items.length > 2) {
		sameMax.replace(this.findCross(-1, 1, 1));
		sameMax.replace(this.findCross(1, -1, 1));
		diagonslCross = true}
	if (diagonslCross) {
		sameMax.replace(this.findCross(0, 0, 1));
	}
	return sameMax;
},
findCross: function(dx, dy, dd)
{
	var cross = new Line(this);
	var xc = this.x + dx;
	var yc = this.y + dy;
	cross.items = [];
	cross.add(xc, yc);
	if (cross.items.length) {
		cross.add(xc + 1, yc + dd);
		cross.add(xc - 1, yc - dd);
		cross.add(xc + dd, yc - 1);
		cross.add(xc - dd, yc + 1);
	}
	return cross.items;
}
}

function Line(obj)
{
	this.color = obj.ball.color;
	this.x = obj.x;
	this.y = obj.y;
	this.items = [];
	this.items.push(obj.ball);
}
Line.prototype = {
addLine: function(dx, dy)
{
	for (var i = 1, result = true; result; i++) {
		result = this.add(this.x + i * dx, this.y + i * dy);
	}
},
add: function(x, y)
{
	var column = linesGrid.squares[x];
	if (!column) return false;
	var item = column[y];
	if (item && item.ball && item.ball.state == 7 && item.ball.color == this.color) {
		this.items.push(item.ball);
		return true;
	} else return false;
},
fire: function()
{
	for (var i = 0, lim = this.items.length; i < lim; i++) {
		var ball = this.items[i];
		ball.aim = 0;
		animation.items.push(ball);
	}
	Scores.current += this.items.length * 2;
	animation.items.push(Scores);
	linesGrid.makeTurn = false;
	animation.onfinish = "linesGrid.checkLines()";
	animation.start();
},
replace: function(items)
{
	if (items.length > this.items.length) {
		this.items = items;
	}
}
}

/* Ball */
function Ball(color, state)
{
	this.color = color;
	this.obj = document.createElement("div");
	this.obj.className = "ball " + color;
	this.state = state || 0;
	this.active = (this.state < 8);
	this.aim = this.active ? 7 : 0;
}
Ball.prototype = {
show: function()
{
	var y = this.state;
	if (y > 0 && y < 8) {
		if (!this.active) y = 1;
		var str = "0 " + (y - 7) * 60 + "px";
		this.obj.style.backgroundPosition = str;
		this.obj.style.visibility = "visible";
	} else {
		this.obj.style.visibility = "hidden";
	}
},
animate: function()
{
	if (this.state > this.aim) this.state--;
	if (this.state < this.aim) this.state++;
	if (this.state == 0 && this.aim == 0) {
		this.parent.deleteBall();
		return false;
	} else {
		this.show();
		return (this.state != this.aim);
	}
}
}

/* Scores */
var Scores = {
init: function()
{
	this.value = 0;
	this.current = 0;
	this.obj = ID("scores");
	this.obj.innerHTML = this.value;
},
animate: function()
{
	if (this.current) {
		this.current--;
		this.value++;
		this.obj.innerHTML = this.value;
	}
	if (!this.current) {
		highscores.show();
	}
	return this.current;
}
}

var highscores = {
active: false,
init: function() {
	this.obj = ID("highscores");
	var record = cookies.get("highscores");
	if (record) {
		var values = record.split(" ", 2);
		this.value = parseInt(values[0]);
		this.show();
	}
},
show: function() {
	if (this.value) {
		if (Scores.value < this.value) {
			this.obj.innerHTML = "Лучший результат: " + this.value;
		}
		if (Scores.value > this.value) {
			this.obj.innerHTML = "Вы установили новый рекорд.";
			this.save();
		}
	} else {
		this.save();
	}
},
save: function() {
	var now = new Date();
	var str = Scores.value + " " + now.toGMTString();
	cookies.set("highscores", str);
}
}

/* Animation */
var animation = {
items: [],
active: false,
timer: null,
endTimer: null,
disableClick: false,
start: function()
{
	clearTimeout(this.endTimer);
	this.disableClick = true;
	if (!this.active) {
		this.apply();
	}
},
end: function() {
	clearTimeout(this.endTimer);
	this.disableClick = false;
},
apply: function()
{
	clearTimeout(this.timer);
	this.active = false;
	for (var i = 0, lim = this.items.length; i < lim; i++) {
		var item = this.items.shift(0);
		if (item.animate()) {
			this.items.push(item);
		}
	}
	if (this.items.length) {
		this.active = true;
		this.timer = setTimeout("animation.apply()", 50);
	} else if (this.onfinish) {
		this.endTimer = setTimeout("animation.end()", 300);
		setTimeout(this.onfinish, 250);
		this.onfinish = null;
	} else {
		this.end();
	}
}
}
