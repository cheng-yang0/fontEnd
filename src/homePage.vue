<template>
    <div :style="{
        ...columnStyle,
        //backgroundColor:'green',
        height:'50%',
        width:'100%',
        
    }">
        <div>
            这是一个全局变量：
            <a-input  
                v-model="variable" 
                :style="{
                    width:'300px',
                }"
            />
        </div>
        <a-button @click="sendFn">
            发送
        </a-button>
        <div>
            接受：
            <a-input  
                v-model="acceptData" 
                :style="{
                    width:'300px',
                }"
            />
        </div>
    </div>
</template>
<script>
    import axios from './axios.js'
    import {message} from 'ant-design-vue'
    export default {
        data(){
            return {
                variable:'',
                acceptData:'',
                columnStyle:{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-around',
                    alignItems:'center',
                },
            }
        },
        created(){
            if("WebSocket" in window){
                console.log("您的浏览器支持WebSocket");
                axios.get('/socket').then(res=>{
                    this.wsObj = new WebSocket(`ws://${location.hostname}:${res.data.port}`);
                    this.wsObj.onmessage = (ev)=>{  //获取后端响应
                        this.acceptData=ev.data
                    };
                })
                // wsObj.onopen = ()=>{  //发送请求
                //     wsObj.send("Hello WebSocket");
                // };
                // wsObj.onclose = (ev)=>{
                // };
                // wsObj.onerror = (ev)=>{
                //     alert('xixi')
                // };
        　　}else{  
        　　　　console.log("您的浏览器不支持WebSocket");
        　　}
        },
        methods:{
            sendFn(){
                this.wsObj.send(this.variable)
            }
        }
    }
</script>