import { Link } from "react-router";
import { Footer } from "../components/Footer";

export function Investors() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[64px] md:pt-[80px] px-[48px] md:px-[86px]">
        <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] leading-none font-normal font-sans">
          Investors <span className="text-[#ed1f27]">Relations</span>
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[32px] pb-[100px] max-w-[1400px]">
        <p className="text-[20px] md:text-[30px] text-[#8e8e8e] dark:text-white font-normal font-sans leading-tight whitespace-pre-wrap">
          We are building brands for the creators of tomorrow and looking for investors aligned with our vision.
        </p>
        <Link 
          to="/contact" 
          className="text-[#ed1f27] text-[18px] md:text-[25px] font-normal font-sans hover:opacity-80 transition-opacity w-fit mt-2"
        >
          Contact
        </Link>
      </main>

      <Footer />
    </div>
  );
}
