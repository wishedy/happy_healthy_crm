<template>

    <aside class="adminSide" :class="{'active':!toggleOnOff}">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="toggleOnOff" text-color="#BFCBD9" >
            <el-submenu :index="i+''" v-for="(item,i) in columnList" :key="item.index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item :index="(''+i)+'-'+(index+'')" v-for="(inItem,index) in item.tabList" :key="inItem.index" @click.native.stop="routerDirec(inItem)" @mouseup.native.stop="runFn(inItem)">
                    <i :class="inItem.icon"></i>
                    {{inItem.title}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </aside>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  computed: {
    ...mapGetters(['toggleOnOff', 'columnList'])
  },
  mounted () {
    const t = this
    t.getSideData()
    setTimeout(() => {
      console.log(t.columnList)
    }, 2000)
  },
  methods: {
    ...mapActions(['addTab', 'outLoginOne', 'saveColumnList']),
    getSideData () {
      const t = this
      axios.get('/src/tabData/tabJson.json', {
        params: {}
      })
        .then(function (response) {
          const reqData = response.data
          console.log('=================')
          console.log(reqData.result)
          if (reqData.result) {
            t.tabList = reqData.result.tabList
            t.saveColumnList(t.tabList)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    runFn (v) {
      const t = this
      t[v.eventFn] && t[v.eventFn]()
    },
    routerDirec (v) {
      const t = this
      t.addTab(v)
      t.$router.push({ path: '/' + v.routerName })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss">
    .el-menu--popup{
        .el-menu-item{
            color: #303133 !important;
        }
    }
    .adminSide{
        width: 36px;
        background-color: rgb(48, 65, 86);
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        transition: width .28s ease;
        .el-submenu .el-menu-item{
            min-width: 180px;
            transition: width  .28s ease;
            /*background: rgb(38,52,69);*/
            &:hover,&:focus{
                background: rgb(38,52,69);
            }

        }
        .el-menu-item:hover,.el-submenu__title:hover{
            background: rgb(38,52,69);
        }
        .el-menu-item-group__title,.el-menu-item{
            /*color: rgb(191, 203, 217) !important;*/
            span{
                /*color: rgb(191, 203, 217) !important;*/
            }
        }
        .el-submenu__title,.el-menu--vertical{
            /*background: rgb(38,52,69);*/
        }
        &.active{
            width: 180px;
            transition: width .28s ease;
            .el-menu{
                width: 180px !important;
                transition: width .28s ease;
            }
        }
        .el-menu{
            width: 36px !important;
            background-color: rgb(48, 65, 86);
            border-right: none;
        }
        .el-tooltip,.el-submenu__title{
            padding: 0px 5px !important;
            transition: width .28s ease;
        }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
