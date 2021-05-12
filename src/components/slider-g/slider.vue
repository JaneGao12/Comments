<template lang="html">
    <section :class="cname">
        <swiper :options="options" :not-next-tick="options.notNextTick">
            <swiper-slide v-for="item in items" :key="item.href">
                <router-link :to="{ name: item.href}">
                    <img :src="item.src" alt="">
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination" v-if="options.pagination" slot="pagination"/>
        </swiper>
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import 'swiper/swiper-bundle.css'
export default {
  name: "Slider",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    cname: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default () {
        return {
          autoplay: true,
          loop: true,
          pagination: {
            el: ".swiper-pagination",
          },
          notNextTick: false,
        }
      },
    },
    items: {
      type: Array,
      default () {
        return []
      },
    },
  },
}
</script>

<style lang="css"> 
</style>
