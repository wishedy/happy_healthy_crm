<template>
    <section class="el-tabs__header" v-show="routeOnOff">
        <ul class="adminTabList">
            <router-link tag="li" active-class="is-active" v-for="(item,i) in nowTabData" :key="i" class="el-tabs__item" :to="'/'+item.routerName" @contextmenu.native.prevent="rightClose($event,item)" @mouseup.native.stop="runFn(item)">
                {{item.title}}<span class="el-icon-close" @click.stop="closeTab(item)"></span>
            </router-link>
            <ContextCom :style="styleJson"  v-show="Context" @deleteAll="closeAll" @deleteIt="closeIt" @deleteOthers="closeOthers"></ContextCom>
        </ul>
    </section>
</template>
<script>
import ContextCom from '../contextmenu/Contextmenu'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      list: {},
      editableTabsValue: '2',
      tabIndex: 2,
      routeOnOff: true,
      editOnOff: true,
      contextData: null,
      styleJson: {
        position: 'absolute',
        left: 0,
        top: 0
      }

    }
  },
  computed: {
    ...mapGetters(['Context', 'loginOnOff', 'nowTabData'])
  },
  components: {
    ContextCom
  },
  watch: {
    loginOnOff (n, o) {
      const t = this
      if (n.length === 0) {
        t.closeAll()
      }
    },
    '$route' (n) {
      console.log(n)
      const _this = this
      const pathName = n.path.split('/')
      function isRealNum (val) {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，

        if (val === '' || val == null) {
          return false
        }
        if (!isNaN(val)) {
          // 对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
          // 所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
          return true
        } else {
          return false
        }
      }
      console.log(pathName)
      if (isRealNum(pathName[1])) {
        _this.routeOnOff = true
      } else {
        _this.routeOnOff = false
      }
    }
  },
  methods: {
    ...mapActions(['deleteTab', 'ContextOff', 'ContextOn', 'outLogin']),
    closeAll () {
      const t = this
      for (const key in t.nowTabData) {
        t.closeTab(t.nowTabData[key])
      }
    },
    closeIt () {
      const t = this
      t.closeTab(t.contextData)
    },
    closeOthers () {
      const t = this
      for (const key in t.nowTabData) {
        if (t.nowTabData[key].routerName !== t.contextData.routerName) {
          t.closeTab(t.nowTabData[key])
        }
      }
    },
    rightClose (e, v) {
      const t = this
      t.contextData = v
      t.styleJson.left = (e.clientX) + 'px'
      t.styleJson.top = e.offsetY + 'px'
      t.ContextOn()
    },
    runFn (v) {
      const t = this
      t[v.eventFn] && t[v.eventFn]()
    },
    closeTab (v) {
      const t = this
      const nowPathname = this.$route.path.substring(1, 1000)
      this.deleteTab(v)
      let lastKey = ''
      if ((v.routerName) && (nowPathname === v.routerName)) {
        for (const key in t.nowTabData) {
          lastKey = key
        }
        if (lastKey.length) {
          t.$router.push({ path: t.nowTabData[lastKey].routerName })
        } else {
          t.$router.push({ path: '/index' })
        }
      }
      t.ContextOff()
    }
  }
}
</script>
<style lang="scss">
    .full-calendar-header{
        .header-center{
            font-size: 30px;
        }
    }
    .el-tabs__header{
        border-bottom: none;
        margin: 0 0 10px;
    }
    .el-tabs__new-tab{
        margin: 5px 0 9px 10px;
    }
    .el-tabs__item{
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5 !important;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        z-index:0;
        &.is-active{
            &:before{
                content:"•";
            }
            background-color: #42b983;
            color: #fff;
            border-color: #42b983;
        }
    }
</style>
