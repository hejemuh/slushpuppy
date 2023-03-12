let bubbles = document.querySelectorAll("a");
let c = document.getElementById("container");
let mouseX, mouseY;

let size = 200;

let rows = Math.floor(window.innerHeight / size);
let cols = Math.floor(window.innerWidth / size);

let positions = [];

for (let i=0;i<rows;i++){
    for (let j=0;j<cols;j++){
        let pos = [];
        let a=document.createElement("A");
        if (i%2==1){
            pos[1] = size/2 + i*size*.87;
            pos[0] = j*size - size/2;
        } else {
            pos[1] = size/2 + i*size*.87;
            pos[0] = j*size;
        }
        if(j==0 || i%2==0 && j==cols-1){} else {
            positions.push(pos);
        }

        // let a=document.createElement("A");
        // if (i%2==1){
        //     a.style.top = size/2 + i*size*.87 + "px";
        //     a.style.left = j*size - size/2 + "px";
        // } else {
        //     a.style.top = size/2 + i*size*.87 + "px";
        //     a.style.left = j*size + "px";
        //     if (j==cols-1){
        //         a.style.background="blue";
        //     }
        // }
        
        // if(j==0 || i%2==0 && j==cols-1){
            
        // } else {
        //     c.appendChild(a);
        // }
    }
}

c.style.height = Math.floor(window.innerHeight / size*0.87) * size + "px";
c.style.width = Math.floor(window.innerWidth / size) * size - size + "px";

shuffle(positions);

// //place circles
// //get shuffle function
for (let i=0;i<bubbles.length;i++){
    let b = bubbles[i];
    let pos = positions[i];
    console.log(pos);
    // b.style.left = pos[0] + "px";
    // b.style.top = pos[1] + "px";
    // b.style.width = size + "px";   
    b.style.top = Math.random() * 80 + "vh";
}

document.onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}

setInterval(function(){
    for(b of bubbles){
        let bounds = b.getBoundingClientRect();
        let centerX = bounds.left + bounds.width/2;
        let centerY = bounds.top + bounds.height/2;
        let distance = dist(centerX, centerY, mouseX, mouseY)
        // b.style.width = map(distance, 0, window.innerWidth, size*1.1, 0) + "px";
        // b.style.height = map(distance, 0, window.innerWidth, size*1.1, 0) + "px";
        let color = map(distance, 0, window.innerWidth, 360, 0);
        // b.style.backgroundColor = "hsl("+color+",80%,60%)";
        // b.style.borderRadius = map(distance,0,window.innerWidth, 50, 0) + "%";
        b.style.fontSize = map(distance, 0, window.innerWidth, 4, 0) + "vw";
        let rotation = map(distance, 0, window.innerWidth, 60,-90);
        b.querySelector("span").style.transform = "rotate("+rotation+"deg)";

        // console.log(parseInt(b.style.left), parseInt(b.style.top));
        let x = parseInt(b.style.left);
        let y = parseInt(b.style.top);
        let distX = (centerX - mouseX)*0.98;
        let distY = (centerY - mouseY)*0.98;

        let move = true;
        let moveAway = false;

        for (otherBubble of bubbles){
            if (b!=otherBubble && isCollide(b, otherBubble)){ 
                move=false;
            } 
        }
        // if (move){
        //     if (centerX > mouseX){
        //         b.style.left = x-1 + "px";
        //     } else {
        //         b.style.left = x+1 + "px";
        //     }
        //     if (centerY > mouseY){
        //         b.style.top = y-1 + "px";
        //     } else {
        //         b.style.top = y+1 + "px";
        //     }
        // } else if (isCollide(b, otherBubble)){ 
        //     let otherBounds = otherBubble.getBoundingClientRect();
        //     if (centerX > otherBounds.x){
        //         b.style.left = x+1 + "px";
        //     } else {
        //         b.style.left = x-1 + "px";
        //     }
        //     if (centerY > otherBounds.y){
        //         b.style.top = y+1 + "px";
        //     } else {
        //         b.style.top = y-1 + "px";
        //     }
        // }
        // this.multiplier = 1;
        // console.log(centerX - mouseX);
    }
})

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function dist(x1, y1, x2, y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function isCollide(elem1, elem2) {
    let a = elem1.getBoundingClientRect();
    let b = elem2.getBoundingClientRect();
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//every second
//find out where the mouse is
//find the circle in that location
//increase that circle by 0.1
//increase all the other circles by their distance to mouse