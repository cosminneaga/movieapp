<!-- HOME PAGE 
@Responsibility: render content as landing page

holds 2 components:
--TopSlider -> displays the top carousel
--Slider -> displays carousel of movies based on category
-->
<template>
  
  <div>
    <br><br><br>
    <TopSlider />

    <Slider category="popular" title="Popular Movies" regulateSpeed="4000"/>
    <Slider category="top-rated" title="Top Rated Movies" regulateSpeed="5000"/>
    <Slider category="upcoming" title="Upcoming Movies" regulateSpeed="4000"/>
    
    <br v-for="a in 5" :key="a"/>
  </div>

</template>

<script>
  import TopSlider from '../components/Slider/TopSlider.vue'
  import Slider from '../components/Slider/Slider.vue'

  export default {
    name: 'Home',
    components: { TopSlider, Slider }
  }
</script>
