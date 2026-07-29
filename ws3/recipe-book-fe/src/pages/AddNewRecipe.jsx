import {Button, Card, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../axios/axiosClient.js";
import {useNavigate} from "react-router-dom";
import {validators} from "../validator.js";

const AddNewRecipes = () => {
    const [mealTypes, setMealTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        prepTime: '',
        cookTime: '',
        difficulty: '',
        servings: '',
        mealTypeId: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchMealTypes = async () => {
            try {
                const resMealTypes = await axiosClient.get('/v1/meal-types');
                setMealTypes(resMealTypes.data || resMealTypes.content);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMealTypes()
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.trim().length < 3) {
            newErrors.name = "Tên món ăn phải có ít nhất 3 ký tự";
        }

        if (!formData.mealTypeId) {
            newErrors.mealTypeId = "Vui lòng chọn loại bữa ăn";
        }

        if (!formData.prepTime || isNaN(formData.prepTime) || Number(formData.prepTime) <= 0) {
            newErrors.prepTime = "Thời gian chuẩn bị phải là số dương";
        }

        if (!formData.cookTime || isNaN(formData.cookTime) || Number(formData.cookTime) <= 0) {
            newErrors.cookTime = "Thời gian nấu phải là số dương";
        }

        if (!formData.difficulty) {
            newErrors.difficulty = "Vui lòng chọn độ khó";
        }

        if (!formData.servings || isNaN(formData.servings) || Number(formData.servings) <= 0) {
            newErrors.servings = "Số khẩu phần ăn phải là số dương";
        }

        return newErrors;
    };

    const navigate = useNavigate();

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
                prepTime: Number(formData.prepTime),
                cookTime: Number(formData.cookTime),
                servings: Number(formData.servings)
            };

            const res = await axiosClient.post('/v1/recipes', payload);

            if (res.status == 201) {
                navigate("/");
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
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Recipe name</Form.Label>
                        <Form.Control required type="text" name={"name"} value={formData.name} onChange={handleChange}
                                      placeholder="e.g. grilled s"/>
                        {errors.name && <span style={{color: "red"}}>{errors.name}</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Meal Type</Form.Label>
                        <Form.Select aria-label="Default select example" className="mb-3"
                                     name={"mealTypeId"} value={formData.mealTypeId} onChange={handleChange}
                                     required>
                            <option value={""}>-- Select meal type ---</option>
                            {mealTypes?.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <div className={"d-flex gap-5"}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" required>
                            <Form.Label>Prep time</Form.Label>
                            <Form.Control required type="text" name={"prepTime"} value={formData.prepTime}
                                          onChange={handleChange} placeholder={"e.g. 150"}/>
                            {errors.prepTime && <span style={{color: "red"}}>{errors.prepTime}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" required>
                            <Form.Label>Cooking time - mins</Form.Label>
                            <Form.Control required type="text" name={"cookTime"} value={formData.cookTime}
                                          onChange={handleChange} placeholder={"e.g. 150"}/>
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Difficulty</Form.Label>
                        <Form.Select aria-label="Default select example" className="mb-3"
                                     name={"difficulty"} value={formData.difficulty} onChange={handleChange} required>
                            <option value={""}>-- Select difficulty ---</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="difficulty">Difficulty</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" required>
                        <Form.Label>Servings</Form.Label>
                        <Form.Control required type="text" name={"servings"} value={formData.servings}
                                      onChange={handleChange} placeholder={"e.g. 4"}/>
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
export default AddNewRecipes