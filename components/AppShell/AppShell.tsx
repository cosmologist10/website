import Footer from "./components/Footer";
import Header from "./components/Header";

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="main z-2">{children}</main>
      <Footer />
    </>
  );
}
