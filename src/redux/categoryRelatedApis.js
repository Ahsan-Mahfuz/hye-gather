import { baseApis } from './main/baseApis'

const categoryRelatedApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (params) => ({
        url: '/category/get-all',
        method: 'GET',
        params,
      }),
      providesTags: ['category'],
    }),
    updateCategory: builder.mutation({
      query: (data) => {
        const { id } = data
        return {
          url: `/category/update/${id}`,
          method: 'PATCH',
        }
      },
      invalidatesTags: ['category'],
    }),
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/category/create`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['category'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoryRelatedApis
export default categoryRelatedApis
