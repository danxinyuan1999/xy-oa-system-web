<template>
  <div class="app-container">
    <el-card class="filter-container">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="userTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">{{ scope.row.nickName }}</template>
        </el-table-column>
        <el-table-column label="所属部门" align="center">
          <template slot-scope="scope">{{ scope.row.departId | formatDepart }}</template>
        </el-table-column>
        <el-table-column label="电子邮箱" align="center">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column label="密码" align="center">
          <template slot-scope="scope">{{ scope.row.password }}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{ scope.row.note }}</template>
        </el-table-column>
        <el-table-column label="账号状态" align="center">
          <template slot-scope="scope">{{ scope.row.status }}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleStatus(scope.$index, scope.row)"
            >分配角色
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15,20]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { fetchList } from '@/api/user'
import { fetchDepartList } from '@/api/depart'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}

const defaultDepart = {
  id: 0,
  description: null,
  name: null,
  note: null,
  parentId: 0
}

let defaultDepartmentList = []

export default {
  name: 'userList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: false,
      list: null,
      total: null,
      departmentInfo: []
    }
  },
  created() {
    this.getList()
    this.getDepartmentList()
  },
  filters: {
    formatDepart(departId) {
      for (let i = 0; i < defaultDepartmentList.length; i++) {
        if (defaultDepartmentList[i].id === departId) {
          return defaultDepartmentList[i].name
        }
      }
    }
  },
  methods: {
    handleSearchList() {

    },
    handleResetSearch() {

    },
    handleAdd() {

    },
    handleStatus() {

    },
    handleUpdate() {

    },
    handleDelete() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getDepartmentList() {
      fetchDepartList().then(response => {
        defaultDepartmentList = response.data
      })
    }
  }

}
</script>

<style scoped>

</style>
