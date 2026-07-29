export const validators = {
    // 1. Name: Chuỗi không rỗng, tối thiểu/tối đa độ dài
    name: (val, min = 2, max = 50) => {
        if (!val || !val.trim()) return "Tên không được để trống";
        if (val.trim().length < min) return `Tên phải có ít nhất ${min} ký tự`;
        if (val.trim().length > max) return `Tên không vượt quá ${max} ký tự`;
        return "";
    },

    // 2. Phone Number: Chuẩn số điện thoại Việt Nam (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09)
    phone: (val) => {
        if (!val) return "Số điện thoại không được để trống";
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(val.trim())) return "Số điện thoại không hợp lệ";
        return "";
    },

    // 3. Email: Đúng định dạng
    email: (val) => {
        if (!val) return "Email không được để trống";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return "Email không đúng định dạng";
        return "";
    },

    // 4. Password: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số
    password: (val) => {
        if (!val) return "Mật khẩu không được để trống";
        if (val.length < 8) return "Mật khẩu phải từ 8 ký tự trở lên";
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        if (!strongRegex.test(val)) return "Mật khẩu phải gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số";
        return "";
    },

    // 5. Confirm / New Password: Phải trùng khớp với Mật khẩu cũ
    confirmPassword: (val, originalPassword) => {
        if (!val) return "Vui lòng nhập lại mật khẩu";
        if (val !== originalPassword) return "Mật khẩu không trùng khớp";
        return "";
    },

    // 6. Date Greater Than (Ngày chọn phải LỚN HƠN hoặc BẰNG ngày mốc)
    // targetDate: YYYY-MM-DD hoặc Date object
    dateGt: (val, targetDate, label = "ngày quy định") => {
        if (!val) return "Vui lòng chọn ngày";
        const inputDate = new Date(val);
        const target = new Date(targetDate);
        if (isNaN(inputDate.getTime())) return "Ngày không hợp lệ";
        if (inputDate < target) return `Ngày phải sau hoặc là ${label}`;
        return "";
    },

    // 7. Date Less Than (Ngày chọn phải NHỎ HƠN ngày mốc - vd: Tối thiểu 18 tuổi)
    dateLt: (val, targetDate, label = "ngày quy định") => {
        if (!val) return "Vui lòng chọn ngày";
        const inputDate = new Date(val);
        const target = new Date(targetDate);
        if (isNaN(inputDate.getTime())) return "Ngày không hợp lệ";
        if (inputDate > target) return `Ngày phải trước hoặc là ${label}`;
        return "";
    },

    // 8. Select Option: Bắt buộc chọn một giá trị (không phải giá trị rỗng/mặc định)
    select: (val) => {
        if (!val || val === "" || val === "default") return "Vui lòng chọn một tùy chọn";
        return "";
    },

    // 9. Checkbox: Bắt buộc tích chọn (Ví dụ: Đồng ý điều khoản)
    checkbox: (checked) => {
        if (!checked) return "Bạn phải đồng ý với điều khoản";
        return "";
    }
};