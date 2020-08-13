<template>
  <div>

    <div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" v-for="(value) in props.row.formulaCal" :key="value.id" >

              <el-form-item :label="value.calcItemName" >
                <span>{{ value.formulaPercentage }}%</span>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="wageId" label="工资编号"></el-table-column>
        <el-table-column prop="staffId" label="员工编号"></el-table-column>
        <el-table-column prop="basicSalary" label="固定项目工资"></el-table-column>
        <el-table-column prop="basicSalary" label="基本工资"></el-table-column>
        <el-table-column prop="subsidy" label="补贴"></el-table-column>
        <el-table-column prop="rpMoney" label="导入项目"></el-table-column>
        <el-table-column prop="updateTime" label="结算时间"></el-table-column>
        <el-table-column prop="totalSalary" label="总工资"></el-table-column>


      </el-table>
    </div>

    <el-pagination
      layout="sizes,prev, pager, next"
      @current-change="changePage"
      @size-change="handleSizeChange"
      :total="total"
      :page-size="pagesize"
      :page-sizes="[10, 20, 50, 100]"
    ></el-pagination>
  </div>
</template>

<script>
import { exportCvsTable } from "@/utils/cvs";
import { delDepartById } from "@/api/BasicManage/depart";
// import Edit from "./Edit";
import {
  findDepartment,
  findDepartmentByParams
} from "@/api/BasicManage/depart";

import { getFormula } from "@/api/formula/formula";
export default {
  //   components: { Edit }, //导入组件
  data() {
    return {
      showEditDialog: false,
      tableData: [],
      searchParams: {
        title: "",
        type: "name"
      },
      total: 0,
      pagesize: 10,
      editTitle: this.$i18n.t("btn.edit"),
      page: {
        startPage: 1,
        pageSize: 10
      },
      form: {}
    };
  },
  methods: {
    editSuccess() {
      this.getTable();
    },
    //添加部门
    add() {
      this.editTitle = this.$i18n.t("btn.add");
      this.showEditDialog = true;
    },
    handleEdit(index, row) {
      this.editTitle = this.$i18n.t("btn.edit");
      this.showEditDialog = true;
      this.form = row;
    },
    handleDelete(index, row) {
      let params = { departId: row.departId };
      delDepartById(params).then(r => {
        console.log(r);
        this.getTable();
      });
    },
    search() {
      findDepartmentByParams(this.searchParams, this.page)
        .then(r => {
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch(e => {
          console.dir(e);
        });
    },
    getTable() {
      getFormula(this.page)
        .then(r => {
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch(e => {
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
      this.getTable();
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
      this.getTable();
    },
    //导出表格
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
    //刷新
    refresh() {
      this.$refs.pagination.Refresh(); //分页刷新
    }
  },
  created() {
    this.getTable();
  }
};
</script>

