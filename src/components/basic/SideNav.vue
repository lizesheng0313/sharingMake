<template>
  <div class="old-menu">
    <el-menu @select="handleSelect">
      <el-submenu
        v-for="(item,index) in mainMenu"
        :key="index"
        :index="returnTo(item.children[0].businessCode,'router')"
      >
        <template slot="title">
          <i class="iconfont" :class="returnTo(item.children[0].businessCode,'icon')"></i>
          <span>{{item.name}}</span>
        </template>
        <div v-if="item.children">
          <el-menu-item
            :index="returnTo(ele.businessCode,'router')"
            v-for="(ele,idx) in item.children"
            :key="idx"
          >
            <div class="line"></div>
            {{ele.name}}
          </el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>

export default {
  props:{
    routerList:Array,
    mainMenu:Object
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
    returnTo(code, type) {
      for (let i = 0; i < this.routerList.length; i++) {
        if (
          this.routerList[i].meta &&
          this.routerList[i].meta.businessCode == code
        ) {
          return type == "icon"
            ? this.routerList[i].meta.icon
            : this.routerList[i].path;
        }
      }
    }
  },

};
</script>
<style lang="scss">
.el-submenu__title {
  padding-left: 40px !important;
  font-size: 16px;
  color: #e7e9eb;
  &:hover {
    background: #556774;
  }
}
.el-menu-item {
  color: #bbc1c6;
  &:hover {
    background: #556774;
  }
  &:focus {
    background: #556774;
  }
}
.el-menu {
  background: #4a535e;
  border: none;
  .el-menu-item {
    width: 100%;
    height: 55px;
    margin: 0 auto;
    color: rgba(146, 146, 146, 1);
    text-align: left;
    font-size: 16px;
    padding-left: 70px !important;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    .line {
      display: none;
    }

    &:hover {
      color: #fff;
      background: #4a535e;
      .iconfont {
        color: #fff;
      }
    }
  }
}
.el-menu-item.is-active {
  background: #404a56;
  color: #98a2ad;
  position: relative;
  .iconfont {
    color: #98a2ad;
  }
  .line {
    display: block;
    width: 3px;
    background: #4687f5;
    height: 100%;
    position: absolute;
    left: 0;
  }
  &:hover {
    color: #fff;
    background: #404a56;
    .iconfont {
      color: #fff;
    }
  }
}
.el-menu-item-group {
  ul {
    li {
      padding-left: 84px !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.old-menu {
  height: auto;
  width: 223px;
  height: 100%;
  min-height: 87vh;
  background: #4a535e;
  box-shadow: 0px 0px 56px 0px rgba(241, 241, 241, 1);
  .iconfont {
    font-size: 16px;
    margin-right: 10px;
  }
}
</style>
