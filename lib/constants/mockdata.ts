import { User, Purchase } from '@/lib/types/types';


export const catalogData = [
  {
    id: 'c1',
    name: 'Emerald Cut Diamond Ring',
    price: 15999,
    description: 'A stunning 3-carat emerald cut diamond set in platinum with pavé diamond band. The epitome of modern elegance.',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'rings'
  },
  {
    id: 'c2',
    name: 'Pearl and Diamond Choker',
    price: 7899,
    description: 'South Sea pearls alternating with brilliant-cut diamonds in an elegant choker design. Perfect for special occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'chains'
  },
  {
    id: 'c3',
    name: 'Sapphire Tennis Bracelet',
    price: 12499,
    description: 'Ceylon sapphires and diamonds set in 18k white gold. A modern take on the classic tennis bracelet.',
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'bracelets'
  },
  {
    id: 'c4',
    name: 'Diamond Drop Earrings',
    price: 9999,
    description: 'Cascading diamonds in a contemporary drop design, featuring over 2 carats of brilliant-cut diamonds.',
    imageUrl: 'https://images.unsplash.com/photo-1588444650733-d2624a54abff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'earrings'
  },
  {
    id: 'c5',
    name: 'Mens Onyx Ring',
    price: 2999,
    description: 'Bold and sophisticated mens ring featuring black onyx and 18k yellow gold. Perfect for the modern gentleman.',
    imageUrl: 'https://images.unsplash.com/photo-1612696733290-a2a26ce8131c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'mens'
  },
  {
    id: 'c6',
    name: 'Diamond Falange Ring',
    price: 1999,
    description: 'Delicate falange ring with pavé diamonds in rose gold. Perfect for stacking or wearing alone.',
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'falange'
  },
  {
    id: 'c7',
    name: 'Emerald Pendant',
    price: 4999,
    description: 'Stunning emerald pendant surrounded by diamonds, set in 18k white gold. A timeless piece for any occasion.',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'pendants'
  },
  {
    id: 'c8',
    name: 'Diamond Tennis Bracelet',
    price: 8999,
    description: 'Classic tennis bracelet featuring 5 carats of round brilliant diamonds set in platinum.',
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'bracelets'
  },
  {
    id: 'c9',
    name: 'Pearl Drop Earrings',
    price: 3499,
    description: 'Elegant South Sea pearl drop earrings with diamond accents in 18k white gold.',
    imageUrl: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'earrings'
  },
  {
    id: 'c10',
    name: 'Cuban Link Chain',
    price: 5999,
    description: 'Heavy 18k gold Cuban link chain. A bold statement piece for any collection.',
    imageUrl: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'chains'
  }
];

export const wishlistData = [
  {
    id: 'w1',
    name: 'Vintage Diamond Tiara',
    price: 12999,
    description: 'An exquisite Victorian-era tiara featuring 47 brilliant-cut diamonds set in platinum. Perfect for special occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'w2',
    name: 'Ruby and Diamond Necklace',
    price: 8499,
    description: 'A stunning statement piece featuring natural Burmese rubies surrounded by brilliant-cut diamonds in 18k white gold.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'w3',
    name: 'Sapphire Cocktail Ring',
    price: 5999,
    description: 'An art deco-inspired ring featuring a 4-carat Ceylon sapphire surrounded by pavé diamonds.',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
];

export const userData: User = {
  id: '1',
  name: 'Olivia Anderson',
  email: 'olivia@example.com',
  joinedDate: '2018-05-12',
  membershipLevel: 'Premium'
};

export const purchaseData: Purchase[] = [
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    price: 2499,
    size: 'Size 7',
    date: '2023-12-15',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name: 'Pearl Necklace',
    price: 899,
    size: '18"',
    date: '2023-09-23',
    imageUrl: 'https://images.unsplash.com/photo-1589128777073-53352d40f9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Gold Bangles (Set of 3)',
    price: 1250,
    size: 'Medium',
    date: '2023-07-04',
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    name: 'Sapphire Earrings',
    price: 1899,
    size: 'Standard',
    date: '2023-04-18',
    imageUrl: 'https://images.unsplash.com/photo-1588444650733-d2624a54abff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    name: 'Rose Gold Watch',
    price: 3250,
    size: '36mm',
    date: '2023-01-30',
    imageUrl: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    name: 'Emerald Tennis Bracelet',
    price: 4995,
    size: '7.5"',
    date: '2022-11-08',
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '7',
    name: 'Diamond Stud Earrings',
    price: 1499,
    size: '0.5ct each',
    date: '2022-08-15',
    imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  }
];