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
  author?: { name: string; position: string };
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
    <div className="flex flex-col min-h-[100dvh] bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[64px] md:pt-[80px] px-[48px] md:px-[86px]">
        <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] leading-none font-normal font-sans">
          News
        </h1>
      </header>

      {/* Article Content */}
      <main className="flex-1 flex flex-col items-center px-[48px] md:px-[86px] mt-[24px] md:mt-[32px] gap-[24px] pb-[100px] w-full max-w-[1400px] mx-auto">
        <div className="w-full max-w-[800px] flex flex-col gap-[24px]">
          {loading ? (
            <p className="text-[#8e8e8e] text-xl font-normal">Loading article...</p>
          ) : !article ? (
            <p className="text-[#8e8e8e] text-xl font-normal">Article not found.</p>
          ) : (
            <>
              <h1 className="text-[36px] md:text-[46px] leading-[1.2] text-[#202124] dark:text-white transition-colors font-medium font-sans">
                {article.title}
              </h1>
              
              {article.author?.name && (
                <div className="flex flex-col mt-2 mb-2">
                  <span className="text-[#202124] dark:text-white text-lg font-medium">By {article.author.name}</span>
                  {article.author.position && (
                    <span className="text-[#5f6368] text-md">{article.author.position}</span>
                  )}
                </div>
              )}

              {/* The date and content */}
              <div className="prose prose-lg dark:prose-invert max-w-none 
                prose-p:text-[#3c4043] dark:prose-p:text-gray-300 prose-p:text-[19px] prose-p:leading-[1.7] prose-p:font-sans
                prose-headings:text-[#202124] dark:prose-headings:text-white prose-headings:font-medium
                prose-a:text-[#ed1f27] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-li:text-[#3c4043] dark:prose-li:text-gray-300 prose-li:text-[19px]
                mt-4">
                {/* Alphabet style dateline prepended to content, or just standard date above */}
                <p className="text-[#5f6368] dark:text-gray-400 font-medium mb-6 uppercase tracking-wider text-sm">
                  {article.date}
                </p>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>

              {article.contacts && article.contacts.length > 0 && (
                <div className="mt-12 pt-8 flex flex-col gap-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-[22px] font-medium text-[#202124] dark:text-white">Contact</h3>
                  {article.contacts.map((contact, index) => (
                    <div key={index} className="flex flex-col text-[17px] text-[#3c4043] dark:text-gray-300 font-sans">
                      <span className="font-medium">{contact.name}</span>
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} className="text-[#ed1f27] hover:underline font-medium">
                          {contact.email}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
