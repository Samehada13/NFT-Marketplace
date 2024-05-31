import "../styles/globals.css";
import { NavBar, Footer } from "../components/componentIndex";
import { NFTMarketplaceProvider } from '../context/NFTMarketplaceContext';

import { I18nextProvider } from "react-i18next";
import i18n from "../language/i18n";


const MyApp = ({ Component, pageProps }) => (
  <div>
    <I18nextProvider i18n={i18n}>
      <NFTMarketplaceProvider>
        <NavBar/>
        <Component {...pageProps} />
        <Footer/>
      </NFTMarketplaceProvider>
    </I18nextProvider>
  </div>
);

export default MyApp;
