<template>
  <div>
    <full-screen>
      <div slot="fs-container">
        <div slot="content" class="home">
          <div class="display-flex">
            <div style="width: 175px;height: 94vh;margin-right:10px;background-color: #fff;" v-if="showAside">
              <el-menu
                style="border:none;"
                default-active="/home"
                class="el-menu-vertical-demo"
                @select='handleSelect'
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>一级菜单</span>
                  </template>
                  <el-menu-item index="/home">二级菜单</el-menu-item>
                  <el-menu-item index="/xxx">二级菜单</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
            <div class="flex1">
               <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </full-screen>

  </div>
</template>

<script>
import fullScreen from '../src/components/full-screen'
import {hideNavList} from '@/assets/js/utils/constData'

export default {
  data(){
    return{
      currentCom:''
    }
  },
  components: {
    fullScreen
  },
  computed:{
    showAside(){
      return(
        !hideNavList.includes(this.$route.name)
      );
    }
  },
  mounted() {
  },
  methods:{
    handleSelect(key,keyPath){
      this.$router.push(key);
    }
  }
};
</script>
