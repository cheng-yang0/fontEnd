<template>
    <div :style="{
        ...columnStyle,
        //backgroundColor:'green',
        //height:'100%',
        width:'100%',
        
    }">
        <div style="margin-top:10px;">已连接服务器的{{port}}端口,在线人数{{onlineNumber}}</div>
        <div :style="{
            display:'flex',
            marginTop:'10px',
            marginBottom:'10px',
        }">
            <div>
                想对大家说些什么：
                <a-input  
                    v-model="variable" 
                    :style="{
                        width:'300px',
                        marginRight:'30px',
                    }"
                    @pressEnter='sendFn'
                />
            </div>
            <a-button @click="sendFn">
                发送
            </a-button>
        </div>
        <div>
            消息列表：
            <a-list 
                :bordered="true"
                :data-source="messages"
                :style="{
                    width:'530px'
                }"
                >
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <span style="color:red">{{index}}</span>
                    {{item.date}} {{item.port}}端口说： {{item.text}}
                </a-list-item>
            </a-list>
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
                columnStyle:{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-around',
                    alignItems:'center',
                },
                port:'',
                onlineNumber:0,
                messages:[],
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
                        if(data.text!==undefined){
                            this.messages.push(data)
                        }
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
                this.variable=''
            }
        }
    }
</script>