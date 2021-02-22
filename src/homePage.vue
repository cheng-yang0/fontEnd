<template>
    <div :style="{
        ...columnStyle,
        //backgroundColor:'green',
        //height:'100%',
        width:'100%',
        
    }">
        <div style="margin-top:10px;">
            网站开发者：杨成 ，电话号码：15510082705 ，欢迎短信给予开发建议，谢谢！
        </div>
        <div style="margin-top:10px;">
            已连接服务器的{{port}}端口,在线人数{{onlineNumber}} (刷新网页可更换端口身份)
        </div>
        <div :style="{
            display:'flex',
            marginTop:'10px',
            marginBottom:'10px',
        }">
            <div>
                想对大家说些什么：
                <a-input  
                    v-model="variable" 
                    placeholder="回车发送"
                    :style="{
                        width:'300px',
                        marginRight:'30px',
                    }"
                    @pressEnter='sendFn'
                />
            </div>
            <a-upload 
                :customRequest="customRequest"
            >
                <a-button> <a-icon type="upload" /> 发送文件 </a-button>
            </a-upload>
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
                    <span style="color:red">{{messages.length-index}}</span>
                    {{item.date}} {{item.port}}端口说： 
                    <span v-if="!isImg(item.text)&&!isVideo(item.text)">{{item.text}}</span>
                    <img 
                        :src="item.text" style="max-width:400px"
                        v-if="isImg(item.text)"    
                    />
                    <div>
                        <video :id="index+item.text"
                            :src="item.text"
                            controls="controls"
                            v-if="isVideo(item.text)"    
                        />
                    </div>
                    
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
                        if(data instanceof Array){
                            this.messages=data.reverse()
                        }else{
                            if(data.text!==undefined){
                                this.messages.unshift(data)
                            }
                            if(data.onlineNumber!==undefined){
                                this.onlineNumber=data.onlineNumber
                            }
                        }
                    };
                    this.wsObj.onclose=()=>{
                        setTimeout(()=>{
                            location.reload()
                        },2000)
                    }
                })
        　　}else{  
        　　　　console.log("您的浏览器不支持WebSocket");
        　　}
        },
        methods:{
            sendFn(){
                if(this.variable){
                    this.wsObj.send(this.variable)
                    this.variable=''    
                }
            },
            customRequest(file){
                const formData=new FormData()
                formData.append('file',file.file)
                formData.append('port',this.port)
                axios.post('/media',formData).then(res=>{
                    this.wsObj.send(res.data.data)
                })
            },
            isImg(text){
                return /http/.test(text) && /jpg|jpeg|png|bmp|tif|gif/.test(text)
            },
            isVideo(text){
                return /http/.test(text) && /avi|mov|rmvb|rm|flv|mp4|3gp/.test(text)
            }
            // beforeUpload(file){
            //     console.log(file);
            //     this.wsObj.send(file)
            //     return false
            // },
        }
    }
</script>