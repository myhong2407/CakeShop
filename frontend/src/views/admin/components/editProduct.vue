<template>
    <div class="d-flex justify-content-center">
        <h3> Cập nhật sản phẩm</h3>
    </div>
    <div class="container">
        <form class="p-5 module boxed-child">
            <div class="row">
                <div class="col-25">
                    <label for="fname">Tên sản phẩm</label>
                </div>
                <div class="col-75">
                    <input type="text" id="fname" name="firstname" v-model="this.product.prod_name" placeholder="Your name..">
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="fname">Danh mục</label>
                </div>
                <div class="col-75">
                    <input type="text" id="fname" name="firstname" v-model="this.product.prod_category" placeholder="Your name..">
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                <label for="fname">Hình ảnh</label>
                </div>
                <div class="col-75">
                <input type="file" id="fname" name="firstname" @change="onChangeFile"  placeholder="Your name..">
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                <label for="fname">Giá</label>
                </div>
                <div class="col-75">
                <input type="text" id="fname" name="firstname" v-model="this.product.prod_price"  placeholder="Your name..">
                </div>
            </div>
            <div class="row">
            <div class="col-25">
                <label for="lname">Số lượng</label>
            </div>
            <div class="col-75">
                <input type="text" id="lname" name="lastname" v-model="this.product.prod_quantity"  placeholder="Your last name..">
            </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="subject">Description</label>
                </div>
                <div class="col-75">
                    <textarea id="subject" name="subject" placeholder="Write something.." v-model="this.product.prod_desc"  style="height:88px"></textarea>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-25">
              
                </div>
                <div class="col-75 d-flex justify-content-start">
                    <input type="submit" value="Submit" @click="updateProduct(this.product._id,this.product)">
                </div>
            </div>

        </form>
      </div>
</template>
<script>
import ProductService from "@/services/product.service";
export default {
    components: {
        ProductService
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: {},
            message: "",
        };
    },
    methods: {
        onChangeFile(e) {
            const selectedFile = e.target.files[0];
            this.product.file = selectedFile;
        },
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
            } catch (error) {
                console.log(error);
               
            }
        },
        async updateProduct(id,data) {
            try {
                const formData = new FormData();
                formData.append('file',data.file);
                formData.append('prod_img',data.file.name);
                formData.append('prod_desc',data.prod_desc);
                formData.append('prod_price',data.prod_price);
                formData.append('prod_quantity',data.prod_quantity);
                formData.append('prod_name',data.prod_name);
                formData.append('prod_category',data.prod_category);
                await ProductService.update(id, formData);
                this.$router.push({
                    name: "admin.product",
                });
                this.message = "cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
};
</script>
<style >

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #ffffff;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row::after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}

.boxed {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right bottom, rgb(212, 22, 22), #0aa9d1);
    padding: 8px;
    border-radius: 10px;
}

.boxed-child {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: inherit;
    padding: 50px;
}
</style>