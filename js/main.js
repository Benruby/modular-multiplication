function draw() {
	var canvas = document.getElementById('multiplier');
	var ctx = canvas.getContext('2d');

    var x = 300; // x coordinate
    var y = 300; // y coordinate
    var radius = 295; // Arc radius
    var point_size = 2;
    var number_of_points = 10;
    var multiplier = 2;
    var points = [];

    function drawCircle() {
    	points = [];
    	ctx.clearRect(0, 0, canvas.width, canvas.height);


    	ctx.beginPath();
        var startAngle = 0; // Starting point on circle
        var endAngle = 2 * Math.PI; // End point on circle

        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();


        var i;
        var angleBetweenPoints = 360 / number_of_points;
        for (i = 0; i < number_of_points ; i++) {
        	drawPoint(i * angleBetweenPoints, 1)
        }

        for (i = 1; i < points.length; i++ ) {
        	ctx.beginPath();
        	ctx.moveTo(points[i].x, points[i].y);

        	if (i < points.length / multiplier ) {
        		ctx.lineTo(points[i*multiplier].x, points[i*multiplier].y);

        	} else {
        		ctx.lineTo(points[i*multiplier % points.length].x, points[i*multiplier % points.length].y);

        	}
        	ctx.stroke();
        }
    }

    function drawPoint(angle,distance){
    	var pointx = x + radius * Math.cos(-angle*Math.PI/180) * distance;
    	var pointy = y + radius * Math.sin(-angle*Math.PI/180) * distance;

    	ctx.beginPath();
    	ctx.arc(pointx, pointy, point_size, 0, 2 * Math.PI);
    	ctx.fill();

    	points.push({x: pointx, y: pointy});
    }

    if (canvas.getContext) {
    	drawCircle();
    }

    // add event listener to point number selection
    var pointNumElement = document.getElementById("pointNumber");
    pointNumElement.addEventListener('input', function(e){
    	number_of_points = this.value;
    	drawCircle();
    });

    // add event listener to multiplier number selection
    var pointNumElement = document.getElementById("multiplierInput");
    pointNumElement.addEventListener('input', function(e){
    	multiplier = this.value;
    	drawCircle();
    });
}
