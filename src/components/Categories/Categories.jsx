import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProduct } from '../../contexts/ProductContext';
import useCategories from '../../hooks/useCategories';
import './categories.scss';

function Categories() {
  const { activeCategory, setActiveCategory } = useProduct();
  const [categories] = useCategories();
  const [customCategories, setCustomCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setCustomCategories([{ id: -1, name: 'Hepsi' }, ...categories.slice(0, 13), { id: categories.length, name: 'Diğer' }]);
  }, [categories]);

  useEffect(() => {
    const query = new URLSearchParams(searchParams);
    if (query.get('category')) {
      setActiveCategory(query.get('category'));
    }
  }, [searchParams]);

  return (
    <section className="category-container">
      <div className="category-area">
        {customCategories?.map((item) => (
          <div key={item.id} role="none" onClick={() => setSearchParams({ category: item.name })}>
            <div
              role="none"
              onClick={() => setActiveCategory(item?.name)}
              className={
              activeCategory === item?.name
                ? 'category-area-item item-active'
                : 'category-area-item'
            }
            >
              {item?.name.trim()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
