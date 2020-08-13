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
          <el-option :label="this.$i18n.t('basicManage.position.positionName')" value="name"></el-option>
          <el-option :label="this.$i18n.t('basicManage.position.type')" value="type1"></el-option>
        </el-select>
        <el-button type="success" size="small" @click="search()">{{$t('btn.select')}}</el-button>
        <el-button type="warning" size="small" @click="clearSearchParams()">{{$t('btn.reset')}}</el-button>
      </div>
    </ToolBar>
    <div>
       <!-- <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
    <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('btn.edit')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">{{$t('btn.delete')}}</el-button>
          </template>
    </el-table-column>
  </el-table> -->
  <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="formulaId" label="员工ID" sortable></el-table-column>
        <el-table-column prop="formulaName" label="员工名称"></el-table-column>
        <el-table-column prop="formulaPercentage" label="部门名"></el-table-column>
        <el-table-column prop="formulaPercentage" label="基本工资"></el-table-column>
        <el-table-column prop="formulaPercentage" label="补贴"></el-table-column>
        <el-table-column prop="formulaPercentage" label="计算条目名"></el-table-column>
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
<style scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>
import { exportCvsTable } from "@/utils/cvs";
import Edit from "./Edit";
import { findJob, findJobByParams, positiondelete } from "@/api/BasicManage/job.js";
export default {
  components: { Edit }, //导入组件
  data() {
    return {
      showEditDialog: false,
      tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
      }],      
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
      positiondelete({ positionId: row.positionId })
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
      findJobByParams(this.searchParams, this.page)
        .then(r => {
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch(e => {
          console.dir(e);
        });
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
    findJob(this.page)
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
