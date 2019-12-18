<template>
  <Scroller>
    <div class="relative">
      <TitleUI>
        <p slot="default">
          Inspirational Content
        </p>
        <p slot="subtitle">
          Be Fun and Have Fun.
        </p>
      </TitleUI>
      <div class="mx-4 my-4">
        <p class="py-3">
          “Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?” - Albus Dumbledore, J.K. Rowling
        </p>
        <p class="py-3">
          Look what happens with a love like that. It lights up the whole sky." - Hafiz
        </p>
        <p class="py-3">
          "Even after all this time the sun never says to the earth, “You owe me.”
        </p>
        <p class="py-3">
          “Be who God meant you to be and you will set the world on fire!” -St. Catherine of Siena
        </p>
        <p class="py-3">
          "Let us always meet each other with smile, for the smile is the beginning of love." - Mother Teresa
        </p>
        <p class="py-3">
          "May the God of hope fill you with all joy and peace in believing, so that you may abound in hope by the power of the holy Spirit." - Romans 15:13
        </p>
        <p class="py-3">
          "Be yourself; everyone else is already taken." - Oscar Wilde
        </p>
      </div>
    </div>
  </Scroller>
</template>

<script>
export default {
  name: 'save',
  components: {
    ...require('../views-ui/UIs.js').default
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
