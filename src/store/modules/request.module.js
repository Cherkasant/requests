import axios from '../../axios/request'
import store from "@/store";

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        },
        updateRequest(state, updatedRequest) {
            const index = state.requests.findIndex(r => r.id === updatedRequest.id)
            if (index !== -1) {
                state.requests.splice(index, 1, updatedRequest)
            }
        },
        removeRequest(state, id) {
            state.requests = state.requests.filter(r => r.id !== id)
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const token = store.getters["auth/token"]
                const {data} = await axios.post(`/requests.json?auth=${token}`, payload)
                commit('addRequest', {...payload, id: data.name})
                dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadRequests({commit, dispatch}) {
            try {
                const token = store.getters["auth/token"]
                const {data} = await axios.get(`/requests.json?auth=${token}`)
                const requests = data ? Object.keys(data).map(id => ({...data[id], id})) : []
                commit('setRequests', requests)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadSingleRequest({dispatch}, id) {
            try {
                const token = store.getters["auth/token"]
                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)
                return data
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async remove({commit, dispatch}, id) {
            try {
                const token = store.getters["auth/token"]
                await axios.delete(`/requests/${id}.json?auth=${token}`)
                commit('removeRequest', id)
                dispatch('setMessage', {
                    value: 'Заявка удалена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async update({commit, dispatch}, request) {
            try {
                const token = store.getters["auth/token"]
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
                commit('updateRequest', request)
                dispatch('setMessage', {
                    value: 'Заявка обновлена',
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
        requests(state) {
            return state.requests
        }
    }
}