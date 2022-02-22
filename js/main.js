let canvas = {
    element: document.getElementById('canvas'),
    width: window.innerWidth, //600,
    height: window.innerHeight,//400,
    initialize: function () {
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        document.body.appendChild(this.element);
    }
};

var ball = {
    create: function (radius = 50) {
        let newBall = Object.create(this);
        // Create ball
        newBall.element = document.createElement('div');
        newBall.element.style.backgroundColor = this.colors[Math.floor(Math.random()*this.colors.length)],
        newBall.element.style.width = radius * 2 + 'px';
        newBall.element.style.height = radius * 2 + 'px';
        newBall.element.className += ' ball';
        newBall.width = parseInt(newBall.element.style.width);
        newBall.height = parseInt(newBall.element.style.height);
        // Ball directions
        newBall.dx = this.randomDirection();
        newBall.dy = this.randomDirection();
        // Random ball location
        newBall.lx = Math.floor(Math.random() * (canvas.width - radius * 2) + 1);
        newBall.ly = Math.floor(Math.random() * (canvas.height - radius * 2) + 1);
        // Add ball to canvas
        canvas.element.appendChild(newBall.element);
        
        return newBall;
    },

    colors: ['#d578ff', '#625df0', '#59e7f2', '#f259a6', '#67eebb', '#213240', '#90aec6', '#10c8cd', '#ec1559', '#faf93c'],

    directions: [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6],

    randomDirection: function() {
        return this.directions[Math.floor(Math.random()*this.directions.length)]
    },

    moveTo: function (x, y) {
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    },

    hitWall: function (x, y) {
        if (x < 0 || x > canvas.width - this.width) {
            this.dx = -this.dx;
            this.element.style.backgroundColor = this.colors[Math.floor(Math.random()*this.colors.length)];
        }

        if (y <0 || y > canvas.height - this.height) {
            this.dy = -this.dy;
            this.element.style.backgroundColor = this.colors[Math.floor(Math.random()*this.colors.length)];
        }
    },

    draw: function (x = this.lx, y = this.ly) {
        this.moveTo(x, y);
        let ball = this;
        setTimeout(function () {
            ball.hitWall(x, y);
            ball.draw(x + ball.dx, y + ball.dy);
        }, 1000 / 60);
    },


    speedUp: function() {
        if (Math.abs(this.dx) <= 50 && Math.abs(this.dy) <= 50) {
            btnSlowDown.classList -= ' hidden';
            this.dx = Math.floor(2 * this.dx); 
            this.dy = Math.floor(2 * this.dy); 
        } else {
            alert('Cannot speedup more!');
            btnSpeedUp.classList += ' hidden';
        }
    },

    slowDown: function() {
        if (Math.abs(this.dx) > 2 && Math.abs(this.dx) > 2) {
            btnSpeedUp.classList -= ' hidden';
            this.dx = Math.floor(1/2 * this.dx); 
            this.dy = Math.floor(1/2 * this.dy); 
        } else {
            alert('Cannot slowdown more!');
            btnSlowDown.classList += ' hidden';
        }
    },

    createController: function() {
        var btnSlowDown = document.createElement('button');
        btnSlowDown.innerHTML = '<i class="fa-solid fa-backward"></i>';
        btnSlowDown.id += 'slowDown';
        canvas.element.appendChild(btnSlowDown);

        var btnReLoad = document.createElement('button');
        btnReLoad.innerHTML = '<a href="/"><i class="fa-solid fa-arrow-rotate-right"></i></a>';
        canvas.element.appendChild(btnReLoad);

        var btnSpeedUp = document.createElement('button')
        btnSpeedUp.innerHTML = '<i class="fa-solid fa-forward"></i>';
        btnSpeedUp.id += 'speedUp';
        canvas.element.appendChild(btnSpeedUp);
    }
};

// Start
canvas.initialize();
let myBall = ball.create();
myBall.createController();
let btnSpeedUp = document.getElementById('speedUp');
let btnSlowDown = document.getElementById('slowDown');
myBall.draw();
btnSpeedUp.addEventListener('click', function() {myBall.speedUp()});
btnSlowDown.addEventListener('click', function() {myBall.slowDown()});