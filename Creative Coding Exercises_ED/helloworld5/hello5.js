class Coords {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
  
    get coordString() {
      return this.x + ' ' + this.y
    }
  
    distanceTo(other) {
      return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2)
    }
  }
  
  class Path {
    constructor(pathLength) {
      this.path = []
      this.pathLength = pathLength
    }
  
    get totalPathLength() {
      let length = 0
  
      // Calculate the lengths between all points and add them up.
      for (let i = 0; i < this.path.length - 2; i++) {
        length += this.path[i].distanceTo(this.path[i + 1])
      }
  
      return length
    }
  
    get svgPath() {
      return `M ${this.path.map(c => c.coordString).join(' ')}`
    }
  
    add(coord) {
      if (this.path.length > 0) {
        const dist = this.path[this.path.length - 1].distanceTo(coord)
  
        // Ignore all coords that are too close, they make stuff clunky.
        if (dist < 10) {
          return
        }
      }
  
      this.path.push(coord)
  
      // Cut the path to reach a desired length.
      while(this.totalPathLength > this.pathLength) {
        this.path.shift()
      }
    }
  }
  
  const path = new Path(
    document.querySelector('text').textLength.baseVal.value
  )
  
  const adjustPath = e => {
    let x = 0
    let y = 0
  
    // Figure out x/y coordinates of both mouse and touch events
    if(e.type == 'touchmove'){
      const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent
      const touch = evt.touches[0] || evt.changedTouches[0]
      x = touch.pageX
      y = touch.pageY
    } else {
      x = e.clientX
      y = e.clientY
    }
  
    const coords = new Coords(x, y)
    path.add(coords)
  
    document.querySelector('path').setAttribute('d', path.svgPath)
  }
  
  window.addEventListener('mousemove', adjustPath)
  window.addEventListener('touchmove', adjustPath)