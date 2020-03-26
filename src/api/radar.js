
import http from '@/unilts/http';
import { Message } from "element-ui";

const Radar = {
    //
    getRadarInforList: function(searchData) {
        //
        let data = {
            title: searchData.title,
            token: searchData.token
        }; 
        const url = "/api/v2/sc/admin/radars";
        return http.post(url, data)
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
        const url = "/api/v2/sc/admin/radar/" + id;
        return http.get(url);
    },
    //
    updateRadar: function(data) {
       //
       const url = "/api/v2/sc/admin/radar";
       return http.put(url, data)
    },
    //
    releaseRadar: function(id) {
        let $this = window.vue;
        //
        const url = "/api/v2/sc/admin/radar/publish/" + id;
        http.post(url).then(res => {
            console.log("releaseRadar:", res);
            if(res) {
                if(res.code === 0) {
                    Message({
                        message: res.msg,
                        type: "success",
                        offset: window.innerHeight / 2
                    })
                    console.log(889);
                    console.log(res.data);
                    $this.$store.dispatch("radar/setOpenRadar", res.data);
                }
            }
        })
    },
    radarDropDown: function() {
        //
        const url = "/api/v2/sc/admin/radars/prepare";
        http.get(url).then(res => {
            console.log("radarDropDown:", res);
        })
    },
    consStock:function(block) {
        //
        let data = {
            blockId: block.blockId || "",
            gnId: block.gnId || "",
            industryId: block.industryId || "",
            pageIndex: block.pageIndex,
            pageSize: block.pageSize,
            radarId: block.radarId || "",
            sensLevel: block.sensLevel || "",
            title: block.title || "",
        };
        const url = "/api/v2/sc/admin/radar/stocks/query";
        http.post(url, data).then(res => {
            console.log("consStock:", res);
        })
    }
}

export default Radar;