import '../styles/globals.css';
import '../sass/main.scss';
import { NavBar, Footer } from '../components/componentIndex';
import { NFTMarketplaceProvider } from '../context/NFTMarketplaceContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../language/i18n';
import 'material-symbols';
const MyApp = ({ Component, pageProps }) => (
  <div className="min-h-screen flex flex-col overflow-visible">
    <I18nextProvider i18n={i18n}>
      <NFTMarketplaceProvider>
        <NavBar/>
        <div className="flex-grow pt-16">
          <Component {...pageProps} />
        </div>
        <Footer/>
      </NFTMarketplaceProvider>
    </I18nextProvider>
  </div>
);

export default MyApp;
