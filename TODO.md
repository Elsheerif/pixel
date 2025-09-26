# TODO: Fix API Service in src/services/api.ts

## Steps to Complete:

1. **Define baseUrl**: Add const baseUrl = 'https://ecommerce.routemisr.com/api/v1'; at the top of the file.
2. **Fix Constructor**: Update the constructor to this.baseUrl = baseUrl; (remove ?? "" since baseUrl is now defined).
3. **Update getAllProducts**: Change the fetch URL to `${this.baseUrl}products/`, add try-catch or res.ok check for error handling, return the data or throw error.
4. **Update getProductDetails**: Fix productId to string, use `${this.baseUrl}products/${productId}`, add error handling similar to getAllProducts.
5. **Implement addProductToCart**: Change to POST method with body { productId }, URL `${this.baseUrl}cart`, add headers 'Content-Type': 'application/json', and error handling.
6. **Test Changes**: Update product pages to use apiServices.getAllProducts() and apiServices.getProductDetails(id), run dev server, verify fetches succeed without errors.
7. **Update TODO**: Mark completed steps and remove if all done.

Progress: None completed yet.

---

# Previous Tasks (Completed)

## Match Image and Info Heights in Product Detail Page (Reverted)
- Reverted changes as requested; original layout restored.

## Fix Navbar Active Text Color
- All steps completed.

## Modify Logo in Navbar
- All steps completed.

## Fix Product Detail Infinite Re-render
- Fixed by moving setLoading inside try-catch and adding id check in useEffect.
