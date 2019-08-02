var canvas = document.querySelector('canvas');

var width = window.innerWidth;
var height= 200;

canvas.width = width;
canvas.height = height;

var c = canvas.getContext('2d');  // used to actually draw in canvas

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);

// Line
// c.beginPath();
// c.moveTo(50,300);       //where we bigin drawing line
// c.lineTo(300,100);      // points for line
// c.lineTo(400,300);      // points for line
// c.strokeStyle = "red";
// c.stroke();             // draw those lines

// Arc / Circle

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI *2, false);  //x,y, radius, radian start, radiantt end, clockwise
// c.strokeStyle = 'blue';
// c.stroke();

// for (i = 0; i < 255; i++) {
//     var x = Math.random()*window.innerWidth;
//     var y = Math.random()*window.innerHeight;
//
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI *2, false);  //x,y, radius, radian start, radiantt end, clockwise
//     c.strokeStyle = color[randomNumber];
//     c.stroke();
// }
var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 40;
var minRadius = 2;
var distance = 50;

var colorArray = [
    '#08415C',
    '#858F98',
    '#DB504A',
    '#577590',
    '#FFD166',
];

window.addEventListener('mousemove',
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener('resize', function() {
    canvas.width = width;
    canvas.height = height;

    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random()* colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);  //x,y, radius, radian start, radiantt end, clockwise
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y +=  this.dy;

        //interactivity
        if (mouse.x - this.x < distance && mouse.x - this.x > -distance
            && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            if (this.radius < maxRadius){
                this.radius +=1;
            }

        } else if (this.radius>this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    };

}

var circleArray = [];

function init() {

    circleArray = [];

    for (var i = 0; i < 800; i++){
        var radius = (Math.random()*3 +1);
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random()- 0.5);
        var dy = (Math.random()- 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));

    }
};

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth,innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
    }
}

init();

animate();
