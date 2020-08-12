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
      <!-- 岗位名称，岗位编制 部门名称 岗位类型 -->
      <el-form-item :label="this.$i18n.t('basicManage.position.positionName')" prop="positionName">
        <el-input v-model="form.positionName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="浮点（2位）" prop="test">
        <el-input
          v-model="forms.test"
          placeholder="非必填的浮点（2位）字符串规则验证"
        ></el-input>
      </el-form-item>-->


      <el-form-item :label="this.$i18n.t('basicManage.position.positionMan')" prop="positionMan">
        <el-input v-model="form.positionMan"></el-input>
      </el-form-item>

       <el-form-item :label="this.$i18n.t('basicManage.position.departName')" prop="departName">
        <el-select v-model="form.departId" :placeholder="this.$i18n.t('btn.selectType')">
          <el-option
            v-for="item in optionc"
            :key="item.departId"
            :label="item.departName"
            :value="item.departId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="this.$i18n.t('basicManage.position.type')" prop="type">
        <el-select v-model="form.positionTypeId" :placeholder="this.$i18n.t('btn.selectType')">
          <el-option
            v-for="item in options"
            :key="item.positionTypeId"
            :label="item.type"
            :value="item.positionTypeId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">{{$t('btn.cancle')}}</el-button>
      <el-button type="primary" @click="submit">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  Required,
  Url,
  StrongPassword,
  FillerFieldRules
} from "@/utils/validateRules";

import { fillerLeft } from "@/utils/common";
import { findJobType, findDepartName,addJob,updateOneJob } from "@/api/BasicManage/job";
export default {
  props: {
    title: {
      type: String,
      default: "编辑"
    },
    dialogWidth: {
      type: String,
      default: "700px"
    },
    labelWidth: {
      type: String,
      default: "120px"
    },
    showEditDialog: Boolean,
    forms: {},
  },
  data() {
    return {
      form: {
        positionId: "",
        positionMan: 0,
        positionName: "",
        departId: 0,
        departName: "",
        positionTypeId: 0,
        type: "",
      },
      options: [],
      optionc: [],
      rules: {
        ...FillerFieldRules(["positionName"], Required),
        // phone: RequiredAndPhone, //or [Required, Phone]
        url: [Required, Url],
        password: [Required, StrongPassword]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.editForms.validate((valid) => {
        if (valid) {
          this.$message({
            message: "字段验证通过，提交请求，成功后刷新分页！",
            type: "success"
          });
           if(this.title ==='编辑' || this.title ==='Edit') {
            updateOneJob(this.form)
            .then((r) =>{
              console.log(r);
            })
            .catch((e=>{
              this.getTable();
              console.log(e);
            }))
          }else{
            addJob(this.form)
            .then((r) => {
              console.log(r);
              
            })
            .catch((e) => {
              console.dir(e);
              this.getTable();
            });
            
          }
          this.$emit('editSuccess','success');
        } else {
          this.$message({
            message: "请按照提示正确填写内容！",
            type: "warning"
          });
          return false;
        }
      });
    },
    openDialog() {
      console.log(this.title);
      console.log(this.forms.positionId);
      if (this.title === "添加") {
        this.form = {
        positionId: "",
        positionMan: 0,
        positionName: "",
        departId: "",
        departName: "",
        positionTypeId: '',
        type: ""
        };
         console.log("重置");
        // resetObject(this.forms);
        // this.$set(this.forms, "id", null);
        this.$set(this.form, "positionTypeId", this.options[0].positionTypeId);
        this.$set(this.form, "departId", this.optionc[0].departId);
        } else {
        this.form = this.forms;//清空
      }
    },
    FillerFormField(id, data) {
      console.log("FillerFormField");
      //可以外部填充回写做编辑用，也可以请求详情接口填充表单
      this.$set(this.forms, "positionId", id);
      fillerLeft(this.forms, data);
    }
  },
  created() {
    let params = { startPage: 1, pageSize: 1000 };
    let params1 = { startPage: 1, pageSize: 1000 };
    findJobType(params)
      .then((r) => {
        this.options = r;
        this.forms.type = r.list[0].positionTypeId;
      })
      .catch((e) => {
        console.dir(e);
      });
    findDepartName(params1)
    .then((r) => {
        this.optionc = r;
        this.forms.departName = r.list[0].departId;
      })
      .catch((e) => {
        console.log("111");
        console.dir(e);
      });
  },
};
</script>
