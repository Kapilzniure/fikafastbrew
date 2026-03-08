import menuAmericano from "@/assets/menu-americano.png";
import menuIcedLatte from "@/assets/menu-iced-latte.png";
import menuCappuccino from "@/assets/menu-cappuccino.png";
import menuMatcha from "@/assets/menu-matcha.png";
import menuEspresso from "@/assets/menu-espresso.png";
import menuColdbrew from "@/assets/menu-coldbrew.png";
import menuChai from "@/assets/menu-chai.png";
import menuGreentea from "@/assets/menu-greentea.png";
import menuHotchoco from "@/assets/menu-hotchoco.png";
import menuCroissant from "@/assets/menu-croissant.png";
import menuMuffin from "@/assets/menu-muffin.png";
import menuBrownie from "@/assets/menu-brownie.png";
import menuSandwich from "@/assets/menu-sandwich.png";
import menuFries from "@/assets/menu-fries.png";

export type MenuCategory = "coffee" | "tea" | "pastries" | "snacks";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  tag: string | null;
  image: string;
  desc: string;
  longDesc: string;
  category: MenuCategory;
  canBeIced: boolean;
  ingredients: string[];
  allergens: string[];
  calories: number;
}

export const menuItems: MenuItem[] = [
  {
    id: 1, name: "Classic Americano", price: 350, tag: "Popular",
    image: menuAmericano, category: "coffee",
    desc: "Bold and smooth black coffee",
    longDesc: "Our Classic Americano is made with two shots of our house-blend espresso, diluted with hot water to create a rich, smooth, and bold black coffee. Perfect for those who appreciate the pure taste of quality espresso without any additions.",
    canBeIced: true, calories: 15,
    ingredients: ["Double espresso", "Hot water"],
    allergens: [],
  },
  {
    id: 2, name: "Iced Caramel Latte", price: 480, tag: "Best Seller",
    image: menuIcedLatte, category: "coffee",
    desc: "Chilled latte with caramel drizzle",
    longDesc: "Our most-loved drink. Freshly pulled espresso poured over a bed of ice with your choice of milk, finished with a generous swirl of house-made caramel sauce. Sweet, smooth, and impossibly refreshing.",
    canBeIced: true, calories: 280,
    ingredients: ["Double espresso", "Milk", "Ice", "Caramel sauce"],
    allergens: ["Dairy"],
  },
  {
    id: 3, name: "Cappuccino", price: 420, tag: null,
    image: menuCappuccino, category: "coffee",
    desc: "Creamy foam with rich espresso",
    longDesc: "A classic Italian cappuccino crafted with equal parts espresso, steamed milk, and velvety microfoam. Our baristas texture the milk to silky perfection, creating that signature thick, creamy cap that cappuccino lovers dream about.",
    canBeIced: false, calories: 120,
    ingredients: ["Double espresso", "Steamed milk", "Milk foam"],
    allergens: ["Dairy"],
  },
  {
    id: 4, name: "Matcha Latte", price: 500, tag: "New",
    image: menuMatcha, category: "coffee",
    desc: "Premium Japanese matcha blend",
    longDesc: "Ceremonial-grade Japanese matcha whisked smooth and blended with your choice of milk. Earthy, vibrant, and naturally sweet — this is not your average matcha. Available hot or iced.",
    canBeIced: true, calories: 190,
    ingredients: ["Ceremonial matcha", "Milk", "Honey"],
    allergens: ["Dairy"],
  },
  {
    id: 5, name: "Double Espresso", price: 300, tag: null,
    image: menuEspresso, category: "coffee",
    desc: "Intense double shot of espresso",
    longDesc: "Two concentrated shots of our signature espresso blend — a precise balance of Ethiopian and Colombian beans, roasted in-house. Bright acidity, dark chocolate notes, and a lingering caramel finish. For the purists.",
    canBeIced: false, calories: 10,
    ingredients: ["House blend espresso beans"],
    allergens: [],
  },
  {
    id: 6, name: "Cold Brew", price: 450, tag: "Seasonal",
    image: menuColdbrew, category: "coffee",
    desc: "Slow-steeped for 12 hours",
    longDesc: "Coarsely ground coffee steeped in cold water for 12 full hours. The result? A silky, low-acid concentrate that's naturally sweet with rich chocolate undertones. Served over ice — no dilution, all flavor.",
    canBeIced: true, calories: 20,
    ingredients: ["Cold brew concentrate", "Filtered water", "Ice"],
    allergens: [],
  },
  {
    id: 7, name: "Masala Chai", price: 200, tag: "Popular",
    image: menuChai, category: "tea",
    desc: "Traditional spiced Nepali tea",
    longDesc: "Our Masala Chai is a love letter to Nepali tea culture. Black tea simmered with fresh ginger, cardamom, cinnamon, cloves, and black pepper — then finished with full-fat milk. Bold, warming, and deeply satisfying.",
    canBeIced: false, calories: 140,
    ingredients: ["Black tea", "Milk", "Ginger", "Cardamom", "Cinnamon", "Cloves"],
    allergens: ["Dairy"],
  },
  {
    id: 8, name: "Green Tea", price: 180, tag: null,
    image: menuGreentea, category: "tea",
    desc: "Light & refreshing Japanese green tea",
    longDesc: "Premium Japanese sencha green tea brewed at the perfect temperature to preserve its delicate, grassy sweetness. Light, clean, and restorative — a moment of calm in your busy day.",
    canBeIced: true, calories: 5,
    ingredients: ["Japanese sencha leaves", "Hot water"],
    allergens: [],
  },
  {
    id: 9, name: "Hot Chocolate", price: 400, tag: "New",
    image: menuHotchoco, category: "tea",
    desc: "Rich cocoa with whipped cream",
    longDesc: "Real Belgian cocoa powder blended with steamed whole milk, a touch of vanilla, and a pinch of sea salt. Topped with a cloud of fresh whipped cream. The kind of hot chocolate that makes you feel five years old again.",
    canBeIced: false, calories: 340,
    ingredients: ["Belgian cocoa", "Whole milk", "Vanilla", "Sea salt", "Whipped cream"],
    allergens: ["Dairy"],
  },
  {
    id: 10, name: "Chocolate Croissant", price: 280, tag: "Best Seller",
    image: menuCroissant, category: "pastries",
    desc: "Flaky butter croissant with chocolate",
    longDesc: "Layers of hand-laminated butter pastry wrapped around two fingers of rich dark chocolate. Baked fresh each morning until perfectly golden and flaky. Best enjoyed slightly warm.",
    canBeIced: false, calories: 380,
    ingredients: ["Butter pastry", "Dark chocolate", "Egg wash"],
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
  {
    id: 11, name: "Blueberry Muffin", price: 250, tag: null,
    image: menuMuffin, category: "pastries",
    desc: "Freshly baked with real blueberries",
    longDesc: "A generously-sized muffin packed with plump, juicy blueberries and finished with a crunchy sugar crust. Baked fresh daily with zero artificial flavors. The perfect companion to your morning brew.",
    canBeIced: false, calories: 420,
    ingredients: ["Blueberries", "Flour", "Eggs", "Butter", "Sugar", "Vanilla"],
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
  {
    id: 12, name: "Chocolate Brownie", price: 220, tag: null,
    image: menuBrownie, category: "pastries",
    desc: "Dense, fudgy chocolate brownie",
    longDesc: "Our legendary brownie — ultra-dense, fudgy in the center, and crackling on top. Made with 70% dark chocolate and real butter. No cakey nonsense. Just pure, unapologetic chocolate.",
    canBeIced: false, calories: 450,
    ingredients: ["70% dark chocolate", "Butter", "Eggs", "Sugar", "Flour"],
    allergens: ["Gluten", "Dairy", "Eggs"],
  },
  {
    id: 13, name: "Chicken Sandwich", price: 350, tag: "Popular",
    image: menuSandwich, category: "snacks",
    desc: "Grilled chicken with fresh veggies",
    longDesc: "Juicy grilled chicken breast, crisp lettuce, sliced tomato, cucumber, and a house-made herb mayo, all stacked between toasted sourdough. Satisfying, fresh, and made to order.",
    canBeIced: false, calories: 520,
    ingredients: ["Grilled chicken", "Sourdough bread", "Lettuce", "Tomato", "Herb mayo"],
    allergens: ["Gluten", "Eggs"],
  },
  {
    id: 14, name: "French Fries", price: 200, tag: null,
    image: menuFries, category: "snacks",
    desc: "Crispy golden fries with ketchup",
    longDesc: "Hand-cut potatoes fried to golden perfection and seasoned with our signature spice blend. Crispy outside, fluffy inside, served with house ketchup and optional dipping sauce.",
    canBeIced: false, calories: 380,
    ingredients: ["Potatoes", "Sunflower oil", "Spice blend", "Sea salt"],
    allergens: [],
  },
];

export const categories: { key: MenuCategory; label: string }[] = [
  { key: "coffee", label: "☕ Coffee" },
  { key: "tea", label: "🍵 Tea & Drinks" },
  { key: "pastries", label: "🥐 Pastries" },
  { key: "snacks", label: "🍔 Snacks" },
];
