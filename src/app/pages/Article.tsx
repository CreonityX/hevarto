import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleData {
  title: string;
  date: string;
  content: string;
  contacts?: { name: string; email: string }[];
}

export function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!id) return;
      try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle(docSnap.data() as ArticleData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (db.app.options.apiKey !== "AIzaSy_YOUR_API_KEY") {
      fetchArticle();
    } else {
      setLoading(false);
      // Fallback for missing config
      setArticle({
        title: "Firebase not configured",
        date: "Today",
        content: "Please set up Firebase in `src/lib/firebase.ts`.",
      });
    }
  }, [id]);
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[64px] md:pt-[80px] px-[48px] md:px-[86px]">
        <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] leading-none font-normal font-sans">
          News
        </h1>
        <Link to="/news" className="text-[#8e8e8e] hover:opacity-80 transition-opacity flex items-center">
          <ArrowLeft strokeWidth={1} size={48} />
        </Link>
      </header>

      {/* Article Content */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[32px] pb-[100px] max-w-[1400px]">
        {loading ? (
          <p className="text-[#8e8e8e] text-2xl font-normal">Loading article...</p>
        ) : !article ? (
          <p className="text-[#8e8e8e] text-2xl font-normal">Article not found.</p>
        ) : (
          <>
            <div className="flex justify-between items-end pb-4">
              <span className="text-[#8e8e8e] text-xl font-normal">{article.date}</span>
            </div>
            <h1 className="text-[32px] md:text-[50px] leading-tight text-black dark:text-white transition-colors font-normal font-sans">
              {article.title}
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-[#ed1f27] prose-a:no-underline hover:prose-a:underline text-black dark:text-white text-[16px] md:text-[20px] leading-relaxed font-sans">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>

            {article.contacts && article.contacts.length > 0 && (
              <div className="mt-16 pt-8 flex flex-col gap-4">
                <h3 className="text-xl font-medium text-black dark:text-white">Contacts:</h3>
                {article.contacts.map((contact, index) => (
                  <div key={index} className="flex gap-2 text-lg text-black dark:text-white">
                    <span>{contact.name}</span>
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="text-[#ed1f27] hover:underline">
                        {contact.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
