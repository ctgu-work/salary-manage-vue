<template>
  <div>
    <ToolBar>
      <div>
        <el-button type="primary" size="small" @click="add">{{$t('btn.add')}}</el-button>
        <el-button type="primary" size="small" @click="exportTable"
          >{{$t('btn.exportTable')}}</el-button
        >
      </div>
      <div>
        <el-input
          :placeholder="this.$i18n.t('btn.input')"
          size="small"
          style="width: 140px"
          v-model="searchParams.title"
          clearable
        ></el-input>
        <el-select
          v-model="searchParams.type"
          style="width: 140px"
          size="small"
        >
          <!-- <el-option :label="this.$i18n.t('basicManage.department.departId')" value="id"></el-option> -->
          <el-option :label="this.$i18n.t('basicManage.department.departName')" value="name"></el-option>
        </el-select>
        <el-button type="success" size="small" @click="search()"
          >{{$t('btn.select')}}</el-button
        >
        <el-button type="warning" size="small" @click="clearSearchParams()"
          >{{$t('btn.reset')}}</el-button
        >
      </div>
    </ToolBar>
    <div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="departId" label="员工编号"></el-table-column>
        <el-table-column prop="departName" label="员工姓名"></el-table-column>
        <el-table-column prop="departPhone" label="员工部门"></el-table-column>
        <el-table-column prop="description" label="固定工资"></el-table-column>
        <el-table-column prop="description" label="计算项目工资"></el-table-column>
        <el-table-column prop="description" label="导入项目工资"></el-table-column>
        <el-table-column prop="description" label="总工资"></el-table-column>
        <el-table-column prop="description" label="创建时间"></el-table-column>
        <el-table-column prop="fatherDepartName" label="是否结算">
          <template slot-scope="scope">
            <p v-if="scope.row.fatherDepartName != null">
              {{ scope.row.fatherDepartName }}
            </p>
            <p v-else>{{$t('msg.null')}}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="establishDate"
          :label="this.$i18n.t('basicManage.department.establishDate')"
          sortable
        ></el-table-column> -->
        <!-- <el-table-column prop="fax" :label="this.$i18n.t('basicManage.department.fax')"></el-table-column>
        <el-table-column prop="type" :label="this.$i18n.t('basicManage.department.type')"></el-table-column> -->
        <!-- <el-table-column prop="fatherDepartName" :label="this.$i18n.t('basicManage.department.fatherDepartName')">
          <template slot-scope="scope">
            <p v-if="scope.row.fatherDepartName != null">
              {{ scope.row.fatherDepartName }}
            </p>
            <p v-else>{{$t('msg.null')}}</p>
          </template>
        </el-table-column> -->
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >{{$t('btn.edit')}}</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >{{$t('btn.delete')}}</el-button
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
      editTitle: this.$i18n.t('btn.edit'),
      page: {
        startPage: 1,
        pageSize: 10,
      },
      form: {},
    };
  },
  methods: {
    editSuccess(){
         this.getTable();
    },
    //添加部门
    add() {
      this.editTitle = this.$i18n.t('btn.add');
      this.showEditDialog = true;
    },
    handleEdit(index, row) {
      this.editTitle = this.$i18n.t('btn.edit');
      this.showEditDialog = true;
      this.form = row;
    },
    handleDelete(index, row) {
      let params = {departId:row.departId};
      delDepartById(params)
      .then((r)=>{
        console.log(r);
        this.getTable()
      })
      
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
      this.getTable()
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
       this.getTable()
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
