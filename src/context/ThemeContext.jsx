import { createContext, useContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') ?? 'dark'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    gsap.to('body', {
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => setTheme(newTheme),
    });

    gsap.to('.glow-ring-outer', {
      scale: 1.15,
      duration: 0.4,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
    });
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg', '#050515');
      root.style.setProperty('--text', '#fff7f1');
      root.style.setProperty('--accent', '#e86d04');
    } else {
      root.style.setProperty('--bg', 'rgb(234 245 252)');
      root.style.setProperty('--text', '#0b0b0b');
      root.style.setProperty('--accent', '#e86d04');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
