import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axiosClient from "../axios/axiosClient.js";
import {Button, Card, Col, Container, Row} from "react-bootstrap";


const Details = () => {
    const { id } = useParams();
    const [res, setRes] = useState(null);
    const navigate = useNavigate(); // Dùng để quay lại trang trước


    useEffect(() => {
        const fetchSlot = async () => {
            try {
                const res = await axiosClient.get(`/restaurants/${id}`);
                setRes(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSlot();
    }, [id]);

    if (!res) {
        return (
            <Container className="mt-4" style={{ maxWidth: "600px" }}>
                <p>Loading details...</p>
            </Container>
        );
    }


    return (
        <Container className="mt-5" style={{ maxWidth: "650px" }}>
            <Card className="border-0 shadow-sm p-3" style={{ borderRadius: "20px" }}>
                <Card.Body className="p-2">
                    {/* Tiêu đề chính */}
                    <div className="text-dark fw-bold fs-4 border-bottom pb-3 mb-4">
                        Slot details
                    </div>


                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Restaurant name</Col>
                        <Col xs={7} className="text-dark fw-medium">{res.restaurantName}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Owner</Col>
                        <Col xs={7} className="text-dark fw-medium">{res.ownerName}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Category</Col>
                        <Col xs={7} className="text-dark fw-medium">{res.categoryName}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Price range(đ)</Col>
                        <Col xs={7} className="text-dark fw-medium">{res.priceFrom} - {res.priceTo}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Address</Col>
                        <Col xs={7} className="text-dark fw-medium">{res.address}</Col>
                    </Row>
                    <Row className="border-bottom py-2 align-items-center fs-6">
                        <Col xs={5} className="text-secondary fw-medium">Open date</Col>
                        <Col xs={7} className="text-dark fw-medium">{res.openDate}</Col>
                    </Row>

                    {/* Nút Back ở góc dưới cùng bên phải */}
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="secondary"
                            className="px-4 py-2 border-0 fw-medium"
                            style={{ backgroundColor: "#5c677d", borderRadius: "8px" }}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};
export default Details;