<template>
    <div :style="{
        ...columnStyle,
        width:'100vw',
        height:'100vh',
        backgroundColor:'#fce5cd',
    }" class='frame'>
        <!-- <homePage></homePage> -->
        <div :style="{
            ...columnStyle,
            //backgroundColor:'red',
            height:'500px',
            width:'500px'
        }">
            <div :style="{
                ...columnStyle,
              //  backgroundColor:'green',
                height:'500px',
                width:'300px',
                
            }">
                <a-input  v-model="userName" placeholder='账号'/>
                <a-input  v-model="password" placeholder='密码'/>
                <a-button @click="loginFn">
                    登录
                </a-button>
                <a-button @click="registerFn">
                    注册
                </a-button>
            </div>
            <div :style="{
                //backgroundColor:'yellow',
            }">
                <a>没有账号？去注册</a>
            </div>
        </div> 
    </div>
</template>
<script>
    import axios from './axios.js'
    import {message} from 'ant-design-vue'
    import homePage from './homePage.vue'
    export default {
        components:{homePage},
        data(){
            return {
                columnStyle:{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-around',
                    alignItems:'center',
                },
                userName:'',
                password:'',
            }
        },
        methods:{
            loginFn(){
                axios.post('/backEnd/user/login',{
                    userName:this.userName,
                    password:this.password
                }).then(res=>{
                    if(res.data.status==='success'){
                        alert('登录成功')
                        window.localStorage.setItem("token", res.data.token)
                        this.$router.push({
                            path:'/homePage'
                        })
                    }else{
                        alert(res.data.message)
                    }
                }).catch(error=>{
                    alert('登录失败')
                })
            },
            registerFn(){
                axios.post('/backEnd/user/register',{
                    userName:this.userName,
                    password:this.password
                }).then(res=>{
                    if(res.data.status==='success'){
                        alert('注册成功')
                    }else{
                        alert(res.data.message)
                    }
                }).catch(error=>{
                    alert('注册失败')
                })
            },
        }
    }
</script>
<style scoped>

</style>