import {
    Home,
    MessageSquare,
    BookOpen,
    ShoppingCart,
    Heart,
    ShoppingBag,
} from "lucide-react";

export interface ProductsType {
    _id:string
    name:string
    description:string
    price:number
    discountPrice:number
    stock:number
    images: string[]
    categoryId:string
    productId: {
    _id: string;
    name: string;
    price: number;
    images: string[];
};
    quantity:number
}

interface NavLink {
    id: number;
    title: string;
    icon: typeof Home;
    path: string
}

export const NavLinks: NavLink[] = [
    {
        id: 1,
        title: "home",
        icon: Home,
        path: "/",
    },
    {
        id: 2,
        title: "contact",
        icon: MessageSquare,
        path: "contact",
    },
    {
        id: 3,
        title: "about",
        icon: BookOpen,
        path: "about",
    },
    {
        id: 4,
        title: "E-Shop",
        icon: ShoppingBag,
        path: "products"
    },
    {
        id: 5,
        title: "cart",
        icon: ShoppingCart,
        path: "cart",
    },
    {
        id: 6,
        title: "wishlist",
        icon: Heart,
        path: "wishList"
    },
];

export const categorySlides = [
    {
        id: 1,
        title: "latestIphones",
        image: "/images/iphone16.png",
    },
    {
        id: 2,
        title: "comfyChairs",
        image: "/images/wt214.png",
    },
    {
        id: 3,
        title: "stylishAccessories",
        image: "/images/bag.png",
    },
    {
        id: 4,
        title: "fashionableOutfits",
        image: "/images/fashion3.png",
    },
];
