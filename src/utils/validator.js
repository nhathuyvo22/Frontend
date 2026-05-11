export const validateRegister = ({
    username,
    fullname,
    email,
    pass,
    confirm_password,
}) => {
    const errors = {};
    if (!username) {
        errors.username = "Vui lòng nhập tên đăng nhập";
    }
    if (!fullname) {
        errors.fullname = "Vui lòng nhập họ ten";
    }
    if (!email) {
        errors.email = "Vui lòng nhập email";
    }
    if (!pass) {
        errors.pass = "Vui lòng nhập mật khẩu";
    } else if (pass.length < 6) {
        errors.pass = "Mật khẩu phải >= 6 ký tự";
    }
    if (!confirm_password) {
        errors.confirm_password = "Vui lòng nhập lại mật khẩu";
    } else if (pass !== confirm_password) {
        errors.confirm_password = "Mật khẩu không khớp";
    }
    return errors;
}
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const validateLogin = ({
    username,
    pass
}) => {
    const errors = {};
    if (!username) {
        errors.username = "Vui lòng nhập tên đăng nhập";
    }
    if (!pass) {
        errors.pass = "Vui lòng nhập mật khẩu";
    }
    return errors;
}

export const validateProduct = (data, imageFile) => {
    let errors = {};

    // 1. Tên sản phẩm
    if (!data.product_name || data.product_name.trim() === "") {
        errors.product_name = "Vui lòng nhập tên sản phẩm";
    }

    // 2. Alias
    if (!data.alias || data.alias.trim() === "") {
        errors.alias = "Vui lòng nhập alias";
    }

    // 3. Giá gốc
    if (!data.price || Number(data.price) <= 0) {
        errors.price = "Giá gốc phải lớn hơn 0";
    }

    // 4. Giá khuyến mãi
    if (data.sale_price && Number(data.sale_price) >= Number(data.price)) {
        errors.sale_price = "Giá khuyến mãi phải nhỏ hơn giá gốc";
    }

    // 5. Hình ảnh
    if (!data.image && !imageFile) {
        errors.image = "Vui lòng chọn ảnh";
    }

    // 6. Ngày ra mắt (Để giống cái ảnh bạn gửi)
    if (!data.launch_date) {
        errors.launch_date = "Vui lòng nhập ngày ra mắt";
    }

    // 7. Tag
    if (!data.tag || data.tag.trim() === "") {
        errors.tag = "Vui lòng nhập tag";
    }

    return errors;
};