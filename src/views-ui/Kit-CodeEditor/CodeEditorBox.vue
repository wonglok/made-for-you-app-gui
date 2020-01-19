<template>
  <div class="h-full w-full" ref="rect">
    <LayoutHeader>
      <span class="w-full"></span>
      {{ code.key }}.<span>{{ code.type }}</span>
      <span class="w-full">
        <span class="pl-1" v-if="dirty">File Changed, Needs Save.</span>
        <span class="pl-1" v-if="saving">Saving</span>
      </span>
    </LayoutHeader>
    <LayoutContent>
      <!-- {{ code.value }}
      {{ copy }} -->
      <keep-alive>
        <Brace class="w-full h-full" :key="code._id" :style="{ height }" :mode="code.type" :getter="() => { return code.value }" :setter="(v) => { code.value = v; }" @save="onSave()"></Brace>
      </keep-alive>
    </LayoutContent>
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  props: {
    app: {},
    code: {},
    mod: {}
  },
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      saving: false,
      copy: (this.code.value || ''),
      height: 0
    }
  },
  computed: {
    dirty () {
      let isDirty = this.copy !== this.code.value
      return isDirty
    }
  },
  watch: {
    code () {
      this.copy = this.code.value
    },
    'code.value' () {
      this.regDirty()
    },
    'copy' () {
      this.regDirty()
    }
  },
  mounted () {
    let setHeight = () => {
      this.height = (this.$refs.rect.getBoundingClientRect().height - 33) + 'px'
    }
    setHeight()
    window.addEventListener('resize', setHeight)
  },
  methods: {
    regDirty () {
      let isDirty = this.copy !== this.code.value
      if (isDirty) {
        this.app.dirtyFiles[this.code._id] = true
      } else {
        delete this.app.dirtyFiles[this.code._id]
      }
    },
    onSave () {
      this.saving = true
      API.updateCode({
        userID: this.app.userID,
        code: {
          _id: this.code._id,
          value: this.code.value
        }
      })
        .then(() => {
          this.saving = false
          this.copy = this.code.value
          this.$root.$emit('reload-iframe')
        }, () => {
          this.saving = false
        })
    }
  }
}
</script>

<style scoped>
.editor{
  height: 500px;
}
</style>
