
import http from '@/unilts/http';
import { Message } from "element-ui";

const Radar = {
    //
    getRadarInforList: function(searchData) {
        let $this = window.vue;
        //
        let data = {
            title: searchData.title,
            token: searchData.token
        };
        const url = "/api/v2/sc/admin/radars";
        http.post(url, data).then(res => {
            console.log("getRadarInforList:", res);
            if(res) {
                if(res.code === 0) {
                    $this.$store.commit("radar/SET_RADAR_TOTAL", res.total);
                    $this.$store.dispatch("radar/setRadarList", res.data);
                }
            }
        }) 
    },
    //
    deleteRadar: function(row) {
        //
        let data = {
            id: row.id
        };
        const url = "/api/v2/sc/admin/radar";
        http.delete(url, {data: data}).then(res => {
            console.log("deleteRadar:", res);
            if(res) {
                if(res.code === 0) {
                    Message({
                        type: 'success',
                        message: '删除成功!',
                        offset: window.innerHeight / 2
                    });
                }
            } 
        }) 
    },
    //
    buildRadar: function(radar) {
        //
        let data = {
            blockTitles: radar.blockTitles || [],
            sensitivityFlag: radar.sensitivityFlag,
            seqIndex: radar.seqIndex,
            statusId: radar.statusId,
            title: radar.title,
        };
        const url = "/api/v2/sc/admin/radar";
        http.post(url, data).then(res => {
            console.log("buildRadar:", res);
            if(res) {
                if(res.code === 0) {
                    Message({
                        message: res.msg,
                        type: "success",
                        offset: window.innerHeight / 2
                    });
                }
            }
        })
    },
    //
    eidtRadar: function(id) {
        //
        const url = "/api/v2/sc/admin/radar";
        http.get(url, id).then(res => {
            console.log("eidtRadar:", res);
            if(res) {
                if(res.code === 0) {
                    console.log(888);
                }
            }
        })
    }
}

export default Radar;