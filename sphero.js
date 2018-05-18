// The sphero object below mimics *some* of the basic commands
// you have access to when using the sphero.js library

module.exports =
{
    // iniitial state
    xPos: 0,
    yPos: 0,
    color: '',
    // mimic Sphero's connect method
    connect: function(work) {
        console.log("...let's roll! \n")
        work();
    },
    connect_random: function(work) {
        this.random_move();
        console.log("...let's roll! \n")
        work();
    },
    readOdometer: function () {
        console.log("-> receiving sphero's coordinates from the odometer...");
        var x = parseFloat(this.xPos.toFixed(2));
        var y = parseFloat(this.yPos.toFixed(2));
        return [x,y];
    },
    getColor: function () {
        return this.color;
    },
    // roll: function (distance, direction) {
    //     console.log('-> moving sphero ' + distance + ' units at ' + direction + ' degrees...')
    //     var rads = direction * ( Math.PI / 180 );
    //     this.xPos += distance * Math.cos(rads);
    //     this.yPos += distance * Math.sin(rads);
    // },
    roll: function (speed, direction) {
        console.log('-> moving sphero at a speed of ' + speed + ' in ' + direction + ' degrees...')
        sphero = this
        var rads = direction * ( Math.PI / 180 );
        var timeInt = 500;
        setInterval(function() {
            console.log('Moving sphero...');
            // console.log('speed ' + speed);
            // console.log('direction ' + direction);
            // console.log('timeInt ' + timeInt);
            // console.log('raddy ' + Math.cos(rads));
            // console.log('product2 ' + speed * timeInt);
            // console.log('product2 ' + speed * timeInt * Math.cos(rads));
            // console.log(this.xPos);
            // console.log(parseFloat(this.xPos.toFixed(2)));
            console.log(sphero.xPos);
            sphero.xPos += speed * timeInt * Math.cos(rads);
            sphero.yPos += speed * timeInt * Math.sin(rads);
            // console.log(this.xPos);
            // console.log(parseFloat(this.xPos.toFixed(2)));
            // console.log('Sphero is now at ' + '[' + parseFloat(this.xPos).toFixed(2) + ',' + parseFloat(this.yPos).toFixed(2) + ']...')
        }, timeInt);
            // this.xPos += direction * Math.cos(rads);
            // this.yPos += direction * Math.sin(rads);

    },
    random_move: function () {
        var distance = Math.random() * 500;
        var direction = Math.random() * 360;
        var rads = direction * ( Math.PI / 180 );
        this.xPos += distance * Math.cos(rads);
        this.yPos += distance * Math.sin(rads);
    },
    setColor: function (color) {
        console.log("-> changing sphero's color to " + color + '...');
        this.color = color;
    },
    assertState: function (xPos, yPos, color) {
        var colorMatches = false
        var posMatches = false
        xPos = parseFloat(xPos);
        yPos = parseFloat(yPos);

        console.log('-> asserting that sphero is ' + color + ' and at ' + '[' + xPos + ',' + yPos + ']...')

        if (this.color == color) {
            console.log('Color matches');
            colorMatches = true;
        } else if (color == undefined) {
            console.log('Not checking color');
            colorMatches = true;
        } else {
            console.log("Color doesn't match");
        }
        var position = this.readOdometer();
        if (position[0] == xPos.toFixed(2) && position[1] == yPos.toFixed(2)) {
            console.log('Position matches');
            posMatches = true;
        } else {
            console.log("Position doesn't match");
            console.log('Odometer reading is: ' + position);
            console.log('Expecting Sphero at: ' + [xPos.toFixed(2), yPos.toFixed(2)]);
        }
        return (colorMatches && posMatches);
    }
};
