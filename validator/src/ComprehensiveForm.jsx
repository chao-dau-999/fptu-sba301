import  { useState } from "react";
import { validators } from "./validator.js";

export default function ComprehensiveForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        startDate: "",
        dob: "", // Date of birth
        gender: "",
        agreeTerms: false,
    });

    const [errors, setErrors] = useState({});

    // Ngày mốc để test: Ví dụ Ngày bắt đầu làm việc phải từ hôm nay trở đi
    const today = new Date().toISOString().split("T")[0];

    // Hàm validate toàn bộ Form
    const validateForm = () => {
        const newErrors = {};

        newErrors.name = validators.name(formData.name);
        newErrors.phone = validators.phone(formData.phone);
        newErrors.email = validators.email(formData.email);
        newErrors.password = validators.password(formData.password);
        newErrors.confirmPassword = validators.confirmPassword(formData.confirmPassword, formData.password);

        // Ngày bắt đầu phải lớn hơn hoặc bằng ngày hôm nay
        newErrors.startDate = validators.dateGt(formData.startDate, today, "hôm nay");

        // Ngày sinh phải nhỏ hơn ngày hôm nay (sinh trong quá khứ)
        newErrors.dob = validators.dateLt(formData.dob, today, "hôm nay");

        newErrors.gender = validators.select(formData.gender);
        newErrors.agreeTerms = validators.checkbox(formData.agreeTerms);

        // Lọc bỏ các key không có lỗi (chuỗi rỗng)
        const filteredErrors = {};
        Object.keys(newErrors).forEach((key) => {
            if (newErrors[key]) filteredErrors[key] = newErrors[key];
        });

        return filteredErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: fieldValue }));

        // Clear lỗi ngay khi gõ
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            alert("Form hợp lệ! Dữ liệu đã gửi thành công.");
            console.log("Submit Data:", formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "450px", margin: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2>Đăng ký tài khoản</h2>

            {/* Name */}
            <div>
                <label>Họ và tên:</label>
                <input name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
            </div>

            {/* Phone */}
            <div>
                <label>Số điện thoại:</label>
                <input name="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
            </div>

            {/* Email */}
            <div>
                <label>Email:</label>
                <input name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
            </div>

            {/* Password */}
            <div>
                <label>Mật khẩu:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div>
                <label>Nhập lại mật khẩu:</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword}</span>}
            </div>

            {/* Date Greater Than (Ngày bắt đầu làm việc >= Hôm nay) */}
            <div>
                <label>Ngày bắt đầu làm việc (≥ Hôm nay):</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                {errors.startDate && <span style={{ color: "red" }}>{errors.startDate}</span>}
            </div>

            {/* Date Less Than (Ngày sinh < Hôm nay) */}
            <div>
                <label>Ngày sinh (&lt; Hôm nay):</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                {errors.dob && <span style={{ color: "red" }}>{errors.dob}</span>}
            </div>

            {/* Select */}
            <div>
                <label>Giới tính:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">-- Chọn giới tính --</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                </select>
                {errors.gender && <span style={{ color: "red" }}>{errors.gender}</span>}
            </div>

            {/* Checkbox */}
            <div>
                <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                    Tôi đồng ý với điều khoản sử dụng
                </label>
                {errors.agreeTerms && <span style={{ color: "red" }}>{errors.agreeTerms}</span>}
            </div>

            <button type="submit">Gửi thông tin</button>
        </form>
    );
}