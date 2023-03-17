import { defineStore } from "pinia";

export const mainStore = defineStore('main', {
    state: () => {
        return {
            operationFlag: false
        }
    },
    getters: {
        getOperationFlag: state => state.operationFlag
    },
    actions: {
        setOperationFlag(val) {
            this.operationFlag = val;
        }
    }
})