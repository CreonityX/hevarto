import { Link } from "react-router";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Header */}
      <header className="flex justify-end pt-[43px] px-[48px] md:px-[86px]">
        <Link 
          to="/news" 
          className="text-[#ed1f27] text-[24px] md:text-[30px] font-normal font-['Google_Sans_Flex',sans-serif] hover:opacity-80 transition-opacity"
        >
          News
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col pt-[15vh] md:pt-[200px] px-[48px] md:px-[86px] pb-[100px]">
        <div className="max-w-[800px]">
          <h1 className="text-[32px] md:text-[50px] leading-tight text-[#8e8e8e] font-normal font-['Google_Sans_Flex',sans-serif] whitespace-pre-wrap">
            Building <a href="https://creonity.com" target="_blank" rel="noopener noreferrer" className="text-[#ff2e9a] dark:text-[#DFFE00] font-medium font-['Champ',sans-serif] hover:opacity-80 transition-colors">Creonity</a> for the creators of tommorow
          </h1>
        </div>
      </main>

      <Footer />
    </div>
  );
}
