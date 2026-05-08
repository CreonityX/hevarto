import { Footer } from "../components/Footer";

export function Terms() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center pt-[64px] md:pt-[80px] px-[48px] md:px-[86px]">
        <h1 className="text-[#8e8e8e] text-[40px] md:text-[50px] leading-none font-normal font-sans">
          Terms of <span className="text-[#ed1f27]">Service</span>
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col px-[48px] md:px-[86px] mt-[48px] md:mt-[64px] gap-[32px] pb-[100px] max-w-[1000px]">
        <div className="prose prose-lg dark:prose-invert max-w-none text-black dark:text-white text-[16px] md:text-[20px] font-normal font-sans leading-relaxed">
          <p className="text-sm text-[#8e8e8e]"><strong>Effective Date: May 8, 2026</strong></p>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">1. Acceptance of the Terms of Service</h2>
          <p>These terms of service are entered into by and between You and Hevarto, a platform operating under its parent organization, Creonity ("Company," "we," or "us"). The following terms and conditions govern your access to and use of our website and services. By using the Website, you accept and agree to be bound and abide by these Terms of Service and our Privacy Policy.</p>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">2. Our Services & Brand Ecosystem</h2>
          <p>Hevarto provides comprehensive brand-building services, media publication, and investor relations coordination tailored for the creators of tomorrow. Because we operate within the Creonity ecosystem, engaging with Hevarto may provide you with cross-platform benefits, subject to mutual agreement.</p>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">3. User Obligations and Conduct</h2>
          <p>You may use the Website only for lawful purposes and in accordance with these Terms of Service. You agree not to use the Website:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the content standards set out in these Terms.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which, as determined by us, may harm Hevarto or Creonity.</li>
          </ul>

          <h2 className="text-2xl font-medium mt-8 mb-4">4. Intellectual Property Rights</h2>
          <p>The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Hevarto, Creonity, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. No right, title, or interest in or to the Website or any content on the Website is transferred to you.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">5. Third-Party Links & Services</h2>
          <p>If the Website contains links to other sites and resources provided by third parties, these links are provided for your convenience only. We have no control over the contents of those sites or resources, and accept no responsibility for them or for any loss or damage that may arise from your use of them. If you decide to access any of the third-party websites linked to this Website, you do so entirely at your own risk.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">6. Disclaimer of Warranties</h2>
          <p>YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">7. Limitation on Liability</h2>
          <p>TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL HEVARTO, CREONITY, THEIR AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">8. Governing Law and Jurisdiction</h2>
          <p>All matters relating to the Website and these Terms of Service, and any dispute or claim arising therefrom or related thereto, shall be governed by and construed in accordance with the internal laws of the jurisdiction in which Creonity is headquartered, without giving effect to any choice or conflict of law provision or rule.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">9. Modifications</h2>
          <p>We may revise and update these Terms of Service from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Website following the posting of revised Terms of Service means that you accept and agree to the changes.</p>

          <h2 className="text-2xl font-medium mt-8 mb-4">10. Contact Information</h2>
          <p>All feedback, comments, requests for technical support, and other communications relating to the Website should be directed to: <a href="mailto:Connect@hevarto.com" className="text-[#ed1f27] hover:underline">Connect@hevarto.com</a>.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
