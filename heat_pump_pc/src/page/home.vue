<template>
  <div>
    <Nav></Nav>
    <Sidemenu></Sidemenu>
    <MainCont></MainCont>
  </div>
</template>

<script>
import Nav from '../view/layout/navigation.vue'
import Sidemenu from '../view/layout/slideMenu.vue'
import MainCont from '../view/layout/mainContent.vue'
export default {
  components: {
    Sidemenu,
    MainCont,
    Nav
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}
</script>

<style scoped>
</style>
