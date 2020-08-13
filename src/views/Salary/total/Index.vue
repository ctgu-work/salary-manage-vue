<template>
  <div>
    <ToolBar>
      <div>
        <el-select v-model="departId" style="width: 140px" size="small">
          <el-option
            v-for="item in options"
            :key="item.departId"
            :label="item.departName"
            :value="item.departId"
          ></el-option>
        </el-select>
        <el-button type="success" size="small" @click="search()">{{$t('btn.select')}}</el-button>
        <!-- <el-button type="warning" size="small" @click="clearSearchParams()"
          >{{$t('btn.reset')}}</el-button
        >-->
      </div>
    </ToolBar>
    <div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
         <el-table-column prop="wageId" label="工资编号"></el-table-column>
        <el-table-column prop="departId" label="员工编号"></el-table-column>
        <el-table-column prop="departName" label="员工姓名"></el-table-column>
        <el-table-column prop="departName" label="员工部门"></el-table-column>
        <el-table-column prop="fixedSalary" label="固定工资"></el-table-column>
        <el-table-column prop="calcSalary" label="计算项目工资"></el-table-column>
        <el-table-column prop="rewardPunishSalary" label="导入项目工资"></el-table-column>
        <el-table-column prop="totalSalary" label="总工资"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="fatherDepartName" label="是否结算">
          <template slot-scope="scope">
            <!-- <p >
              未结算
            </p>-->

            <el-button
              v-if="scope.row.status == 0"
              type="success"
              size="small"
              @click="updateSalary(scope.row.wageId)"
            >结算</el-button>
            <p v-else>已结算</p>
          </template>
        </el-table-column>
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
import { findDepartmentName } from "@/api/BasicManage/depart";
import { getSalary, updateSalaryStatus } from "@/api/salary/total";
import {
  findDepartment,
  findDepartmentByParams
} from "@/api/BasicManage/depart";
export default {
  data() {
    return {
      departId: "",
      showEditDialog: false,
      tableData: [],
      options: [],
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
    updateSalary(id) {
      updateSalaryStatus({status:1,wageId:id})
      .then((r)=>{
        this.getTable()
      })
      .catch((e)=>{

      })
    },
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
      getSalary(this.page, this.departId)
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
      getSalary(this.page, this.departId)
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
    findDepartmentName().then(r => {
      console.log(r);
      this.options = r;
      this.departId = r[0].departId;
      this.getTable();
    });
  }
};
</script>

