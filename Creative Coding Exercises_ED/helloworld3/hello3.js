let colors = ['aqua','aquamarine','yellow','brown','chartreuse','blueviolet','darkblue','darkkhaki','darkolivegreen','cyan','CornflowerBlue','CadetBlue','Coral','Crimson','Fuchsia','GreenYellow','HotPink','LawnGreen','OrangeRed','Orchid','OliveDrab','Tomato','SpringGreen']

for (let a of document.querySelectorAll('a')){
    a.onmouseenter = function(){
        if (!a.classList.contains("gone")){
            this.style.color = colors[Math.floor(Math.random()*colors.length)];
        }
    }
    
}