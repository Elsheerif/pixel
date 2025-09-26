# TODO: Fix Navbar Cart Button Issues

## Steps:
- [x] Edit src/components/layout/navbar.tsx: Fix Button and NavigationMenu imports to "@/components/ui/..."; add useState for cart count and useEffect to fetch from apiServices.getUserCart().
- [x] Edit src/services/api.ts: Add async getUserCart() method to fetch cart data with authentication headers.
- [x] Restart the development server with `npm run dev` to apply changes and clear import errors.
- [x] Test the navbar: Load a page, verify cart button renders without errors, badge shows dynamic count (0 if empty, updates after adding items).
- [x] Integrate with original task testing: Once navbar fixed, test product details fetch.
