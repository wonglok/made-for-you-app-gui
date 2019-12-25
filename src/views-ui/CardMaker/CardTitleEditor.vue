<template>
  <div>
    <input :class="{ 'bg-gray-200': !core.canEdit, 'bg-green-300': core.canEdit }" type="text" :disabled="!core.canEdit" v-model="core.card.displayName" @keydown.enter="core.updateCard()">
  </div>
</template>

<script>
export default {
  props: {
    core: {}
  }
}
</script>

<style>

</style>
