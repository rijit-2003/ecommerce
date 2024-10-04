import React, { useState,useEffect } from 'react'
import totalitems from '../products.json'
import Item from '../Item/Item';
import Loader from '../Loader';
const Womenclothingmain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    setIsLoading(true);
    filterItems();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);

  }, []); // Empty dependency array to run the effect only once

  const filterItems = () => {
    const filteredProducts = totalitems.products.filter((product) => product.type === "Womenclothing");
    setFilteredProducts(filteredProducts)
  };
  return (
    <div>
      {isLoading?(
        <Loader/>
      ):
      (
        <div style={{ padding: '2em' }}>
        <h3 style={{ padding: '0.5em' }}>Women's Clothing</h3>
        <div className="products-container" style={{ display: 'grid', gridRowGap: '1em' }}>
          {filteredProducts.map((product) => (
            <Item item={product} />
          ))}
        </div>
      </div>)}
    </div>
  )
}

export default Womenclothingmain
