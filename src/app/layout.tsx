import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "VS Search Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col relative min-h-screen">
        <div className="flex-grow">{children}</div>
        {/* <footer className="mt-10 py-10 w-full h-14 flex flex-col items-center justify-center absolute bottom-0 left-0">
          <h1 className="font-bold text-xl font-sans capitalize">
            @Shivaji 2024
          </h1>
        </footer> */}
      </body>
    </html>
  );
}
