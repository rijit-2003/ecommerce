import React, { useState, useEffect } from 'react'
import Item from '../Item/Item';
import { Link } from 'react-router-dom';
import totalitems from '../products.json';
import seedrandom from 'seedrandom';

const Category = (props) => {
    const { category } = props;
    const [filteredItems, setFilteredItems] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        filterItems();
    }, [category])
    const filterItems = () => {
        const filteredProducts = totalitems.products.filter((product) => product.category === atob(category) || product.type === atob(category));
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
        <div style={{ padding: '2em' }}>
            <h3 style={{ padding: '0.5em' }}>{atob(category)}</h3>
            <div className="products-container">
                {filteredItems.slice(0, showAll ? filteredItems.length : 8)
                    .map(product => (
                        <Item item={product} />
                    ))}
                {!showAll && filteredItems.length > 8 && (
                    <Link
                        className="show-all-button"
                        onClick={toggleShowAll}
                        style={{ fontSize: '1.5em' }}
                        to={`/${category}`}
                    >
                        &gt;&gt;
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Category
