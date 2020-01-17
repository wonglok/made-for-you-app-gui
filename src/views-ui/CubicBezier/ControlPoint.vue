<template>
  <circle v-if="point" ref="control-point" @mousedown="onMD" class="cursor-move" :cx="point.x" :cy="point.y" r="10" stroke="rgba(255,0,0,0.5)" fill="rgb(255, 0,0, 1)" />
</template>

<script>
export default {
  props: {
    width: {},
    height: {},
    point: {},
    scale: {}
  },
  data () {
    return {
      ts: {
        x: 0,
        y: 0
      },
      td: {
        x: 0,
        y: 0
      },
      isDown: false
    }
  },
  mounted () {
    window.addEventListener('mouseup', () => {
      this.isDown = false
    })
    window.addEventListener('mousemove', (ev) => {
      if (this.isDown) {
        this.td.x = ev.pageX - this.ts.x
        this.td.y = ev.pageY - this.ts.y
        this.ts.x = ev.pageX
        this.ts.y = ev.pageY

        this.point.x += this.td.x * this.scale.x
        this.point.y += this.td.y * this.scale.y

        if (this.point.x < 0) {
          this.point.x -= this.td.x * this.scale.x
        }
        if (this.point.x > this.width) {
          this.point.x -= this.td.x * this.scale.x
        }

        if (this.point.y < 0) {
          this.point.y -= this.td.y * this.scale.y
        }
        if (this.point.y > this.height) {
          this.point.y -= this.td.y * this.scale.y
        }

        this.$emit('change')
      }
    })
  },
  methods: {
    onMD (ev) {
      this.ts.x = ev.pageX
      this.ts.y = ev.pageY
      this.isDown = true
    }
  }
}
</script>

<style>

</style>
