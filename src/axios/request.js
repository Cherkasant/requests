import axios from 'axios'
import router from '../router'

const requestAxios = axios.create({
    baseURL: 'https://formvue-5a42b-default-rtdb.firebaseio.com/'
})

requestAxios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        router.push('/auth?message=auth')
    }
    return Promise.reject(error)
})


export default requestAxios