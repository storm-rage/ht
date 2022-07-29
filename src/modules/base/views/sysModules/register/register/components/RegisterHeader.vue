<template>
    <header class="LoginHeader">
      <div class="logo" @click="toLogin"><a href="#"><img src="@assets/img/layout/Logo.png"/></a></div>
      <ul class="nav" :class="close ? 'zj-m-r-20' : 'zj-m-r-010'"> <!-- :style="{marginRight: close ? '20px' : '10%'}" -->
        <li v-for="(item,index) in routerList" :key="index">
          <router-link :to="item.path">{{item.label}}</router-link>
        </li>
      </ul>
    </header>
</template>

<script>
    import router from "@/router";

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
                type:Boolean,
                default:true
            },
            routerList:{
                type:Array,
                default(){
                  return [
                    // {path:'',label:'新手指引'},{path:'',label:'关于平台'}
                  ]
                }
            },
            register:{
              type:Boolean,
              default:true
            }
        },
        methods: {
            closeClick () {
                // 登出
                this.$api.login.logout().then(() => {
                    this.$router.replace({name:'login'})
                })
            },
            //去首页
            toLogin(){
              if(this.register){
                let ssionArr = ['registerStep','registerEntInfoObj']
                ssionArr.forEach(item=> sessionStorage.removeItem(item))
              }
              router.replace({
                path: '/login'
              })
            }
        }
    }
</script>

<style lang="less" scoped>
.LoginHeader{
    min-width: 850px;
    /*background-color: #FFFFFF;*/
    background-color: #1659BC;
    box-shadow: 0 1px 1px rgba(155,155,155,.3);
    box-sizing: border-box;
    height: 68px;
    padding: 4px 0;
    position: relative;
    .logo{
        float: left;
        margin-left: 10%;
        cursor: pointer;
        width: 119px;
        height: 52px;
        img{
            //border-top: 5px solid rgba(0,0,0,0);
            width: 120px;
            height: 70px;
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
            a{
                color: #333;
                line-height: 50px;
                &:hover{
                    color: #5494F2;
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
    //自适应
    /*@media all and (max-height: 670px){*/
    /*  .logo{*/
    /*    height: 50px;*/
    /*    width: 100px;*/
    /*    img{*/
    /*      height: 90%;*/
    /*      border-top-width: 2px;*/
    /*    }*/
    /*  }*/
    /*  .nav{*/
    /*    padding-top: 0;*/
    /*  }*/
    /*  .close{*/
    /*    line-height: 48px;*/
    /*  }*/
    /*}*/
}
</style>
