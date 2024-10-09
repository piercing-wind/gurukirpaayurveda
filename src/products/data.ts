import { Product } from "@/types/type";

export const products : Product[] = [
   {
      id: "1",
      name: "Tila Oil",
      price: 1600,
      image: "/product/tila-oil-1x1.jpg",
      subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
      description: "Nourishing herbal oil for soothing skin, promoting relaxation, and supporting overall wellness.",
      discount: "25%",
      rating: 4.9,
      category: "skin care",
      quantity : 1
   },
   {
      id: "7",
      name: "Hair Oil",
      price: 800,
      image: "/product/top3Product/hair-oil-1x1.jpg",
      subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
      description: "Revitalize your hair naturally with our Ayurvedic hair care solutions, crafted to promote strength, shine, and healthy growth.",
      discount: "20%",
      rating: 4.9,
      category: "Hair care",
      quantity : 1
   },
   // {
   //    id: "8",
   //    name: "Ashwagandha Powder",
   //    price: 3200,
   //    image: "/product/ashwagandha-1x1.jpg",
   //    subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
   //    description: "A powerful adaptogen that helps reduce stress, boost energy, improve immunity, and enhance overall vitality for a balanced, healthier lifestyle.",
   //    discount: "20%",
   //    rating: 4.9,
   //    category: "health",
   //    quantity : 1
   // },
   // {
   //    id: "9",
   //    name: "Shilajit Resin",
   //    price: 3600,
   //    image: "/product/shilajit-resin-1x1.jpg",
   //    subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
   //    description: "Shilajit, nature's secret to enhanced stamina and rejuvenation, fuels your body with powerful energy and vitality for a vibrant life.",
   //    discount: "10%",
   //    rating: 4.9,
   //    category: "health",
   //    quantity : 1
   // },
   {
      id: "10",
      name: "Chyawanprash",
      price: 1500,
      image: "/product/Chyawanprash-1x1.jpg",
      subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
      description: "Chyawanprash is a traditional herbal jam, packed with nutrients that enhance immunity, promote vitality, and support overall health.",
      discount: "15%",
      rating: 4.9,
      category: "health",
      quantity : 1
   },
   {
      id: "11",
      name: "Aloe Vera Gel",
      price: 800,
      image: "/product/aloe-vera-1x1.jpg",
      subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
      description: "Pure Aloe Vera Gel: Hydrates, soothes, and rejuvenates skin. Ideal for all skin types. Lightweight, non-greasy formula for everyday use.",
      discount: "15%",
      rating: 4.9,
      category: "health",
      quantity : 1
   },
   {
      id: "12",
      name: "Neem Soap",
      price: 500,
      image: "/product/neem-soap-1x1.jpg",
      subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
      description: " Natural antibacterial cleanser that purifies and nourishes skin. Fights acne and soothes irritation for a healthy glow.",
      discount: "10%",
      rating: 4.9,
      category: "health",
      quantity : 1
   },
   {
      id: "13",
      name: "Aloe Vera Juice",
      price: 900,
      image: "/product/aloe-vera-juice-1x1.jpg",
      subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
      description: "Refreshing and nutritious drink that supports digestion, boosts hydration, and promotes overall wellness. Enjoy daily for health benefits.",
      discount: "20%",
      rating: 4.9,
      category: "health",
      quantity : 1
   },


   // {
   //    id: "4",
   //    name: "Masti Capsules",
   //    price: 3125,
   //    image: "/product/masti-capsules-1x1.jpg",
   //    subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
   //    description: "Natural supplement to enhance stamina, boost libido, and improve overall sexual vitality.",
   //    discount: "20%",
   //    rating: 4.9,
   //    category: "sexual wellness",
   //    quantity : 1
   // },
   // {
   //    id: "5",
   //    name: "Special Kutki Tablets",
   //    price: 426.83,
   //    image: "/product/special-kutki-tablate-1x1.jpg",
   //    subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
   //    description: "Herbal remedy to support liver health, detoxify the body, and promote better digestion naturally.",
   //    discount: "18%",
   //    rating: 5.0,
   //    category: "health",
   //    quantity : 1
   // },
   // {
   //    id: "6",
   //    name: "Herra Bhasam Kasturi + Night Josh",
   //    price: 5625,
   //    image: "/product/herra-bhasam-kasturi-1x1.jpg",
   //    subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
   //    description: "Herbal formula for enhancing penis size, boosting stamina, and supporting testosterone levels.",
   //    discount: "20%",
   //    rating: 4.9,
   //    category: "sexual wellness",
   //    quantity : 1
   // },
   // {
   //    id: "2",
   //    name: "Night Josh",
   //    price: 1250,
   //    image: "/product/night-josh-1x1.jpg",
   //    subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
   //    description: "Boost stamina, enhance strength, and improve performance for longer, satisfying intimate moments.",
   //    discount: "20%",
   //    rating: 4.9,
   //    category: "sexual wellness",
   //    quantity : 1
   // },
   // {
   //    id: "3",
   //    name: "Herra Bhasam Kasturi",
   //    price: 4375,
   //    image: "/product/herra-bhasam-kasturi-without-oil-1x1.jpg",
   //    subImages: ["/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg", "/product/shilajit-gold-resin.jpg"],
   //    description: "Herbal formula for enhancing penis size, boosting stamina, and supporting testosterone levels.",
   //    discount: "20%",
   //    rating: 4.9,
   //    category: "sexual wellness",
   //    quantity : 1
   // },
];