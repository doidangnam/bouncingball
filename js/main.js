var canvas = {
    element: document.getElementById('canvas'),
    width: window.innerWidth, //600,
    height: window.innerHeight,//400,
    initialize: function () {
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        
        document.body.appendChild(this.element);
    }
};

var Ball = {
    create: function (radius) {
        var newBall = Object.create(this);
        newBall.dx = this.randomDirection();
        newBall.dy = this.randomDirection();
        newBall.radius = radius
        newBall.width = radius*2;
        newBall.height = radius*2;
        newBall.element = document.createElement('div');
        newBall.element.style.backgroundColor = this.colors[Math.floor(Math.random()*this.colors.length)],
        newBall.element.style.width = radius + 'px';
        newBall.element.style.height = radius + 'px';
        newBall.element.className += ' ball';
        newBall.width = parseInt(newBall.element.style.width);
        newBall.height = parseInt(newBall.element.style.height);
        newBall.lx = radius + (Math.random() * (canvas.width - radius) + 3);
        newBall.ly = radius + (Math.random() * (canvas.height - radius) + 3);
        canvas.element.appendChild(newBall.element);
        return newBall;
    },

    colors: ['#d578ff', '#625df0', '#59e7f2', '#f259a6', '#67eebb', '#213240', '#90aec6', '#10c8cd', '#ec1559', '#faf93c'],

    directions: [-6,-5,-4,-3,-2,-1,1,2,3,4,5,6],

    randomDirection: function() {
        return this.directions[Math.floor(Math.random()*this.directions.length)]
    },

    moveTo: function (x, y) {
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    },

    hitWall: function (x, y) {
        if (x < 0 || x >= canvas.width - this.width) {
            this.dx = -this.dx;
        }
        if (y <0 || y >= canvas.height - this.height) {
            this.dy = -this.dy;
        }
    },

    draw: function (x = this.lx, y = this.ly) {
        this.moveTo(x, y);
        var ball = this;
        setTimeout(function () {
            ball.hitWall(x, y);
            ball.draw(x + ball.dx, y + ball.dy);
        }, 1000 / 60);
    },


    speedUp: function() {
        if (absolute(this.dx) <= 50 || absolute(this.dy) <= 50) {
            this.dx = rounded(2 * this.dx); 
            this.dy = rounded(2 * this.dy); 
        } else {
            alert('Cannot speedup more!');
        }
    },

    slowDown: function() {
        if (absolute(this.dx) > 2 || absolute(this.dx) > 2) {
            this.dx = rounded(1/2 * this.dx); 
            this.dy = rounded(1/2 * this.dy); 
        } else {
            alert('Cannot slowdown more!');
        }
    },

    createController: function() {
        var btnSpeedUp = document.createElement('button')
        btnSpeedUp.innerHTML = 'Speedup';
        btnSpeedUp.id += 'speedUp'
        canvas.element.appendChild(btnSpeedUp);

        var btnSlowDown = document.createElement('button')
        btnSlowDown.innerHTML = 'Slowdown';
        btnSlowDown.id += 'slowDown'
        canvas.element.appendChild(btnSlowDown);
    }
};

function rounded(num) {
    return Math.round(num);
}

function absolute(num) {
    return Math.abs(num);
}

// Start
canvas.initialize();
var myBall = Ball.create(100);
myBall.createController();
var btnSpeedUp = document.getElementById('speedUp');
var btnSlowDown = document.getElementById('slowDown');
myBall.draw(100, 100);
btnSpeedUp.addEventListener('click', function() {myBall.speedUp()});
btnSlowDown.addEventListener('click', function() {myBall.slowDown()});