<template>
  <select class="m-1 inline-block appearance-none bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded focus:outline-none focus:bg-white focus:border-gray-500" @change="$emit('change', obj)" v-model="obj.type">
    <option value="string">String</option>
    <option value="number">Number</option>
    <option value="vec2">Vector2</option>
    <option value="vec3">Vector3</option>
    <option value="vec4">Vector4</option>
    <option value="color">Color</option>
    <option value="easing">Easing</option>
  </select>
</template>

<script>
export default {
  props: {
    obj: {}
  }
}
</script>

<style>

</style>
