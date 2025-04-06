import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include',
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({ category, subCategory, sizes, minPrice, maxPrice, page = 1, limit = 10, sortBy = "name", sortOrder = "asc" }) => {
                const params = new URLSearchParams();

                if (category && category !== "all") params.append("category", category);
                if (subCategory && subCategory !== "all") params.append("subCategory", subCategory);
                if (sizes && sizes !== "all") params.append("sizes", sizes);
                if (minPrice && !isNaN(minPrice)) params.append("minPrice", minPrice);
                if (maxPrice && !isNaN(maxPrice)) params.append("maxPrice", maxPrice);
                params.append("page", page);
                params.append("limit", limit);
                params.append("sortBy", sortBy);
                params.append("sortOrder", sortOrder);
                console.log("API Query URL:", `/?${params.toString()}`);
                return `/?${params.toString()}`;
            },
            providesTags: ["Products"]
        }),



        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),

        AddProducts: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
                credentials: "include",
            }),
            invalidatesTags: ["Products"]
        }),

        fetchRelatedProducts: builder.query({
            query: (id) => `/related/${id}`
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-product/${id}`,
                method: "PATCH",
                body: rest,
                credentials: "include"
            }),
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Products", id }]
        }),
    }),
});

export const { useFetchAllProductsQuery, useFetchProductByIdQuery, useAddProductsMutation, useFetchRelatedProductsQuery, useUpdateProductMutation, useDeleteProductMutation } = productsApi;
export default productsApi;
