<template>
    <div class="tip" :class="{'go0': !isShow}" v-show="isShow">
        <div class="close" @click="sendTopartant">×</div>
        <div class="tipTitle">
        您有新的消息
        </div>
        <div class="tipContent">
            {{list}}
        </div>
    </div>
</template>
<script>
    export default {
        props: ['list', 'isShow'],
        data() {
            return {
                cpIsShow:null
            }
        },
        methods:{
            sendTopartant(){
                this.cpIsShow=this.isShow
                this.$emit('listenToChildEvent', !this.cpIsShow)
            },
        }
    }
</script>
<style>
    .tip{
        position:fixed;
        bottom:-300px;
        right:10px;
        width:300px;
        height:200px;
        background:#fff;
        text-align:center;
        animation:goto300 1s ease-out 1s forwards;
    }
    .go0{
        bottom:0 !important;
        animation:goto0 1s ease-out 1s forwards !important;
    }
    .tip .tipTitle{
        background:#323846;
        color:#fff;
        height:40px;
        line-height:40px;
    }
    .tip .tipContent{
        height:260px;
        background:#f4f4f4;
        border:1px solid #ccc;
        word-wrap: break-word;
        padding: 10px 15px;
    }
    .close{
        position:absolute;
        top:0;
        right:10px;
        line-height:40px;
    }
    @keyframes goto300{
        form{
            bottom:-300px;
        }
        to{
            bottom:0;
        }
    }
    @keyframes goto0{
        form{
            bottom:0;
        }
        to{
            bottom:-300px;
        }
    }    
</style>