<template>
  <div>
    <div v-if="core.ready">
      <input :class="{ 'bg-gray-200': !core.canEdit, 'bg-green-300': core.canEdit }" type="text" :disabled="!core.canEdit" v-model="core.card.displayName" @keydown.enter="core.updateCard()">
    </div>
    <div v-else>
      Loading...
    </div>
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
