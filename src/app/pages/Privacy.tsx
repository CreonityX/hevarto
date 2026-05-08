import { Footer } from "../components/Footer";

export function Privacy() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[64px] md:pt-[80px] px-[48px] md:px-[86px]">
        <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] leading-none font-normal font-sans">
          Privacy Policy
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[32px] pb-[100px] w-full">
        <div className="prose prose-lg dark:prose-invert max-w-none text-black dark:text-white text-[16px] md:text-[20px] font-normal font-sans leading-relaxed">
          <p className="text-sm text-[#8e8e8e]"><strong>Effective Date: May 8, 2026</strong></p>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">1. Introduction</h2>
          <p>Welcome to Hevarto ("we," "our," or "us"). Hevarto operates as a subsidiary platform under our parent organization, Creonity. This Privacy Policy governs your use of our website, services, and associated platforms. We respect your privacy and are deeply committed to protecting the personal data of our creators, partners, and visitors. This comprehensive document outlines how we collect, use, store, and share your information.</p>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">2. Information We Collect</h2>
          <p>We may collect several types of information from and about users of our Website, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Personal Data:</strong> Information by which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline.</li>
            <li><strong>Business Data:</strong> Information related to your brand, creative projects, funding requests, and professional associations necessary for us to render our brand-building services.</li>
            <li><strong>Automated Usage Data:</strong> Details of your visits to our Website, including traffic data, location data, logs, and other communication data and the resources that you access and use on the Website.</li>
            <li><strong>Device Information:</strong> Information about your computer and internet connection, including your IP address, operating system, and browser type.</li>
          </ul>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>To present our Website and its contents to you.</li>
            <li>To provide you with information, products, or services that you request from us or our parent organization, Creonity.</li>
            <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
            <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
            <li>To improve our platform, conduct market research, and perform internal data analytics to align with Creonity's broader vision.</li>
          </ul>

          <h2 className="text-2xl font-medium mt-8 mb-4">4. Information Sharing and Disclosure</h2>
          <p>We are not data brokers; we do not sell your personal data. We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Parent Organization:</strong> To our parent company, Creonity, and its affiliates to provide integrated services and ensure cohesive brand-building experiences.</li>
            <li><strong>Service Providers:</strong> To contractors, service providers, and other third parties we use to support our business and who are bound by contractual obligations to keep personal information confidential.</li>
            <li><strong>Legal Requirements:</strong> To comply with any court order, law, or legal process, including to respond to any government or regulatory request.</li>
            <li><strong>Business Transfers:</strong> To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Hevarto's or Creonity's assets.</li>
          </ul>

          <h2 className="text-2xl font-medium mt-8 mb-4">5. Data Retention & Security</h2>
          <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. We will retain your personal data only for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">6. Your Privacy Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to request access to, correction of, or deletion of your personal data. You may also have the right to object to processing, request data portability, or withdraw consent. To exercise any of these rights, please contact us using the information below.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">7. Changes to Our Privacy Policy</h2>
          <p>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Website home page. The date the privacy policy was last revised is identified at the top of the page.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">8. Contact Information</h2>
          <p>To ask questions or comment about this privacy policy and our privacy practices, please contact us at <a href="mailto:connect@hevarto.com" className="text-[#ed1f27] hover:underline">connect@hevarto.com</a>.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
