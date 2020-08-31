<template>
    <section class="adminIndex">
        <FullCalendar :events="fcEvents" locale="en" class="date"></FullCalendar>
    </section>

</template>
<script>
import FullCalendar from 'vue-fullcalendar'
const demoEvents = [
  {
    title: 'Sunny Out of Office',
    start: '2018-04-13',
    end: '2017-07-27'
  }
]
export default {
  data () {
    return {
      msg: 'index',
      fcEvents: demoEvents
    }
  },
  components: {
    FullCalendar
  },
  mounted () {
    if (localStorage.getItem('nowTabData')) {
      localStorage.removeItem('nowTabData')
      location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
    .date{
        padding-top: 80px;
    }
    .today{
        background: rgba(140,20,151,.5);
        .day-number{
            font-size: 30px;
            color: #333;
            font-weight: 800;
        }
    }
</style>
