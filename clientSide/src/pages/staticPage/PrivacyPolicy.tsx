import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-green-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Privacy Policy
            </h1>

            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700">
              <p className="text-sm text-gray-500 mb-8">
                Last Updated: May 12, 2025
              </p>

              <h2>Introduction</h2>
              <p>
                At Money Mediia ("we," "us," or "our"), we respect your privacy
                and are committed to protecting your personal data. This privacy
                policy explains how we collect, use, and safeguard your
                information when you visit our website, use our services, or
                interact with us in any way.
              </p>

              <h2>Information We Collect</h2>
              <p>
                We may collect several types of information from and about users
                of our website, including:
              </p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, company name, and other contact details you
                  provide when you contact us, request information, or use our
                  services.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you access
                  and use our website, including your IP address, browser type,
                  operating system, pages viewed, time spent on pages, and other
                  browsing data.
                </li>
                <li>
                  <strong>Communication Data:</strong> Records of any
                  correspondence or communication between you and us, including
                  emails, live chats, and phone calls.
                </li>
                <li>
                  <strong>Marketing Data:</strong> Your preferences for
                  receiving marketing communications from us.
                </li>
              </ul>

              <h2>How We Collect Your Information</h2>
              <p>We collect information through the following methods:</p>
              <ul>
                <li>
                  When you provide it directly to us by filling in forms on our
                  website, subscribing to our newsletter, or contacting us.
                </li>
                <li>
                  Automatically through cookies and similar technologies when
                  you interact with our website.
                </li>
                <li>
                  From third-party service providers, such as analytics
                  providers and social media platforms.
                </li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul>
                <li>To provide and improve our services.</li>
                <li>To respond to your inquiries and fulfill your requests.</li>
                <li>
                  To send you relevant marketing communications, if you have
                  opted in to receive them.
                </li>
                <li>To personalize your experience on our website.</li>
                <li>
                  To analyze usage patterns and improve the functionality and
                  design of our website.
                </li>
                <li>To comply with legal obligations.</li>
              </ul>

              <h2>Sharing Your Information</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>
                  Service providers who perform services on our behalf, such as
                  hosting providers, email services, and customer relationship
                  management systems.
                </li>
                <li>
                  Business partners with whom we offer joint promotions or
                  services, but only with your consent.
                </li>
                <li>
                  Legal authorities when required by law or to protect our
                  rights and the rights of others.
                </li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>

              <h2>Data Security</h2>
              <p>
                We have implemented appropriate security measures to protect
                your personal information from accidental loss, unauthorized
                access, alteration, and disclosure. However, no internet-based
                service can guarantee 100% security, and we ask that you also
                take steps to protect your information, such as keeping your
                login credentials confidential.
              </p>

              <h2>Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul>
                <li>
                  The right to access the personal information we hold about
                  you.
                </li>
                <li>
                  The right to request correction of inaccurate or incomplete
                  information.
                </li>
                <li>
                  The right to request deletion of your personal information.
                </li>
                <li>
                  The right to withdraw consent for processing your information
                  for specific purposes.
                </li>
                <li>
                  The right to object to processing of your personal
                  information.
                </li>
                <li>The right to data portability.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the
                information provided in the "Contact Us" section below.
              </p>

              <h2>Cookies</h2>
              <p>
                Our website uses cookies and similar technologies to distinguish
                you from other users of our website and to enhance your browsing
                experience. A cookie is a small file of letters and numbers that
                we store on your browser or the hard drive of your computer. You
                can set your browser to refuse all or some browser cookies or to
                alert you when websites set or access cookies. However, if you
                disable or refuse cookies, some parts of our website may become
                inaccessible or not function properly.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our website is not intended for children under the age of 16,
                and we do not knowingly collect personal information from
                children under 16. If you are a parent or guardian and believe
                that your child has provided us with personal information,
                please contact us, and we will delete such information from our
                systems.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. When we make changes, we will update the
                "Last Updated" date at the top of this privacy policy and notify
                you through a notice on our website or by email.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this
                privacy policy or our data practices, please contact us at:
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@moneymediia.com"
                  className="text-green-600 hover:underline"
                >
                  privacy@moneymediia.com
                </a>
              </p>
              <p className="mb-2">
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+918484819808"
                  className="text-green-600 hover:underline"
                >
                  +91 8484819808
                </a>
              </p>
              <p>
                <strong>Address:</strong> Money Mediia, 123 Finance Street,
                Bengaluru, Karnataka 560001, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
