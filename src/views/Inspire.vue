<template>
  <div class="flex items-center flex-col">
    <div class="relative min-h-screen w-r25">
      <div class="mt-2 mx-4 text-2xl font-bold py-2 border-b border-gray-200">
        Inspire
      </div>
      <div class="mx-4 my-4" :key="i" v-for="(content, i) in cTypes">
        <img class="w-full" :src="content.src" :alt="content.alt">
        <p class="py-3">
          {{ content.alt }}
        </p>
      </div>

      <div class=" h-32">
      </div>
    </div>
    <div class="relative">
      <div class="my-4 fixed bottom-0 left-0 w-full flex justify-center">
        <div class="menu-box flex justify-around">
          <router-link to="/">
            <div class=" flex flex-col items-center px-4">
              <img src="../assets/menu/home.svg" alt="Home">
              <p class=" pt-1 text-xs">Home</p>
            </div>
          </router-link>
          <router-link to="/create">
            <div class=" flex flex-col items-center px-4">
              <img src="../assets/menu/create.svg" alt="Create">
              <p class=" pt-1 text-xs">Create</p>
            </div>
          </router-link>
          <router-link to="/save">
            <div class=" flex flex-col items-center px-4">
              <img src="../assets/menu/give.svg" alt="Save">
              <p class=" pt-1 text-xs">Save</p>
            </div>
          </router-link>
          <router-link to="/inspire">
            <div class=" flex flex-col items-center px-4">
              <img src="../assets/menu/inspire.svg" alt="Inspire">
              <p class=" pt-1 text-xs">Inspire</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
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

.menu-box{
  background: #F1F1F1;
  border: 0 solid #979797;
  border-radius: 44px;
  padding: 15px 20px;
  box-shadow: 0px 0px 30px 0px #979797;
}
</style>
