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
      <el-form-item label="基础工资：" prop="basicSalary">
        <el-input v-model="form.basicSalary"></el-input>
      </el-form-item>

      <el-form-item label="津贴：" prop="subsidy">
        <el-input v-model="form.subsidy"></el-input>
      </el-form-item>
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
import { updateFixedSalary } from "@/api/salary/fixedSalary";
export default {
  props: {
    title: {
      type: String,
      default: "编辑",
    },
    dialogWidth: {
      type: String,
      default: "400px",
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    showEditDialog: Boolean,
    forms: {},
  },
  data() {
    return {
      form: {
        departId: 0,
        basicSalary: 0,
        subsidy: 0,
      },
      options: [],
      rules: {
        ...FillerFieldRules(["departName"], Required),
        departPhone: RequiredAndPhone, //or [Required, Phone]
        url: [Required, Url],
        password: [Required, StrongPassword],
      },
      departId: "",
    };
  },
  methods: {
    getDepartId(flag) {
      this.departId = flag;
    },
    submit() {
      this.$refs.editForms.validate((valid) => {
        if (valid) {
          this.$message({
            message: "字段验证通过，提交请求，成功后刷新分页！",
            type: "success",
          });
          if (this.title === "修改工资项目") {
            updateFixedSalary(this.form, this.departId)
              .then((r) => {
                // console.log(r);
              })
              .catch((e) => {
                console.log(e);
              });
          }
          this.$emit("editSuccess");
          this.$emit("close");
          // this.showEditDialog = false
        } else {
          this.$message({
            message: "请按照提示正确填写内容！",
            type: "warning",
          });
          return false;
        }
      });
    },
    openDialog() {
      // console.log("重置");
      this.form = {
        departId: 0,
        basicSalary: 0,
        subsidy: 0,
      };
    },
    FillerFormField(id, data) {
      console.log("FillerFormField");
      //可以外部填充回写做编辑用，也可以请求详情接口填充表单
      // this.$set(this.forms, "departId", id);
      // fillerLeft(this.forms, data);
    },
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
