<template>
  <div>
    <ToolBar>
      <div>
        <el-button type="primary" size="small" @click="gotolink()"
          >添加</el-button
        >
        <el-button type="primary" size="small" @click="exportTable"
          >本地导出表格</el-button
        >
      </div>
      <div>
        <el-input
          placeholder="请输入员工姓名"
          size="small"
          style="width: 140px"
          v-model="searchParams.title"
          clearable
        ></el-input>
        <el-select
          v-model="searchParams.type"
          clearable
          style="width: 140px"
          placeholder="请选择类型"
          size="small"
        >
          <el-option label="身份证号" value="1"></el-option>
          <el-option label="手机号" value="2"></el-option>
        </el-select>
        <el-button type="success" size="small" @click="refresh()"
          >查询</el-button
        >
        <el-button type="warning" size="small" @click="clearSearchParams()"
          >重置</el-button
        >
      </div>
    </ToolBar>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="staff_id" label="员工ID"> </el-table-column>
      <el-table-column prop label="照片">
        <template slot-scope="s">
          <img :src="s.row.avatar" alt />
        </template>
      </el-table-column>
      <el-table-column prop="id_card" label="身份证号"></el-table-column>
      <el-table-column prop="position_id" label="所在岗位"></el-table-column>
      <el-table-column prop="department_id" label="所在部门"></el-table-column>
      <el-table-column prop="position_id" label="所在岗位"></el-table-column>
      <el-table-column prop="phone_number" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <div slot-scope="s">
          <el-button type="primary" size="small" @click="workerdemo()"
            >员工详情</el-button
          >
          <el-button type="primary" size="small" @click="routeDemo(s.row)"
            >更新</el-button
          >
          <el-button type="danger" size="small" @click="removeItem(s.row)"
            >删除</el-button
          >
        </div>
      </el-table-column>
    </el-table>
  
    <Edit :showEditDialog="showEditDialog" @close="showEditDialog = false" />
  </div>
</template>

<script>
import { topics } from "@/api/BasicManage/list";
import { exportCvsTable } from "@/utils/cvs";
import { resetObject } from "@/utils/common";
// import Edit from "./Edit.vue";
export default {
  data() {
    return {
      searchParams: {
        title: "",
        type: ""
      },
      tableData: []
    };
  },
  created() {
    topics()
      .then(r => {
        this.tableData = r;
      })
      .catch(() => {});
  },
  methods: {
    routeDemo() {
      this.$message.info("待添加");
    },
    gotolink(){
 
          //点击跳转至上次浏览页面
         // this.$router.go(-1)
 
          //指定跳转地址
          this.$router.replace('/worker/addwork')
    },
    workerdemo(){
 
          //点击跳转至上次浏览页面
         // this.$router.go(-1)
 
          //指定跳转地址
          this.$router.replace('/worker/detail')
    },
    exportTable() {
      exportCvsTable(
        [
          { title: "文章标题", field: "title" },
          { title: "浏览量", field: "visit_count" }
        ],
        this.tableData,
        "文章列表"
      );
    },
    refresh() {
      //this.$refs.pagination.Refresh(); //分页刷新
    },
    returnData(pageList) {
      this.tableData = pageList.list;
    },
    clearSearchParams() {
      resetObject(this.searchParams);
      this.refresh();
    },
    removeItem(row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.d = 0;
          // updateStatus({ id: row.id})
          //   .then(r => {
          //     this.$message({
          //       type: "success",
          //       message: "操作成功!"
          //     });
          //     this.refresh();
          //   })
          //   .catch(() => {});
        })
        .catch(() => {});
    }
  },
  // components: { Edit }
};
</script>
