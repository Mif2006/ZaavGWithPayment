// types/catalog.ts
export interface CatalogProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    sizes: Record<string, number>;
    isNew: boolean;
    collection: string | null;
    backImages: string[];
  }