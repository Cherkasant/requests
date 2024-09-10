import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()

    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {
        value: email,
        errorMessage: emailError,
        handleBlur: emailBlur
    } = useField('email', yup.string().trim().required("Enter a valid email!").email('Need to enter correct email'))
    const {
        value: password,
        errorMessage: passwordError,
        handleBlur: passwordBlur
    } = useField('password', yup.string().trim().min(6, 'Need minimal 6 symbols').required("Please enter a password!"))

    const isTooManyAttempts = computed(() => {
        return submitCount.value >= 3
    })

    watch(isTooManyAttempts, val => {
        if (val) {
            setTimeout(() => submitCount.value = 0, 1500)
        }
    })


    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch (e) {
            console.log(e)
        }


    })
    return {
        email, password, emailError, passwordError, emailBlur, passwordBlur, onSubmit, isSubmitting, isTooManyAttempts
    }
}