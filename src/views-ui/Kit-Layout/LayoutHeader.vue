<template>
  <div class="column-header text-xs text-center flex justify-center items-center">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.column-header{
  height: 33px;
  border-bottom: #DADADA solid 1px;
  border-top: #DADADA solid 1px;
}
</style>
