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
      <!-- 部门名称，部门类型，部门电话，部门传真，部门描述，父部门，建立日期
      departId: 0,
        departName: "",
        departPhone: "",
        departTypeId: 0,
        description: "",
        establishDate: 0,
        fatherDepartId: 0,
        fatherDepartName: "",
        fax: "",
        type: "",
       -->
      <el-form-item :label="this.$i18n.t('basicManage.department.departName')" prop="departName">
        <el-input v-model="form.departName"></el-input>
      </el-form-item>

      <el-form-item :label="this.$i18n.t('basicManage.department.type')" prop="type">
        <el-select v-model="form.departTypeId" :placeholder="this.$i18n.t('btn.selectType')">
          <el-option
            v-for="item in options"
            :key="item.departTypeId"
            :label="item.type"
            :value="item.departTypeId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="this.$i18n.t('basicManage.department.departPhone')" prop="departPhone">
        <el-input v-model="form.departPhone"></el-input>
      </el-form-item>

      <el-form-item :label="this.$i18n.t('basicManage.department.fax')" prop="fax">
        <el-input v-model="form.fax"></el-input>
      </el-form-item>

      <el-form-item :label="this.$i18n.t('basicManage.department.description')" prop="desc">
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.description"
        ></el-input>
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
  RequiredAndPhone,
  StrongPassword,
  FillerFieldRules,
} from "@/utils/validateRules";

import { fillerLeft, resetObject } from "@/utils/common";
import {
  findDepartType,
  addDepart,
  updateOneDepartment,
} from "@/api/BasicManage/depart";
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
        departId: "",
        departName: "",
        departPhone: "",
        departTypeId: 0,
        description: "",
        establishDate: 0,
        fatherDepartId: 0,
        fatherDepartName: "",
        fax: "",
        type: "",
      },
      options: [],
      rules: {
        ...FillerFieldRules(["departName"], Required),
        departPhone: RequiredAndPhone, //or [Required, Phone]
        url: [Required, Url],
        password: [Required, StrongPassword],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.editForms.validate((valid) => {
        if (valid) {
          this.$message({
            message: "字段验证通过，提交请求，成功后刷新分页！",
            type: "success",
          });

          if (this.title === "编辑" || this.title === "Edit") {
            updateOneDepartment(this.form)
              .then((r) => {
                // console.log(r);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            addDepart(this.form)
              .then((r) => {
                // console.log(r);
              })
              .catch((e) => {
                console.dir(e);
              });
          }
          this.$emit("editSuccess");
          this.$emit('close')
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
      console.log(this.title);
      console.log(this.forms.departId);
      if (this.title === "添加") {
        this.form = {
          departId: "",
          departName: "",
          departPhone: "",
          departTypeId: "",
          description: "",
          establishDate: "",
          fatherDepartId: "",
          fatherDepartName: "",
          fax: "",
          type: "",
        };
        console.log("重置");
        // resetObject(this.forms);
        // this.$set(this.forms, "id", null);
        this.$set(this.form, "departTypeId", this.options[0].departTypeId);
        // this.$refs.editForms.resetFields();
      } else {
        this.form = this.forms;
      }
    },
    FillerFormField(id, data) {
      console.log("FillerFormField");
      //可以外部填充回写做编辑用，也可以请求详情接口填充表单
      this.$set(this.forms, "departId", id);
      fillerLeft(this.forms, data);
    },
  },
  created() {
    // this.form = this.forms
    let params = { startPage: 1, pageSize: 1000 };
    findDepartType(params)
      .then((r) => {
        this.options = r.list;
        this.forms.type = r.list[0].departTypeId;
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
