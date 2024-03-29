import type { Metadata } from "next";
import { NotificationProvider } from "@/_contexts/Notification";
import "./globals.css";
import { Notification } from "@/_components/personality/Notification";

export const metadata: Metadata = {
  title: "Carga De Notas",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotificationProvider>
      <html lang="es">
        <body className='min-h-screen w-full bg-gray-50'>
          {children}
          <Notification />
        </body>
      </html>
    </NotificationProvider>
  );
}
