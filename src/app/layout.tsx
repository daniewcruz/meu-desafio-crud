import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fontes do Google: Geist (sans-serif) para texto geral
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Mono para código/tipografia monoespaçada
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados da aplicação (título, descrição para SEO)
export const metadata: Metadata = {
  title: "Desafio CRUD",
  description: "Desafio CRUD",
};

// Layout raiz da aplicação que envolve todas as páginas
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme="crud" ativa o tema customizado definido em globals.css
    // (com cores: azul primary, roxo secondary, teal accent, verde/vermelho/âmbar para CRUD)
    <html lang="pt-br" data-theme="crud">
      {/* 
        body com:
        - Classes de fonte Geist (variáveis CSS para --font-geist-sans/mono)
        - antialiased: suavização de renderização de texto
        - min-h-screen: altura mínima 100vh
        - text-base-content: cor de texto do tema CRUD
        - Sem bg-base-200 (removido para permitir background da página com gradiente)
      */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-base-content`}>
        {children}
      </body>
    </html>
  );
}
