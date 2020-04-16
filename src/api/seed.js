import http from '@/unilts/http';

const Seed = {
    seedDropSelected: function() {
        let $this = window.vue;
        //
        const url = "/text/api?" + "group_id=0";
        http.get(url).then(res => {
            console.log("seedDropSelected:", res);
            if(res.code === 0) {
                $this.$store.commit("home/SET_DROP_SELECTED_ARR", res.data);
                let itemi = [];
                for(let i=0; i<res.data.length; i++) {
                    itemi = res.data[i].params;
                }
                $this.$store.commit("home/SET_PARAMS", itemi);
            }
        })
    },
    seedSelectedLeftResult: function(url, params) {
        let $this = window.vue;
        //
        http.post(url, params).then(res => {
            console.log("seedSelectedLeftResult:", res);
            if(res.code === 0) {
                for(let i=0; i<res.data.length; i++) {
                    let itemi = res.data[i];
                    console.log(itemi);
                }
                $this.$store.commit("home/SET_RESULT_LEFT_ARR", res.data);
            }
        })
    },
    seedSelectedRightResult: function(url, params) {
        let $this = window.vue;
        //
        http.post(url, params).then(res => {
            console.log("seedSelectedRightResult:", res);
            if(res.code === 0) {
                $this.$store.commit("home/SET_RESULT_RIGHT_ARR", res.data);
            }
        })
    }
}

export default Seed;