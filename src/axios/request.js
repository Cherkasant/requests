import axios from 'axios'
import router from '../router'

const requestAxios = axios.create({
    baseURL: 'https://formvue-5a42b-default-rtdb.firebaseio.com/',
    timeout: 10000
})

requestAxios.interceptors.response.use(null, error => {
    const status = error?.response?.status
    if (status === 401) {
        router.push('/auth?message=auth')
    }
    return Promise.reject(error)
})


export default requestAxios