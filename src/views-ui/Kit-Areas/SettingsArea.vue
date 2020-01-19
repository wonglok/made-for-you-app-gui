<template>
  <div class="w-full h-full" v-if="app">
    <LayoutHeader>
      Settings Area
    </LayoutHeader>
    <div class="content">
      <div>
        <CubicBezierEditor></CubicBezierEditor>
      </div>
      <div>
        TODO: SettingsArea
        {{ app.current.module.key }}
      </div>
    </div>
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
