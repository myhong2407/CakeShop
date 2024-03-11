<template>
<div class="bg-gradient-primary">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-4 rounded--1rem"  style="margin-top: 6rem !important;">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-flex">
                                <img src="../assets/assets/img/logo_login.jpg" alt="">
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Đăng ký tài khoản</h1>
                                    </div>
                
                                    <Form class="user" :validation-schema="validateFormSchema">
                                        <!-- <div class="my-2 mb-3 mb-sm-0">
                                            <input required name="customer_name" type="text" class="form-control form-control-user" id="exampleFirstName"
                                                placeholder="Tên tài khoản">
                                        </div> -->


                                        <div class="my-2 mb-3 mb-sm-0">
                                            <Field name="email" type="email" class="form-control form-control-user" v-model="this.userLocal.email" placeholder="Nhập Email" />
                                            <ErrorMessage name="email" class="mx-1 error-feedback" />
                                            <!-- <input required name="customer_email" type="email" class="form-control form-control-user" id="exampleInputEmail"
                                                placeholder="Email"> -->
                                        </div>
                                        <div class="my-2 mb-3 mb-sm-0">
                                            <Field name="password" type="password" class="form-control form-control-user" v-model="this.userLocal.password" placeholder="Nhập password" />
                                            <ErrorMessage name="password" class="mx-1 error-feedback" />

                                            <!-- <input required name="customer_password" type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Mật khẩu"> -->
                                        </div>
                                        <div class="my-2 mb-3 mb-sm-0">
                                            <Field name="cpassword" type="password" class="form-control form-control-user" placeholder="Nhập lại password" />
                                            <ErrorMessage name="cpassword" class="mx-1 error-feedback" />

                                            <!-- <input required name="customer_password" type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Mật khẩu"> -->
                                        </div>


                                        <button name="" type="button" class="btn btn-primary btn-user btn-block mt-3" @click="createUser(this.userLocal)">
                                            Đăng Ký
                                        </button>

                                    </Form>
                
                                    <hr>
                                    <div class="text-center">
                                        <a class="" href="">Quên mật khẩu</a>
                                    </div>
                                    <div class="text-center">
                                        <router-link :to="{name: 'login'}">
                                            <a class="" href="">Đã có tài khoản? Đăng nhập</a>
                                        </router-link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>                     
                    
            </div>
        </div>
    </div>
</div>

</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service";
export default {
    components: {
        UserService,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const validateFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("Vui lòng nhập email.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .min(6, "Mật khẩu có ít nhất 6 ký tự.")
                .required("Vui lòng nhập password."),
            cpassword: yup
                .string()
                .required("Vui lòng nhập lại mật khẩu.")
                .oneOf([yup.ref('password'), null], "Mật khẩu không trùng khớp."),
        });
        return {
            userLocal: {
                email: "",
                password: "",
            },
            validateFormSchema,
            result: {},
        };
    },
    methods: {
        async createUser(data) {
            try {
                console.log(data);
                await UserService.create(data);
                this.message = "User account được Tao thành công.";
                console.log(this.message);
                this.$router.push({
                    name: "login",
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>

<style>
.error-feedback{
    color: red;
}

.bg-image-vertical {
    position: relative;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: right center;
    background-size: auto 100%;
}

@media (min-width: 1025px) {
    .h-custom-2 {
        height: 100%;
    }
}
</style>