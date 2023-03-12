let text = document.querySelectorAll("a");
let container = document.querySelector('#container');

for (let a of text){
  a.onmouseenter = function(){
    a.classList.add("hover")
  }
  a.onmouseleave = function(){
    a.classList.remove("hover")
  }
}

document.getElementById("shuffle").onclick=function(e){
  e.preventDefault();
  for (var i = container.children.length; i >= 0; i--) {
      container.appendChild(container.children[Math.random() * i | 0]);
  }
}