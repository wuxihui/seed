<template>
    <div class="el-plate-list">
        <button @click="handleClick">消息提示</button>
        <button @click="handleTimeClick">获取后台时间格式</button>
        <p>{{formatTime(time)}}</p>
                <!-- @mousedown="mouseDownHandleelse($event)" 
                @mouseup="mouseUpHandleelse($event)"> -->
        <div class="form-all-style">
            <div style="height: 432px" id="zhankaiStyle" class="bottom-form" ref="kongtiao"
               @mousedown="mouseDownHandleelse($event)" 
               @mouseup="mouseUpHandleelse($event)">
               >
            </div>
        </div>
        


    </div>
</template>

<script>
import { mapState } from 'vuex';
import Cookies from "js-cookie";
export default {
    name: "plateList",
    computed: {
        ...mapState("radar", ["time"]),
        TopDongChange() {
            return this.moveDataelse.TopDong;
        }
    },
    
    data() {
         return {
            moveDataelse: {
                x: null,
                y: null,
                TopDong: null
            },
            topHeight: null,
            minHeight: 410,
            maxHeight: 798,
         }
    },
    mounted() {
        Cookies.set('chazhiValue', 432);
    },
    watch: {
      // 定位top的变化值，就是元素高度的变化值，通过原始值和元素top定位的变化值最终得到的就是height高度值
    //   TopDongChange(newVal, oldVal) {
    //     var reduce
    //     // 因为oldVal起始值为null，所以先排除掉
    //     if (!oldVal && typeof oldVal === 'object') {
    //       console.log(oldVal);
    //       reduce = 0
    //     } else {
    //       reduce = oldVal - newVal
    //     }
    //     document.getElementById('zhankaiStyle').style.height = Number(Cookies.get('chazhiValue')) + reduce + 'px'
    //     Cookies.set('chazhiValue', Number(Cookies.get('chazhiValue')) + reduce)
    //   }
    },
    methods: {
        handleClick() {
            // this.commonJS.message("hhh", "success");
            this.$store.commit("radar/SET_COMMON_INFO", "");
        },
        handleTimeClick() {
            let time = "2018-01-03T02:01:13.678Z";
            this.$store.commit("radar/SET_TIME", time);
        },
        //时区修正
        formatTime(time) {
          return this.commonJS.formatBuildTime(time);
        },



        //鼠标按下
      mouseDownHandleelse(event) {
        this.moveDataelse.y = event.pageY - this.$refs.kongtiao.offsetTop;
        event.currentTarget.style.cursor = 'move';
        window.onmousemove = this.mouseMoveHandleelse;
        event.preventDefault();
      },
       // 鼠标移动
      mouseMoveHandleelse(event) {
        this.topHeight = event.pageY - this.moveDataelse.y;
        // this.topHeight = this.topHeight < this.minHeight ? this.minHeight : this.topHeight;
        // this.topHeight = this.topHeight > this.maxHeight ? this.maxHeight : this.topHeight;
        // this.moveDataelse.TopDong = this.topHeight;
        console.log(666);
        console.log("this.maxHeight:", this.maxHeight);
        console.log("this.minHeight:", this.minHeight);
        console.log("this.moveDataelse.topMove:", this.moveDataelse.topMove);
        console.log("this.topHeight:", this.topHeight);
        if(this.topHeight <= this.minHeight) {
            window.onmousemove = null;
        } else if(this.topHeight >= this.maxHeight) {
            window.onmousemove = null;
        } else {
            this.moveDataelse.TopDong = this.topHeight;
        }
        //区别onclick事件
        return false;
      },
       // 鼠标松开
      mouseUpHandleelse(event) {
        console.log(event);
        window.onmousemove = null;
        event.currentTarget.style.cursor = 'move';
      },
    }
}
</script>

<style scoped lang="less">
@import '~@/common/css/plate/plateList.less';
.form-all-style {
    width: 100%;
    height: 100%;
  }
 
.bottom-form {
    width: calc(100% - 120px);
    position: fixed;
    bottom: 0px;
    height: 432px;
    padding-top: 30px;
    background-color: saddlebrown;
}
</style>