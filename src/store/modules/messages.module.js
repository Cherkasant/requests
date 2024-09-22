import store from "@/store";
import axios from "@/axios/request";

export default {
    namespaced: true,
    state() {
        return {
            comments: []
        }
    },
    mutations: {
        setComments(state, comments) {
            state.comments = comments
        },
        addComment(state, comment) {
            state.comments.push(comment)
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const token = store.getters["auth/token"]
                const {data} = await axios.post(`/comments.json?auth=${token}`, payload)
                console.log(data)
                commit('addComment', {...payload, id: data.name})
                dispatch('setMessage', {
                    value: 'Сообщение успешно создано',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadComments({commit, dispatch}) {
            try {
                const token = store.getters["auth/token"]
                const {data} = await axios.get(`/comments.json?auth=${token}`)
                const comments = Object.keys(data).map(id => ({...data[id], id}))
                commit('setComments', comments)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadSingleComment({dispatch}, id) {
            try {
                const token = store.getters["auth/token"]
                const {data} = await axios.get(`/comments/${id}.json?auth=${token}`)
                return data
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async remove({dispatch}, id) {
            try {
                const token = store.getters["auth/token"]
                await axios.delete(`/comments/${id}.json?auth=${token}`)
                dispatch('setMessage', {
                    value: 'Сообщение удалено',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    }, getters: {
        comments(state) {
            return state.comments
        }
    }
}