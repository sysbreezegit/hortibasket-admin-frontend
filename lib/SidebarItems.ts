import {
    LayoutDashboard,
    Warehouse,
    ShoppingCart,
    CreditCard,
    RotateCcw,
    MapPin,
    Package,
    User,
    FileText,
    Globe,
    Circle,
    Plus,
    Crown,
    Copy,
    Gift,
    Ticket,
    Star,
    Store,
    ShieldAlert
} from "lucide-react";


export const navigation = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
   
    {
        name: "Orders",
        icon: ShoppingCart,
        href: "/orders/all",
    },
    {
        name: "Orders Payments",
        icon: ShoppingCart,
        href: "/orders-payments",
    },
    {
        name: "UPI Pending Orders",
        icon: CreditCard,
        href: "/upi-pending-orders",
    },
    {
        name: "Order Returns",
        icon: RotateCcw,
        href: "/order-returns",
    },
    {
        name: "Available Locations",
        icon: MapPin,
        href: "/available-locations",
    },
    {
        name: "Product Management",
        icon: Package,
        href: "#",
        children: [
            {
                name: "Products List",
                icon: Package,
                href: "/products/list",
            },
            {
                name: "Products Stock Report",
                icon: Package,
                href: "/products/stock-report",
            },
            {
                name: "Product Types",
                icon: Package,
                href: "/products/types",
            },
            {
                name: "Brand Management",
                icon: Crown,
                href: "/products/brands",
            },
            {
                name: "Category Management",
                icon: Copy,
                href: "/products/categories",
            },
            {
                name: "Offer Management",
                icon: Gift,
                href: "/products/offers",
            },
            {
                name: "Coupon Management",
                icon: Ticket,
                href: "/products/coupons",
            },
            {
                name: "Reviews & Ratings",
                icon: Star,
                href: "/products/reviews",
            },
            {
                name: "Offer Slabs",
                icon: Gift,
                href: "/products/offer-slabs",
            }
        ],
    },
    
    {
        name: "Stock Transfer",
        icon: Package,
        href: "/stock-transfer",
    },
    {
        name: "User Management",
        icon: User,
        href: "/users",
    },
    {
        name: "Seller Management",
        icon: Store,
        href: "#",
        children: [
            {
                name: "All Sellers",
                icon: Store,
                href: "/sellers",
            },
            {
                name: "KYC Applications",
                icon: ShieldAlert,
                href: "/sellers/kyc",
            }
        ]
    },
    {
        name: "Finance Management",
        icon: FileText,
        href: "/finance",
    },
    {
        name: "Website Management",
        icon: Globe,
        href: "#",
        children: [
            {
                name: "Landing Page",
                icon: Plus,
                href: "/website/landing-page",
            },
        ],
    },

];
