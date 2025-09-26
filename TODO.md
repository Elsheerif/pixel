# TODO: Fix getProductDetails 404 and Data Fetching Issue

## Steps:
- [x] Edit src/services/api.ts: Hardcode baseUrl to 'https://ecommerce.routemisr.com/' in the constructor to ensure absolute API URLs.
- [x] Edit src/components/products/ProductCard.tsx: Change href={`/products/${product.id}`} to `/products/${product._id}` in both grid and list views.
- [x] Restart the development server with `npm run dev` to apply changes.
- [x] Test the fix: Navigate to /products, click on a product link, verify the detail page fetches and displays data without 404 errors (check browser Network tab for correct API call).
