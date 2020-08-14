<template>
  <el-dialog
    @open="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="showEditDialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="editForms"
      class="edit-forms title"
      label-position="left"
      :label-width="labelWidth"
    >
      <el-form-item label="姓名" prop="staffName">
        <el-input v-model="form.staffName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期：" prop="birth">
        <el-date-picker v-model="form.birth" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="身份证：" prop="idCard">
        <el-input v-model="form.idCard"></el-input>
      </el-form-item>
      <el-form-item label="入职日期：" prop="workTime">
        <el-date-picker
          v-model="form.workTime"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="参加工作日期：" prop="attWorkTime">
        <el-date-picker
          v-model="form.attWorkTime"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="员工形式：" prop="employeeForm">
        <el-radio-group v-model="form.employeeForm">
          <el-radio :label="0">临时工</el-radio>
          <el-radio :label="1">正式工</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工来源：" prop="personnelSource">
        <el-radio-group v-model="form.personnelSource">
          <el-radio :label="1">校招</el-radio>
          <el-radio :label="2">社招</el-radio>
          <el-radio :label="3">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="政治面貌：" prop="politicalType">
        <el-radio-group v-model="form.politicalType">
          <el-radio :label="1">党员</el-radio>
          <el-radio :label="2">共青团员</el-radio>
          <el-radio :label="3">群众</el-radio>
          <el-radio :label="4">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="民族：" prop="nation">
        <el-select v-model="form.nation" placeholder="请选择">
          <el-option
            v-for="item in nation"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门：" prop="departmentId">
        <el-select
          v-model="form.departmentId"
          @change="getPosition"
          placeholder="请选择"
        >
          <el-option
            v-for="item in departments"
            :key="item.value"
            :label="item.departName"
            :value="item.departId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位：" prop="positionId">
        <el-select v-model="form.positionId" placeholder="请选择">
          <el-option
            v-for="item in positions"
            :key="item.value"
            :label="item.positionName"
            :value="item.positionId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="籍贯：" prop="hometown">
        <el-input v-model="form.hometown"></el-input>
      </el-form-item>
      <el-form-item label="出生地：" prop="birthLocation">
        <el-input v-model="form.birthLocation"></el-input>
      </el-form-item>
      <el-form-item label="email：" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="身高：" prop="height">
        <el-input placeholder="请输入内容" v-model="form.height">
          <template slot="append">cm</template>
        </el-input>
      </el-form-item>
      <el-form-item label="血型：" prop="bloodType">
        <el-radio-group v-model="form.bloodType">
          <el-radio :label="1">A</el-radio>
          <el-radio :label="2">B</el-radio>
          <el-radio :label="3">AB</el-radio>
          <el-radio :label="4">O</el-radio>
          <el-radio :label="5">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="婚姻状态：" prop="maritalType">
        <el-radio-group v-model="form.maritalType">
          <el-radio :label="1">未婚</el-radio>
          <el-radio :label="2">已婚</el-radio>
          <el-radio :label="3">丧偶</el-radio>
          <el-radio :label="4">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最高学历：" prop="highestEducation">
        <el-radio-group v-model="form.highestEducation">
          <el-radio :label="1">高中及以下</el-radio>
          <el-radio :label="2">大专</el-radio>
          <el-radio :label="3">本科</el-radio>
          <el-radio :label="4">硕士</el-radio>
          <el-radio :label="5">博士</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最高学位：" prop="highestDegree">
        <el-radio-group v-model="form.highestDegree">
          <el-radio :label="1">无</el-radio>
          <el-radio :label="2">学士</el-radio>
          <el-radio :label="3">硕士</el-radio>
          <el-radio :label="4">博士</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学校：" prop="school">
        <el-input v-model="form.school"></el-input>
      </el-form-item>
      <el-form-item label="专业：" prop="major">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="毕业日期：" prop="graduateTime">
        <el-date-picker
          v-model="form.graduateTime"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <h1>上传图片</h1>
      <el-upload
                class="upload-demo avater-uploader"
                name="avatar"
                :show-file-list="false"
                :action="useApiUrl+'/staff/avatar'"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"  
                accept=".jpg, .png, .JPG"
                >
                <img v-if="form.avatar" :src="form.avatar" prop="avatar" class="avater" style="width:140px;height:140px; border-radius:50%; overflow:hidden;"/>
                <i v-else class="el-icon-plus avater-uploader-icon"></i>
        </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  Required,
  Url,
  RequiredAndPhone,
  StrongPassword,
  FillerFieldRules,
} from "@/utils/validateRules";

import { fillerLeft, resetObject } from "@/utils/common";
import { useApiUrl } from "@/config/apiUrl";
import {
  updateOneStaff,
  departAllPosition,
  addStaff,
} from "@/api/BasicManage/staff";
import { findDepartment } from "@/api/BasicManage/depart";
export default {
  props: {
    title: {
      type: String,
      default: "编辑",
    },
    dialogWidth: {
      type: String,
      default: "700px",
    },
    labelWidth: {
      type: String,
      default: "120px",
    },
    showEditDialog: Boolean,
    forms: {},
  },
  data() {
    return {
      form: {
        staffId: -1,
        avatar:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        staffName: "吴恒",
        sex: "0",
        birth: "2020-8-7",
        idCard: "420420402402042044",
        positionId: "1",
        departmentId: "1",
        workTime: "2020-8-7",
        attWorkTime: "2020-8-7",
        employeeForm: "1",
        personnelSource: "1",
        politicalType: "1",
        nation: "1",
        hometown: "湖北武汉",
        birthLocation: "湖北武汉",
        phoneNumber: "13872618179",
        email: "mr.djg@qq.com",
        height: "180",
        bloodType: "1",
        maritalType: "1",
        highestEducation: "1",
        highestDegree: "2",
        school: "三峡大学",
        major: "计算机科学与技术",
        graduateTime: "2020-8-7",
      },
      departments: [],
      nation: [
        { value: 1, label: "汉族" },
        { value: 2, label: "蒙古族" },
        { value: 3, label: "回族" },
        { value: 4, label: "藏族" },
        { value: 5, label: "维吾尔族" },
        { value: 6, label: "苗族" },
        { value: 7, label: "彝族" },
        { value: 8, label: "壮族" },
        { value: 9, label: "布依族" },
        { value: 10, label: "朝鲜族" },
        { value: 11, label: "满族" },
        { value: 12, label: "侗族" },
        { value: 13, label: "瑶族" },
        { value: 14, label: "白族" },
        { value: 15, label: "土家族" },
        { value: 16, label: "哈尼族" },
        { value: 17, label: "哈萨克族" },
        { value: 18, label: "傣族" },
        { value: 19, label: "黎族" },
        { value: 20, label: "傈僳族" },
        { value: 21, label: "佤族" },
        { value: 22, label: "畲族" },
        { value: 23, label: "高山族" },
        { value: 24, label: "拉祜族" },
        { value: 25, label: "水族" },
        { value: 26, label: "东乡族" },
        { value: 27, label: "纳西族" },
        { value: 28, label: "景颇族" },
        { value: 29, label: "柯尔克孜族" },
        { value: 30, label: "土族" },
        { value: 31, label: "达翰尔族" },
        { value: 32, label: "么佬族" },
        { value: 33, label: "羌族" },
        { value: 34, label: "布朗族" },
        { value: 35, label: "撒拉族" },
        { value: 36, label: "毛南族" },
        { value: 37, label: "仡佬族" },
        { value: 38, label: "锡伯族" },
        { value: 39, label: "阿昌族" },
        { value: 40, label: "普米族" },
        { value: 41, label: "塔吉克族" },
        { value: 42, label: "怒族" },
        { value: 43, label: "乌孜别克族" },
        { value: 44, label: "俄罗斯族" },
        { value: 45, label: "鄂温克族" },
        { value: 46, label: "德昂族" },
        { value: 47, label: "保安族" },
        { value: 48, label: "裕固族" },
        { value: 49, label: "京族" },
        { value: 50, label: "塔塔尔族" },
        { value: 51, label: "独龙族" },
        { value: 52, label: "鄂伦春族" },
        { value: 53, label: "赫哲族" },
        { value: 54, label: "门巴族" },
        { value: 55, label: "珞巴族" },
        { value: 56, label: "基诺族" },
      ],
      positions: [],
      rules: {
        ...FillerFieldRules(
          [
            "phoneNumber",
            "staffName",
            "sex",
            "idCard",
            "positionId",
            "departmentId",
            "employeeForm",
            "personnelSource",
            "politicalType",
            "nation",
            "bloodType",
            "maritalType",
            "highestEducation",
            "highestDegree",
          ],
          Required
        ),
        phoneNumber: RequiredAndPhone, //or [Required, Phone]
        url: [Required, Url],
        password: [Required, StrongPassword],
      },
    useApiUrl:useApiUrl
    };
  },
  methods: {
    handleAvatarSuccess(res,file) {
      console.log(res);
      console.log(file);
      if(file.response.msg == 'success')
        console.log('sucesss');
         this.form.avatar = res.result;
    },
    submit() {
      this.$refs.editForms.validate((valid) => {
        if (valid) {
          this.$message({
            message: "字段验证通过，提交请求，成功后刷新分页！",
            type: "success",
          });
          if (this.title === "编辑" || this.title === "Edit") {
            updateOneStaff(this.form)
              .then((r) => {
                console.log(r);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            
            addStaff(this.form)
              .then((r) => {
                console.log(r);
              })
              .catch((e) => {
                console.dir(e);
              });
          }
          this.$emit("editSuccess");
          this.$emit("close");
        } else {
          this.$message({
            message: "请按照提示正确填写内容！",
            type: "warning",
          });
          return false;
        }
      });
    },
    getPosition(departId) {
      departAllPosition({ departId: departId })
        .then((r) => {
          this.positions = r;
          this.form.positionId = "";
        })
        .catch((e) => {
          console.dir(e);
        });
    },
    openDialog() {
      if (this.title === "添加") {
        this.form = {
          staffId: "",
          avatar: "",
          staffName: "",
          sex: "",
          birth: "",
          idCard: "",
          positionId: "",
          departmentId: "",
          workTime: "",
          attWorkTime: "",
          employeeForm: "",
          personnelSource: "",
          politicalType: "",
          nation: "",
          hometown: "",
          birthLocation: "",
          phoneNumber: "",
          email: "",
          height: "",
          bloodType: "",
          maritalType: "",
          highestEducation: "",
          highestDegree: "",
          school: "",
          major: "",
          graduateTime: "",
        };
        console.log("重置");
        // resetObject(this.forms);
        // this.$set(this.forms, "id", null);
        // this.$set(this.form, "staffId", this.options[0].staffId);
        // this.$refs.editForms.resetFields();
      } else {
        this.form = this.forms;
      }
    },
    FillerFormField(id, data) {
      //可以外部填充回写做编辑用，也可以请求详情接口填充表单
      this.$set(this.forms, "id", id);
      fillerLeft(this.forms, data);
    },
  },
  created() {
    // this.form = this.forms
    let params = { startPage: 1, pageSize: 1000 };
    findDepartment(params)
      .then((r) => {
        this.departments = r.list;
      })
      .catch((e) => {
        console.dir(e);
      });
  },
};
</script>
<style>
.el-dialog__header {
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
  border-bottom: 1px solid #ddd;
}
.el-dialog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
