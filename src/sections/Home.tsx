import { PAGE } from "@/enums/core";

const Home = ({ goToPage }: { goToPage: (page: PAGE) => void }  ) => {
  return (
    <div>
        <div className="flex flex-col gap-4 items-center my-10">
            <span className="text-2xl font-bold">Home</span>

            <button onClick={() => goToPage(PAGE.CART)}>Go to cart</button>
            <button onClick={() => goToPage(PAGE.DELIVERIES)}>Go to deliveries</button>
            <button onClick={() => goToPage(PAGE.PRODUCTS)}>Go to products</button>
        </div>
    </div>
  )
}

export default Home;