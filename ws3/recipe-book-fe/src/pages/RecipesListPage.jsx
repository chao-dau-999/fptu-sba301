import { Button, Card, Col, Container, Form, Pagination, Table, ToggleButton, ToggleButtonGroup, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import axiosClient from "../axios/axiosClient.js";
import { useNavigate } from "react-router-dom";

const RecipesListPage = () => {
    const [mealTypes, setMealTypes] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [selectedMealType, setSelectedMealType] = useState('');
    const navigate = useNavigate();

    const [appliedFilters, setAppliedFilters] = useState({
        mealTypeId: "",
        difficulty: "",
        search: ""
    });

    useEffect(() => {
        const fetchMealTypes = async () => {
            try {
                const resMealTypes = await axiosClient.get("/v1/meal-types");
                setMealTypes(resMealTypes.data || resMealTypes.content || []);
            } catch (error) {
                console.error("Failed to fetch meal types:", error);
            }
        };
        fetchMealTypes();
    }, []);

    useEffect(() => {
        const fetchRecipesData = async () => {
            try {
                const params = { page, size };

                if (appliedFilters.mealTypeId) params.mealTypeId = appliedFilters.mealTypeId;
                if (appliedFilters.difficulty) params.difficulty = appliedFilters.difficulty;
                if (appliedFilters.search) params.search = appliedFilters.search;

                const resRecipes = await axiosClient.get("/v1/recipes", { params });

                setRecipes(resRecipes.data?.content || resRecipes.content || []);
                setTotalPages(resRecipes.data?.totalPages || resRecipes.totalPages || 0);
                setTotalElements(resRecipes.data?.totalElements || resRecipes.totalElements || 0);
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
            }
        };

        fetchRecipesData();
    }, [page, size, appliedFilters]);

    const handleApplyFilter = (e) => {
        e?.preventDefault();
        setPage(0);
        setAppliedFilters({
            mealTypeId: selectedMealType,
            difficulty: difficulty,
            search: searchQuery.trim()
        });
    };

    const handleResetFilter = () => {
        setSelectedMealType("");
        setDifficulty("");
        setSearchQuery("");
        setPage(0);
        setAppliedFilters({
            mealTypeId: "",
            difficulty: "",
            search: ""
        });
    };

    const renderPaginationItems = () => {
        let items = [];
        for (let number = 0; number < totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={() => setPage(number)}
                >
                    {number + 1}
                </Pagination.Item>
            );
        }
        return items;
    };



    return (
        <Container className="my-5">
            {/* Tiêu đề chính */}
            <h2 className="text-dark fw-bold mb-4">Recipes</h2>

            {/* Thanh công cụ Bộ lọc & Tìm kiếm */}
            <Card className="border-0 shadow-sm p-3 mb-4" style={{ borderRadius: "16px" }}>
                <Form onSubmit={handleApplyFilter}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <div className="d-flex flex-wrap align-items-center gap-3 flex-grow-1">
                            {/* Filter Meal Type */}
                            <Form.Select
                                className="py-2 text-secondary border-light-subtle"
                                style={{ borderRadius: "8px", maxWidth: "200px" }}
                                onChange={(e) => setSelectedMealType(e.target.value)}
                                value={selectedMealType}
                            >
                                <option value="">All Meal Types</option>
                                {mealTypes?.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </Form.Select>

                            {/* Filter Difficulty */}
                            <ToggleButtonGroup
                                type="radio"
                                name="difficultyOptions"
                                className="bg-light p-1 border rounded-3"
                                style={{ gap: "4px" }}
                                value={difficulty}
                                onChange={(val) => setDifficulty(val)}
                            >
                                <ToggleButton
                                    id="tbg-btn-all"
                                    value=""
                                    variant="link"
                                    className={`text-decoration-none px-3 py-1.5 fw-medium text-capitalize rounded-2 border-0 ${
                                        difficulty === "" ? "bg-white text-dark shadow-sm" : "text-secondary"
                                    }`}
                                >
                                    All
                                </ToggleButton>
                                <ToggleButton
                                    id="tbg-btn-easy"
                                    value="easy"
                                    variant="link"
                                    className={`text-decoration-none px-3 py-1.5 fw-medium text-capitalize rounded-2 border-0 ${
                                        difficulty === "easy" ? "bg-white text-success shadow-sm" : "text-secondary"
                                    }`}
                                >
                                    Easy
                                </ToggleButton>
                                <ToggleButton
                                    id="tbg-btn-medium"
                                    value="medium"
                                    variant="link"
                                    className={`text-decoration-none px-3 py-1.5 fw-medium text-capitalize rounded-2 border-0 ${
                                        difficulty === "medium" ? "bg-white text-warning shadow-sm" : "text-secondary"
                                    }`}
                                >
                                    Medium
                                </ToggleButton>
                                <ToggleButton
                                    id="tbg-btn-hard"
                                    value="hard"
                                    variant="link"
                                    className={`text-decoration-none px-3 py-1.5 fw-medium text-capitalize rounded-2 border-0 ${
                                        difficulty === "hard" ? "bg-white text-danger shadow-sm" : "text-secondary"
                                    }`}
                                >
                                    Hard
                                </ToggleButton>
                            </ToggleButtonGroup>

                            {/* Filter Search Query */}
                            <Form.Control
                                type="text"
                                className="py-2 border-light-subtle"
                                style={{ borderRadius: "8px", maxWidth: "250px" }}
                                placeholder="Search by recipe name..."
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
                                style={{ borderRadius: "8px", backgroundColor: "#059669" }}
                                onClick={() => navigate("/add-new-recipes")}
                            >
                                + Add Recipe
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card>

            {/* Bảng Danh sách Công thức nấu ăn */}
            <Card className="border-0 shadow-sm overflow-hidden mb-4" style={{ borderRadius: "16px" }}>
                <Table responsive hover className="align-middle mb-0 text-nowrap">
                    <thead className="table-light text-secondary">
                    <tr>
                        <th className="py-3 px-4 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>#</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Recipe Name</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Meal Type</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Prep</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Cook</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Total</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Difficulty</th>
                        <th className="py-3 text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Servings</th>
                        <th className="py-3 px-4 text-end text-uppercase tracking-wider fs-7" style={{ fontSize: "12px" }}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recipes && recipes.length > 0 ? (
                        recipes.map((rep) => (
                            <tr key={rep.id} className="border-bottom border-light-subtle">
                                <td className="py-3 px-4 text-secondary">{rep.id}</td>
                                <td>
                                        <span
                                            className="fw-semibold text-primary cursor-pointer text-decoration-none"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => navigate(`/details/${rep.id}`)}
                                        >
                                            {rep.name}
                                        </span>
                                </td>
                                <td className="text-secondary">{rep.mealType?.name || "N/A"}</td>
                                <td className="text-dark">{rep.prepTime}m</td>
                                <td className="text-dark">{rep.cookTime}m</td>
                                <td className="text-dark">{(rep.cookTime || 0) + (rep.prepTime || 0)}m</td>
                                <td>{rep.difficulty}</td>
                                <td className="text-secondary">{rep.servings} px</td>
                                <td className="py-3 px-4 text-end">
                                    <Button
                                        variant="light"
                                        size="sm"
                                        className="text-danger fw-medium px-3 py-1"
                                        style={{ borderRadius: "6px" }}
                                        onClick={() => navigate(`/delete-recipe/${rep.id}`)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="text-primary fw-medium px-3 py-1"
                                        style={{ borderRadius: "6px" }}
                                        onClick={() => navigate(`/update-recipe/${rep.id}`)}
                                    >
                                        Edick
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center py-5 text-muted">
                                No records found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Card>

            {/* Thanh điều hướng phân trang */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4 px-2">
                    <small className="text-muted fw-medium">
                        Showing {totalElements === 0 ? 0 : page * size + 1} to {Math.min((page + 1) * size, totalElements)} of {totalElements} recipes
                    </small>
                    <Pagination size="sm" className="mb-0">
                        <Pagination.First onClick={() => setPage(0)} disabled={page === 0}/>
                        <Pagination.Prev onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}/>
                        {renderPaginationItems()}
                        <Pagination.Next onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}/>
                        <Pagination.Last onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}/>
                    </Pagination>
                </div>
            )}
        </Container>
    );
};

export default RecipesListPage;