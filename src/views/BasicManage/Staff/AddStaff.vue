<template>
  <div class="body">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple el-col"></div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-light left">
          <div class="left-1">
            <el-avatar
              shape="square"
              :size="100"
              :fit="fit"
              :src="fileList[0].url"
            ></el-avatar>
            <div class="imgui">
              <el-upload
                class="upload-demo"
                :show-file-list="false"
                action="https://jsonplaceholder.typicode.com/posts/"
                name="files"
                :file-list="fileList"
                :on-change="handleChange"
                :on-success="handleAvatarSuccess"
                accept=".jpg, .png, .JPG"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div class="left-1end">
              <h4 class="h1-left">员工姓名</h4>
              <el-input
                placeholder="请输入姓名"
                v-model="input"
                clearable
                class="input1"
              ></el-input>
            </div>
          </div>

          <div class="left-2">
            <h3>个人资料</h3>
          </div>
          <div class="left-3">
            <div class="text">
              <span>性别：</span>
              <span>
                <el-radio
                  v-model="radio"
                  label="1"
                  value="0"
                  style="color:white;"
                  >男</el-radio
                >
                <el-radio
                  v-model="radio"
                  label="2"
                  value="1"
                  style="color:white;margin-left:-15px;"
                  >女</el-radio
                >
              </span>
            </div>
            <div class="text">
              <span>生日：</span>
              <span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  class="input3"
                ></el-date-picker>
              </span>
            </div>
            <div class="text">
              <span>籍贯：</span>
              <span>
                <el-input
                  placeholder="请输入籍贯"
                  v-model="input1"
                  clearable
                  class="input2"
                ></el-input>
              </span>
            </div>
            <div class="text">
              <span>血型：</span>
              <span style="float:right;">
                <el-checkbox-group
                  v-model="userList"
                  @change="groupChange"
                  style="width:130px;"
                >
                  <el-checkbox
                    v-for="(item1, index) in user"
                    :key="item1"
                    :label="index"
                    class="checkbox-div"
                    style="font-size:12px;color:white;"
                    >{{ item1 }}</el-checkbox
                  >
                </el-checkbox-group>
              </span>
            </div>
            <div class="text" style="margin-top:20px;">
              <span>政治面貌：</span>
              <span style="float:right;">
                <el-checkbox-group
                  v-model="userList1"
                  @change="groupChange1"
                  style="width:110px;"
                >
                  <el-checkbox
                    v-for="(item2, index) in mood"
                    :key="item2"
                    :label="index"
                    class="checkbox-div"
                    style="font-size:12px;color:white;"
                    >{{ item2 }}</el-checkbox
                  >
                </el-checkbox-group></span
              >
            </div>
          </div>
          <div class="left-4">
            <h3>联系方式</h3>
          </div>
          <div class="left-5">
            <div class="text">
              <span>手机：</span>
              <span>
                <el-input
                  placeholder="请输入手机号"
                  v-model="input2"
                  clearable
                  class="input2"
                ></el-input
              ></span>
            </div>
            <div class="text">
              <span>邮箱：</span>
              <span>
                <el-input
                  placeholder="请输入邮箱"
                  v-model="input3"
                  clearable
                  class="input2"
                ></el-input
              ></span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content bg-purple right">
          <div class="right-1">
            <div class="title">
              <i class="el-icon-school"></i>
              <span>教育经历</span>
              <el-divider class="line"></el-divider>
            </div>
            <div class="content">
              <div class="span">
                <span class="classleftall"><h4>最高学历:</h4></span>
                <span class="span-2">
                  <el-checkbox-group
                    v-model="gradelist"
                    @change="gradeChange"
                    style="width:422px;float:right;margin-left:10px;"
                  >
                    <el-checkbox
                      v-for="(item3, index) in grade"
                      :key="item3"
                      :label="index"
                      class="checkbox-div"
                      style="font-size:12px;"
                      >{{ item3 }}</el-checkbox
                    >
                  </el-checkbox-group></span
                >
              </div>
              <div class="span">
                <span class="classleftall"><h4>最高学位：</h4></span>
                <span class="span-2">
                  <el-checkbox-group
                    v-model="maxgradelist"
                    @change="maxgradeChange"
                    style="float:right;margin-left:10px;"
                  >
                    <el-checkbox
                      v-for="(item4, index) in maxgrade"
                      :key="item4"
                      :label="index"
                      class="checkbox-div"
                      style="font-size:12px;"
                      >{{ item4 }}</el-checkbox
                    >
                  </el-checkbox-group></span
                >
              </div>
              <div class="span">
                <span><h4>院校：</h4></span>
                <span class="span-2"
                  ><el-input
                    placeholder="请输入院校"
                    v-model="input4"
                    clearable
                    class="input4"
                  ></el-input
                ></span>
              </div>
              <div class="span hmove1">
                <span><h4>专业：</h4></span>
                <span class="span-2"
                  ><el-input
                    placeholder="请输入专业"
                    v-model="input5"
                    clearable
                    class="input4"
                  ></el-input
                ></span>
              </div>
              <div class="span">
                <span><h4>毕业日期：</h4></span>
                <span class="span-2"
                  ><el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择日期"
                    class="input4"
                  ></el-date-picker
                ></span>
              </div>
            </div>
          </div>
          <div class="right-2">
            <div class="title">
              <i class="el-icon-s-data"></i>
              <span class>工作/实习经历</span>
              <el-divider class="line"></el-divider>
            </div>
            <div class="content">
              <div class="span">
                <span><h4>入职日期：</h4></span>
                <span class="span-2"
                  ><el-date-picker
                    v-model="value3"
                    type="date"
                    placeholder="选择日期"
                    class="input4"
                  ></el-date-picker
                ></span>
              </div>
              <div class="span">
                <span><h4>参加工作日期：</h4></span>
                <span class="span-2"
                  ><el-date-picker
                    v-model="value4"
                    type="date"
                    placeholder="选择日期"
                    class="input4"
                  ></el-date-picker
                ></span>
              </div>
              <div class="span">
                <span><h4>员工形式：</h4></span>
                <el-radio v-model="radio1" label="1" value="0">临时工</el-radio>
                <el-radio
                  v-model="radio1"
                  label="2"
                  value="1"
                  style="margin-left:-15px;"
                  >正式工</el-radio
                >
              </div>
              <div class="span">
                <span style="float:left;margin-top:3px;"
                  ><h4>员工来源：</h4></span
                >
                <span class="span-2" style="margin-top:2px;">
                  <el-checkbox-group
                    v-model="workfromlist"
                    @change="workfromChange"
                    style="float:right;margin-left:10px;"
                  >
                    <el-checkbox
                      v-for="(item5, index) in worker"
                      :key="item5"
                      :label="index"
                      class="checkbox-div"
                      style="font-size:12px;"
                      >{{ item5 }}</el-checkbox
                    >
                  </el-checkbox-group></span
                >
              </div>
            </div>
          </div>
          <div class="right-3">
            <div class="title">
              <i class="el-icon-user"></i>
              <span class>其他信息</span>
              <el-divider class="line"></el-divider>
            </div>
            <div class="content">
              <div class="span">
                <span style="float:left;margin-top:3px;"
                  ><h4>婚姻状态：</h4></span
                >
                <span class="span-2"
                  ><el-checkbox-group
                    v-model="marryerlist"
                    @change="marryerChange"
                    style="float:right;margin-left:10px;"
                  >
                    <el-checkbox
                      v-for="(item6, index) in marryer"
                      :key="item6"
                      :label="index"
                      class="checkbox-div"
                      style="font-size:12px;"
                      >{{ item6 }}</el-checkbox
                    >
                  </el-checkbox-group></span
                >
              </div>
              <div class="span">
                <span><h4>身高：</h4></span>
                <span class="span-2"
                  ><el-input
                    placeholder="请输入身高"
                    v-model="input5"
                    clearable
                    class="input4"
                  ></el-input
                ></span>
              </div>
              <div class="span">
                <span><h4>所在部门ID：</h4></span>
                <span class="span-2"
                  ><el-input
                    placeholder="请输入部门"
                    v-model="input6"
                    clearable
                    class="input4"
                  ></el-input
                ></span>
              </div>
              <div class="span">
                <span><h4>所在岗位ID：</h4></span>
                <span class="span-2"
                  ><el-input
                    placeholder="请输入岗位"
                    v-model="input7"
                    clearable
                    class="input4"
                  ></el-input
                ></span>
              </div>
              <div class="span">
                <span><h4>身份证号：</h4></span>
                <span class="span-2"
                  ><el-input
                    placeholder="请输入身份证号"
                    v-model="input8"
                    clearable
                    class="input4"
                  ></el-input
                ></span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    //血型
    return {
      userList: [0],
      user: ["A", "B", "AB", "O", "其他"],
      userList1: [0],
      mood: ["党员", "共青团员", "群众", "其他"],
      gradelist: [0],
      grade: ["高中及以下", "大专", "本科", "硕士", "博士"],
      maxgradelist: [0],
      maxgrade: ["无", "学士", "硕士", "博士"],
      workfromlist: [0],
      worker: ["校招", "社招", "其他"],
      marryerlist: [0],
      marryer: ["未婚", "已婚", "丧偶", "离婚"],
      // 单选框
      radio: "1",
      radio1: "1",
      //日期选择
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
        ],
      },
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      input: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: "",
      staff: {
        staff_id: "661116666",
        avatar:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
      fileList: [
         {
           name: "",
           url: ""
         }
       ],
    };
  },
  methods: {
    handleAvatarSuccess(file) {
      this.file.url = URL.createObjectURL(file.url);
    },
    handleChange(file) {
      console.log(file);
    },
    groupChange1() {
      console.log("变化", this.userList1);
      if (this.userList1.length > 1) {
        this.userList1.shift();
      }
    },
    gradeChange() {
      console.log("变化", this.gradelist);
      if (this.gradelist.length > 1) {
        this.gradelist.shift();
      }
    },
    maxgradeChange() {
      console.log("变化", this.maxgradelist);
      if (this.maxgradelist.length > 1) {
        this.maxgradelist.shift();
      }
    },
    workfromChange() {
      console.log("变化", this.workfromlist);
      if (this.workfromlist.length > 1) {
        this.workfromlist.shift();
      }
    },
    marryerChange() {
      console.log("变化", this.marryerlist);
      if (this.marryerlist.length > 1) {
        this.marryerlist.shift();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-col {
  min-height: 1px;
}
.left {
  width: 100%;
  background-color: #409eff;
  height: 1000px;
}
.left-1 {
  width: 100%;
  height: 230px;
  overflow: hidden;
  padding: 10px 0px 0px 0px;
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
  margin-top: 1px;
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
  height: 400px;
  padding: 20px;
}
.text {
  padding: 6px 15px;
  height: 60px;
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
  height: 1000px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px;
}
.right-1 {
  padding: 10px 5px;
  height: 330px;
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
  padding: 10px 10px;
}
.content .span {
  width: 100%;
  margin: 15px 0;
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
  height: 250px;
}
.right-2 i {
  font-size: 20px;
  color: #409eff;
  vertical-align: middle;
}
.right-3 {
  padding: 10px 5px;
  height: 250px;
}
.right-3 i {
  font-size: 20px;
  color: #409eff;
  vertical-align: middle;
}
.h1-left {
  float: left;
  margin-left: 30px;
  margin-top: 20px;
  color: white;
}
.input1 {
  float: right;
  width: 55%;
  height: 60%;
  border-radius: 2%;
  margin-right: 10px;
  margin-top: 10px;
}
.input2 {
  float: right;
  width: 70%;
  height: 40px !important;
  border-radius: 2%;
  margin-top: -10px;
  font-size: 12px;
}
.input3 {
  float: right;
  width: 70%;
  border-radius: 2%;
  margin-top: -10px;
  font-size: 12px;
}
.el-input--suffix .el-input__inner {
  height: 30px !important;
  border-radius: 2%;
}
.left-1end {
  float: left;
  padding-bottom: 20px;
}
.classleftall {
  float: left;
}
.input4 {
  margin-top: 2px;
}
.hmove1 {
  float: left;
}
</style>
