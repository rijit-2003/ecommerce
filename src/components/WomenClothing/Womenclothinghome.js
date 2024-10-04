import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import totalitems from '../products.json'
import Item from '../Item/Item';

const Womenclothinghome = () => {
  const [showAll, setShowAll] = useState(false);
  const [filteredProducts,setFilteredProducts]=useState([])

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  useEffect(() => {
    filterItems();
  }, []); // Empty dependency array to run the effect only once

  const filterItems = () => {
    const filteredProducts = totalitems.products.filter((product) => product.type === "Womenclothing");
    setFilteredProducts(filteredProducts)
  };
  return (
    <div style={{ padding: '2em' }}>
      <h3 style={{ padding: '0.5em' }}>Women's Clothing</h3>
      <div className="products-container">
        {filteredProducts.slice(0, showAll ? filteredProducts.length : 8).map((product) => (
          <Item item={product} />
        ))}
        {!showAll && filteredProducts.length > 8 && (
          <Link className="show-all-button" onClick={toggleShowAll} style={{ fontSize: '1.5em' }} to="/womenclothing" >
            &gt;&gt;
          </Link>
        )}
      </div>
    </div>
  )
}

export default Womenclothinghome
