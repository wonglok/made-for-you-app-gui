<template>
  <div class="w-full h-full flex" v-if="app && app.current.module">
    <LayoutNarrow>
      <CodeBrowser :mod="app.current.module" :code="app.current.module" :app="app"></CodeBrowser>
      <!-- <CubicBezierEditor></CubicBezierEditor> -->
    </LayoutNarrow>
    <LayoutWider>
      <div v-if="app.current.code" class="w-full h-full">
        <CodeEditorBox :mod="app.current.module" :app="app" :code="app.current.code" class="h-full w-full"></CodeEditorBox>
      </div>
      <div v-else class="h-full w-full">
        <LayoutHeader>
          Code Editor
        </LayoutHeader>
        <LayoutContent>
          <div class="h-full w-full flex justify-center items-center text-3xl">
            Select a file to edit...
          </div>
        </LayoutContent>
      </div>

      <!-- <CubicBezierEditor></CubicBezierEditor> -->
      <!-- TODO: ModuleArea -->

    </LayoutWider>
  </div>
</template>

<script>
export default {
  props: {
    app: {
      require: true
    }
  },
  components: {
    ...require('../index')
  }
}
</script>

<style scoped lang="postcss">
</style>
