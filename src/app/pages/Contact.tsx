import { Footer } from "../components/Footer";
import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate a network request
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[64px] md:pt-[80px] px-[48px] md:px-[86px]">
        <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] leading-none font-normal font-sans">
          Contact <span className="text-[#ed1f27]">Us</span>
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[32px] pb-[100px] max-w-[800px]">
        {status === "success" ? (
          <div className="text-[20px] md:text-[30px] text-[#8e8e8e] dark:text-white font-normal font-sans leading-tight">
            Thank you for reaching out. We will get back to you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[#8e8e8e] text-[20px] font-normal">Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-[20px] md:text-[25px] py-2 focus:outline-none focus:border-[#ed1f27] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#8e8e8e] text-[20px] font-normal">Email</label>
              <input 
                type="email" 
                id="email" 
                required
                className="bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-[20px] md:text-[25px] py-2 focus:outline-none focus:border-[#ed1f27] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[#8e8e8e] text-[20px] font-normal">Message</label>
              <textarea 
                id="message" 
                required
                rows={4}
                className="bg-transparent border-b border-[#8e8e8e] text-black dark:text-white text-[20px] md:text-[25px] py-2 focus:outline-none focus:border-[#ed1f27] transition-colors resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="text-[#ed1f27] text-[20px] md:text-[25px] font-normal font-sans hover:opacity-80 transition-opacity w-fit mt-4 text-left disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
