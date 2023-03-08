// @ts-ignore
import { createStore } from 'vuex'
// @ts-ignore
import {ref} from "vue";

const mutations = {
    addMenu (state:any,menu:any) {
        state.activeKey=menu.key;
        state.panes.push(menu)
    }
}
const actions = {}

const store = createStore({
    actions,
    mutations,
    state(){
        return {
            // panes : [{ title: "Tab1", content: "Content of Tab Pane 1", key: 1 },{ title: "Tab2", content: "Content of Tab Pane 2", key: 2 }]
            panes:[],
            activeKey:"1",
        }
    }
})
export default store