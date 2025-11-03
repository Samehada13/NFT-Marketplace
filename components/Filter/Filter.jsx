import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaFilter, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Filter = ({ onCategoryFilter, activeCategory }) => {
    const [filter, setFilter] = useState(true);
    const { t } = useTranslation();

    const categories = [
        { name: 'All', label: t('pages.home.filter.all') },
        { name: 'Painting', label: t('pages.home.filter.painting') },
        { name: 'Drawing', label: t('pages.home.filter.drawing') },
        { name: 'Sculpture', label: t('pages.home.filter.sculpture') },
        { name: 'Printmaking', label: t('pages.home.filter.printMaking') },
        { name: 'Photography', label: t('pages.home.filter.photography') },
        { name: 'Digital Art', label: t('pages.home.filter.digitalArt') },
    ];

    const openFilter = () => {
        setFilter(!filter);
    };

    const handleCategoryChange = (index) => {
        onCategoryFilter(categories[index].name);
    };

    const selectedIndex = categories.findIndex(cat => cat.name === activeCategory);

    return (
        <div className="w-full py-4 px-6">
            <div className="flex items-center justify-between gap-4">
                <Tab.Group selectedIndex={selectedIndex >= 0 ? selectedIndex : 0} onChange={handleCategoryChange}>
                    <div className="flex-1">
                        <Tab.List className="flex items-center gap-3 flex-wrap">
                            {categories.map((category) => (
                                <Tab
                                    key={category.name}
                                    className={({ selected }) =>
                                        `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                            selected
                                                ? 'primary-bg text-white shadow-md focus:ring-blue-500'
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

                <div className="flex-shrink-0">
                    <button
                        onClick={openFilter}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    >
                        <FaFilter className="text-sm" />
                        <span>{t('pages.home.filter.filter')}</span>
                        {filter ? <FaAngleDown className="text-sm" /> : <FaAngleUp className="text-sm" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;