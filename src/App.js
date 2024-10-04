
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
// import Carousel from './components/Carousel';
import Navbar2 from './components/Navbar2/Navbar2';
import { useState } from 'react';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Signup from './components/Signup/Signup';
import products from './components/products.json'
import Topdealsmain from './components/Top deals/Topdealsmain';
import Womenclothingmain from './components/WomenClothing/Womenclothingmain';
import Itemlist from './components/Item/Itemlist'
import Itemmain from './components/Item/Itemmain';
import totalitems from './components/products.json'
import MenClothingmain from './components/MenClothing/Menclothingmain'
import Category from './components/Home/Category';
import Categorymain from './components/Home/Categorymain';
import Search from './components/Navbar/Search';
import Itemstate from './context/items/Itemstate';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Womentype from './components/Home/womentype';
import Brandsearch from './components/Navbar/brandsearch';
import PaymentDetails from './components/payment/PaymentDetails';
import Personalinfo from './components/Profileinfo/Personalinfo';
import Orders from './components/Orders/Orders'
import Footer from './components/Footer';
import About from './components/Home/About'
import Loader from './components/Loader';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['Electronics', 'Furniture', 'Jewellery', 'Hair Care', 'Makeup', 'Skin Care','Shoes','Kidsclothing','Perfume']
  const types=['Bags & Purses','Necklace','Bracelet','Earrings','Ring'];
  const brands = [
    'TRESemme',
    'mamaEarth',
    'Maybelline New York',
    'Lakmé',
    "L'Oréal Paris",
    'Samsung',
    'hp',
    'Asus',
    'Apple',
    'lenovo',
    'Acer',
    'Whirlpool',
    'Adidas'
  ];
  
  

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };
  
  
  
  
  
  return (
    <>
      <Itemstate>
        <Router basename="/ecommerce">
          <header>
            <Navbar onSearch={handleSearchQuery}/>
            <Navbar2 />
          </header>
          <div className="main-content" style={{ minHeight: '70vh' }}>
            <Routes >
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/api/auth/login" element={<Login />}></Route>
              <Route exact path="/api/auth/signup" element={<Signup />}></Route>
              <Route exact path="/api/account" element={<Personalinfo />}></Route>
              <Route exact path="/api/cart" element={<Cart />}></Route>
              <Route exact path="/api/account/wishlist" element={<Wishlist />}></Route>
              <Route exact path="/api/account/orders" element={<Orders />}></Route>
              <Route exact path="/topdeals" element={<Topdealsmain />}></Route>

              <Route exact path="/womenclothing" element={<Womenclothingmain />}></Route>
              <Route exact path="/menclothing" element={<MenClothingmain />}></Route>
              {totalitems.products.map((product) => (
                <Route exact path={`/item/${btoa(product.name)}`} element={<Itemmain item={product} />}></Route>
              ))}
              {categories.map((category) => (
                <Route exact path={`/${btoa(category)}`} element={<Categorymain category={category} />}></Route>
              ))}
              {types.map((type) => (
                <Route exact path={`/${btoa(type)}`} element={<Womentype type={type} />}></Route>
              ))}
              <Route exact path="/search" element={<Search word={searchQuery} />}></Route>
              {brands.map((brand)=>(
                <Route exact path={`/${btoa(brand)}`} element={<Brandsearch brand={brand} />}></Route>
              ))}
              <Route exact path="/api/account/paymentdetails" element={<PaymentDetails />}></Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </Itemstate>
    </>
  );
}

export default App;
