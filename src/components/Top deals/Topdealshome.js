import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import totalitems from '../products.json';
import Item from '../Item/Item';
import './Topdeals.css'
import seedrandom from 'seedrandom';


const Topdeals = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    filterItems();
  }, []); // Empty dependency array to run the effect only once

  const filterItems = () => {
    const filteredProducts = totalitems.products.filter(
      (product) => ((product.oldprice - product.newprice) / product.oldprice) * 100 > 35
    );
    const shuffledArray = shuffleArrayWithSeed(filteredProducts, 13);
    setFilteredProducts(shuffledArray)
  };

  const shuffleArrayWithSeed = (array, seed) => {
    const shuffledArray = [...array];
    const rng = seedrandom(seed);

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  };

  return (
    <div>
      <div style={{ padding: '2em' }}>
        <h3 style={{ padding: '0.5em' }}>TOP DEALS</h3>
        <div className="products-container">
          {filteredProducts.slice(0, showAll ? filteredProducts.length : 8).map((product) => (
            <Item item={product} />
          ))}
          {!showAll && filteredProducts.length > 8 && (
            <Link className="show-all-button" onClick={toggleShowAll} style={{ fontSize: '1.5em' }} to="/topdeals" >
              &gt;&gt;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topdeals;
