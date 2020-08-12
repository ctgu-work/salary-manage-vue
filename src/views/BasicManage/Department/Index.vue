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
          placeholder="请输入参数"
          size="small"
          style="width: 140px"
          v-model="searchParams.title"
          clearable
        ></el-input>
        <el-select
          v-model="searchParams.type"
          style="width: 140px"
          placeholder="请选择类型"
          size="small"
        >
          <el-option label="编号" value="id"></el-option>
          <el-option label="部门名称" value="name"></el-option>
        </el-select>
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
        <el-table-column prop="departId" label="部门编号"></el-table-column>
        <el-table-column prop="departName" label="部门名称"></el-table-column>
        <el-table-column prop="departPhone" label="部门电话"></el-table-column>
        <el-table-column prop="description" label="部门描述"></el-table-column>
        <el-table-column
          prop="establishDate"
          label="建立日期"
          sortable
        ></el-table-column>
        <el-table-column prop="fax" label="部门传真"></el-table-column>
        <el-table-column prop="type" label="部门类型"></el-table-column>
        <el-table-column prop="fatherDepartName" label="父部门">
          <template slot-scope="scope">
            <p v-if="scope.row.fatherDepartName != null">
              {{ scope.row.fatherDepartName }}
            </p>
            <p v-else>无</p>
          </template>
        </el-table-column>
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
    <Edit
      :forms="form"
      :title="editTitle"
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      @editSuccess="editSuccess"
    />
    <el-pagination
      layout="sizes,prev, pager, next"
      @current-change="changePage"
      @size-change="handleSizeChange"
      :total="total"
      :page-size="pagesize"
      :page-sizes="[10, 20, 50, 100]"
    >
    </el-pagination>
  </div>
</template>

<script>
import { exportCvsTable } from "@/utils/cvs";
import { delDepartById } from "@/api/BasicManage/depart";
import Edit from "./Edit";
import {
  findDepartment,
  findDepartmentByParams,
} from "@/api/BasicManage/depart";
export default {
  components: { Edit }, //导入组件
  data() {
    return {
      showEditDialog: false,
      tableData: [],
      searchParams: {
        title: "",
        type: "name",
      },
      total: 0,
      pagesize: 10,
      editTitle: "编辑",
      page: {
        startPage: 1,
        pageSize: 10,
      },
      form: {},
    };
  },
  methods: {
    editSuccess(res) {
      if (res === "success") {
        this.getTable();
      }
    },
    //添加部门
    add() {
      this.editTitle = "添加";
      this.showEditDialog = true;
    },
    handleEdit(index, row) {
      this.editTitle = "编辑";
      this.showEditDialog = true;
      this.form = row;
    },
    handleDelete(index, row) {
      console.log(index, row);
      delDepartById(index);
    },
    search() {
      findDepartmentByParams(this.searchParams, this.page)
        .then((r) => {
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch((e) => {
          console.dir(e);
        });
    },
    getTable() {
      findDepartment(this.page)
        .then((r) => {
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch((e) => {
          console.dir(e);
        });
    },
    clearSearchParams() {
      this.searchParams.title = "";
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
    changePage(page) {
      this.page.startPage = page;
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
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
      this.$refs.pagination.Refresh(); //分页刷新
    },
  },
  created() {
    this.getTable();
  },
};
</script>
