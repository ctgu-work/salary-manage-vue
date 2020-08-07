<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="showEditDialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form
      :model="forms"
      :rules="rules"
      ref="editForms"
      class="edit-forms"
      label-position="left"
      :label-width="labelWidth"
    >
      <!-- 部门名称，部门类型，部门电话，部门传真，部门描述，父部门，建立日期 -->
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="forms.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="浮点（2位）" prop="test">
        <el-input
          v-model="forms.test"
          placeholder="非必填的浮点（2位）字符串规则验证"
        ></el-input>
      </el-form-item>-->

      <el-form-item label="部门类型" prop="type">
        <el-select v-model="forms.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门电话" prop="phone">
        <el-input v-model="forms.phone"></el-input>
      </el-form-item>

      <el-form-item label="部门传真" prop="fax">
        <el-input v-model="forms.fax"></el-input>
      </el-form-item>

      <el-form-item label="部门描述" prop="desc">
        <el-input v-model="forms.desc"></el-input>
      </el-form-item>

      <!-- <el-form-item label="机构地址" prop="url">
        <el-input v-model="forms.url"></el-input>
      </el-form-item>
      <el-form-item label="管理员手机号" prop="phone">
        <el-input v-model="forms.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="forms.password"></el-input>
      </el-form-item>-->
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
  Float2,
  RequiredAndPhone,
  StrongPassword,
  FillerFieldRules
} from "@/utils/validateRules";

import { fillerLeft, resetObject } from "@/utils/common";

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
    showEditDialog: Boolean
  },
  data() {
    return {
      forms: {
        name: "",
        desc: "",
        type: "0",
        phone: ""
      },
      options: [
        {
          value:'0',
          label:'无',
        },
        {
          value: "1",
          label: "技术"
        },
        {
          value: "2",
          label: "运营"
        }
      ],
      rules: {
        ...FillerFieldRules(["name", "desc"], Required),
        phone: RequiredAndPhone, //or [Required, Phone]
        url: [Required, Url],
        test: Float2,
        password: [Required, StrongPassword]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.editForms.validate(valid => {
        if (valid) {
          this.$message({
            message: "字段验证通过，提交请求，成功后刷新分页！",
            type: "success"
          });
          this.$emit("success"); //通知列表分页刷新
          // add(this.forms)
          //   .then(r => {
          //     this.$message({
          //       message: "创建机构成功！",
          //       type: "success"
          //     });
          //     this.$emit("success");
          //   })
          //   .catch(() => {});
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
      resetObject(this.forms);
      this.$set(this.forms, "id", null);
      this.$refs.editForms.resetFields();
    },
    FillerFormField(id, data) {
      //可以外部填充回写做编辑用，也可以请求详情接口填充表单
      this.$set(this.forms, "id", id);
      fillerLeft(this.forms, data);
    }
  }
};
</script>
