<template>
    <div>
        首页
    </div>
</template>
<script>
    import axios from './axios.js'
    import {message} from 'ant-design-vue'
    import {Subject} from 'rxjs'
    export default {
        created(){
            const subject=new Subject()
            let a=1
            subject.subscribe(val=>console.log(a))
            a=2
            subject.subscribe(val=>console.log(a))
            subject.next('')
        }
    }
</script>