<template>
    <div>
          <el-table
            :data="listData"
            border
            style="width: 100%">
            <el-table-column
                prop="createdTime"
                label="创建时间"
                width="120">
            </el-table-column>
            <el-table-column
                prop="result"
                label="审核状态"
                width="120">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="age"
                label="年龄"
                width="120">
            </el-table-column>
            <el-table-column
                prop="gender"
                label="性别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="stuNo"
                label="学号"
                width="180">
            </el-table-column>
            <el-table-column
                label="学生证图片"
                width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.stuNoUrl)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="idCard"
                label="身份证"
                width="220">
            </el-table-column>
            <el-table-column
                label="身份证图片"
                width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.idCardUrl)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>

                <el-table-column
                    label="操作"
                   >
                    <template slot-scope="scope">
                        <el-button type="success" @click="pass(scope.row.requestId)" size="small">通过审核</el-button>
                        <el-button type="warning"  @click="unpass(scope.row.requestId)" size="small" >不通过</el-button>
                    </template>
                </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {list,pass,unpass} from '@/api/certify'
import {formatTime} from '@/utils/index'
export default {
    data(){
        return {
            listData:[]
        }
    },
    created(){
        this.loadData()
    },
    methods:{
        loadData(){
            list().then( res => {
                console.log(res)

                this.listData = res.data.list
                for(var i=0;i<this.listData.length;i++){
                    var d = new Date(this.listData[i].createdTime)
                    this.listData[i].createdTime = formatTime(d)
                }
            })

        },
        handleClick(url){
            var imgHtml = `<img src=${url} height="300px" width="300px"  />`
            this.$alert(imgHtml, '查看', {
                dangerouslyUseHTMLString: true
            });
        },
        pass(rid){
            pass(rid).then( res => {
                console.log(res)
                this.loadData()
            })
        },
        unpass(rid){
                this.$prompt('请输入审核不通过原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    }).then(({ value }) => {
                        console.log(value)
                        unpass(rid,value).then( res => {
                            console.log(res)
                            this.loadData()

                        })
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
        }
    }
}
</script>