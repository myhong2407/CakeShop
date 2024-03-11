
<template>
<div class="bg-gradient-primary">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-4 rounded--1rem" style="margin-top: 7rem !important;" >
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-flex">
                                <img src="../assets/assets/img/logo_login.jpg" alt="">
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Đăng nhập</h1>
                                    </div>
                
                                     <!-- Start to Login  -->
                                    <Form class="user" id="form-signin" :validation-schema="loginFormSchema" >
                
                                        <div class="form-group mt-3">
                                            <Field class="form-control form-control-user" type="email" id='name' name='email' v-model="this.user.email" placeholder="Nhập tên đăng nhập" />
                                            <ErrorMessage name="email" class="error-feedback" />
                                            
                                            <!-- <input name="account_email" type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Nhập email" required> -->
                                        </div>
                                        <div class="form-group">
                                            <Field class="form-control form-control-user" name='password' type="password" id='password' v-model="this.user.password" placeholder="Nhập mật khẩu" />
                                            <ErrorMessage name="password" class="error-feedback" />

                                            <!-- <input name="account_password" type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Mật khẩu" required> -->
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck" checked>
                                                <label class="custom-control-label" for="customCheck">Ghi nhớ tôi</label>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-primary btn-user btn-block" @click="login(this.user)">
                                            Đăng nhập
                                        </button>

                                    </Form>
                
                                    <hr>
                                    <div class="text-center">
                                        <a class="" href="">Quên mật khẩu</a>
                                    </div>
                                    <div class="text-center">
                                        <router-link :to="{name: 'register'}">
                                            <a class="" href="">Tạo tài khoản</a>
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


<!-- <hr> -->
<!-- <div class='signin-wrapper'>
    <div class='form__signin'>
        <Form class='form__signin--content' id="form-signin" :validation-schema="loginFormSchema">
            <div class='d-flex flex-column ms-5'>

                <div class='signin-type d-flex flex-row'>
                    <label for='email'>Mail</label>
                    <div class='d-flex flex-column'>
                        <Field type="email" id='name' name='email' v-model="this.user.email" placeholder="Nhập tên đăng nhập" />
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                </div>

                <div class='signin-type d-flex flex-row'>
                    <label for="password">Mật khẩu</label>
                    <div class='d-flex flex-column'>
                        <Field name='password' type="password" id='password' v-model="this.user.password" placeholder="Nhập mật khẩu" />
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>
                </div>
                <div class='bg-danger bg-opacity-10 fs-4 text-danger text-center mb-4 py-3' v-if="this.result.error == true">
                    <p class=''> {{this.message}} </p>
                </div>

                <div class='signin-type mx-auto'>
                    <button class='btn btn-primary' type="button" @click="login2(this.user)">
                        Đăng Nhập
                    </button>

                </div>
            </div>
            
            <p>Don't have an account? 
                      
                <router-link
                  :to="{
                      name: 'register',
                  }"
                  >
                  <a href="#!" class="link-info">Register here</a>
                  </router-link>
              </p>
        </Form>
    </div>
</div> -->
</template>

<script>
import { useAccountStore} from "@/stores/AccountStore";
import * as yup from "yup";
// import { Form, Field, ErrorMessage } from "vee-validate";
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "@/services/user.service";


export default {
    components: {
        AccountService,
        Form,
        Field,
        ErrorMessage,
    },

    data() {
        const accountStore = useAccountStore();
        const loginFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("Vui lòng nhập tên tài khoản"),
            password: yup.string().required("Vui lòng nhập mật khẩu")
        });
        return {
            user: {
                email: "",
                password: "",
                role: ""
            },
            message: "",
            accountStore,
            result: {},
            loginFormSchema,
        }
    },
    // mounted() {
    //     // Kiểm tra xem có dữ liệu trong localStorage hay không
    //     const userData = localStorage.getItem("user");
    //     if (userData) {
    //         // Nếu có thì đưa dữ liệu vào store
    //         this.accountStore.user = JSON.parse(userData);
    //     }
    // },

    methods: {
        async login(data) {
            try {
              // console.log(data);
                this.result = await AccountService.login(data);
                this.message = this.result.message;

                this.accountStore.user = this.result
                // console.log(this.accountStore.user);
                // localStorage.user = this.accountStore.user;
                // Lưu dữ liệu vào localStorage
                localStorage.setItem("user", JSON.stringify(this.result));

                
                console.log(this.accountStore.user )
                if (this.result.error == true || this.result.error == undefined ) {
                    this.message = "login fail.";
                    // alert("gggggg");
                }
                if (this.result) {
                //   console.log(this.result.role)
                  if(this.result.role == 'user') {
                    // console.log(this.result.role)
                    this.$router.push({
                      name: "user.home",
                    });
                  } 
                  if(this.result.role == 'admin') {
                    
                    this.$router.push({
                      name: "admin.product",
                    });
                  }
                } else {
                    this.message = "login fail.";
                }
            } catch (error) {
              console.log(error);
            }
          }
    }

}
</script>


<style scoped>
.signin-wrapper {
    margin-bottom: 100px;
}

.signin--content {
    margin-top: 40px;
}

.signin--content p {
    font-size: 1.5rem;
}

.form__signin {
    margin: 50px auto 0px;
    width: 580px;

}

.signin-type {
    margin-bottom: 20px;
}

.signin-type input {
    border: 1px solid rgb(209, 209, 209);
    font-size: 1.5rem;
    padding: 10px;
    height: 50px;
    width: 350px;
}

.signin-type input:focus {
    border: 3px solid #d9e6ff;
}

.signin-type label {
    width: 150px;
    margin-right: 10px;
    margin-top: 10px;
}

.button-submit {
    color: white;
    padding: 4px 10px;
    border: none;
    font-size: 1em;
}

.button-submit:hover {
    opacity: 0.5;
}

.error-feedback {
    color: red;
    font-size: 1.2rem;
    margin-left: 5px;
    ;
}
</style>
