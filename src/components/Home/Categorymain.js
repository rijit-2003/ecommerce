import React, { useEffect, useState } from 'react'
import Item from '../Item/Item';
import totalitems from '../products.json';
import Loader from '../Loader';
import seedrandom from 'seedrandom';
const Categorymain = (props) => {
  const { category } = props;
  const [filteredItem, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    filterItems();
    // console.log(filteredItem)
    // Simulate a loading period of 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);

  }, [category])
  const filterItems = () => {
    const filteredProducts = totalitems.products.filter((product) => product.category === category || product.type === category);
    const shuffledArray = shuffleArrayWithSeed(filteredProducts, 123);
    setFilteredItems(shuffledArray)
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
        <Loader />
      ) : (
        <div style={{ padding: '2em' }}>
          <h3 style={{ padding: '0.5em' }}>{category}</h3>
          <div className="products-container" style={{ display: 'grid', gridRowGap: '1em' }}>
            {filteredItem.map((product) => (
              <Item item={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Categorymain
