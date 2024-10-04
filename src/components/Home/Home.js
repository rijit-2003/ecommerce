import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel';
import Topdealshome from '../Top deals/Topdealshome';
import totalitems from '../products.json';
import Category from './Category';
import Menclothinghome from '../MenClothing/Menclothinghome';
import Womenclothinghome from '../WomenClothing/Womenclothinghome';
import Womentype from './womentype';
import Brandsearch from '../Navbar/brandsearch';
const Home = () => {
  
  const categories=['Electronics','Furniture','Jewellery','Hair Care','Makeup','Skin Care','Shoes','Kidsclothing','Perfume']
  const types=['Bags & Purses','Necklace','Bracelet','Earrings','Ring']
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
  
  // Accessing the brand names
  // and so on...
  
  return (
    <div>
      <Carousel />
      <Topdealshome />
      <Womenclothinghome/>
      <Menclothinghome/>
      {categories.map(category => (
        <Category category={btoa(category)}/>
      ))}
    </div>
  );
};

export default Home;
