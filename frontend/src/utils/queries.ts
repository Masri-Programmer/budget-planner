import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";

const queryClient = useQueryClient(); // To invalidate cache after mutations

// Fetch categories with useQuery
const {
  data: categories,
  isLoading,
  isError,
  error,
} = useQuery(["categories"], fetchCategoriesData);

// Mutation for adding a category
const addCategoryMutation = useMutation(addCategoryData, {
  onSuccess: (data) => {
    queryClient.invalidateQueries(["categories"]); // Invalidate and refetch categories
    toast.success("Category added successfully!"); // Success toast
  },
  onError: (error) => {
    toast.error("Failed to add category!"); // Error toast
    console.error("Error adding category:", error);
  },
});

// Mutation for updating a category
const updateCategoryMutation = useMutation(updateCategoryData, {
  onSuccess: (data) => {
    queryClient.invalidateQueries(["categories"]); // Invalidate and refetch categories
    toast.success("Category updated successfully!"); // Success toast
  },
  onError: (error) => {
    toast.error("Failed to update category!"); // Error toast
    console.error("Error updating category:", error);
  },
});

// Mutation for deleting a category
const deleteCategoryMutation = useMutation(deleteCategoryData, {
  onSuccess: () => {
    queryClient.invalidateQueries(["categories"]); // Invalidate and refetch categories
    toast.success("Category deleted successfully!"); // Success toast
  },
  onError: (error) => {
    toast.error("Failed to delete category!"); // Error toast
    console.error("Error deleting category:", error);
  },
});
