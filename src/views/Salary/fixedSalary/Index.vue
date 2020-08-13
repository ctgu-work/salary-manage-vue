<template>
  <div>
    <ToolBar>
      <div>
        <!-- <el-button type="primary" size="small" @click="add">添加</el-button>
        <el-button type="primary" size="small" @click="exportTable"
          >本地导出表格</el-button
        > -->
        <el-select
          v-model="form.departId"
          @change="changeDept"
          style="width: 100px"
          placeholder="部门"
          size="small"
        >
          <el-option
            v-for="item in departments"
            :key="item.value"
            :label="item.departName"
            :value="item.departId"
          >
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="editSalary">
          修改工资
        </el-button>
      </div>
      <div>
        <el-input
          placeholder="请输入参数"
          size="small"
          style="width: 140px"
          v-model="searchParams.title"
          clearable
        ></el-input>
        <el-input
          placeholder="请输入参数"
          size="small"
          style="width: 140px"
          v-model="searchParams.title2"
          clearable
          v-show="searchParams.type != 'staffId'"
        ></el-input>
        <el-select
          v-model="searchParams.type"
          clearable
          style="width: 140px"
          placeholder="请选择类型"
          size="small"
        >
          <el-option label="员工编号" value="staffId"></el-option>
          <el-option label="工资区间" value="section"></el-option>
        </el-select>
        <el-button type="success" size="small" @click="search">查询</el-button>
        <el-button type="warning" size="small" @click="clearSearchParams()"
          >重置</el-button
        >
      </div>
    </ToolBar>
    <div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="fixedSalaryId" label="工资编号">
        </el-table-column>
        <!-- <el-table-column prop label="照片">
        <template slot-scope="s">
          <img :src="s.row.avatar" alt />
        </template>
      </el-table-column> -->
        <el-table-column prop="staffId" label="员工编号"></el-table-column>
        <el-table-column prop="departId" label="部门编号"></el-table-column>
        <el-table-column prop="basicSalary" label="基础工资"></el-table-column>
        <el-table-column prop="subsidy" label="津贴"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column>
          <!-- <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template> -->
        </el-table-column>
      </el-table>
    </div>

    <Edit
      ref="child1"
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
import Edit from "./Edit.vue";
import {
  getByDepartId,
  getFixedSalaryByParams,
  updateFixedSalary,
} from "@/api/salary/fixedSalary";

import { findDepartment } from "@/api/BasicManage/depart";

export default {
  components: { Edit }, //导入组件
  data() {
    return {
      showEditDialog: false,
      tableData: [],
      searchParams: {
        title: "",
        title2: "",
        type: "staffId",
      },
      total: 0,
      pagesize: 10,
      editTitle: "修改工资",
      page: {
        startPage: 1,
        pageSize: 10,
      },
      form: {
        fixedSalaryId: "",
        staffId: "",
        departId: "",
        basicSalary: "",
        subsidy: "",
        remarks: "",
      },
      departments: [],
    };
  },
  created() {
    let params = { startPage: 1, pageSize: 1000 };
    findDepartment(params)
      .then((r) => {
        this.departments = r.list;
        this.$set(this.form, "departId", this.departments[0].departId);
        // console.log(this.form.depId);
      })
      .catch((e) => {
        console.dir(e);
      });
    let departId = this.form.departId;
    getByDepartId({ startPage: 1, pageSize: 10, departId: 1 })
      .then((r) => {
        // console.log(departId);
        // console.log(this.form.departId);
        this.tableData = r.list;
        this.pagesize = r.pageSize;
        this.total = r.total;
      })
      .catch((e) => {
        console.dir(e);
      });
  },
  methods: {
    editSuccess(res) {
      console.log(this.form.departId);
      this.changeDept(this.form.departId);
    },
    editSalary() {
      this.$refs.child1.getDepartId(this.form.departId);
      this.editTitle = "修改工资项目";
      this.showEditDialog = true;
    },
    changeDept(departId) {
      // this.$set(this.form, "departId", departId);
      getByDepartId({ startPage: 1, pageSize: 10, departId: departId })
        .then((r) => {
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch((e) => {
          console.dir(e);
        });
    },
    search() {
      // console.log(this.form.departId);
      getFixedSalaryByParams(this.searchParams, this.page, this.form.departId)
        .then((r) => {
          console.log(this.form.departId);
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch((e) => {
          console.dir(e);
        });
    },
    //编辑
    // handleEdit(index, row) {
    //   this.editTitle = "编辑";
    //   this.showEditDialog = true;
    //   this.form = row;
    // },
    clearSearchParams() {
      this.searchParams.title = "";
      this.searchParams.title2 = "";
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
};
</script>
