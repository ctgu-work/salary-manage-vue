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

      <el-form-item :label="this.$i18n.t('Salary.formula.formulaName')"  prop="formulaName">
        <el-input v-model="form.formulaName"></el-input>
      </el-form-item>

      <el-form-item :label="this.$i18n.t('Salary.formula.formulaPercentage')" prop="formulaPercentage">
        <el-input v-model="form.formulaPercentage"></el-input>
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
  StrongPassword,
  FillerFieldRules,
  RequiredAndFloat2Max100
} from "@/utils/validateRules";

import { fillerLeft } from "@/utils/common";
import { addCalculate,updateOneCalculate} from "@/api/salary/calculateSalary";
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
        formulaId: "",
        formulaName: "",
        formulaPercentage: "",   
      },

      rules: {
        ...FillerFieldRules(["formulaName"], Required),
        // phone: RequiredAndPhone, //or [Required, Phone]
        formulaPercentage:RequiredAndFloat2Max100,
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
            updateOneCalculate(this.form)
            .then((r) =>{
              console.log(r);
            })
            .catch((e=>{
              this.getTable();
              console.log(e);
            }))
          }else{
            addCalculate(this.form)
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
      console.log(this.forms.formulaId);
      if (this.title === "添加") {
        this.form = {
        formulaId: "",
        formulaName: "",
        formulaPercentage: "",
        };
         console.log("重置");
        // resetObject(this.forms);
        // this.$set(this.forms, "id", null);
        // this.$set(this.form, "positionTypeId", this.options[0].positionTypeId);
        // this.$set(this.form, "departId", this.optionc[0].departId);
        } else {
        this.form = this.forms;//清空
      }
    },
    FillerFormField(id, data) {
      console.log("FillerFormField");
      //可以外部填充回写做编辑用，也可以请求详情接口填充表单
      this.$set(this.forms, "formulaId", id);
      fillerLeft(this.forms, data);
    }
  },
  created() {
    
  },
};
</script>
