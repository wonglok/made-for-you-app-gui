<template>
  <div>
    <ColumnHeader class="relative">
      <div class="w-full h-full flex justify-between">
        <div class="inline-flex justify-center items-center ml-2 w-5">
          <!-- <img class="cursor-pointer" src="./img/search.svg" /> -->
        </div>

        <div class="inline-flex justify-start items-center pl-1 pr-1">
          Code Browser
        </div>

        <div class="inline-flex justify-center items-center mr-2 w-5">
          <img class="cursor-pointer" src="./img/plus.svg" @click="$root.$emit('close-all-dark-overlay'); show.createCode = true; " />
        </div>
      </div>
    </ColumnHeader>
    <div class="">
      <div :key="code._id" v-for="code in app.current.module.codes">
        <CodeEntry></CodeEntry>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    app: {}
  },
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      show: {
        createCode: false
      }
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
