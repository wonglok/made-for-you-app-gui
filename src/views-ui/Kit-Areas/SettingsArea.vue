<template>
  <div class="w-full h-full flex" v-if="app">
    <OptionsColumn>
      <ColumnHeader>
        Settings
      </ColumnHeader>
      <!-- <CubicBezierEditor></CubicBezierEditor> -->
    </OptionsColumn>
    <CodeColumn>
      <ColumnHeader>
        Settings Area
      </ColumnHeader>
      <!-- <CubicBezierEditor></CubicBezierEditor> -->
      TODO: SettingsArea
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
