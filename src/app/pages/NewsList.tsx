import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/Footer";

const mockArticles = [
  { id: 1, date: "May 07, 2026", title: "Announcing the revamp of Hevarto, switch to Parent Org" },
  { id: 2, date: "May 07, 2026", title: "Announcing the revamp of Hevarto, switch to Parent Org" },
  { id: 3, date: "May 07, 2026", title: "Announcing the revamp of Hevarto, switch to Parent Org" },
  { id: 4, date: "May 07, 2026", title: "Announcing the revamp of Hevarto, switch to Parent Org" },
];

export function NewsList() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[48px] md:pt-[64px] px-[48px] md:px-[86px]">
        <div className="flex items-center gap-6">
          <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] font-normal font-['Google_Sans_Flex',sans-serif]">
            News
          </h1>
          <span className="text-[#ed1f27] text-[40px] md:text-[50px] font-normal font-['Google_Sans_Flex',sans-serif]">
            05/26
          </span>
        </div>
        <Link to="/" className="text-[#8e8e8e] hover:opacity-80 transition-opacity p-2">
          <ArrowLeft strokeWidth={1} size={48} />
        </Link>
      </header>

      {/* News List */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[40px] pb-[100px]">
        {mockArticles.map((article) => (
          <Link 
            key={article.id} 
            to={`/news/${article.id}`}
            className="flex flex-col gap-2 group cursor-pointer"
          >
            <span className="text-black dark:text-white transition-colors text-[20px] md:text-[30px] font-normal font-['Google_Sans_Flex',sans-serif]">
              {article.date}
            </span>
            <h2 className="text-[#ed1f27] text-[20px] md:text-[30px] font-normal font-['Google_Sans_Flex',sans-serif] group-hover:underline">
              {article.title}
            </h2>
          </Link>
        ))}
      </main>

      <Footer />
    </div>
  );
}
