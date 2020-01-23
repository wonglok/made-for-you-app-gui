<template>
  <div class="w-full h-full" v-if="app && app.current && app.current.module">
    <LayoutHeader>
      Custom Settings for Module: {{ app.current.module.key }}
    </LayoutHeader>
    <LayoutContent v-if="!app.current.module">
      Please select a module on the left.
    </LayoutContent>
    <LayoutContent v-if="app.current.module">
      <div class=" scrolling-touch overflow-y-scroll h-full" ref="scroller">
        <CreateSettings :app="app" :mod="app.current.module"></CreateSettings>
        <div class="flex justify-start items-baseline flex-wrap">
          <SettingsModifier class="" :key="val._id" v-for="val in app.current.module.values" :value="val" :app="app" :mod="app.current.module" ></SettingsModifier>
        </div>

        <!-- <pre>{{ app.current.module.values }}</pre> -->
        <!-- <div>
          <CubicBezierEditor></CubicBezierEditor>
        </div>
        <div>
          TODO: SettingsArea
          {{ app.current.module.key }}
        </div> -->
      </div>
    </LayoutContent>
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
  },
  mounted () {
    this.$root.$on('scroll-bottom', () => {
      this.$refs['scroller'].scrollTop = this.$refs['scroller'].scrollHeight
    })
  },
  methods: {

  }
}
</script>

<style scoped lang="postcss">
</style>
