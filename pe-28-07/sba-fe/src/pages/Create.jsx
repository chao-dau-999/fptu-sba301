import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import axiosClient from "../axios/axiosClient.js";

const Create = () => {
    const [formData, setFormData] = useState({
        restaurantName: '',
        priceFrom: '',
        priceTo: '',
        ownerName: '',
        openDate: '',
        address: '',
        categoryId: ''
    });
    const [cates, setCates] = useState([]);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const fetchSlot = async () => {
            try {
                const res = await axiosClient.get(`/categories`);
                setCates(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSlot();
    }, []);


    const validateForm = () => {
        const newErrors = {};


        // if (!formData.name || formData.name.trim().length < 3) {
        //     newErrors.name = "Tên món ăn phải có ít nhất 3 ký tự";
        // }
        if (!formData.priceFrom || formData.priceFrom < 1000 || formData.priceFrom > 1000000) {
            newErrors.priceFrom = "Giá từ phải nằm trong khoảng 1.000 - 1.000.000";
        }

        if (!formData.priceTo || formData.priceTo < 1000 || formData.priceTo > 1000000) {
            newErrors.priceTo = "Giá từ phải nằm trong khoảng 1.000 - 1.000.000";
        }
        if (formData.priceTo <= formData.priceFrom) {
            newErrors.priceTo = "Giá đến phải lớn hơn giá từ";
        }

        if (formData.openDate) {
            const selectedDate = new Date(formData.openDate);
            const today = new Date();
            today.setHours(23, 59, 59, 999);

            if (selectedDate > today) {
                newErrors.openDate = "Ngày mở cửa không được lớn hơn ngày hiện tại";
            }
        }


        return newErrors;
    };
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        const fieldValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({...prev, [name]: fieldValue}));

        if (errors[name]) {
            setErrors((prev) => ({...prev, [name]: ""}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const payload = {
                ...formData,
                priceFrom: Number(formData.priceFrom),
                priceTo: Number(formData.priceTo),
            };

            const res = await axiosClient.post('/restaurants', payload);

            if (res.status === 201 || res.status === 200) {
                setSuccessMsg("Tạo nhà hàng thành công!");

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Container>
            <h1>Add new Recipes</h1>

            {successMsg && (
                <Alert variant="success" className="mb-3">
                    {successMsg}
                </Alert>
            )}

            <Card>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Restaurant name</Form.Label>
                        <Form.Control required type="text" name={"restaurantName"} value={formData.restaurantName}
                                      onChange={handleChange}
                                      placeholder="e.g. restaurantName s"/>
                        {errors.restaurantName && <span style={{color: "red"}}>{errors.restaurantName}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price From</Form.Label>
                        <Form.Control required type="number" name={"priceFrom"} value={formData.priceFrom}
                                      onChange={handleChange}
                                      placeholder="e.g. 1 s"/>
                        {errors.priceFrom && <span style={{color: "red"}}>{errors.priceFrom}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price To</Form.Label>
                        <Form.Control required type="number" name={"priceTo"} value={formData.priceTo}
                                      onChange={handleChange}
                                      placeholder="e.g. 1 s"/>
                        {errors.priceTo && <span style={{color: "red"}}>{errors.priceTo}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control required type="text" name={"address"} value={formData.address}
                                      onChange={handleChange}/>
                        {errors.address && <span style={{color: "red"}}>{errors.address}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Owner</Form.Label>
                        <Form.Control required type="text" name={"ownerName"} value={formData.ownerName}
                                      onChange={handleChange}/>
                        {errors.ownerName && <span style={{color: "red"}}>{errors.ownerName}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Category</Form.Label>
                        <Form.Select aria-label="Default select example" className="mb-3"
                                     name={"categoryId"} value={formData.categoryId} onChange={handleChange}
                                     required>
                            <option value={""}>-- Select meal type ---</option>
                            {cates?.map((m) => <option key={m.categoryId}
                                                       value={m.categoryId}>{m.categoryName}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Open Date</Form.Label>
                        <Form.Control required type="date" name={"openDate"} value={formData.openDate}
                                      onChange={handleChange}/>
                        {errors.openDate && <span style={{color: "red"}}>{errors.openDate}</span>}
                    </Form.Group>


                    <div className="d-flex justify-content-end mt-3 gap-2">
                        <Button
                            variant="outline-secondary"
                            type="button"
                            onClick={() => navigate("/")}
                            disabled={isSubmitting}
                        >
                            Back
                        </Button>
                        <Button variant="success" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </Form>
            </Card>


        </Container>
    )

}
export default Create;