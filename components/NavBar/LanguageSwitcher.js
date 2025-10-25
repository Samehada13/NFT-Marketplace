import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'tag', name: 'Tagalog' },
    { code: 'bik', name: 'Bikol' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <span className='material-symbols-rounded'>language</span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute rounded-sm right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-2 ">
                {languages.map((lang) => (
                  <Menu.Item key={lang.code}>
                    {({ active }) => (
                      <button
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className={`${
                          i18n.language === lang.code
                            ? 'bg-indigo-100 rounded-md dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        } ${
                          active ? 'bg-indigo-100 rounded-md dark:bg-gray-700' : ''
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        {lang.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default LanguageSwitcher;
