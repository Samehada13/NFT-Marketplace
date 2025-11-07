import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FaFilter, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Filter = ({ onCategoryFilter, activeCategory = 'All' }) => {
  const [filter, setFilter] = useState(true);
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const categories = [
    { name: 'All', label: t('pages.home.filter.all') },
    { name: 'Painting', label: t('pages.home.filter.painting') },
    { name: 'Drawing', label: t('pages.home.filter.drawing') },
    { name: 'Sculpture', label: t('pages.home.filter.sculpture') },
    { name: 'Printmaking', label: t('pages.home.filter.printMaking') },
    { name: 'Photography', label: t('pages.home.filter.photography') },
    { name: 'Digital Art', label: t('pages.home.filter.digitalArt') },
  ];

  useEffect(() => {
    const index = categories.findIndex((cat) => cat.name === activeCategory);
    setSelectedTab(index >= 0 ? index : 0);
  }, [activeCategory, categories]);

  const openFilter = () => {
    setFilter(!filter);
  };

  const handleCategoryChange = (index) => {
    setSelectedTab(index);
    onCategoryFilter(categories[index].name);
  };

  return (
    <div className='w-full py-4 px-6'>
      <div className='flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide'>
        <Tab.Group
          selectedIndex={selectedTab}
          onChange={handleCategoryChange}
        >
          <div className='flex-1'>
            <Tab.List className='flex items-center gap-3 py-2 -mx-2 px-2 scrollbar-hide'>
              {categories.map((category, index) => (
                <Tab
                  key={category.name}
                  className={({ selected }) =>
                    `flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none ${
                      selected
                        ? 'bg-violet-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400'
                    }`
                  }
                >
                  {category.label}
                </Tab>
              ))}
            </Tab.List>
          </div>
        </Tab.Group>

        <div className='flex-shrink-0'>
          <button
            onClick={openFilter}
            className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
          >
            <FaFilter className='text-sm' />
            <span>{t('pages.home.filter.filter')}</span>
            {filter ? (
              <FaAngleDown className='text-sm' />
            ) : (
              <FaAngleUp className='text-sm' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
