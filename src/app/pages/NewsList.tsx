import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface ArticleMeta {
  id: string;
  date: string;
  title: string;
}

export function NewsList() {
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedArticles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          date: doc.data().date
        }));
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }
    
    // Only fetch if Firebase is likely configured (basic check)
    if (db.app.options.apiKey !== "AIzaSy_YOUR_API_KEY") {
      fetchArticles();
    } else {
      setLoading(false);
      // Fallback mock data if Firebase isn't set up yet
      setArticles([
        { id: "1", date: "May 07, 2026", title: "Configure Firebase to see real articles" },
      ]);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[64px] md:pt-[80px] px-[48px] md:px-[86px]">
        <div className="flex items-center gap-6">
          <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] leading-none font-normal font-sans">
            News
          </h1>
          <span className="text-[#ed1f27] text-[40px] md:text-[50px] leading-none font-normal font-sans">
            05/26
          </span>
        </div>
        <Link to="/" className="text-[#8e8e8e] hover:opacity-80 transition-opacity flex items-center">
          <ArrowLeft strokeWidth={1} size={48} />
        </Link>
      </header>

      {/* News List */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[40px] pb-[100px]">
        {loading ? (
          <p className="text-[#8e8e8e] text-2xl font-normal">Loading news...</p>
        ) : articles.length === 0 ? (
          <p className="text-[#8e8e8e] text-2xl font-normal">No news articles found.</p>
        ) : (
          articles.map((article) => (
            <Link 
              key={article.id} 
              to={`/news/${article.id}`}
              className="flex flex-col gap-2 group cursor-pointer"
            >
              <span className="text-black dark:text-white transition-colors text-[20px] md:text-[30px] font-normal">
                {article.date}
              </span>
              <h2 className="text-[#ed1f27] text-[20px] md:text-[30px] font-normal group-hover:underline">
                {article.title}
              </h2>
            </Link>
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}
