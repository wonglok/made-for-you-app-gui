<template>
  <div class="relative w-full overflow-x-hidden">
    <!-- Title -->
    <TitleUI>
      <p slot="default">
        Let's Start
      </p>
      <p slot="subtitle">
        Make Your Essential Message!
      </p>
    </TitleUI>

    <!-- Content -->
    <div class="px-4 pb-6 fadeinright" :key="i" v-for="(content, i) in contentTypes">
      <img class="cursor-pointer w-full" :src="content.src" :alt="content.alt">
      <p class="cursor-pointer my-3">
        {{ content.alt }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    ...require('../views-ui/UIs.js').default
  },
  data () {
    return {
      contentTypes: [
        {
          src: require('../assets/content-types/thankyou.png'),
          alt: `Thank you letter`
        },
        {
          src: require('../assets/content-types/congrats.png'),
          alt: `Congratulate Your Friend`
        },
        {
          src: require('../assets/content-types/encourage.png'),
          alt: `Encourage Your Friend`
        },
        {
          src: require('../assets/content-types/valentine.png'),
          alt: `Gallery for your valentine`
        },
        {
          src: require('../assets/content-types/essential-message.png'),
          alt: `Essentail Message`
        },
        {
          src: require('../assets/content-types/arha-moments.png'),
          alt: `Express your Arha moments`
        }
      ]
    }
  }
}
</script>

<style scoped lang="postcss">
@keyframes fadeinright {
  0%{
    opacity: 0;
    transform: translateX(30px);
  }
  100%{
    opacity: 1;
    transform: translateX(0px);
  }
}
.fadeinright{
  --delay: 0.2s;
}
.fadeinright:nth-child(1) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 0);
}
.fadeinright:nth-child(2) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 1);
}
.fadeinright:nth-child(3) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 2);
}
.fadeinright:nth-child(4) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 3);
}
.fadeinright:nth-child(5) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 4);
}
.fadeinright:nth-child(6) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 5);
}
.fadeinright:nth-child(7) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 6);
}
.fadeinright:nth-child(8) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 7);
}
.fadeinright:nth-child(9) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 8);
}
.fadeinright:nth-child(10) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 9);
}
.fadeinright:nth-child(11) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 10);
}
.fadeinright:nth-child(12) {
  animation: fadeinright 1s ease-in-out 0s 1 normal both;
  animation-delay: calc(var(--delay) * 11);
}
/* @screen lg{

} */
</style>
