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

export const parseSizes = async (sizesString: string): Promise<Record<string, number>> => {
  try {
    // Remove any extra whitespace
    const cleanString = sizesString.trim();
    
    // Return empty object if string is empty
    if (!cleanString) {
      return {};
    }
    
    // Check if the string is already a valid JSON object (starts and ends with curly braces)
    if (cleanString.startsWith('{') && cleanString.endsWith('}')) {
      try {
        // First try to parse as-is
        const parsed = JSON.parse(cleanString);
        
        // Convert all values to numbers and ensure proper format
        const result: Record<string, number> = {};
        for (const [size, quantity] of Object.entries(parsed)) {
          result[size] = Number(quantity);
        }
        
        return result;
      } catch (jsonError) {
        // If JSON parsing fails, fall back to comma-separated parsing
        console.warn('JSON parsing failed, falling back to comma-separated parsing:', jsonError);
      }
    }
    
    // Handle comma-separated key-value pairs (e.g., "1:10, 2:5" or "Small:5, Large:10")
    // This also serves as fallback for malformed JSON
    {
      const result: Record<string, number> = {};
      
      // Split by comma and process each pair
      const pairs = cleanString.split(',');
      
      for (const pair of pairs) {
        const trimmedPair = pair.trim();
        if (trimmedPair) {
          // Split by colon to get key and value
          const [key, value] = trimmedPair.split(':');
          if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            result[trimmedKey] = Number(trimmedValue) || 0;
          }
        }
      }
      
      return result;
    }
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