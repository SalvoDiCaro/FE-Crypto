import { lazy, Suspense, useState } from "react";
import { ChakraProvider, withDefaultColorScheme } from "@chakra-ui/react";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCrypto } from "./hooks/useCrypto";
import { useEffect } from "react";
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Favourites = lazy(() => import("./pages/Favourites/Favourites"));
const Trading = lazy(() => import("./pages/Trading/Trading"));

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "orange" })
);

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchCryptos } = useCrypto();

  useEffect(() => {
    setIsLoading(true);
    fetchCryptos();
    setTimeout(() => setIsLoading(false), 2000);
    const interval = setInterval(fetchCryptos, 32000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <BrowserRouter>
          <Suspense fallback={<></>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};
