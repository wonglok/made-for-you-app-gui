<template>
  <div>
    <VueSlider
      v-model="value"
      :tooltip="'none'"
      :process-style="{ backgroundColor: 'pink' }"
      :tooltip-style="{ backgroundColor: 'pink', borderColor: 'pink' }"
    >
      <template v-slot:dot="{ value, focus }">
        <div :class="['custom-dot', { focus }]"></div>
      </template>
    </VueSlider>
  </div>
</template>

<script>
export default {
  props: {
    point: {
      default: 0
    }
  },
  components: {
    VueSlider: require('vue-slider-component')
  },
  watch: {
    value () {
      this.$emit('point', this.value)
    }
  },
  data: function () {
    return {
      value: 0
    }
  }
}
</script>

<style>
  .custom-dot {
    width: 43px;
    height: 43px;
    border-radius: 0;
    background-color: pink;
    transition: all .3s;
    transform: translateY(8px) translateY(calc(-43px / 2));
    border-radius: 50%;
    text-align: center;
    line-height: 43px;
  }
  .custom-dot:hover {
    transform: translateY(8px) translateY(calc(-43px / 2));
  }
  .custom-dot.focus {
    border-radius: 50%;
  }
</style>
