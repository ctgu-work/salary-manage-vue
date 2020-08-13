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
      <el-form-item :label="this.$i18n.t('positionType.poType.type')" prop="type">
        <el-input v-model="form.type"></el-input>
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
import { addfindPositionType,updatePositionType } from "@/api/BasicManage/positionType.js";
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
        positionTypeId: "",
        type: "",
      },
      rules: {
        ...FillerFieldRules(["type"], Required),
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
            updatePositionType(this.form)
            .then((r) =>{
              console.log(r);
            })
            .catch((e=>{
              this.getTable();
              console.log(e);
            }))
          }else{
            addfindPositionType(this.form)
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
      console.log(this.forms.positionTypeId);
      if (this.title === "添加") {
        this.form = {
        positionTypeId: "",
        type: ""
        };
         console.log("重置");
        // resetObject(this.forms);
        // this.$set(this.forms, "id", null);
        } else {
        this.form = this.forms;//清空
      }
    },
    FillerFormField(id, data) {
      console.log("FillerFormField");
      //可以外部填充回写做编辑用，也可以请求详情接口填充表单
      this.$set(this.forms, "positionTypeId", id);
      fillerLeft(this.forms, data);
    }
  },
  created() {
  },
};
</script>
