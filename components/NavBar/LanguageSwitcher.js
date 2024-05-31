// ... (your existing imports)
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../language/i18n';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);

  const changeLanguage = (language) => {
    console.log('Changing language to:', language);
    i18n.changeLanguage(language);
    setShowOptions(false);
  };

  const styles = {
    languageSwitcher: {
      position: 'relative',
      display: 'inline-block',
    },
    languageSwitcherButton: {
      cursor: 'pointer',
      fontSize: '24px',
      color: 'pink',
    },
    languageOptions: {
      position: 'absolute',
      top: '100%',
      left: 0,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      padding: '5px',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
    },
    languageOption: {
      cursor: 'pointer',
      padding: '5px',
    },
    chineseOption: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '5px',
      lineHeight: '1.2',
    },
  };

  return (
    <div style={styles.languageSwitcher}>
      <div
        style={styles.languageSwitcherButton}
        onClick={() => setShowOptions(!showOptions)}
      >
        🌐
      </div>
      {showOptions && (
        <div style={styles.languageOptions}>
          <div style={styles.languageOption} onClick={() => changeLanguage('en')}>
            English
          </div>
          <div style={styles.languageOption} onClick={() => changeLanguage('tag')}>
            Tagalog
          </div>
          <div style={styles.languageOption} onClick={() => changeLanguage('bik')}>
            Bikol
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
