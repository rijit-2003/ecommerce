import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import Loader from '../Loader';
import totalitems from '../products.json';
import seedrandom from 'seedrandom';

const Topdealsmain = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    filterItems();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);
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
      {isLoading ? (
        <Loader /> // Display the loader while the page is loading
      ) : (
        <div style={{ padding: '2em' }}>
          <h3 style={{ padding: '0.5em' }}>TOP DEALS</h3>
          <div className="products-container"  style={{ display: 'grid', gridRowGap: '1em' }}>
            {filteredProducts.map((product) => (
              <Item key={product.name} item={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Topdealsmain;
