import axios from 'axios'
import { useStorage } from "@vueuse/core";
axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

const token = useStorage < string | null > ("token", null);
const fetchCategoriesData = async () => {
    const response = await axios.get("http://localhost:8000/api/categories");
    return response.data;
};

const addCategoryData = async (newCategory) => {
    const response = await axios.post("http://localhost:8000/api/categories", newCategory);
    return response.data;
};

const updateCategoryData = async (category) => {
    const response = await axios.put(
        `http://localhost:8000/api/categories/${category.id}`,
        {
            name: category.name,
            expected: parseInt(category.expected),
        },
        {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        }
    );
    return response.data;
};

const deleteCategoryData = async (name) => {
    await axios.delete(`http://localhost:8000/api/categories/${name}`);
};
