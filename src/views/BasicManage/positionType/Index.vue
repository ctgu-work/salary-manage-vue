<template>
  <div>
    <ToolBar>
      <div>
        <el-button type="primary" size="small" @click="add">{{$t('btn.add')}}</el-button>
        <el-button type="primary" size="small" @click="exportTable">{{$t('btn.exportTable')}}</el-button>
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
          clearable
          style="width: 140px"
          placeholder="请选择类型"
          size="small"
        >
          <el-option label="类型名" value="name"></el-option>
        </el-select>
        <el-button type="success" size="small" @click="search()">{{$t('btn.select')}}</el-button>
        <el-button type="warning" size="small" @click="clearSearchParams()">{{$t('btn.reset')}}</el-button>
      </div>
    </ToolBar>
    <div>
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="positionTypeId" :label="this.$i18n.t('positionType.poType.positionTypeId')" sortable></el-table-column>
        <el-table-column prop="type" :label="this.$i18n.t('positionType.poType.type')"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('btn.edit')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Edit
      :forms="form"
      :title="editTitle"
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
    />
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
import Edit from "./Edit";
import { findPositionType, PositionTypedelete } from "@/api/BasicManage/positionType.js";
export default {
  components: { Edit }, //导入组件
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
      editTitle: this.$i18n.t('btn.edit'),
      page: {
        startPage: 1,
        pageSize: 10
      },
      form: {
      
      }
    };
  },
  methods: {
    //添加部门
    add() {
      this.editTitle = this.$i18n.t('btn.add');
      this.showEditDialog = true;
    },
    handleEdit(index, row) {
      this.editTitle = this.$i18n.t('btn.edit');
      this.showEditDialog = true;
      this.form = row;
      // console.log(index);
      console.log(row);
      console.log(this.form);
    },
    handleDelete(index,row) {
      PositionTypedelete({ id: row.positionTypeId })
      this.$confirm(this.$i18n.t('btn.delete'), "提示", {
        confirmButtonText: this.$i18n.t('btn.confirm'),
        cancelButtonText: this.$i18n.t('btn.cancle'),
        type: "warning"
      })
        .then(r => {
          // eslint-disable-line no-unused-vars
          console.log(r);
          //  this.refresh();
          this.tableData.splice(index, 1);
        })
        .catch(e => {
          console.dir(e);
        });
        
    },
    search() {
      // findJobByParams(this.searchParams, this.page)
      //   .then(r => {
      //     this.tableData = r.list;
      //     this.pagesize = r.pageSize;
      //     this.total = r.total;
      //   })
      //   .catch(e => {
      //     console.dir(e);
      //   });
    },
    // 确定删除
    // deleteRow() {
    //   onedelete(this.form.positionId)
    //     .then(r => {
    //       if (r.data == "del success") {
    //         this.$message.success("删除成功");
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.$message.error("包装删除失败");
    //     });
    //   this.delVisible = false; //关闭删除提示模态框
    // },
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
    findPositionType(this.page)
      .then(r => {
        this.tableData = r.list;
        this.pagesize = r.pageSize;
        this.total = r.total;
      })
      .catch(e => {
        console.dir(e);
      });
  }
};
</script>
