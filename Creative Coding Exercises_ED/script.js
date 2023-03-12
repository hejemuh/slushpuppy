let test = document.getElementById("testBlock");

let arrow = document.getElementById("arrow");
let gc = document.getElementById("name");
let gc_spans = document.querySelectorAll("#name > * ");
let lineItems = document.querySelectorAll("li");

let marginX = 50;
let marginY = 40;
let gutter = 25;

let colWidthGutter = document.querySelector(".cols div").getBoundingClientRect().width + gutter;
if (window.innerWidth < 630){
    colWidthGutter = colWidthGutter/2
}

let topmostY = marginY;
let bottommostY = window.innerHeight - marginY;;

let currentCol = 0;
let nextCol = 1;
let gX = marginX;
let gY = marginY;
let newX, newY;

let mobileClassFixed = false;




// setting the top, left, and position values for the letters in name on load using a callback
for (let letter of gc_spans){
    function step1(letter){
        return new Promise((resolve, reject) => {
            let bounds = letter.getBoundingClientRect();
            letter.setAttribute("data-offset", bounds.x - marginX);
            letter.style.left = bounds.x + "px";
            if (letter.id == "arrow"){
                letter.style.top = bounds.y + 4 + "px";
            } else {
                letter.style.top = bounds.y + "px";
            }
            resolve(letter);
          });
    }
    //wait for everything to load and be assigned before giving them a fixed position
    // step1(letter).then(result => {
    //     letter.classList.add("fixed");
    // });

    if (window.innerWidth >= 630){
        step1(letter).then(result => {
            letter.classList.add("fixed");
        });
    } else {
        step1(letter);
    }
    // else {
    //     // window.onload = function(){
    //     //     console.log("window loaded")
    //             step1(letter).then(result => {
    //                 setTimeout(function(){
    //                     letter.classList.add("fixed");
    //                 }, 500)
    //             });
    //     // }
    // }
}

for (let li of lineItems){
    let bounds = li.getBoundingClientRect();
    li.setAttribute("data-top", bounds.bottom);
    li.setAttribute("data-height", bounds.height);
    li.setAttribute("data-left", bounds.x);
}

if (isTouchDevice()){
    prepShift();
    gc.addEventListener("touchend", function(){
        makeShift();
        prepShift();
    })
    gc.addEventListener("touchstart", function(){
        if (!mobileClassFixed){
            for (let letter of gc_spans){
                letter.classList.add("fixed");
            }
            mobileClassFixed = true;
        }
    })
} else {
    gc.addEventListener("mouseenter", prepShift)
    gc.addEventListener("mouseleave", function(){
        arrow.style.transform = `rotate(45deg)`
    })
    gc.addEventListener("mousedown", makeShift)
}


function prepShift(){
    // decide what the next column is going to be
    if(currentCol==0){nextCol = currentCol+1}
    else if(currentCol==2){nextCol = currentCol-1}
    else if(Math.random()<0.5 && window.innerWidth > 870){nextCol = currentCol+1}
    else {nextCol = currentCol-1}

    let colDiff = nextCol - currentCol;


    // determine range of random angle

    let angleBottomRange = rad2deg(Math.atan((gY - topmostY)/colWidthGutter)) * (-1);
    let angleTopRange = rad2deg(Math.atan((bottommostY - gY)/colWidthGutter));
    let randomAngle = Math.random() * (angleTopRange - angleBottomRange) + angleBottomRange;

    if ( colDiff > 0){
        //add 360 to the arrow to make it look like it's moving more
        arrow.style.transform = `rotate(${randomAngle+360}deg)`;
    } else {
        arrow.style.transform = `rotate(${180 - randomAngle - 360}deg)`;
    }
   

    // determine x and y coord of new gc position

    newX = gX + colWidthGutter * colDiff;

    if (randomAngle < 0){
        randomAngle = randomAngle*(-1)+ 360;
        newY = gY - Math.tan(deg2rad(randomAngle))*colWidthGutter;
    } else {
        newY = gY + Math.tan(deg2rad(randomAngle))*colWidthGutter;
    }
}


function makeShift(){
    console.log("made shift");
    
    for (let li of lineItems){
        let liHeight = parseFloat(li.getAttribute("data-height"));
        let liTop = parseFloat(li.getAttribute("data-top"));
        let liLeft = parseFloat(li.getAttribute("data-left"));
        if (   liTop > newY 
            && liTop < newY + liHeight 
            && liLeft >= newX - 5
            && liLeft <= newX + 5 
            || window.innerWidth < 630
            && liTop > newY 
            && liTop < newY + liHeight){
                li.style.marginTop = "2rem";
            } else {
                li.style.marginTop = "0px";
            }
    }

    // move letters individually
    for (let letter of gc_spans){
            let _newY = newY;
            let _newX = newX;
            setTimeout(function(){
                let offset = parseFloat(letter.getAttribute("data-offset"));
                letter.style.left = _newX + offset + "px";
                letter.style.top = _newY + "px";
                if (letter.id == "arrow"){
                    letter.style.top = _newY + 4 + "px";
                }
            }, Math.random()*60)
    }

    // reset variables
    setTimeout(function(){
        currentCol = nextCol;
        gX = newX;
        gY = newY;
    },200)
}

window.addEventListener("resize", function(){
    // redo calculations here
    
    colWidthGutter = document.querySelector(".cols div").getBoundingClientRect().width + gutter;
    if (window.innerWidth < 630){
        colWidthGutter = colWidthGutter/2
    }
    for (let li of lineItems){
        let bounds = li.getBoundingClientRect();
        li.setAttribute("data-left", bounds.x);
    }
})




function deg2rad(degrees){
  return degrees * (Math.PI/180);
}

function rad2deg(radians){
    return radians * (180/Math.PI);
}


function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }