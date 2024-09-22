import {useField, useForm} from "vee-validate";
import * as yup from "yup";

export function useCommentForm(fn) {
    const {isSubmitting, handleSubmit} = useForm()
    const {
        value: message,
        errorMessage: messageError,
        handleBlur: messageBlur
    } = useField('message', yup.string().trim().required("Введите Сообщение"))
    const onSubmit = handleSubmit(fn)


    return {
        isSubmitting,
        message,
        onSubmit,
        messageError,
        messageBlur
    }
}