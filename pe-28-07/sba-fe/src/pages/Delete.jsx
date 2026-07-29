import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios/axiosClient.js";

const Delete = () => {
    const navigate = useNavigate();
    const [res, setRes] = useState(null);
    const {id} = useParams();

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axiosClient.get(`/restaurants/${id}`);
                setRes(res.data);
            } catch (error) {
                console.log(error);
                setErrorMsg("Không thể tải thông tin nhà hàng!");
            }
        }
        fetch();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.delete(`/restaurants/${id}`);

            if (response.status === 204 || response.status === 200) {
                setSuccessMsg("Xóa nhà hàng thành công! Đang chuyển hướng...");

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        } catch (e) {
            console.error(e);
            const serverError = e.response?.data?.message || "Xóa thất bại! Vui lòng thử lại sau.";
            setErrorMsg(serverError);
            setIsSubmitting(false);
        }
    }

    if (!res) {
        return (
            <Container className="mt-5" style={{maxWidth: "650px"}}>
                <p className="text-muted">Loading slot details...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{maxWidth: "650px"}}>
            <Card className="border-0 shadow-sm p-3" style={{borderRadius: "20px"}}>
                <Card.Body className="p-2">
                    <div className="text-dark fw-bold fs-4 border-bottom pb-3 mb-4">
                        Delete slot
                    </div>

                    {/* 2. Hiển thị thông báo Thành công nếu có */}
                    {successMsg && (
                        <Alert variant="success" className="border-0 rounded-3 mb-4 py-2.5 px-3 fs-6">
                            {successMsg}
                        </Alert>
                    )}

                    {/* 3. Hiển thị thông báo Báo lỗi nếu có */}
                    {errorMsg && (
                        <Alert variant="danger" className="border-0 rounded-3 mb-4 py-2.5 px-3 fs-6">
                            {errorMsg}
                        </Alert>
                    )}



                    <Form onSubmit={handleSubmit}>

                        <Alert variant="danger" className="border-0 rounded-3 mb-4 py-2.5 px-3 fs-6">
                            Are you sure you want to delete this restaunrant "{res.restaurantName}"?
                        </Alert>


                        {/*<Row className="border-bottom py-2.5 align-items-center fs-6">*/}
                        {/*    <Col xs={5} className="text-secondary fw-medium">Slot name</Col>*/}
                        {/*    <Col xs={7} className="text-dark fw-medium">{res.restaurantName}</Col>*/}
                        {/*</Row>*/}
                        {/*<Row className="py-2.5 align-items-center fs-6 mb-4">*/}
                        {/*    <Col xs={5} className="text-secondary fw-medium">Station</Col>*/}
                        {/*    <Col xs={7} className="text-dark fw-medium">{slot.station?.location || "N/A"}</Col>*/}
                        {/*</Row>*/}

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button
                                variant="secondary"
                                className="px-4 py-2 border-0 fw-medium"
                                style={{backgroundColor: "#5c677d", borderRadius: "8px"}}
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </Button>
                            <Button
                                variant="danger"
                                type="submit"
                                className="px-4 py-2 border-0 fw-medium"
                                style={{ borderRadius: "8px" }}
                                disabled={isSubmitting || !res}
                            >
                                {isSubmitting ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
export default Delete