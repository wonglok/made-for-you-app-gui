<template>
  <!-- use the modal component, pass in the prop -->
  <PopupBox v-show="visible" @close="visible = false; onCancel()" :locked="false">
    <div class="brand-dialogue">
      <div class="brand-title">Confirm</div>
      <slot></slot>
      <p>
        Please tpye in <span class="bg-yellow-300 p-2 mx-2 rounded-lg shadow-md border border-gray-500">{{ confirm }}</span> to before confirm.
      </p>
      <div class="mt-3">
        <input type="text" autofocus class="brand-input w-full" v-model="inputConfirm">
      </div>
      <div>
        <button class=" brand-btn brand-btn-dangerous px-8" @click="onConfirm()">{{ cta }}</button>
        <button class=" brand-btn brand-btn-secondary" @click="onCancel()">Cancel</button>
      </div>
      <div class=" h-6 text-red-600 text-sm">
        <span v-if="bug" >{{ bug }}</span>
      </div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: {
    cta: {
      default: 'Delete'
    }
  },
  components: {
    ...require('../index')
  },
  data () {
    return {
      ok () {},
      fail () {},
      bug: '',
      inputConfirm: '',
      confirm: '',
      visible: false
    }
  },
  mounted () {
  },
  methods: {
    onConfirm () {
      if (this.confirm === this.inputConfirm) {
        this.ok(this)
        this.visible = false
      } else {
        this.bug = 'Wrong Confirm Code'
      }
    },
    onCancel () {
      this.fail(this)
      this.visible = false
    },
    pop ({ confirm, ok, fail }) {
      this.bug = ''
      this.inputConfirm = ''
      this.visible = true
      this.confirm = confirm
      this.ok = ok
      this.fail = fail
    }
  }
}
</script>

<style>

</style>
