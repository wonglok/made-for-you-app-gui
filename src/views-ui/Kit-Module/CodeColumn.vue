<template>
  <div class="code-column">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.code-column{
  height: 100%;
  width: calc(100% - 180px);
  background-color: #FEFEFE;
  /* border-left: #DADADA solid 1px; */
}
</style>
