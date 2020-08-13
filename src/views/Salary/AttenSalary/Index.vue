<template>
  <div>
    <ToolBar>
      <div>
        <!-- <el-button type="primary" size="small" @click="add">添加</el-button> -->
        <!-- <el-button type="primary" size="small" @click="exportTable">本地导出表格</el-button> -->
        <el-upload
          action="/"
          :auto-upload="false"
          :on-change="elInFile"
          ref="upload"
          class="upload-demo"
          accept=".xlsx, .xls"
          :show-file-list="false"
        >
          <el-button type="primary" size="small" slot="trigger" plain>选取文件</el-button>
          <i slot="tip" class="el-upload__tip el-icon-info">只能选取Excel</i>
        </el-upload>
        <el-date-picker
          v-model="importDate"
          type="daterange"
          range-separator="-"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div>
        <el-input
          v-show="searchParams.type === 'id' || searchParams.type === 'name'"
          placeholder="请输入参数"
          size="small"
          style="width: 140px"
          v-model="searchParams.title"
          clearable
        ></el-input>
        <el-date-picker
          v-show="searchParams.type === 'date'"
          v-model="searchParams.title"
          type="daterange"
          range-separator="-"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>

        <el-select
          @change="claerSearch"
          v-model="searchParams.type"
          style="width: 140px"
          placeholder="请选择类型"
          size="small"
        >
          <el-option label="员工编号" value="id"></el-option>
          <el-option label="部门编号" value="name"></el-option>
          <el-option label="日期" value="date"></el-option>
        </el-select>
        <el-button type="success" size="small" @click="search()">查询</el-button>
        <el-button type="warning" size="small" @click="clearSearchParams()">重置</el-button>
      </div>
    </ToolBar>
    <div>
      <!-- 
        员工编号  staffId
        员工姓名  staffName
        部门名    departName
        导入日期  
        病假天数  sickday
        事假      affairday
        迟到次数  lateday
        加班天数  overday
        补发      reissue
      -->
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column prop="rewardPunishId" label="导入项目编号"></el-table-column>
        <el-table-column prop="staffId" label="员工编号"></el-table-column>
        <el-table-column prop="staffName" label="员工姓名"></el-table-column>
        <el-table-column prop="departId" label="部门编号"></el-table-column>
        <el-table-column prop="departName" label="部门名"></el-table-column>
        <el-table-column prop="startTime" label="开始日期"></el-table-column>
        <el-table-column prop="endTime" label="结束日期"></el-table-column>
        <el-table-column prop="sickday" label="病假天数"></el-table-column>
        <el-table-column prop="affairday" label="事假"></el-table-column>
        <el-table-column prop="lateday" label="迟到次数"></el-table-column>
        <el-table-column prop="overday" label="加班天数"></el-table-column>
        <el-table-column prop="reissue" label="补发"></el-table-column>
        <!-- <el-table-column prop="overday" label="父部门">
          <template slot-scope="scope">
            <p v-if="scope.row.fatherDepartName != null">{{ scope.row.fatherDepartName }}</p>
            <p v-else>无</p>
          </template>
        </el-table-column>-->

        <!-- <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
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
import moment from "moment";
import { delDepartById } from "@/api/BasicManage/depart";
import {
  findDepartment,
  findDepartmentByParams
} from "@/api/BasicManage/depart";
import {
  importData,
  getTable,
  findItemsByParams
} from "@/api/salary/attenSalary";
import XLSX from "xlsx";
import { Notification, Loading } from "element-ui";
export default {
  data() {
    return {
      importDate: "",
      selectDate: "",
      showEditDialog: false,
      tableData: [],
      searchParams: {
        title: "",
        type: "name"
      },
      total: 0,
      pagesize: 10,
      editTitle: "编辑",
      page: {
        startPage: 1,
        pageSize: 10
      },
      form: {}
    };
  },
  methods: {
    claerSearch() {
      this.searchParams.title = "";
    },
    parseTime(d) {
      const newDate =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

      return newDate;
    },
    editSuccess() {
      this.getTable();
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
      let params = { departId: row.departId };
      delDepartById(params).then(r => {
        this.getTable();
      });
    },
    search() {
      findItemsByParams(this.searchParams, this.page)
        .then(r => {
          this.tableData = r.list;
          this.pagesize = r.pageSize;
          this.total = r.total;
        })
        .catch(e => {
          console.dir(e);
        });
    },
    getTableValue() {
      getTable(this.page)
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
      this.getTableValue();
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
      this.getTableValue();
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
    },
    elInFile(f, fs) {
      this.read(f.raw);
    },
    read(f) {
      if ("" === this.importDate) {
        Notification({
          title: "未选择导入日期",
          message: "请选择导入日期",
          type: "warning"
        });
        return;
      }
      let rd = new FileReader();
      rd.onload = e => {
        //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        let sheets = rd.read2JS();

        let importValue = [];
        //数据展示
        for (let len = sheets.Sheet1.length, i = 0; i < len; i++) {
          this.$set(importValue,i,{
            staffId:sheets.Sheet1[i].员工编号,
            staffName:sheets.Sheet1[i].姓名,
            departId:sheets.Sheet1[i].部门编号,
            departName:sheets.Sheet1[i].部门名,
            sickday:sheets.Sheet1[i].病假天数,
            affairday:sheets.Sheet1[i].事假天数,
            overday:sheets.Sheet1[i].加班天数,
            lateday:sheets.Sheet1[i].迟到天数,
            reissue:sheets.Sheet1[i].补发,
            startTime:this.parseTime(this.importDate[0]),
            endTime:this.parseTime(this.importDate[1]),
          })
          console.log('1');
          // (importValue[i].staffId = sheets.Sheet1[i].员工编号),
          //   (importValue[i].staffName = sheets.Sheet1[i].姓名),
          //   (importValue[i].departName = sheets.Sheet1[i].部门名),
          //   (importValue[i].sickday = sheets.Sheet1[i].病假天数),
          //   (importValue[i].affairday = sheets.Sheet1[i].事假天数),
          //   (importValue[i].overday = sheets.Sheet1[i].加班天数),
          //   (importValue[i].lateday = sheets.Sheet1[i].迟到天数),
          //   (importValue[i].reissue = sheets.Sheet1[i].补发),
          //   (importValue[i].startTime = this.parseTime(this.importDate[0]));
          // importValue[i].endTime = this.parseTime(this.importDate[1]);
        }

        importData(importValue)
          .then(r => {
            this.getTableValue(); //重新获取数据
          })
          .catch(e => {});

        console.log(this.tableData);
        // for (let name in sheets)
        //   console.log(name + " 工作表数据：", sheets[name]);
        // ["formulae", "html", "txt", "csv", "dif", "slk", "eth"].forEach(
        //   item => {
        //     console.info("\r\n解析为：" + item);
        //     let sheets = rd.read2(item);
        //     for (let name in sheets)
        //       console.log(name + " 工作表数据：", sheets[name]);
        //   }
        // );
      };
      rd.readAsBinaryString(f);
    }
  },
  created() {
    this.getTableValue();
  },
  beforeCreate() {
    /**
     * 读取Excel文件，转为{@link Object}对象（自定义函数）
     * @return {@link Object}：workbook，整个文档对象；
     */
    FileReader.prototype.read2workbook = function() {
      let redABS = false; //是否将文件读取为二进制字符串
      let bytes = new Uint8Array(this.result); //无符号整型数组
      if (redABS) {
        // let fix = new TextDecoder(encode || 'UTF-8').decode(bytes);
        let fix = fixdata(bytes);
        let b2a = btoa(fix); //js原生方法：将字符转为base64编码。对应的atob(base64)方法，将base64转字符
        var wb = XLSX.read(b2a, {
          type: "base64"
        });
      } else {
        let len = bytes.byteLength;
        let binarys = new Array(len); //创建定长数组，存储文本
        for (let i = 0; i < len; i++)
          binarys[i] = String.fromCharCode(bytes[i]);
        let binary = binarys.join("");
        var wb = XLSX.read(binary, {
          type: "binary"
        });
      }
      return wb; //workbook
    };
    /**
     * 解析为...格式
     */
    FileReader.prototype.read2 = function(format = "json") {
      let wb = this.read2workbook();
      if (!wb) return null;

      let r = {};
      let formats = [
        "json",
        "formulae",
        "html",
        "txt",
        "csv",
        "dif",
        "slk",
        "eth"
      ]; //可被解析的格式
      format = formats.indexOf(format) == -1 ? "json" : format;
      wb.SheetNames.forEach(name => {
        //遍历每张纸数据
        r[name] = XLSX.utils["sheet_to_" + format](wb.Sheets[name]);
      });
      return r;
    };
    /**
     * 解析为JSON
     * @description: 此解析方式，XLSX将使用表格首行的每列名称，当作sheet数组对象的Key。
     * 故Excel每个工作表格的第一行必须有表头，且名称不可重复。
     */
    FileReader.prototype.read2JS = function() {
      return this.read2();
    };
    /* 重写readAsBinaryString函数 */
    FileReader.prototype.readAsBinaryString = function(f) {
      if (!this.onload)
        //如果this未重写onload函数，则创建一个公共处理方式
        this.onload = e => {
          //在this.onload函数中，完成公共处理
          let rs = this.read2workbook();
          console.log(rs);
        };
      this.readAsArrayBuffer(f); //内部会回调this.onload方法
    };

    function fixdata(data) {
      let w = 1024 << 10; //每次读取1M字节
      let len = Math.floor(data.byteLength / w);
      let o = new Array(len);
      for (var i = 0; i < len; i++)
        o[i] = String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(i * w, (i + 1) * w))
        );
      o[i] = String.fromCharCode.apply(null, new Uint8Array(data.slice(i * w)));
      return o.join("");
    }
  }
};
</script>
