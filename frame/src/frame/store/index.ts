// @ts-ignore
import { createStore } from 'vuex'
// @ts-ignore
import {ref} from "vue";

const mutations = {
  addMenu (state:any,menu:any):void {
      state.activeKey=menu.key;
      let isExist = false;
      for (const index in state.panes) {
          if (state.panes[index].key === menu.key) {
              isExist = true;
          }
      }
      if (!isExist) {
          state.panes.push(menu)
      }
  },

  institutionName(state:any,institutionName:string):void {
    state.institutionName = institutionName;
  },

  removeTab(state:any,targetKey:any) {
      state.panes.forEach((p, i) => {
          if (p.key === targetKey) {
              state.panes.splice(i, 1)
          }
      });
      if (state.panes.length>0) {
          state.activeKey = state.panes[state.panes.length - 1].key;
      }
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
            activeKey:"",
            institutionName:"",
        }
    }
})
export default store
