<script  setup>
import { nextTick } from "vue";
import { ref, onMounted } from "vue"
// var box = document.querySelector(".box");
// var gap = document.querySelector(".gap");
// var leftColor = document.querySelector(".left");
// var ipt = document.querySelector(".move");
let box = ref('');
let left = ref('');
let gap = ref('');
let move = ref('');

// 获取容器的宽度



onMounted(() => {
    console.log(box.value.offsetWidth);
    console.log(left.value);
    console.log(gap.value);
    console.log(move.value);
    console.log(move.value.value);

})

let ipt = () => {
    nextTick(() => {
        // console.log(1);
        var boxWidth = parseInt(box.value.offsetWidth);
        //获取滑块的宽度
        var gapWidth = parseInt(gap.value.offsetWidth);
        console.log(left.value.offsetWidth);
        left.value.offsetWidth = (boxWidth - gapWidth) * ipt.value.value / 100 + "px";
        if (left.value.offsetWidth == "400px") {
            alert("验证成功");
        }
    });

    // 存在bug 该算法是将宽度分为100份，一份一份的修改，不能做到具体的值。下面代码永不会执行到，所以怎么解决该问题？
    // if (left.value.style.width == ((boxWidth - gapWidth) + "px")) {
    //     alert("验证成功");
    // }
}

</script>
<template>
    <div class="center">
        <div class="box" ref="box">
            <div class="left" ref="left"></div>
            <div class="gap" ref="gap">》》》</div>
        </div>
        <input type="range" value="0" class="move" ref="move" @input="ipt">
    </div>
</template>

<style scoped lang='less'>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
}

.box {
    width: 500px;
    height: 80px;
    border: 2px solid yellowgreen;
}

.left {
    width: 0px;
    height: 80px;
    background-color: pink;
    float: left;
}

.gap {
    width: 100px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: skyblue;
    float: left;
}

input {
    width: 420px;
    height: 80px;
    position: absolute;
    top: 9px;
    left: 44px;
    opacity: 0.1;
}
</style>