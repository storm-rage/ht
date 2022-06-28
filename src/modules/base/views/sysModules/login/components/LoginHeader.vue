<template>
    <header class="LoginHeader">
        <div class="logo"><img src="@assets/img/layout/Logo.png" class="pointer" @click="logoOff"/></div>
        <i class="el-icon-switch-button close" v-if="close" @click="closeClick"></i>
        <ul class="nav"  :class="close ? 'zj-m-r-20' : 'zj-m-r-010'"> <!-- :style="{marginRight: close ? '20px' : '10%'}" -->
            <li v-for="(item,index) in routerList" :key="index">
                <router-link :class="$route.path === item.path ? 'liCheck' :''" :to="item.path"
                             :style="{opacity:$route.path === item.path ? 1 : 0.66}"
                >{{item.label}}</router-link>
            </li>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "LoginHeader",
        data () {
            return {

            }
        },
        props: {
            border:{
                type:Boolean,
                default:false
            },
            close:{
                type:Boolean
            },
            routerList:{
                type:Array
            },
            check:String
        },
        methods: {
            logoOff(){
              if(this.$route.name !== 'login'){
                this.$router.push({name:'login'})
              }
            },
            closeClick () {
                // 登出
                this.$api.login.logout().then(() => {
                    this.$emit('resetState')
                })
            }
        }
    }
</script>

<style lang="less" scoped>
@import "~@assets/less/variables";
.LoginHeader{
    min-width: 850px;
    background-color: #FFFFFF;
    //background-color: #1659BC;
    box-shadow: 0 1px 1px rgba(155,155,155,.3);
    box-sizing: border-box;
    height: 68px;
    padding: 4px 0;
    .logo{
        float: left;
        margin-left: 10%;
        cursor: pointer;
        width: 119px;
        height: 52px;
        img{
          border-top: 5px solid rgba(0,0,0,0);
          width: 100%;
          height: 100%;
        }
    }
    .nav{
        float: right;
        padding-top: 6px;
        li{
            float: left;
            font-family: PingFangSC-Regular;
            font-size: 12.81px;
            text-align: center;
            margin: 0 23px;
          &.liCheck{
            color: white;
            opacity: 1!important;
          }
            a{
                /*color: #333;*/
              opacity: .66;
              color: @primary-main-color;
                line-height: 50px;
                &:hover{
                  opacity: 1;
                    /*color: #5494F2;*/
                }
            }
        }
    }
    .close{
        height: 100%;
        line-height: 62px;
        float: right;
        font-size: 20px;
        margin-right: 8%;
        cursor: pointer;
    }
}
</style>
