<template>
    <BaseDrawer
        :visible="visible"
        width="840px"
        @close="handleClose"
        @cancel="handleClose"
        @confirm="handleClose"
    >
        <SampleItem :options="options" :show="visible" @closeModal="handleClose"></SampleItem>
    </BaseDrawer>
</template>
<script>
import BaseDrawer from '@/views/components/Drawer/Drawer.vue'
import SampleItem from './SampleItem'
export default {
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    visible: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    }
  },
  name: 'edit',
  data () {
    return {}
  },
  components: {
    BaseDrawer,
    SampleItem
  },
  methods: {
    onsubmit () {
      console.log('关闭')
    },
    handleClose () {
      const _this = this
      _this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
    .edit-panel{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        min-width: 300px;
        overflow: hidden;
        background: #ffffff;
    }
</style>
