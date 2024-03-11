<template>
    <Form @submit="submitRegister" :validation-schema="userFormSchema">
        
        <div class="form-group">
            <label for="username">Tên tài khoản</label>
            <Field name="username" type="text" class="form-control" v-model="userLocal.username" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group row">
            <div class="col-6">
                <label for="password">Mật khẩu</label>
                <Field name="password" type="password" class="form-control" v-model="userLocal.password"
                    placeholder="Password" />
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="col-6">
                <label for="repassword">Nhập lại mật khẩu</label>
                <Field name="repassword" type="password" class="form-control" rules="confirmed:@password"
                    placeholder="Re-Password" />
                <ErrorMessage name="repassword" class="error-feedback" />
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-success" type="submit">Đăng ký</button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form, Field, ErrorMessage,
    },
    emits: ["submit:user"],
    props: {
        user: { type: Object, required: true },
    },
    data() {
        const userFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Vui lòng nhập tên tài khoản"),
            password: yup
                .string()
                .required("Vui lòng nhập mật khẩu"),
            repassword: yup
                .string()
                .required("Mật khẩu xác nhận không được để trống.")
                .oneOf([yup.ref('password'), null], "Mật khẩu xác nhận không trùng khớp."),
        });
        return {
            userLocal: this.user,
            userFormSchema,
        };
    },
    methods: {
        submitRegister() {
            this.$emit("submit:user", this.userLocal);
        },
    },
}
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>