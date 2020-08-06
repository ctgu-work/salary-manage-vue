<template>
  <div class="body">
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple ">1</div></el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-light left">
          <div class="left-1">
              <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
              <h3>吴恒</h3>
              <p>员工id:666666</p>
          </div>
          <div class="left-2">
            <h3>个人资料</h3>
          </div>
          <div class="left-3">
              <div class="text"><span>性别：</span><span>男</span></div>
              <div class="text"><span>出生年月：</span><span>2020/8/6</span></div>
              <div class="text"><span>籍贯：</span><span>湖北武汉</span></div>
              <div class="text"><span>专业：</span><span>计科</span></div>
              <div class="text"><span>政治面貌：</span><span>团员</span></div>
          </div>
          <div class="left-4">
            <h3>联系方式</h3>
          </div>
          <div class="left-5">
              <div class="text"><span>手机：</span><span>13872618179</span></div>
              <div class="text"><span>邮箱：</span><span>mr.djg@qq.com</span></div>
              <div class="text"><span>住址：</span><span>湖北武汉</span></div>
          </div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content bg-purple right"></div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple-light "></div
      ></el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
</script>
<style lang="scss" scoped>
.body {
  background-color: #f2f6fc;
}
.left {
  width: 100%;
  background-color: #409eff;
  height: 700px;
  //   box-shadow: 0 2px 12px 0 #1c86c6;
//   text-align: center;
}
.left-1 {
  width: 100%;
  height: 280px;
  overflow: hidden;
  padding: 70px 70px 10px 70px;
  text-align: center;
}
.left-1 img{
    width: 100%;
}
.left-1 h3{
    color: #ffffff;
    padding: 20px 0;
    font-size: 18px;
}
.left-1 p{
    color: #ffffff;
    font-size: 13px;
}
.left-2 {
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  text-align: center;
}
.left-2 h3 {
  color: #409eff;
  line-height: 40px;
  font-size: 16px;
}
.left-3 {
  width: 100%;
  height: 200px;
  padding: 20px;
}
.text{
    padding: 6px 15px;
}
.text span{
    color: #ffffff;
    font-size: 14px;
}
.left-4 {
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  text-align: center;
}
.left-4 h3 {
  color: #409eff;
  line-height: 40px;
}
.left-5{
    width: 100%;
//   height: 200px;
  padding: 20px;
}
.right {
  width: 100%;
  height: 700px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
