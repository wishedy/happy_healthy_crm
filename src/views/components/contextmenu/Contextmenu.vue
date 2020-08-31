<template>
    <ul class="contextMenu">
        <li @mouseup.stop="closeTab(0)">关闭</li>
        <li @mouseup.stop="closeTab(1)">关闭其他</li>
        <li @mouseup.stop="closeTab(2)">关闭所有</li>
    </ul>
</template>
<script>
export default {
  data () {
    return {
      styleJson: {
        left: 0,
        top: 0
      }

    }
  },
  methods: {
    closeTab (type) {
      const t = this
      switch (type) {
        case 0:
          t.$emit('deleteIt')
          break
        case 1:
          t.$emit('deleteOthers')
          break
        case 2:
          t.$emit('deleteAll')
          break
      }
    }
  }

}
</script>
<style lang="scss" scoped>
    .contextMenu{
        background: #fff;
        margin: 0;
        z-index: 2;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        -webkit-box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li{
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover{
                background: #eee;
            }
        }
    }
</style>
