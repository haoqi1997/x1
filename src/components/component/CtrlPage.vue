<template>
  <el-pagination
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
    :current-page="pageIndex"
    :page-sizes="pageSizes"
    :page-size="rows"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    prev-text="上一页"
    next-text="下一页"
  />
</template>
<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => {
        return [5, 10, 20, 50, 100]
      }
    },
    rows: {
      type: Number,
      default: 10
    },
    setPage: {
      type: Function
    } //回调，函数参数pageIndex,row和设置结果的回调函数，置结果的回调函数的参数是对象属性Records和RecordCount
  },
  watch: {
    rows() {
      this.currentRows = this.rows
    }
  },
  data() {
    return {
      currentRows: this.rows,
      pageIndex: 1,
      total: 0
    }
  },
  methods: {
    onSizeChange(rows) {
      this.currentRows = rows
      this.getList(1)
    },
    onCurrentChange(pageIndex) {
      this.getList(pageIndex)
    },
    setResultCallback(records, recordCount) {
      if (records.length == 0 && this.pageIndex > 1) {
        this.getList(this.pageIndex - 1)
      } else {
        this.total = recordCount
      }
    },
    getList(pageIndex) {
      if (this.setPage) {
        this.pageIndex = pageIndex
        this.setPage(pageIndex, this.currentRows, this.setResultCallback)
      }
    },
    refresh() {
      this.getList(this.pageIndex)
    }
  }
}
</script>
