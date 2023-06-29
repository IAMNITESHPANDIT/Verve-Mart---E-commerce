import Banner from "../../components/banner/Banner";
import CategoryMenu from "../../components/categoryMenu/CategoryMenu";
import ProductList from "../../components/productList/ProductList";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const HomePage = () => {
  // Sample data for ProductList component
  const products = [
    {
      id: 1,
      image: "product1.jpg",
      title: "Product 1",
      price: "$10",
      ratings: "4.5/5",
    },
    {
      id: 2,
      image: "product2.jpg",
      title: "Product 2",
      price: "20",
      ratings: 4.2,
    },
    // Add more products as needed
  ];

  return (
    <div className="home-page">
      <Header />
      <Banner />
      <CategoryMenu />
      <ProductList products={products} />
      <Footer />
    </div>
  );
};

export default HomePage;
