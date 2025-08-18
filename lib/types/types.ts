export interface User {
    id: string;
    name: string;
    email: string;
    joinedDate: string;
    membershipLevel: string;
  }
  
  export interface Purchase {
    id: string;
    name: string;
    price: number;
    size: string;
    date: string;
    imageUrl: string;
  }
  
  export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    sizes?: Record<string, number>;
    isNew?: boolean;
    collection?: string | null;
    backImages?: string[];
  }