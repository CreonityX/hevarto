import { Footer } from "../components/Footer";

export function About() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[64px] md:pt-[80px] px-[48px] md:px-[86px]">
        <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] leading-none font-normal font-sans">
          About
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[24px] md:mt-[32px] gap-[16px] pb-[40px] max-w-[1400px]">
        <div className="w-full flex flex-col gap-3 text-[#8e8e8e] dark:text-[#a0a0a0] text-[15px] md:text-[17px] font-normal font-sans leading-[1.55]">
          <p>
            Hevarto started as a technology company. We built products for other people — helped them move faster, think through hard problems, get things off the ground. It was good work, and it put us close to a lot of different industries, a lot of different users, and a lot of problems worth solving.
          </p>
          <p>
            That closeness is what changed things. We kept seeing the same thing: a real problem, sitting right there, with no product built around it yet. Not a gap someone was about to fill. Just an open space. And we had the skills, the context, and the conviction to step into it.
          </p>
          <p>
            So in May 2026, we restructured. Hevarto became the foundation — the place where new companies are built from scratch, given room to grow, and eventually operate entirely on their own. Each one under its own name, with its own team and its own direction. What ties them together is where they started.
          </p>
          <p>
            We are not a fund. We do not back other people's ideas. We build our own, and we hold them for the long term. That is the whole model.
          </p>
          <p>
            We are early. The first venture, Creonity, is live and seeking its first round of funding. A second is in development. There will be more. We are taking the time to build each one properly, which means we will not always be loud about what we are working on.
          </p>
          <p className="text-black dark:text-white font-medium mt-4">
            But we are working.
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <img
              src="/meet-sign.png"
              alt="Meet Ahuja Signature"
              className="h-[56px] w-auto object-contain self-start dark:invert opacity-90 mix-blend-multiply dark:mix-blend-normal"
            />
            <div className="flex flex-col text-lg text-black dark:text-white mt-2">
              <span className="font-medium">Meet Ahuja</span>
              <span className="text-[#8e8e8e] text-base">Co-founder</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
