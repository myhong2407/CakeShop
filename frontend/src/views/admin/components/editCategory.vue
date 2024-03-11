<template>
    <div>
      <div class="d-flex justify-content-center">
        <h3>Cập nhật danh mục</h3>
      </div>
      <div class="container">
        <form class="p-5 module boxed-child">
          <div class="row">
            <div class="col-25">
              <label for="fname">Tên danh mục</label>
            </div>
            <div class="col-75">
              <input type="text" id="fname" name="firstname" v-model="category.cate_name" placeholder="Tên danh mục...">
            </div>
          </div>
  
          <div class="row">
            <div class="col-25">
              <label for="subject">Mô tả</label>
            </div>
            <div class="col-75">
              <textarea id="subject" name="subject" placeholder="Mô tả..." v-model="category.cate_desc" style="height: 88px"></textarea>
            </div>
          </div>
  
          <div class="col-75 d-flex justify-content-start" >
            <input type="submit" value="Cập nhật" @click="updateCategory(category._id, category)">
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  // Import your CategoryService or ProductService here
  import CategoryService from "@/services/category.service";
  
  export default {
    props: {
      id: { type: String, required: true },
    },
    data() {
      return {
        category: {
          cate_name: '',
          cate_desc: '',
        },
      };
    },
    async created() {
      // Fetch category details when the component is created
      await this.fetchCategoryDetails();
    },
    methods: {
      async fetchCategoryDetails() {
        const categoryId = this.$route.params.id;
        try {
          // Fetch category details using the ID
          this.category = await CategoryService.getById(categoryId);
        } catch (error) {
          console.error(error);
        }
      },
      async updateCategory(id, data) {
        try {
          const formData = new FormData();
          formData.append('cate_desc', data.cate_desc);
          formData.append('cate_name', data.cate_name);
          await CategoryService.update(id, formData);
          this.$router.push({ name: "admin.category.list" });
          this.message = "Cập nhật thành công.";
        } catch (error) {
          console.log(error);
        }
      },
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