<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema">
        <div class="form-group">
            <label for="username">Tài khoản</label>
            <Field name="username" type="text" class="form-control" v-model="loginLocal.username" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="loginLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                Đăng nhập
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form, Field, ErrorMessage
    },
    emits: ["submit:login"],
    props: {
        login: { type: Object, required: true }
    },
    data() {
        const loginFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Vui lòng nhập tên tài khoản"),
            password: yup
                .string()
                .required("Vui lòng nhập mật khẩu"),
        });
        return {
            loginLocal: this.login,
            loginFormSchema
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:login", this.loginLocal);
        },
    },
}
</script>

<style scoped>
@import "@/assets/form.css";
</style>