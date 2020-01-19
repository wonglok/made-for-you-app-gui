<template>
  <div class="w-full">
    <LayoutHeader class="relative">
      <div class="w-full h-full flex justify-between">
        <div class="inline-flex justify-center items-center ml-2 w-5">
          <!-- <img class="cursor-pointer" src="./img/search.svg" /> -->
        </div>

        <div class="inline-flex justify-start items-center pl-1 pr-1">
          Codes
        </div>

        <div class="inline-flex justify-center items-center mr-2 w-5">
          <img class="cursor-pointer" src="./img/plus.svg" @click="$root.$emit('close-all-dark-overlay'); show.createCodeEntry = true;" />
        </div>
      </div>
      <CodeEntryCreate :app="app" :show="show" :mod="mod"></CodeEntryCreate>
    </LayoutHeader>
    <div class="">
      <div :key="code._id" v-for="code in app.current.module.codes">
        <CodeEntry :app="app" :mod="mod" :code="code"></CodeEntry>
      </div>
    </div>
  </div>
</template>

<script>
// import * as API from '../../api/api'
export default {
  props: {
    app: {},
    mod: {}
  },
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      show: {
        createCodeEntry: false
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="postcss">

</style>
