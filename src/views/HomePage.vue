<template>
  <div class="w-full min-h-full">
    <div class="bg-brand-secondary ">
      <div class="home-container">
        <NavRow></NavRow>
      </div>
      <div class="home-container">
        <HeroUnit></HeroUnit>
      </div>
    </div>
    <IntroUnit></IntroUnit>
    <FeaturedCards></FeaturedCards>
    <EffortsAndLove></EffortsAndLove>
    <CelebratingLife></CelebratingLife>
    <TechUsed></TechUsed>
    <!-- <AwardWinningTech></AwardWinningTech> -->
    <DemoSection></DemoSection>
    <FooterCTA></FooterCTA>
    <FooterSection></FooterSection>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../views-ui')
  }
}
</script>

<style lang="postcss">
.home-container{
  @apply max-w-6xl mx-auto;
}
</style>
