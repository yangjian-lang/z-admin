import { defineStore } from 'pinia'
import type { layoutSettingStore } from './types/type' // 引入数据类型

const useLayoutSettingStore = defineStore('layoutSetting', {
    state: (): layoutSettingStore => {
        return {
            isFold: false, // 是否折叠左侧菜单
            refresh: false, // 刷新页面
        }
    },
    actions: {

    },
    getters: {

    }
})

export default useLayoutSettingStore