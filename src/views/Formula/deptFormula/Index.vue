<template>
  <div>
    <!-- <ToolBar>
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
    </ToolBar> -->
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
        <!-- <el-table-column>
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
        </el-table-column> -->
      </el-table>
    </div>

    <!-- <Edit
      :forms="form"
      :title="editTitle"
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      @editSuccess="editSuccess"
    /> -->
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