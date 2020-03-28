<template>
    <div class="el-compage">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        background
        :total="1000">
        </el-pagination>
    </div>
</template>

<script>
import Radar from "../../api/radar";
export default {
    name: "RadarComSharePage",
    computed: {
        pageSize: {
            get() {
                return this.$store.state.radar.pageSize;
            }
        },
        currentPage: {
            get() {
                return this.$store.state.radar.currentPage;
            },
            set(val) {
                this.$store.state.radar.currentPage = val;
            }
        }
    },
    methods: {
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let block = {
                pageIndex: val,
                pageSize: this.pageSize,
            }
            Radar.lookUpCompBlock(block)
        }
    }
}
</script>

<style scoped lang="less">
.el-compage {
    margin: 30px 0;
}
</style>