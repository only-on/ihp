<template>
  <nav class="side-menu" >
    <Menu style="width:200px;text-align:left" @on-select="clickMenuItems" ref="sideMenu" :active-name="getCurrentMenu()" :open-names="['1']">
      <div>
        <MenuItem name="first">
          <Icon type=""></Icon>
          首页
        </MenuItem>
        <Submenu name="1" v-if="roleId === '1'">
          <template slot="title">
            <Icon type=""></Icon>
            系统管理
          </template>
          <MenuItem  name="user_manage" >
            用户管理
          </MenuItem>
          <MenuItem  name="companys_manage" >
            分公司管理
          </MenuItem>
          <MenuItem  name="cooperative_manage" >
            合作社管理
          </MenuItem>
          <MenuItem  name="tobacco_manage" >
            烤房管理
          </MenuItem>
          <MenuItem  name="alarm" >
            告警管理
          </MenuItem>
          <MenuItem  name="notice" >
            公告管理
          </MenuItem>
          <MenuItem  name="news" >
            资讯管理
          </MenuItem>
        </Submenu>
        <MenuItem name="tobacco_show">
          <Icon type=""></Icon>
          烤房展示
        </MenuItem>
      </div>
    </Menu>
    <br>
  </nav>
</template>
<script scoped>
export default {
  data () {
    return {
      role: 1,
      menuData: [
        {
          title: '首页',
          only: false,
          router: 'first'
        },
        {
          title: '系统管理',
          only: true,
          children: [
            {
              title: '用户管理',
              router: 'user_manage'
            },
            {
              title: '分公司管理',
              router: 'companys_manage'
            },
            {
              title: '合作社管理',
              router: 'cooperative_manage'
            },
            {
              title: '烤房管理',
              router: 'tobacco_manage'
            },
            {
              title: '告警管理',
              router: 'alarm'
            },
            {
              title: '公告管理',
              router: 'notice'
            },
            {
              title: '资讯管理',
              router: 'news'
            }
          ]
        },
        {
          title: '烤房展示',
          only: false,
          router: 'tobacco_show'
        }
      ]
    }
  },
  created () {
    this.roleId = sessionStorage.getItem('roleId')
    this.clickMenuItems(this.getCurrentMenu())
  },
  methods: {
    clickMenuItems (key) {
      // key = key.indexOf('/') === 0 ? key : '/' + key
      this.$router.push({ path: key })
    },
    getCurrentMenu () {
      let path = this.$route.path
      path = (path === '/') ? 'user_manage' : path
      path = path.indexOf('/') === 0 ? path.substr(1) : path
      // this.clickMenuItems(path)
      // console.log(path)
      return path
    }
  }
}
</script>
<style lang='scss'>
  .side-menu {
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    position: relative;
    width: 100%;
    left: 0;
    top: 0;
    color: #282828;
    .ivu-menu-item.is-active,
    .ivu-menu-item.is-active {
      color: #fff;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
      color: #fff;
      background-color: transparent !important;
    }
    .ivu-menu-vertical .ivu-menu-item,
    .ivu-menu-vertical .ivu-menu-submenu-title {
      padding: 0 0 0 10px;
    }
    /*菜单选中激活*/
    .ivu-menu-vertical {
      .ivu-menu-item.sm-active,
      .ivu-menu-item.sm-active {
        color: #fff;
      }
    }
    .ivu-menu-item {
      .ivu-menu-item.sm-active,
      .ivu-menu-item.sm-active {
        color: #fff;
      }
    }
    .ivu-menu {
      /*background: #f4f4f4;*/
      background-color: transparent !important;
      .fa {
        margin-right: 10px;
        speak: none;
        font-family: MicrosoftYaHei-Bold;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 3;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    &>.ivu-menu,
    &>.ivu-menu>.ivu-menu-item:last-child {
      border-bottom: 1px solid rgba(141,206,173,0.33);
    }
    .ivu-menu-submenu {
      line-height: 45px;
    }
    .ivu-menu-item,
    .ivu-menu-submenu {
      border-top: 1px solid rgba(141,206,173,0.33);
      line-height: 45px;
    }
    .ivu-menu-submenu .ivu-menu-item {
      background-color: transparent !important;
      border-top: 0;
      padding-left: 34px;
    }
    .ivu-menu-item,
    .ivu-menu-submenu .ivu-menu-submenu-title {
      height: 45px;
      color: #8DCEAD;
      /*line-height: 35px;*/
    }
    .ivu-menu-item:hover {
      background-color: #fff;
    }
    /*鼠标滑过css*/
    .ivu-menu-item:hover,
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: #fff;
      color: #8DCEAD;
    }
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: #fff !important;
      color: #8DCEAD;
    }
    .ivu-menu-vertical .ivu-menu-submenu-title-icon {
      top: 12px;
    }
  }

  .side-menu {
    color: #8DCEAD;
    padding: 0 !important;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    width: 200px;
    padding-top: 10px;
    z-index: 1;
    overflow-x: hidden;
    background: -webkit-linear-gradient(rgba(0,164,126,1), rgba(1,106,82,0.8)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(0,164,126,1), rgba(1,106,82,0.8)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(0,164,126,1), rgba(1,106,82,0.8)); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(0,164,126,1), rgba(1,106,82,0.8));
    border-right: 1px solid #e5e5e5;
    transition: all .45s cubic-bezier(.23, 1, .32, 1);
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: #fff;
    }
  }
  .side-menu.show {
    left: -200px;
  }
</style>
