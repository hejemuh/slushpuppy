let c = 0;
let links = document.getElementsByTagName("a")

for (link of links){
  link.onmouseenter = function(){
    // this.innerHTML += "+"
    c+=2;
    this.style.transform = `rotate(${Math.random()*90 - 45}deg)`
    // this.style.transform = `rotate(${c}deg)`
    // this.style.transform = `rotate(${Math.random()*20 - 10}deg)`
  }
}