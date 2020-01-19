<template>
  <div class="column-content">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.column-content{
  height: calc(100% - 33px);
  /* border-bottom: #DADADA solid 1px; */
}
</style>
