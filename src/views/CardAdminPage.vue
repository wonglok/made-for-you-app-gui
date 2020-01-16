<template>
  <div class="card-admin bg-gray-100 font-sans leading-normal tracking-normal">
    <AdminNav></AdminNav>
    <AdminCardGrid>
      <AdminCard>
        <template slot="title">My Title</template>
        <template slot="body">My Title</template>
      </AdminCard>
    </AdminCardGrid>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../views-ui/index.js')
  }
}
</script>

<style>

</style>
