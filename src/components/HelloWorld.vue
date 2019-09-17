<template>
  <div>
    <el-container>
      <el-header>
        <el-input type="text" v-model="search" name id placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData" border align="center" style="width: 100%">
          <el-table-column prop="songname" label="歌名" align="center"></el-table-column>
          <el-table-column prop="singer" label="歌手" align="center"></el-table-column>
          <el-table-column prop="size320" label="时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <a :href="scope.row.songurl" target="_bank" download="bgm.mp3">下载</a>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          :current-page="5"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="curren"
        ></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { service, search } from "./../axios";
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      search: "",
      searchData: [],
      total: 0,
      tableData: [],
      page: ""
    };
  },
  created() {
    // this.fff();
    // this.btn();
  },
  methods: {
    fff() {
      service
        .get(
          `/netease/search?type=song&keyword=A%20Thousand%20Years&format=1&pageSize=10&page=${this.page}`
          // "/tencent/songList/hot?categoryId=10000000&sortId=5&pageSize=10&page=1"
        )
        .then(res => {
          console.log(res.data);

          this.tableData = res.data.data;
          this.total = this.tableData.length;
          for (let x in this.tableData) {
            this.tableData[x].time = this.formatSeconds(this.tableData[x].time);
          }
        });
    },
    handleSearch: function() {
      if (!this.search) {
        return;
      }
      const url = `/tencent/search?keyword=${this.search}&type=song&pageSize=10&page=0`;
      service.get(url).then(res => {
        this.tableData = res.data.data.list||[]
      });
    },
    curren(val) {
      console.log(val);
      this.page = val;
      this.fff();
    },
    formatSeconds(value) {
      var secondTime = parseInt(value); // 秒
      var minuteTime = 0; // 分
      var hourTime = 0; // 小时
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      var result = "" + parseInt(secondTime) + "秒";
      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
      }
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 30%;
}
</style>
