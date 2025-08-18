// app/catalog/layout.tsx
import { CatalogProvider } from "@/lib/context/ProductContext";
import { ProductData } from '@/lib/actions/catalog.actions';
import { fetchCatalogData } from '@/lib/actions/catalog.actions';

export default async function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let products: ProductData[] = [];
  
  try {
    products = await fetchCatalogData();
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    products = [];
  }
  
  return (
    <CatalogProvider initialProducts={products}>
      {children}
    </CatalogProvider>
  );
}