<template>
<!-- breadcrumb-section -->
<div class="breadcrumb-section breadcrumb-bg">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 text-center">
                <div class="breadcrumb-text">
                    <h1>Liên hệ với chúng tôi</h1>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end breadcrumb section -->

<div class="map">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-4 col-md-7">
                <div class="map__inner">
                    <h6>CAKE SHOP</h6>
                    <ul>
                        <li>Ninh Kiều, Cần Thơ</li>
                        <li>cakeshop@support.com</li>
                        <li>+84 099 099 999</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="map__iframe">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.41873446353!2d105.7143903756058!3d10.035320458233944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883fbc944b83%3A0x77fc34233e5e1320!2zTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700397462012!5m2!1svi!2s" width="600" height="450" style="border:0;"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</div>

<!-- contact form -->
<div class="contact-from-section mt-100 mb-150">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mb-5 mb-lg-0">
                <div class="form-title">
                    <p> Cảm ơn bạn đã ghé website. Nếu bạn muốn nhận thêm thông tin và cần trao đổi, hãy điền vào from dưới đây!!</p>
                </div>
                <div id="form_status"></div>
                <div class="contact-form">
                    <form type="POST" id="fruitkha-contact">
                        <p>
                            <input type="text" placeholder="Nhập tên" name="name" id="name">
                            <input type="email" class="mx-1" placeholder="Email" name="email" id="email">
                        </p>
                        <p>
                            <input type="tel" placeholder="Số điện thoại" name="phone" id="phone">
                            <input type="text" class="mx-1" placeholder="Chủ đề" name="subject" id="subject">
                        </p>
                        <p><textarea name="message" id="message" cols="30" rows="10" placeholder="Nội dung..."></textarea></p>
                        <input type="hidden" name="token" value="FsWga4&@f6aw" />
                        <p><input type="submit" value="Gửi"></p>
                    </form>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="contact-form-wrap">
                    <div class="contact-form-box">
                        <h4><i class="fas fa-map"></i> Địa chỉ</h4>
                        <p>Ninh Kiều, Cần Thơ <br></p>
                    </div>
                    <div class="contact-form-box">
                        <h4><i class="far fa-clock"></i> Mở cửa:</h4>
                        <p>Thời gian: 8 AM to 9 PM </p>
                    </div>
                    <div class="contact-form-box">
                        <h4><i class="fas fa-address-book"></i>Liên hệ: </h4>
                        <p>SĐT: +84 099 099 999 <br> Email: banhkem@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end contact form -->    



</template>