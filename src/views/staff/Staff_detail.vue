<template>
  <div class="body">
    <el-row>
      <el-col :span="4"
        ><div class="grid-content bg-purple el-col"></div
      ></el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-light left">
          <div class="left-1">
            <el-avatar
              shape="square"
              :size="100"
              :fit="fit"
              :src="staff.avatar"
            ></el-avatar>
            <h3>{{ staff.staff_name }}</h3>
            <p>员工id:{{ staff.staff_id }}</p>
          </div>
          <div class="left-2">
            <h3>个人资料</h3>
          </div>
          <div class="left-3">
            <div class="text">
              <span>性别：</span>
              <span v-if="staff.sex == '0'">男</span>
              <span v-else-if="staff.sex == '1'">女</span>
            </div>
            <div class="text">
              <span>出生年月：</span><span>{{ staff.birth }}</span>
            </div>
            <div class="text">
              <span>籍贯：</span><span>{{ staff.hometown }}</span>
            </div>
            <div class="text">
              <span>血型：</span>
              <span v-if="staff.marital_type=='1'">A</span>
              <span v-else-if="staff.marital_type=='2'">B</span>
              <span v-else-if="staff.marital_type=='3'">AB</span>
              <span v-else-if="staff.marital_type=='4'">O</span>
              <span v-else-if="staff.marital_type=='5'">其他</span>
            </div>
            <div class="text">
              <span>政治面貌：</span>
              <span v-if="staff.political_type=='1'">党员</span>
              <span v-else-if="staff.political_type=='2'">共青团员</span>
              <span v-else-if="staff.political_type=='3'">群众</span>
              <span v-else-if="staff.political_type=='4'">其他</span>
            </div>
          </div>
          <div class="left-4">
            <h3>联系方式</h3>
          </div>
          <div class="left-5">
            <div class="text"><span>手机：</span><span>{{staff.phone_number}}</span></div>
            <div class="text">
              <span>邮箱：</span><span>{{staff.email}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content bg-purple right">
          <div class="right-1">
            <div class="title">
              <i class="el-icon-school"></i><span> 教育经历</span>
              <el-divider class="line"></el-divider>
            </div>
            <div class="content">
              <div class="span">
                <span>最高学历：</span>
                <span class="span-2" v-if="staff.highest_education=='1'">高中及以下</span>
                <span class="span-2" v-else-if="staff.highest_education=='2'">大专</span>
                <span class="span-2" v-else-if="staff.highest_education=='3'">本科</span>
                <span class="span-2" v-else-if="staff.highest_education=='4'">硕士</span>
                <span class="span-2" v-else-if="staff.highest_education=='5'">博士</span>
              </div>
              <div class="span">
                <span>最高学位：</span>
                <span class="span-2" v-if="staff.highest_degree=='1'">无</span>
                <span class="span-2" v-else-if="staff.highest_degree=='2'">学士</span>
                <span class="span-2" v-else-if="staff.highest_degree=='3'">硕士</span>
                <span class="span-2" v-else-if="staff.highest_degree=='4'">博士</span>
              </div>
              <div class="span">
                <span>院校：</span><span class="span-2">{{staff.school}}</span>
              </div>
              <div class="span">
                <span>专业：</span><span class="span-2">{{staff.major}}</span>
              </div>
              <div class="span">
                <span>毕业日期：</span><span class="span-2">{{staff.graduate_time}}</span>
              </div>
            </div>
          </div>
          <div class="right-2">
            <div class="title">
              <i class="el-icon-s-data"></i><span class=""> 工作/实习经历</span>
              <el-divider class="line"></el-divider>
            </div>
            <div class="content">
              <div class="span">
                <span>入职日期：</span><span class="span-2">{{staff.work_time}}</span>
              </div>
              <div class="span">
                <span>参加工作日期：</span><span class="span-2">{{staff.att_work_time}}</span>
              </div>
              <div class="span">
                <span>员工形式：</span>
                <span class="span-2" v-if="staff.employe_form=='0'">临时工</span>
                <span class="span-2" v-else-if="staff.employe_form=='1'">正式工</span>
              </div>
              <div class="span">
                <span>员工来源：</span>
                <span class="span-2" v-if="staff.personnel_source=='1'">校招</span>
                <span class="span-2" v-else-if="staff.personnel_source=='2'">社招</span>
                <span class="span-2" v-else-if="staff.personnel_source=='3'">其他</span>
              </div>
            </div>
          </div>
          <div class="right-3">
            <div class="title">
              <i class="el-icon-user"></i><span class=""> 其他信息</span>
              <el-divider class="line"></el-divider>
            </div>
            <div class="content">
              <div class="span">
                <span>婚姻状态：</span>
                <span class="span-2" v-if="staff.marital_type=='1'">未婚</span>
                <span class="span-2" v-else-if="staff.marital_type=='2'">已婚</span>
                <span class="span-2" v-else-if="staff.marital_type=='3'">丧偶</span>
                <span class="span-2" v-else-if="staff.marital_type=='4'">其他</span>
              </div>
              <div class="span">
                <span>身高：</span><span class="span-2">{{staff.height}}</span>
              </div>
              <div class="span">
                <span>所在部门ID：</span><span class="span-2">{{staff.position_id}}</span>
              </div>
              <div class="span">
                <span>所在岗位ID：</span><span class="span-2">{{staff.department_id}}</span>
              </div>
              <div class="span">
                <span>身份证号：</span
                ><span class="span-2">{{staff.id_card}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light "></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      staff: {
        staff_id: "661116666",
        avatar: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        staff_name: "吴恒",
        sex: "0",
        birth: "2020-8-7",
        id_card: "420420402402042044",
        position_id: "1",
        department_id: "1",
        work_time: "2020-8-7",
        att_work_time: "2020-8-7",
        employe_form: "1",
        personnel_source: "1",
        political_type: "1",
        nation: "1",
        hometown: "湖北武汉",
        birth_location: "湖北武汉",
        phone_number: "13872618179",
        email: "mr.djg@qq.com",
        height: "180",
        blood_type: "1",
        marital_type: "1",
        highest_education: "1",
        highest_degree: "2",
        school: "三峡大学",
        major: "计算机科学与技术",
        graduate_time: "2020-8-7",
      },
    };
  },
};
</script>
<style lang="scss"  scoped>
.body {
}
.el-col {
  min-height: 1px;
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
.left-1 img {
  width: 100%;
}
.left-1 h3 {
  color: #ffffff;
  padding: 20px 0;
  font-size: 18px;
}
.left-1 p {
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
.text {
  padding: 6px 15px;
}
.text span {
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
.left-5 {
  width: 100%;
  height: 200px;
  padding: 20px;
}
.right {
  width: 100%;
  height: 700px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 100px 30px 30px 30px;
}
.right-1 {
  padding: 10px 5px;
  height: 200px;
}
.title {
  width: 100%;
}
.title span {
  font-size: 18px;
  font-weight: 700;
  color: #409eff;
}
.right-1 i {
  font-size: 20px;
  color: #409eff;
  vertical-align: middle;
}
.line {
  margin: 0 !important;
  color: #409eff !important;
}
.content {
  width: 100%;
  padding: 20px 10px;
}
.content .span {
  width: 45%;
  margin: 10px 0;
  float: left;
}
.content span {
  display: inline-block;
  font-size: 13px;
}
.span-2 {
  font-weight: 700;
}
.right-2 {
  padding: 10px 5px;
  height: 160px;
}
.right-2 i {
  font-size: 20px;
  color: #409eff;
  vertical-align: middle;
}
.right-3 {
  padding: 10px 5px;
  height: 200px;
}
.right-3 i {
  font-size: 20px;
  color: #409eff;
  vertical-align: middle;
}
</style>
