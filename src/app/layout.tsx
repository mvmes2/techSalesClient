'use client';
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "@/context/authContext";
import { CustomerContextProvider } from "@/context/customerContext";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/functions/check-is-public-route";
import PrivateRoute from "@/components/PrivateRoute";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { QueryClientProvider } from "@/lib/react-query/QueryClientProvider";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { StyledComponentsRegistry } from "@/lib/registry";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Prevenir o FOUC (Flash of Unstyled Content)
  useEffect(() => {
    // Pequeno atraso para garantir que os estilos sejam aplicados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const isPublicPage = checkIsPublicRoute(pathname!);

  return (
    <QueryClientProvider>
      <AuthContextProvider>
        <CustomerContextProvider>
          <StyledComponentsRegistry>
            <html lang="pt-BR">
              <body className={inter.className}>
                <GlobalStyles />
                {!isLoading && (
                  <>
                    {isPublicPage && children}
                    {!isPublicPage && (<PrivateRoute>{children}</PrivateRoute>)}
                  </>
                )}
                <ToastContainer />
              </body>
            </html>
          </StyledComponentsRegistry>
        </CustomerContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
