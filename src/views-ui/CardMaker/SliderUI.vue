<template>
  <div>
    <vue-slider
      v-model="value"
      :tooltip="'none'"
      :process-style="{ backgroundColor: 'pink' }"
      :tooltip-style="{ backgroundColor: 'pink', borderColor: 'pink' }"
    >
      <template v-slot:dot="{ value, focus }">
        <div :class="['custom-dot', { focus }]"></div>
      </template>
    </vue-slider>
  </div>
</template>

<style>
  .custom-dot {
    width: 50px;
    height: 50px;
    border-radius: 0;
    background-color: pink;
    transition: all .3s;
    transform: translateY(8px) translateY(-25px);
    border-radius: 50%;
  }
  .custom-dot:hover {
    transform: translateY(8px) translateY(-25px)rotateZ(45deg);
  }
  .custom-dot.focus {
    border-radius: 50%;
  }
</style>

<script>
export default {
  components: {
    VueSlider: require('vue-slider-component').default
  },
  data: function () {
    return {
      value: 0
    }
  }
}
</script>
