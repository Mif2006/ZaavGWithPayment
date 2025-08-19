'use server';

import { revalidatePath } from 'next/cache';

export interface ProductData {
  name: string;
  imgLink: string;
  price: string;
  sizes: string;
  type: string;
  newItem: string;
  collection: string;
  backImages: string;
}

export interface ApiResponse {
  data: ProductData[];
}

export interface CatalogItem {
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

export const fetchCatalogData = async (): Promise<ProductData[]> => {
  try {
    const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhtp8wjjL5cqlRUQMhu49VvZdaWrypmAvv2bSlv0n_AzYxx0hPN1eN_zENPvtlGfqO2j9o_yWTU5owMMKBAYUCmaK_0Ykx9daTKLPRtiYNJJnZOE5UCPZC4swKlYBZfhWXV_5Sm4jnXMvTOyULZyWMtMbaQ7OqW4h-2pd16YhHf_mmmejbXO0xicLFaBwoh2UIjPmxDee26BPbZHyFvxIJrwQF0bkcfnu1NJlqT09970KntPatF2nKywJU-A5sJUvq-L-zymQiqi4WXR7yZylcufBIc0Sq0yvbGB70C&lib=Mw2XXmvRGu-in3pnh3uSbnmONnX9Sat_b');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Filter out the header row
    return data.data.filter(item => item.name !== 'Название');
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    throw error;
  }
};

// Add this function to your catalog.actions.ts
// export const findProductByName = async (productName: string) => {
//   try {
//     const products = await fetchCatalogData();
//     const product = products.find(product => 
//       product.name.toLowerCase().replace(/\s+/g, '-') === productName.toLowerCase() ||
//       product.name.toLowerCase() === productName.toLowerCase().replace(/-/g, ' ')
//     );
    
//     if (!product) {
//       throw new Error('Product not found');
//     }
    
//     return transformProductData(product);
//   } catch (error) {
//     console.error('Error finding product:', error);
//     throw error;
//   }
// };
// lib/actions/catalog.actions.ts
export const parseSizes = async (sizesString: string): Promise<Record<string, number>> => {
  try {
    // Remove any extra whitespace
    const cleanString = sizesString.trim();
    
    // Return empty object if string is empty
    if (!cleanString) {
      return {};
    }
    
    // Handle properly formatted JSON
    if (cleanString.startsWith('{') && cleanString.endsWith('}') && cleanString.includes(':')) {
      try {
        const parsed = JSON.parse(cleanString);
        if (typeof parsed === 'object' && parsed !== null) {
          const result: Record<string, number> = {};
          for (const [size, quantity] of Object.entries(parsed)) {
            const numericQuantity = Number(quantity);
            if (!isNaN(numericQuantity)) {
              result[size] = numericQuantity;
            }
          }
          return result;
        }
      } catch (jsonError) {
        // Fall through to manual parsing
      }
    }
    
    // Handle malformed cases like "{16 {15" or "16:1, 17:2"
    const result: Record<string, number> = {};
    
    // Remove outer braces if present
    let workingString = cleanString;
    if (workingString.startsWith('{')) {
      workingString = workingString.substring(1);
    }
    if (workingString.endsWith('}')) {
      workingString = workingString.substring(0, workingString.length - 1);
    }
    
    // Split by comma and clean each part
    const parts = workingString.split(',').map(part => part.trim());
    
    for (const part of parts) {
      // Remove any remaining braces
      const cleanPart = part.replace(/[{}]/g, '').trim();
      
      // Look for key:value pattern
      const colonIndex = cleanPart.indexOf(':');
      if (colonIndex > 0) {
        const key = cleanPart.substring(0, colonIndex).trim();
        const value = cleanPart.substring(colonIndex + 1).trim();
        const numericValue = Number(value);
        
        if (key && !isNaN(numericValue)) {
          result[key] = numericValue;
        }
      }
      // Skip malformed parts that don't have proper key:value format
    }
    
    return result;
  } catch (error) {
    console.error('Error parsing sizes:', error);
    return {};
  }
};
export const parseBackImages = async (backImagesString: string): Promise<string[]> => {
  try {
    // Remove any extra whitespace and parse the JSON array
    const cleanString = backImagesString.trim();
    return JSON.parse(cleanString);
  } catch (error) {
    console.error('Error parsing back images:', error);
    return [];
  }
};

export const transformProductData = async (product: ProductData): Promise<CatalogItem> => {
  return {
    id: `product-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: product.name,
    price: parseInt(product.price),
    description: `Beautiful ${product.type} from our collection`,
    imageUrl: product.imgLink,
    category: product.type, // This will be 'ring' from your data
    sizes: parseSizes(product.sizes),
    isNew: product.newItem === 'TRUE',
    collection: product.collection !== 'FALSE' ? product.collection : null,
    backImages: parseBackImages(product.backImages)
  };
};

// Next.js Server Actions
export const getCatalogItems = async (): Promise<CatalogItem[]> => {
  try {
    const rawData = await fetchCatalogData();
    return rawData.map(transformProductData);
  } catch (error) {
    console.error('Error in getCatalogItems action:', error);
    throw error;
  }
};

export const refreshCatalog = async () => {
  // This action will revalidate the catalog data
  revalidatePath('/catalog');
  revalidatePath('/');
};

// // app/lib/actions/catalog.actions.ts
// "use server"

// import { revalidatePath } from "next/cache";

// export interface ProductData {
//   name: string;
//   imgLink: string;
//   price: string;
//   sizes: string;
//   type: string;
//   newItem: string;
//   collection: string;
//   backImages: string;
// }

// export interface CatalogProduct {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   category: string;
//   sizes: Record<string, number>;
//   isNew: boolean;
//   collection: string | null;
//   backImages: string[];
// }

// const GOOGLE_SCRIPT_URL =
//   "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhtp8wjjL5cqlRUQMhu49VvZdaWrypmAvv2bSlv0n_AzYxx0hPN1eN_zENPvtlGfqO2j9o_yWTU5owMMKBAYUCmaK_0Ykx9daTKLPRtiYNJJnZOE5UCPZC4swKlYBZfhWXV_5Sm4jnXMvTOyULZyWMtMbaQ7OqW4h-2pd16YhHf_mmmejbXO0xicLFaBwoh2UIjPmxDee26BPbZHyFvxIJrwQF0bkcfnu1NJlqT09970KntPatF2nKywJU-A5sJUvq-L-zymQiqi4WXR7yZylcufBIc0Sq0yvbGB70C&lib=Mw2XXmvRGu-in3pnh3uSbnmONnX9Sat_b";

// export async function fetchCatalogData(): Promise<CatalogProduct[]> {
//   try {
//     const response = await fetch(GOOGLE_SCRIPT_URL, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       next: { revalidate: 300 },
//     });

//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//     const data: { data: ProductData[] } = await response.json();

//     return data.data
//       .filter((item) => item.name && item.name !== "Название")
//       .map(transformProductData);
//   } catch (error) {
//     console.error("Error fetching catalog data:", error);
//     return [];
//   }
// }

// export async function parseSizes(sizesString: string): Promise<Record<string, number>> {
//   try {
//     if (!sizesString || typeof sizesString !== 'string') return {};

//     const cleanString = sizesString.trim();
//     if (!cleanString) return {};

//     if (cleanString.startsWith("{") && cleanString.endsWith("}")) {
//       const parsed = JSON.parse(cleanString);
//       const result: Record<string, number> = {};
//       Object.keys(parsed).forEach((key) => {
//         result[key] = Number(parsed[key]) || 0;
//       });
//       return result;
//     }

//     const result: Record<string, number> = {};
//     const pairs = cleanString.split(",");
//     for (const pair of pairs) {
//       const [key, value] = pair.split(":").map((s) => s.trim());
//       if (key && value) result[key] = Number(value) || 0;
//     }
//     return result;
//   } catch (error) {
//     console.error("Error parsing sizes:", error);
//     return {};
//   }
// }

// export async function parseBackImages(backImagesString: string): string[] {
//   try {
//     if (!backImagesString || typeof backImagesString !== 'string') return [];
    
//     const cleanString = backImagesString.trim();
//     if (!cleanString) return [];
    
//     return JSON.parse(cleanString);
//   } catch (error) {
//     console.error("Error parsing back images:", error);
//     return [];
//   }
// }

// export async function transformProductData(product: ProductData): Promise<CatalogProduct> {
//   // Validate required fields
//   if (!product.name) {
//     throw new Error("Product name is required");
//   }

//   return {
//     id: `product-${product.name.toLowerCase().replace(/\s+/g, "-")}`,
//     name: product.name,
//     price: parseInt(product.price || "0", 10) || 0,
//     description: `Beautiful ${product.type || 'item'} from our collection`,
//     imageUrl: product.imgLink || '',
//     category: product.type || 'uncategorized',
//     sizes: parseSizes(product.sizes || ''),
//     isNew: product.newItem === "TRUE",
//     collection: product.collection !== "FALSE" ? product.collection : null,
//     backImages: parseBackImages(product.backImages || '[]'),
//   };
// }

// export async function revalidateCatalog() {
//   revalidatePath("/");
//   return { success: true };
// }

// catalog.actions.ts