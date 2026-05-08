import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  User 
} from "firebase/auth";
import { db, auth } from "../../lib/firebase";
import { ArrowLeft, Plus, Trash2, LogOut, Edit2 } from "lucide-react";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Contact {
  name: string;
  email: string;
}

interface ArticleMeta {
  id: string;
  title: string;
  date: string;
  content: string;
  contacts: Contact[];
  author?: { name: string; position: string };
}

const ALLOWED_EMAILS = [
  "rishabh.g23csai@nst.rishihood.edu.in",
  "meet.ahuja2024@nst.rishihood.edu.in"
];

export function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Auth Form State
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState("");

  // Dashboard State
  const [articles, setArticles] = useState<ArticleMeta[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [view, setView] = useState<"dashboard" | "editor">("dashboard");

  // Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  );
  const [authorName, setAuthorName] = useState("");
  const [authorPosition, setAuthorPosition] = useState("");
  const [content, setContent] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([{ name: "", email: "" }]);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser && ALLOWED_EMAILS.includes(currentUser.email || "")) {
        fetchArticles();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedArticles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        date: doc.data().date,
        content: doc.data().content,
        contacts: doc.data().contacts || [],
        author: doc.data().author,
      }));
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!ALLOWED_EMAILS.includes(authEmail)) {
      setAuthError("Unauthorized email. You are not allowed to access the admin portal.");
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, authEmail, authPassword);
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setAuthError("Account already exists. Please log in instead.");
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        setAuthError("Invalid email or password.");
      } else {
        setAuthError(error.message || "Authentication failed.");
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleAddContact = () => {
    setContacts([...contacts, { name: "", email: "" }]);
  };

  const handleRemoveContact = (index: number) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const resetEditor = () => {
    setEditingId(null);
    setTitle("");
    setDate(
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    );
    setAuthorName("");
    setAuthorPosition("");
    setContent("");
    setContacts([{ name: "", email: "" }]);
    setSaveMessage("");
    setIsPreview(false);
  };

  const handleCreateNew = () => {
    resetEditor();
    setView("editor");
  };

  const handleEdit = (article: ArticleMeta) => {
    setEditingId(article.id);
    setTitle(article.title);
    setDate(article.date);
    setAuthorName(article.author?.name || "");
    setAuthorPosition(article.author?.position || "");
    setContent(article.content);
    setContacts(article.contacts.length > 0 ? article.contacts : [{ name: "", email: "" }]);
    setSaveMessage("");
    setIsPreview(false);
    setView("editor");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;
    
    try {
      await deleteDoc(doc(db, "news", id));
      // Remove from local state
      setArticles(articles.filter(a => a.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Error deleting article.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      const data = {
        title,
        date,
        author: { name: authorName, position: authorPosition },
        content,
        contacts: contacts.filter((c) => c.name || c.email),
      };

      if (editingId) {
        // Update existing document
        await updateDoc(doc(db, "news", editingId), data);
        setSaveMessage("Article updated successfully!");
      } else {
        // Create new document
        await addDoc(collection(db, "news"), {
          ...data,
          createdAt: new Date().toISOString(),
        });
        setSaveMessage("Article created successfully!");
      }
      
      // Refresh list
      fetchArticles();
      
      // Go back to dashboard after brief delay
      setTimeout(() => {
        setView("dashboard");
        resetEditor();
      }, 1500);

    } catch (error) {
      console.error("Error saving document: ", error);
      setSaveMessage("Error saving article. Make sure Firestore rules allow writes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return <div className="flex min-h-[100dvh] items-center justify-center bg-transparent"><p className="text-[#8e8e8e] text-2xl">Checking authentication...</p></div>;
  }

  if (!user || !ALLOWED_EMAILS.includes(user.email || "")) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-transparent items-center justify-center px-[48px]">
        <div className="w-full max-w-md flex flex-col gap-8">
          <Link to="/" className="text-[#8e8e8e] hover:opacity-80 transition-opacity mb-4 inline-flex items-center gap-2">
            <ArrowLeft strokeWidth={1} size={24} /> Back to site
          </Link>
          <h1 className="text-[#8e8e8e] text-[40px] font-normal">
            Admin <span className="text-[#ed1f27]">Portal</span>
          </h1>
          
          <form onSubmit={handleAuth} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[#8e8e8e] text-lg">Email Address</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-xl pb-2 focus:outline-none focus:border-[#ed1f27]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#8e8e8e] text-lg">Password</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-xl pb-2 focus:outline-none focus:border-[#ed1f27]"
              />
            </div>

            {authError && <p className="text-[#ed1f27] text-sm">{authError}</p>}

            <button
              type="submit"
              className="bg-[#ed1f27] text-white px-8 py-3 rounded-full text-xl hover:opacity-90 transition-opacity mt-4"
            >
              {isSignUp ? "Sign Up & Access" : "Log In"}
            </button>

            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setAuthError(""); }}
              className="text-[#8e8e8e] hover:text-black dark:hover:text-white transition-colors text-sm"
            >
              {isSignUp ? "Already have an account? Log in" : "First time? Create an account"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin View
  return (
    <div className="flex flex-col min-h-[100dvh] bg-transparent pb-[100px]">
      <header className="flex justify-between items-center pt-[48px] md:pt-[64px] px-[48px] md:px-[86px]">
        <div className="flex flex-col">
          <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] font-normal">
            Admin <span className="text-[#ed1f27]">Portal</span>
          </h1>
          <span className="text-[#8e8e8e] text-sm">Logged in as {user.email}</span>
        </div>
        <div className="flex gap-4 items-center">
          {view === "editor" && (
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="px-6 py-2 border border-[#8e8e8e] rounded-full text-[#8e8e8e] hover:text-black dark:hover:text-white transition-colors hidden md:block"
            >
              {isPreview ? "Edit Mode" : "Preview"}
            </button>
          )}
          <button onClick={handleLogout} className="text-[#8e8e8e] hover:text-[#ed1f27] transition-colors p-2" title="Log Out">
            <LogOut strokeWidth={1} size={32} />
          </button>
          <Link to="/" className="text-[#8e8e8e] hover:opacity-80 transition-opacity p-2 hidden md:block" title="Back to Site">
            <ArrowLeft strokeWidth={1} size={48} />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[40px] max-w-[1400px]">
        
        {view === "dashboard" && (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex justify-between items-center border-b border-[#8e8e8e]/30 pb-4">
              <h2 className="text-2xl text-black dark:text-white font-medium">Published Articles</h2>
              <button 
                onClick={handleCreateNew}
                className="bg-[#ed1f27] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={20} /> Create New
              </button>
            </div>

            {loadingArticles ? (
              <p className="text-[#8e8e8e] text-xl">Loading articles...</p>
            ) : articles.length === 0 ? (
              <p className="text-[#8e8e8e] text-xl">No articles published yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {articles.map(article => (
                  <div key={article.id} className="flex justify-between items-center border border-[#8e8e8e]/30 p-6 rounded-xl hover:border-[#ed1f27]/50 transition-colors bg-black/5 dark:bg-white/5">
                    <div className="flex flex-col gap-2">
                      <span className="text-[#8e8e8e] text-sm">{article.date}</span>
                      <h3 className="text-xl md:text-2xl text-black dark:text-white font-medium">{article.title}</h3>
                    </div>
                    <div className="flex gap-2 md:gap-4">
                      <button 
                        onClick={() => handleEdit(article)}
                        className="text-[#8e8e8e] hover:text-black dark:hover:text-white p-2 flex items-center gap-1 transition-colors"
                      >
                        <Edit2 size={20} /> <span className="hidden md:inline">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(article.id)}
                        className="text-[#8e8e8e] hover:text-[#ed1f27] p-2 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={20} /> <span className="hidden md:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "editor" && !isPreview && (
          <div className="flex flex-col gap-8 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => setView("dashboard")}
                className="text-[#8e8e8e] hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={20} /> Back to Dashboard
              </button>
              
              {/* Mobile preview toggle */}
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="px-4 py-1 text-sm border border-[#8e8e8e] rounded-full text-[#8e8e8e] hover:text-black dark:hover:text-white transition-colors md:hidden"
              >
                Preview
              </button>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-[#8e8e8e] text-lg">Article Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title..."
                className="w-full bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-3xl pb-2 focus:outline-none focus:border-[#ed1f27] transition-colors"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-[#8e8e8e] text-lg">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. May 07, 2026"
                className="w-full bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-xl pb-2 focus:outline-none focus:border-[#ed1f27] transition-colors"
              />
            </div>

            {/* Author */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#8e8e8e] text-lg">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-xl pb-2 focus:outline-none focus:border-[#ed1f27] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#8e8e8e] text-lg">Author Position</label>
                <input
                  type="text"
                  value={authorPosition}
                  onChange={(e) => setAuthorPosition(e.target.value)}
                  placeholder="e.g. Senior Editor"
                  className="w-full bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-xl pb-2 focus:outline-none focus:border-[#ed1f27] transition-colors"
                />
              </div>
            </div>

            {/* Markdown Editor */}
            <div className="flex flex-col gap-2">
              <label className="text-[#8e8e8e] text-lg">Content (Markdown supported)</label>
              <p className="text-sm text-[#8e8e8e]">
                Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">[Link Text](url)</code> to create links.
              </p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article here..."
                className="w-full h-[400px] bg-transparent border border-[#8e8e8e] rounded-lg p-4 text-black dark:text-white text-lg focus:outline-none focus:border-[#ed1f27] transition-colors resize-y"
              />
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-[#8e8e8e] text-lg">Contacts</label>
                <button
                  onClick={handleAddContact}
                  className="flex items-center gap-1 text-[#ed1f27] hover:opacity-80"
                >
                  <Plus size={20} /> Add Contact
                </button>
              </div>
              {contacts.map((contact, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => handleContactChange(index, "name", e.target.value)}
                    placeholder="Name"
                    className="flex-1 bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-lg pb-2 focus:outline-none focus:border-[#ed1f27]"
                  />
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => handleContactChange(index, "email", e.target.value)}
                    placeholder="Email"
                    className="flex-1 bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-lg pb-2 focus:outline-none focus:border-[#ed1f27]"
                  />
                  <button
                    onClick={() => handleRemoveContact(index)}
                    className="text-[#8e8e8e] hover:text-[#ed1f27] p-2"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#ed1f27] text-white px-8 py-3 rounded-full text-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {isSaving ? "Saving..." : (editingId ? "Update Article" : "Publish Article")}
              </button>
              {saveMessage && (
                <span className={`text-lg ${saveMessage.includes("Error") ? "text-[#ed1f27]" : "text-green-500"}`}>
                  {saveMessage}
                </span>
              )}
            </div>
          </div>
        )}

        {view === "editor" && isPreview && (
          /* Preview Mode */
          <div className="flex flex-col gap-[32px] w-full border border-dashed border-[#8e8e8e] p-8 rounded-xl relative">
            
            {/* Mobile preview toggle inside preview */}
            <button
              onClick={() => setIsPreview(false)}
              className="absolute top-4 right-4 px-4 py-1 text-sm border border-[#8e8e8e] rounded-full text-[#8e8e8e] hover:text-black dark:hover:text-white transition-colors md:hidden"
            >
              Edit Mode
            </button>

            <div className="text-[#8e8e8e] mb-4 flex justify-between pb-4">
              <span className="hidden md:inline">Live Preview</span>
              <span className="md:hidden"></span>
              <span>{date || "Date Placeholder"}</span>
            </div>
            
            <h1 className="text-[32px] md:text-[50px] leading-tight text-black dark:text-white transition-colors font-normal">
              {title || "Article Title Placeholder"}
            </h1>

            {(authorName || authorPosition) && (
              <div className="flex flex-col mt-4 mb-2">
                {authorName && <span className="text-black dark:text-white text-lg font-medium">By {authorName}</span>}
                {authorPosition && <span className="text-[#8e8e8e] text-md">{authorPosition}</span>}
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-[#ed1f27] prose-a:no-underline hover:prose-a:underline text-black dark:text-white text-[16px] md:text-[20px] leading-relaxed mt-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "*Article content will appear here...*"}
              </ReactMarkdown>
            </div>

            {contacts.some((c) => c.name || c.email) && (
              <div className="mt-16 pt-8 flex flex-col gap-4">
                <h3 className="text-xl font-medium text-black dark:text-white">Contacts:</h3>
                {contacts.map((contact, index) => (
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
          </div>
        )}

      </main>
    </div>
  );
}
