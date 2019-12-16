<template>
  <div class="relative min-h-screen w-r25">
    <div class="mt-2 mx-4 text-2xl font-bold py-2 border-b border-gray-200">
      Craft Essential Message
    </div>
    <div class="mx-4 my-4" :key="i" v-for="(content, i) in cTypes">
      <img class="w-full" :src="content.src" :alt="content.alt">
      <p class="py-3">
        {{ content.alt }}
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    // TabBar: require('./TabBar.vue').default
  },
  data () {
    return {
      cTypes: [
        {
          src: require('../assets/content-types/thankyou.png'),
          alt: `Thank you letter.`
        },
        {
          src: require('../assets/content-types/congrats.png'),
          alt: `Congratulate Your Friend.`
        },
        {
          src: require('../assets/content-types/encourage.png'),
          alt: `Encourage Your Friend.`
        },
        {
          src: require('../assets/content-types/valentine.png'),
          alt: `Gallery for your valentine.`
        },
        {
          src: require('../assets/content-types/essential-message.png'),
          alt: `Essentail Message.`
        },
        {
          src: require('../assets/content-types/arha-moments.png'),
          alt: `Express your Arha moments.`
        }
      ]
    }
  }
}
</script>

<style scoped>
.w-r25{
  width: 25rem;
}

.img-r25{
  width: 100%;
}
</style>
