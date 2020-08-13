<template>
  <div>
    <el-card style="border-radius: 0">
      <div slot="header">
        <span>概况</span>
      </div>
      <div class="demo">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content ">
              <div style="background: #673AB7">
                <i class="el-icon-location-outline index-icon"></i>
                <span>员工数：{{ num.staff }}</span>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="6">
            <div class="grid-content ">
              <div style="padding: 10px;background: #3c8dbc">
                <i class="el-icon-picture index-icon"></i>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dignissimos earum enim fugiat illum iusto minus modi nam natus
                nisi sequi!
              </div>
            </div>
          </el-col> -->
          <el-col :span="8">
            <div class="grid-content ">
              <div style="background: #009688">
                <i class="el-icon-service index-icon"></i>
                <span>部门数：{{ num.depart }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ">
              <div style="background: #607D8B">
                <i class="el-icon-bell index-icon"></i>
                <span>岗位数：{{ num.position }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br />
    <el-card style="border-radius: 0">
      <div slot="header">
        <span>图表展示</span>
      </div>

      <el-row>
        <el-col :span="24">
          <div id="main" style="width: 100%;height: 400px;"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { getNum, getLateDay } from "@/api/home/home";
export default {
  data() {
    return {
      num: {
        staff: "20",
        depart: "10",
        position: "10",
      },
      departLateDay: {
        departName: "",
        lateDay: "",
      },
      // echart
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["迟到人数"],
        },
        xAxis: {
          type: "category",
          data: [],
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "天数",
          min: 0,
          max: 10,
          interval: 50,
          axisLabel: {
            formatter: "{value} 天",
          },
        },
        // {
        //   type: "value",
        //   name: "温度",
        //   min: 0,
        //   max: 25,
        //   interval: 5,
        //   axisLabel: {
        //     formatter: "{value} °C",
        //   },
        // },
        series: {
          name: "迟到人数",
          type: "bar",
          data: [],
        },
        // {
        //   name: "降水量",
        //   type: "bar",
        //   data: [
        //     2.6,
        //     5.9,
        //     9.0,
        //     26.4,
        //     28.7,
        //     70.7,
        //     175.6,
        //     182.2,
        //     48.7,
        //     18.8,
        //     6.0,
        //     2.3,
        //   ],
        // },
      },
    };
  },
  methods: {
    // open() {
    //   this.$alert("这是一段内容", "标题名称", {
    //     confirmButtonText: "确定",
    //     callback: () => {
    //       this.$message({
    //         message: "恭喜你，这是一条成功消息",
    //         type: "success",
    //       });
    //     },
    //   });
    // },
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption(this.option, true);
    },
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie("main");
    });
  },
  created() {
    getNum()
      .then((r) => {
        this.num.staff = r[0].staff;
        this.num.depart = r[0].depart;
        this.num.position = r[0].position;
        // console.log(r[0].staff);
      })
      .catch((e) => {
        console.dir(e);
      });
    getLateDay()
      .then((r) => {
        console.log(r);
        let max = 0;
        for (let index = 0; index < r.length; index++) {
          this.option.xAxis.data.push(r[index].depart_name);
        }
        for (let index = 0; index < r.length; index++) {
          this.option.series.data.push(r[index].lateDay);
          if (r[index].lateDay > max) {
            max = r[index].lateDay;
          }
        }
        this.option.yAxis.max = max*2;
        console.log(this.option.series.data);
        this.$nextTick(function() {
          this.drawPie("main");
        });
      })
      .catch((e) => {
        console.dir(e);
      });
  },
};
</script>
<style lang="scss">
.demo {
  margin: 10px;
  .grid-content {
    vertical-align: middle;
    border-radius: 4px;
    overflow: hidden;
    color: #fff;
    background: #d3dce6;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 25px;
    .index-icon {
      font-size: 25px;
      color: #fff;
    }
  }
}
</style>
