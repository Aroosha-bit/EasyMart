import cheese1 from "../../public/assets/cheese1.svg";
import cheese2 from "../../public/assets/cheese2.svg";
import cheese3 from "../../public/assets/cheese3.svg";
import cheese4 from "../../public/assets/cheese4.svg";
import milk1 from "../../public/assets/milk1.svg";
import milk2 from "../../public/assets/milk2.svg";
import milk3 from "../../public/assets/milk3.svg";
import milk4 from "../../public/assets/milk4.svg";
import egg1 from "../../public/assets/egg1.svg";
import egg2 from "../../public/assets/egg2.svg";
import egg3 from "../../public/assets/egg3.svg";
import egg4 from "../../public/assets/egg4.svg";
export interface cheeseItems {
  img: any;
  name: string;
  quantity: number;
  price: number; 
  itemsLeft: number;
}
export const cheeseItems: cheeseItems[] = [
  {
    img: cheese1,
    name: "Cheddar Cheese",
    quantity: 2.71,
    price: 99,
  itemsLeft: 12,
  },
  {
    img: cheese2,
    name: "Mozzarella Cheese",
    quantity: 3.25,
    price: 50 ,
   itemsLeft: 8,
  },
  {
    img: cheese3,
    name: "Parmesan Cheese",
    quantity: 2.71,
    price: 10.25,
    itemsLeft: 5,
  },
  {
    img: cheese4,
    name: "Blue Cheese",
    quantity: 2.71,
    price: 12.00,
    itemsLeft: 3,
  },
  {
    img: cheese1,
    name: "Cheddar Cheese",
    quantity: 2.71,
    price: 8.99,
    itemsLeft: 12,
  },
  {
    img: cheese2,
    name: "Mozzarella Cheese",
    quantity: 3.2,
    price: 6.50,
    itemsLeft: 8,
  },
  {
    img: cheese3,
    name: "Parmesan Cheese",
    quantity: 2.7,
    price: 10.25,
    itemsLeft: 5,
  },
  {
    img: cheese4,
    name: "Blue Cheese",
    quantity: 2.7,
    price: 12.00,
    itemsLeft: 3,
  },
];

export const milkItems: cheeseItems[] = [
  {
    img: milk1,
    name: "Whole Milk",
    quantity: 3.5,
    price: 12.99,
    itemsLeft: 10,
  },
  {
    img: milk2,
    name: "Oat Milk",
    quantity: 3.25,
    price: 60.99,
    itemsLeft: 15,
  },
  {
    img: milk3,
    name: "Clover Milk",
    quantity: 3.0,
    price: 39.99,
    itemsLeft: 20,
  },
  {
    img: milk4,
    name: "Skim Milk",
    quantity: 2.7,
    price: 12.00,
    itemsLeft: 3,
  },
  {
    img: milk1,
    name: "Whole Milk",
    quantity: 3.5,
    price: 12.99,
    itemsLeft: 10,
  },
  {
    img: milk2,
    name: "Oat Milk",
    quantity: 3.25,
    price: 90.99,
    itemsLeft: 15,
  },
  {
    img: milk3,
    name: "Clover Milk",
    quantity: 3.0,
    price: 9.99,
    itemsLeft: 20,
  },
  {
    img: milk4,
    name: "Skim Milk",
    quantity: 2.7,
    price: 12.00,
    itemsLeft: 3,
  },
];

export const eggItems: cheeseItems[] = [
  {
    img: egg1,
    name: "Rosmary Egg",
    quantity: 3.5,
    price: 12.99,
    itemsLeft: 10,
  },
  {
    img: egg2,
    name: "The Lake Egg",
    quantity: 3.25,
    price: 10.99,
    itemsLeft: 15,
  },
  {
    img: egg3,
    name: "Hunter Valley Eggs",
    quantity: 3.0,
    price: 9.99,
    itemsLeft: 20,
  },
  {
    img: egg4,
    name: "Free Range Eggs",
    quantity: 2.71,
    price: 120.00,
    itemsLeft: 3,
  },
  {
    img: egg1,
    name: "Rosmary Egg",
    quantity: 3.5,
    price: 12.99,
    itemsLeft: 10,
  },
  {
    img: egg2,
    name: "The Lake Egg",
    quantity: 3.25,
    price: 10.99,
    itemsLeft: 15,
  },
  {
    img: egg3,
    name: "Hunter Valley Eggs",
    quantity: 3.0,
    price: 94.99,
    itemsLeft: 20,
  },
  {
    img: egg4,
    name: "Free Range Eggs",
    quantity: 2.71,
    price: 120.00,
    itemsLeft: 3,
  },
];
