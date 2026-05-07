import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/Footer";

export function Article() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[48px] md:pt-[64px] px-[48px] md:px-[86px]">
        <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] font-normal font-['Google_Sans_Flex',sans-serif]">
          News
        </h1>
        <Link to="/news" className="text-[#8e8e8e] hover:opacity-80 transition-opacity p-2">
          <ArrowLeft strokeWidth={1} size={48} />
        </Link>
      </header>

      {/* Article Content */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[32px] pb-[100px] max-w-[1400px]">
        <h1 className="text-[32px] md:text-[50px] leading-tight text-black dark:text-white transition-colors font-normal font-['Google_Sans_Flex',sans-serif]">
          Announicing the revamp of Hevarto, switch to Parent Org
        </h1>
        <p className="text-[16px] md:text-[20px] text-black dark:text-white transition-colors font-normal font-['Google_Sans_Flex',sans-serif]">
          Announcing the revamp of Hevarto, switch to Parent Org
        </p>
      </main>

      <Footer />
    </div>
  );
}
