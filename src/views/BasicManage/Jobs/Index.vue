<template>
  <div>
    <ToolBar>
      <div>
        <el-button type="primary" size="small" @click="add">添加</el-button>
        <el-button type="primary" size="small" @click="exportTable"
          >本地导出表格</el-button
        >
      </div>
      <div>
        <el-input
          placeholder="请输入部门名称"
          size="small"
          style="width: 140px"
          v-model="searchParams"
          clearable
        ></el-input>
        <!-- <el-select
          v-model="searchParams.type"
          clearable
          style="width: 140px"
          placeholder="请选择类型"
          size="small"
        >
          <el-option label="身份证号" value="1"></el-option>
          <el-option label="手机号" value="2"></el-option>
        </el-select> -->
        <el-button type="success" size="small" @click="search()"
          >查询</el-button
        >
        <el-button type="warning" size="small" @click="clearSearchParams()"
          >重置</el-button
        >
      </div>
    </ToolBar>
    <div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column
          prop="departName"
          label="岗位名称"
          sortable
        ></el-table-column>
        <el-table-column prop="departPhone" label="对应部门"></el-table-column>
        <el-table-column prop="description" label="部门描述"></el-table-column>
        <el-table-column prop="type" label="部门类型"></el-table-column>
        <el-table-column
          prop="establishDate"
          label="岗位编制"
        ></el-table-column>
        <el-table-column prop="fax" label="岗位类型"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Edit :showEditDialog="showEditDialog" @close="showEditDialog = false" />
    <el-pagination
    layout="prev, pager, next"
    @current-change="changePage"
    :total="total"
    :page-size='pagesize'
    >
  </el-pagination>
  </div>
</template>

<script>
import { exportCvsTable } from "@/utils/cvs";
import Edit from "./Edit";
import { findJob } from "@/api/BasicManage/job.js";
export default {
  components: { Edit }, //导入组件
  data() {
    return {
      showEditDialog: false,
      tableData: [],
      searchParams:'',
      total:0,
      pagesize:10
    };
  },
  methods: {
    //添加部门
    add() {
      this.showEditDialog = true;
    },
    handleEdit(index, row) {
      this.showEditDialog = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    search(){
 console.log(this.searchParams)
    },
    clearSearchParams(){
      this.searchParams=''
    },
    // formatter(row, column) {
    formatter(row) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    changePage(){
      console.log('2')
    },
    //导出表格
    exportTable() {
      exportCvsTable(
        [
          { title: "文章标题", field: "title" },
          { title: "浏览量", field: "visit_count" },
        ],
        this.tableData,
        "文章列表"
      );
    },
    //刷新
    refresh() {
      //this.$refs.pagination.Refresh(); //分页刷新
    },
  },
  created() {
    findJob()
      .then((r) => {
        this.tableData = r.list;
        this.pagesize=r.pageSize;
        this.total = r.total
      })
      .catch((e) => {
        console.dir(e);
      });
  },
};
</script>
