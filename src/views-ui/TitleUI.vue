<template>
  <div class="pt-5 mx-4 border-b border-gray-200 pb-3 mb-4">
    <div class="text-2xl font-bold">
      <slot class="default"></slot>
    </div>
    <div v-if="$slots.subtitle" class="mt-1 text-gray-600">
      <slot name="subtitle"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
