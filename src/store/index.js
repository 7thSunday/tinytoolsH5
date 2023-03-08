import { defineStore } from "pinia";

export const mainStore = defineStore('main', {
    state: () => {
        return {
            stayFlag: false
        }
    },
    getters: {
        getStayFlag: state => state.stayFlag
    },
    actions: {
        setStayFlag(val) {
            this.stayFlag = val;
        }
    }
})