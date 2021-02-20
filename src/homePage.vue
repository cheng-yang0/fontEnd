<template>
    <div :style="{
        ...columnStyle,
        //backgroundColor:'green',
        height:'50%',
        width:'100%',
        
    }">
        <div>已连接服务器的{{port}}端口,在线人数{{onlineNumber}}</div>
        <div :style="{
            display:'flex',
        }">
            <div>
                想对大家说些什么：
                <a-input  
                    v-model="variable" 
                    :style="{
                        width:'300px',
                        marginRight:'30px',
                    }"
                />
            </div>
            <a-button @click="sendFn">
                发送
            </a-button>
        </div>
       
        <div>
            最新消息：
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
                port:'',
                onlineNumber:0,
            }
        },
        created(){
            if("WebSocket" in window){
                console.log("您的浏览器支持WebSocket");
                axios.get('/socket').then(res=>{
                    this.port=res.data.port
                    this.wsObj = new WebSocket(`ws://${location.hostname}:${res.data.port}`);
                    this.wsObj.onmessage = (ev)=>{  //获取后端响应
                        const data=JSON.parse(ev.data)
                        console.log(data);
                        
                        this.acceptData=data.text
                        this.onlineNumber=data.onlineNumber
                    };
                    this.wsObj.onclose=()=>{
                        location.reload()
                    }
                })
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