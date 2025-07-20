import NotFound from "@/app/not-found";
import Image from "next/image";

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

async function getProductById(id) {
  return allProducts.find((p) => p.id === id);
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return <NotFound />;
  }
  return (
    <>
      <div className=" p-4 m-2 text-center grid rounded-lg border">
        <h2> test dinamic {product.id}</h2>
        {/* <diV className="grig border rounded-b-full">  */}
        <p>name: {product.name}</p>
        <p>price: {product.price}</p>
        <p>description: {product.description}</p>
        {/* </div> */}
      </div>
    </>
  );
}
