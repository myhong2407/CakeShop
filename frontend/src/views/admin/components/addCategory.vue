<template>
    <!-- <form class="inputs" enctype="multipart/form-data"> -->
    <Form class="user" :validation-schema="validateFormSchema">
    
        <div class="form-group">
            <label for="cate_name">Tên danh mục</label>
            <Field name="cate_name" type="text" class="form-control" v-model="this.formCategory.cate_name" />
        </div>
        <div class="form-group">
            <label for="cate_desc">Mô tả</label>
            <Field name="cate_desc" type="text" class="form-control" style="height: 80px;" v-model="this.formCategory.cate_desc" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary mr-4" type="submit" @click="addCate(this.formCategory)">
                Thêm
            </button>
            <!-- Modal footer -->
            <!-- <div class=""> -->
            <button type="button" class="btn btn-danger" >Đóng</button>
              <!-- </div> -->
        </div>
    </Form>
    
    <!-- </form> -->
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import CategoryService from "@/services/category.service";

export default {
    components: {
        CategoryService,
        Form,
        Field,
        // ErrorMessage,
    },
    // emits: ["add:category"],
    data() {
        const validateFormSchema = yup.object().shape({
            cate_name: yup
                .string(),
            cate_desc: yup
                .string(),
            });
        return {
            formCategory: {
                cate_name: "",
                cate_desc: "",
            },

            validateFormSchema,
            result: {},
        };
    },
    methods: {
        async addCate(data) {
           
            console.log("-----------------------------------")
            try {
                console.log(data);
                await CategoryService.create(data);
                this.message = "User account được Tao thành công.";
                console.log(this.message);
                // this.$router.push({
                //     name: "admin.category",
                // });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
 .inputs {
    margin-top: 25px;
}

 .inputs label {
    color: #8f8f8f;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 1px;
    margin-bottom: 7px;
    display: block;
}

input::-webkit-input-placeholder {
    color:    #b5b5b5;
}

input:-moz-placeholder {
    color:    #b5b5b5;
}

 .inputs input[type=email], input[type=password] {
    background: #f5f5f5;
    font-size: 0.8rem;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    padding: 13px 10px;
    width: 330px;
    margin-bottom: 20px;
    box-shadow: inset 0px 2px 3px rgba( 0,0,0,0.1 );
    clear: both;
}

 .inputs input[type=email]:focus, input[type=password]:focus {
    background: #fff;
    box-shadow: 0px 0px 0px 3px #fff38e, inset 0px 2px 3px rgba( 0,0,0,0.2 ), 0px 5px 5px rgba( 0,0,0,0.15 );
    outline: none;   
}

 .inputs .checkboxy {
    display: block;
    position: static;
    height: 25px;
    margin-top: 10px;
    clear: both;
}

 .inputs input[type=checkbox] {
    float: left;
    margin-right: 10px;
    margin-top: 3px;
}

 .inputs label.terms {
    float: left;
    font-size: 14px;
    font-style: italic;
}

 .inputs #submit {
    width: 100%;
    margin-top: 20px;
    padding: 15px 0;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    text-decoration: none;
        background: -moz-linear-gradient(
        top,
        #b9c5dd 0%,
        #a4b0cb);
    background: -webkit-gradient(
        linear, left top, left bottom, 
        from(#b9c5dd),
        to(#a4b0cb));
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid #737b8d;
    -moz-box-shadow:
        0px 5px 5px rgba(000,000,000,0.1),
        inset 0px 1px 0px rgba(255,255,255,0.5);
    -webkit-box-shadow:
        0px 5px 5px rgba(000,000,000,0.1),
        inset 0px 1px 0px rgba(255,255,255,0.5);
    box-shadow:
        0px 5px 5px rgba(000,000,000,0.1),
        inset 0px 1px 0px rgba(255,255,255,0.5);
    text-shadow:
        0px 1px 3px rgba(000,000,000,0.3),
        0px 0px 0px rgba(255,255,255,0);
    display: table;
    position: static;
    clear: both;
}

 .inputs #submit:hover {
    background: -moz-linear-gradient(
        top,
        #a4b0cb 0%,
        #b9c5dd);
    background: -webkit-gradient(
        linear, left top, left bottom, 
        from(#a4b0cb),
        to(#b9c5dd));
}
</style>