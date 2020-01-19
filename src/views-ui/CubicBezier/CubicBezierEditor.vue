<template>
  <div class="inline-block">
    <svg :viewBox="`${-1 * paddingX} ${-1 * paddingY} ${width + paddingX * 2} ${height + paddingY * 2}`" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
      <path :d="`
      M ${start.x} ${start.y}

      C ${CP1.x} ${CP1.y},
        ${CP2.x} ${CP2.y},

      ${end.x} ${end.y}
      `" stroke="rgb(0,0,0,0.5)" fill="transparent" stroke-width="2" />

      <!-- <circle ref="cP1" class="cursor-move" cx="200" cy="200" r="10" fill="green"/> -->
      <!-- <circle ref="cP2" class="cursor-move" cx="400" cy="200" r="10" fill="green"/> -->

      <circle :cx="width * tester" :cy="height + paddingY * 0.4" r="5" fill="#0af"/>
      <circle :cx="tt * width" :cy="height + paddingY * 0.75" r="5" fill="green"/>

      <line :x1="0" :y1="height + paddingY * 0.4" :x2="width" :y2="height + paddingY * 0.4" style="stroke:#0af;stroke-width:1px;" />
      <line :x1="0" :y1="height + paddingY * 0.75" :x2="width" :y2="height + paddingY * 0.75" style="stroke:green;stroke-width:1px;" />

      <line :x1="start.x" :y1="start.y" :x2="CP1.x" :y2="CP1.y" style="stroke:rgba(255,0,0, 0.5);stroke-width:2px;" />
      <line :x1="end.x" :y1="end.y" :x2="CP2.x" :y2="CP2.y" style="stroke:rgba(255, 0,0, 0.5);stroke-width:2px;" />

      <ControlPoint @change="send" :scale="scale" :width="width" :height="height" :point="CP1"></ControlPoint>
      <ControlPoint @change="send" :scale="scale" :width="width" :height="height" :point="CP2"></ControlPoint>

      <circle :cx="start.x" :cy="start.y" r="5" fill="red"/>
      <circle :cx="end.x" :cy="end.y" r="5" fill="red"/>
    </svg>
    <div class="text-center text-xs text-gray-500" :style="{ width: width + 'px' }">Bezier: {{ cubicBezier }}</div>
    <!-- <p>
      Green = Linear Speed
    </p>
    <p>
      Blue = cubic-bezier({{ cubicBezier }});
    </p> -->
    <!--
    <p>
      {{ CP1 }}
      {{ CP2 }}
    </p>
    -->
  </div>
</template>

<script>
import BezierEasing from 'bezier-easing'
export default {
  props: {
    easing: {
      default () {
        return [0.11, 0.63, 0.10, 0.92]
      }
    }
  },
  components: {
    ...require('../index.js')
  },
  data () {
    let es = this.easing
    let ww = 300
    let hh = 300
    let padX = 35
    let padY = 35
    return {
      scale: {
        x: (ww + padX * 2) / ww,
        y: (hh + padY * 2) / hh
      },
      start: {
        x: 0,
        y: hh
      },
      end: {
        x: ww,
        y: 0
      },
      paddingX: padX,
      paddingY: padY,
      width: ww,
      height: hh,
      CP1: {
        x: es[0] * ww,
        y: (1.0 - es[1]) * hh
      },
      CP2: {
        x: (es[2]) * ww,
        y: (1.0 - es[3]) * hh
      },
      tt: 0,
      tester: 0
    }
  },
  computed: {
    cubicBezierArray () {
      return [(this.CP1.x / this.width), ((this.height - this.CP1.y) / this.height), (this.CP2.x / this.width), ((this.height - this.CP2.y) / this.height)]
    },
    cubicBezier () {
      return this.cubicBezierArray.map(e => e.toFixed(2)).join(', ')
    },
    easingFunction () {
      return this.makeEasingFn()
    }
  },
  mounted () {
    this.tt = 0
    setInterval(() => {
      this.tt += 1 / 120
      if (this.tt > 1) {
        this.tt = 0
      }

      this.tester = this.easingFunction(this.tt)
    }, 1000 / 60)

    this.send()
  },
  methods: {
    makeEasingFn () {
      return BezierEasing.apply({}, this.cubicBezierArray)
    },
    // plotter (t, p0, p1, p2, p3) {
    //   var cX = 3 * (p1.x - p0.x)
    //   var bX = 3 * (p2.x - p1.x) - cX
    //   var aX = p3.x - p0.x - cX - bX

    //   var cY = 3 * (p1.y - p0.y)
    //   var bY = 3 * (p2.y - p1.y) - cY
    //   var aY = p3.y - p0.y - cY - bY

    //   var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x
    //   var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y

    //   return { x, y }
    // },
    send () {
      this.$emit('easing', this.cubicBezierArray.slice())
    }
  }
}
</script>

<style>

</style>
