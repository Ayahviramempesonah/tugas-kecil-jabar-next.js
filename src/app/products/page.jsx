import Link from "next/link";

const allProducts = [
  {
    id: "1",
    name: "Apple",
    category: "Fruits",
    price: "$1",
    stocked: true,
    image: "/next.svg",
    description: "A crisp and sweet apple,perfect for a healthy snack.",
  },
  {
    id: "2",
    name: "Dragonfruit",
    category: "Fruits",
    price: "$3",
    stocked: true,
    image: "/globe.svg",
    description: "An exotic and vibrantfruit with a mildly sweet flavor.",
  },
  {
    id: "3",
    name: "Passionfruit",
    category: "Fruits",
    price: "$2",
    stocked: false,
    image: "/file.svg",
    description: "A tropical fruit with     a tangy and aromatic pulp.",
  },
  {
    id: "4",
    name: "Spinach",
    category: "Vegetables",
    price: "$2",
    stocked: true,
    image: "/window.svg",
    description: "Fresh green spinach,rich in iron and vitamins.",
  },
];

export default function PageList() {
  return (
    <div>
      <h1 className="text-center">PRODUCT LIST</h1>
      <h2 className="text-center p-4 gap-1 justify-between ">
        
          {allProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <hr />
            </Link>
          ))}
        
      </h2>
    </div>
  );
}
