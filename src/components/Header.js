import {ThemeContext} from '../Provider';
import { useContext } from 'react';
import Helmet from 'react-helmet';

function Header() {
  const {theme, setTheme} = useContext(ThemeContext);

  return (
    <header className={`header-${theme}`}>
      <Helmet>
        <body className={`${theme}-bg`} />
      </Helmet>
      <div className="container flex-center">
        <h1>Where in the world?</h1>
        <button className={`dark-mode dark-mode-${theme}`} onClick={setTheme}> <svg xmlns="http://www.w3.org/2000/svg" className="moon" viewBox="0 0 512 512"><title>Moon</title><path d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="32"/></svg> Dark Mode</button>
      </div>
    </header>
  );
}

export default Header;