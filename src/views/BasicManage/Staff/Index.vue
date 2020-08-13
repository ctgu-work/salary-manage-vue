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
          clearable
          style="width: 140px"
          placeholder="请选择类型"
          size="small"
        >
          <el-option label="身份证号" value="idCard"></el-option>
        </el-select>
        <el-button type="success" size="small" @click="search"
          >查询</el-button
        >
        <el-button type="warning" size="small" @click="clearSearchParams()"
          >重置</el-button
        >
      </div>
    </ToolBar>
    <div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="staffId" label="员工ID"> </el-table-column>
        <!-- <el-table-column prop label="照片">
        <template slot-scope="s">
          <img :src="s.row.avatar" alt />
        </template>
      </el-table-column> -->
        <el-table-column prop="staffName" label="姓名"></el-table-column>
        <el-table-column prop="positionName" label="所在岗位"></el-table-column>
        <el-table-column prop="departName" label="所在部门"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.row)"
              >详情</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
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
import Edit from "./Edit.vue";
import {
  findStaff,
  findStaffByParams,
  delStaff,
  addStaff,
} from "@/api/BasicManage/staff";
export default {
  components: { Edit }, //导入组件
  data() {
    return {
      showEditDialog: false,
      tableData: [],
      searchParams: {
        title: "",
        type: "idCard",
      },
      total: 0,
      pagesize: 10,
      editTitle: "编辑",
      page: {
        startPage: 1,
        pageSize: 10,
      },
      form: {
        staffId: -1,
        avatar:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        staffName: "吴恒",
        sex: "0",
        birth: "2020-8-7",
        idCard: "420420402402042044",
        positionName: "1",
        departName: "1",
        workTime: "2020-8-7",
        attWorkTime: "2020-8-7",
        employeeForm: "1",
        personnelSource: "1",
        politicalType: "1",
        nation: "1",
        hometown: "湖北武汉",
        birthLocation: "湖北武汉",
        phoneNumber: "13872618179",
        email: "mr.djg@qq.com",
        height: "180",
        bloodType: "1",
        maritalType: "1",
        highestEducation: "1",
        highestDegree: "2",
        school: "三峡大学",
        major: "计算机科学与技术",
        graduateTime: "2020-8-7",
      },
    };
  },
  methods: {
    editSuccess(res) {
        this.getTable();
    },
    getTable() {
      findStaff(this.page)
        .then((r) => {
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch((e) => {
          console.dir(e);
        });
    },
    //添加部门
    add() {
      this.editTitle = "添加";
      this.showEditDialog = true;
    },
    //员工详情
    handleDetail(row) {
      this.form = row;
      console.log(this.form);
      this.$router.push({
        name: "staffDetail",
        params: {
          staff: this.form,
        },
      });
    },
    //编辑
    handleEdit(index, row) {
      this.editTitle = "编辑";
      this.showEditDialog = true;
      this.form = row;
    },
    //删除
    handleDelete(row) {
      delStaff({ staffId: row.staffId })
        .then(() => {
          this.getTable();
        })
        .catch((e) => {
          console.dir(e);
        });
    },
    //查询
    search() {
      findStaffByParams(this.searchParams, this.page)
        .then((r) => {
          this.tableData.staff = r;
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