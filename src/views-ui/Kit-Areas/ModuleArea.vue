<template>
  <div class="w-full h-full flex" v-if="app">
    <OptionsColumn>
      <CodeBrowser :app="app"></CodeBrowser>
      <CubicBezierEditor></CubicBezierEditor>
    </OptionsColumn>
    <CodeColumn>
      <ColumnHeader>
        123
      </ColumnHeader>
      <!-- <CubicBezierEditor></CubicBezierEditor> -->
      TODO: ModuleArea
      {{ app.current.module.key }}
    </CodeColumn>
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
