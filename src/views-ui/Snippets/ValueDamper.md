# Value Damper
Make Smooth Scroll or Smooth Virtual Scroll

```js
class ValueDamper {
  constructor (v = 0) {
    this.latestVal = v
    this.dampedVal = v
    setInterval(() => {
      let diff = (this.latestVal - this.dampedVal) * (60 / 1000)
      this.dampedVal += diff
    }, 1000 / 60)
  }
  set value (v) {
    this.latestVal = v
  }
  get value () {
    return this.dampedVal
  }
}
```

## How to use?

```js
let scroller = document.querySelector('.scroller-area')
let canvasArea = document.querySelector('.canvas-area')
let scrollAmount = 0
let Smooth = new ValueDamper(-0.2)
Smooth.value = 0.0
if (scroller) {
  scroller.addEventListener('scroll', () => {
    let value = (scroller.scrollTop) / window.innerHeight
    if (value < 0) {
      value = 0
    }
    Smooth.value = value
  }, true)
} else {
  window.addEventListener('wheel', (evt) => {
    scrollAmount += evt.deltaY
    if (scrollAmount < 0) {
      scrollAmount = 0
    }
    Smooth.value = scrollAmount / window.innerHeight
  })

  let state = {
    tsY: 0,
    tdY: 0,
    taY: 0,
    inertiaY: 1
  }
  canvasArea.addEventListener('touchstart', (evt) => {
    evt.preventDefault()
    let t1 = evt.touches[0]
    console.log(t1)
    state.tsY = t1.pageY
    state.tD = true
  }, { passive: false })
  canvasArea.addEventListener('touchmove', (evt) => {
    evt.preventDefault()
    if (state.tD) {
      let t1 = evt.touches[0]
      console.log(t1)
      state.tdY = t1.pageY - state.tsY
      state.tsY = t1.pageY
      state.inertiaY = 1.0
    }
  }, { passive: false })
  canvasArea.addEventListener('touchend', (evt) => {
    state.tsY = 0
    state.tD = false
  }, { passive: false })
  canvasArea.addEventListener('touchcancel', (evt) => {
    state.tsY = 0
    state.tD = false
  }, { passive: false })
  setInterval(() => {
    state.inertiaY *= 0.9
    state.taY -= state.inertiaY * state.tdY * (3 / 1000)

    if (state.taY < -0.1) {
      state.taY = -0.1
    }
    if (state.taY > 1.2) {
      state.taY = 1.2
    }
    if (state.inertiaY > 0.03) {
      Smooth.value = state.taY
    }
  }, 1000 / 60)
}
```