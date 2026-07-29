import {
    Button, Card, Col, Container, Form, Pagination, Table, ToggleButton, ToggleButtonGroup, Badge
} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../axios/axiosClient.js";
import {useNavigate} from "react-router-dom";

const IngedientList = () => {
    const [cates, setCates] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);
    const [selectedCate, setSelectedCate] = useState('');
    const [appliedFilters, setAppliedFilters] = useState({
        categoryId: "", search: ""
    });

    useEffect(() => {
        const fetchCates = async () => {
            try {
                const res = await axiosClient.get("/categories")
                setCates(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCates()
    }, []);

    useEffect(() => {
        const fetchRes = async () => {
            try {
                const params = {
                    page: page, size: size
                }

                if (appliedFilters.categoryId) {
                    params.categoryId = appliedFilters.categoryId;
                }

                if (appliedFilters.search) {
                    params.name = appliedFilters.search.toLowerCase();
                }

                const res = await axiosClient.get(`/restaurants`, {params});
                setRestaurants(res.data.content);
                setTotalPages(res.data.totalPages);
                setTotalElements(res.data.totalElements);
            } catch (e) {
                console.log(e);
            }
        }
        fetchRes()
    }, [appliedFilters.categoryId, appliedFilters.search, page, searchQuery, selectedCate, size]);

    const handleApplyFilter = (e) => {
        e?.preventDefault();
        setPage(0);
        setAppliedFilters({
            categoryId: selectedCate, search: searchQuery.trim()
        });
    };

    const handleResetFilter = () => {

        setSearchQuery("");
        setPage(0);
        // setAppliedFilters({
        //     mealTypeId: "",
        //     difficulty: "",
        //     search: ""
        // });
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (<div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4 px-2">
                <small className="text-muted fw-medium">
                    Showing {totalElements === 0 ? 0 : page * size + 1} to {Math.min((page + 1) * size, totalElements)} of {totalElements} recipes
                </small>
                <Pagination size="sm" className="mb-0">
                    <Pagination.First onClick={() => setPage(0)} disabled={page === 0}/>
                    <Pagination.Prev onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}/>

                    {/* Render danh sách các trang trực tiếp */}
                    {Array.from({length: totalPages}, (_, number) => (<Pagination.Item
                            key={number}
                            active={number === page}
                            onClick={() => setPage(number)}
                        >
                            {number + 1}
                        </Pagination.Item>))}

                    <Pagination.Next onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                                     disabled={page === totalPages - 1}/>
                    <Pagination.Last onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}/>
                </Pagination>
            </div>);
    };


    return (<Container className="my-5">
            <h2 className="text-dark fw-bold mb-4">Recipes</h2>

            {/* Thanh công cụ Bộ lọc & Tìm kiếm */}
            <Card className="border-0 shadow-sm p-3 mb-4" style={{borderRadius: "16px"}}>
                <Form onSubmit={handleApplyFilter}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <div className="d-flex flex-wrap align-items-center gap-3 flex-grow-1">
                            {/* Filter Meal Type */}
                            <Form.Select
                                className="py-2 text-secondary border-light-subtle"
                                style={{borderRadius: "8px", maxWidth: "200px"}}
                                onChange={(e) => setSelectedCate(e.target.value)}
                                value={selectedCate}
                            >
                                <option value="">All Categorys Types</option>
                                {cates?.map((s) => (<option key={s.categoryId} value={s.categoryId}>
                                        {s.categoryName}
                                    </option>))}
                            </Form.Select>


                            {/* Filter Search Query */}
                            <Form.Control
                                type="text"
                                className="py-2 border-light-subtle"
                                style={{borderRadius: "8px", maxWidth: "250px"}}
                                placeholder="Search by res name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            {/* Buttons Action */}
                            <Button type="submit" variant="primary" className="px-4 py-2 rounded-3">
                                Filter
                            </Button>
                            <Button
                                type="button"
                                variant="outline-secondary"
                                className="px-3 py-2 rounded-3"
                                onClick={handleResetFilter}
                            >
                                Reset
                            </Button>

                            <Button
                                variant="success"
                                className="px-4 py-2 border-0 fw-medium"
                                style={{borderRadius: "8px", backgroundColor: "#059669"}}
                                onClick={() => navigate("/new")}
                            >
                                + Add
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card>

            <Card className="border-0 shadow-sm overflow-hidden mb-4" style={{borderRadius: "16px"}}>
                <Table responsive hover className="align-middle mb-0 text-nowrap">
                    <thead className="table-light text-secondary">
                    <tr>
                        <th className="py-3 px-4 text-uppercase tracking-wider fs-7" style={{fontSize: "12px"}}>#</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{fontSize: "12px"}}>Restaurant
                            Name
                        </th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{fontSize: "12px"}}>Category</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{fontSize: "12px"}}>Owner</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{fontSize: "12px"}}>Address</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{fontSize: "12px"}}>Price range
                        </th>
                        <th className="py-3 px-4 text-end text-uppercase tracking-wider fs-7"
                            style={{fontSize: "12px"}}>Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {restaurants && restaurants.length > 0 ? (restaurants.map((rep) => (
                            <tr key={rep.restaurantId} className="border-bottom border-light-subtle">
                                <td className="py-3 px-4 text-secondary">{rep.restaurantId}</td>
                                <td className="text-secondary">{rep.restaurantName || "N/A"}</td>
                                <td className="text-dark">{rep.categoryName}</td>
                                <td className="text-dark">{rep.ownerName}</td>
                                <td className="text-dark">{rep.address}</td>
                                <td className="text-dark">{rep.priceFrom} - {rep.priceTo}</td>
                                <td className="py-3 px-4 text-end">
                                    <Button
                                        variant="light"
                                        size="sm"
                                        className="text-danger fw-medium px-3 py-1"
                                        style={{borderRadius: "6px"}}
                                        onClick={() => navigate(`/delete/${rep.restaurantId}`)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="text-white fw-medium px-3 py-1"
                                        style={{borderRadius: "6px"}}
                                        onClick={() => navigate(`/details/${rep.restaurantId}`)}
                                    >
                                        Edick
                                    </Button>
                                </td>
                            </tr>))) : (<tr>
                            <td colSpan="9" className="text-center py-5 text-muted">
                                No records found.
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </Card>

            {renderPagination()}

        </Container>)
}

export default IngedientList;