
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
            if(res) {
                if(res.code === 0) {
                    $this.$store.dispatch("radar/setRadarList", res.data);
                }
            }
        })
    },
    //
    deleteRadar: function(row) {
        let $this = window.vue;
        //
        let data = {
            id: row.id
        };
        //
        let searchData = {
            title: "",
            token: $this.$store.state.app.rdxgStatusToken.token
        }
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
                    this.getRadarInforList(searchData);
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
        //
        const url = "/api/v2/sc/admin/radar";
        return http.post(url, data);
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
                    });
                }
            }
        })
    },
    radarDropDown: function() {
        //
        const url = "/api/v2/sc/admin/radars/prepare";
        return http.get(url);
    },
    radarLinkDropDown: function(id) {
        //
        const url = "/api/v2/sc/admin/radar/trees/" + id;
        return http.get(url);
    },
    lookUpCompBlock:function(block) {
        //
        let data = {
            blockId: block.blockId || null,
            gnId: block.gnId || "",
            industryId: block.industryId || "",
            pageIndex: block.pageIndex,
            pageSize: block.pageSize,
            radarId: block.radarId || null,
            sensLevel: block.sensLevel || null,
            title: block.title || "",
        };
        const url = "/api/v2/sc/admin/radar/stocks/query";
        http.post(url, data).then(res => {
            console.log("lookUpCompBlock:", res);
        })
    },
    // deleteCompShares: function
}

export default Radar;