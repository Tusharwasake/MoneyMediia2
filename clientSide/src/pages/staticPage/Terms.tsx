import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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
              Terms of Service
            </h1>

            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700">
              <p className="text-sm text-gray-500 mb-8">
                Last Updated: May 12, 2025
              </p>

              <h2>Introduction</h2>
              <p>
                Welcome to Money Mediia. These Terms of Service ("Terms") govern
                your use of our website, products, and services ("Services"). By
                accessing or using our Services, you agree to be bound by these
                Terms. If you disagree with any part of these Terms, you may not
                access or use our Services.
              </p>

              <h2>Use of Services</h2>
              <p>
                Our Services are designed to provide financial content creation,
                video production, and related services to our clients. You may
                use our Services only as permitted by these Terms and any
                applicable laws and regulations.
              </p>

              <h3>Account Registration</h3>
              <p>
                Some of our Services may require you to create an account. You
                are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You must notify us immediately of any unauthorized use
                of your account.
              </p>

              <h3>Eligibility</h3>
              <p>
                You must be at least 18 years old to use our Services. By using
                our Services, you represent and warrant that you have the legal
                capacity to enter into these Terms.
              </p>

              <h2>Service Offerings</h2>
              <p>
                Money Mediia offers various services related to financial
                content creation, including but not limited to:
              </p>
              <ul>
                <li>Video production for financial institutions</li>
                <li>Script writing for financial content</li>
                <li>Infographic design</li>
                <li>Financial blog writing</li>
                <li>Translation services for financial content</li>
                <li>Professional shooting services</li>
                <li>Financial podcast production</li>
                <li>Brand photography</li>
                <li>Corporate video production</li>
              </ul>

              <h2>Intellectual Property</h2>
              <h3>Our Intellectual Property</h3>
              <p>
                All content, features, and functionality of our Services,
                including but not limited to text, graphics, logos, icons,
                images, audio clips, digital downloads, data compilations, and
                software, are the exclusive property of Money Mediia, our
                licensors, or other content providers and are protected by
                copyright, trademark, and other intellectual property laws.
              </p>

              <h3>Client Content</h3>
              <p>
                When we create content for clients, the ownership of
                intellectual property rights depends on the specific terms
                agreed upon in our service agreement. Typically, upon full
                payment, clients receive ownership rights to the commissioned
                content, subject to any limitations specified in the service
                agreement.
              </p>

              <h3>License to Use</h3>
              <p>
                We grant you a limited, non-exclusive, non-transferable, and
                revocable license to access and use our Services for your
                personal or internal business purposes, subject to these Terms.
              </p>

              <h2>Payment Terms</h2>
              <p>
                For paid Services, you agree to pay all fees and charges
                associated with your account on a timely basis and according to
                the payment terms specified in your service agreement. All
                payments are non-refundable unless otherwise stated in the
                service agreement or required by law.
              </p>

              <h3>Pricing</h3>
              <p>
                Prices for our Services are subject to change. We will notify
                you of any price changes before they become effective. Continued
                use of our Services after a price change constitutes your
                acceptance of the new prices.
              </p>

              <h2>Client Responsibilities</h2>
              <p>As a client, you are responsible for:</p>
              <ul>
                <li>
                  Providing accurate and complete information necessary for us
                  to deliver the Services.
                </li>
                <li>
                  Reviewing and approving content in a timely manner according
                  to agreed project timelines.
                </li>
                <li>
                  Ensuring that any content or materials you provide to us do
                  not infringe on any third-party rights.
                </li>
                <li>
                  Obtaining necessary clearances, permits, or licenses for the
                  use of any proprietary materials.
                </li>
                <li>
                  Complying with all applicable laws and regulations related to
                  financial services advertising and content.
                </li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, Money Mediia
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, including but not limited to
                loss of profits, data, use, goodwill, or other intangible
                losses, resulting from:
              </p>
              <ul>
                <li>
                  Your access to or use of or inability to access or use our
                  Services.
                </li>
                <li>
                  Any conduct or content of any third party on our Services.
                </li>
                <li>Any content obtained from our Services.</li>
                <li>
                  Unauthorized access, use, or alteration of your transmissions
                  or content.
                </li>
              </ul>
              <p>
                Our total liability for any claims arising from or related to
                these Terms or our Services shall not exceed the amount you paid
                to us for the Services giving rise to the claim during the six
                (6) months preceding the claim.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Money Mediia,
                its affiliates, officers, directors, employees, consultants,
                agents, and representatives from and against any and all claims,
                liabilities, damages, losses, and expenses, including, without
                limitation, reasonable legal and accounting fees, arising out of
                or in any way connected with:
              </p>
              <ul>
                <li>Your access to or use of our Services.</li>
                <li>Your violation of these Terms.</li>
                <li>
                  Your violation of any third-party right, including without
                  limitation any intellectual property right, publicity,
                  confidentiality, property, or privacy right.
                </li>
                <li>
                  Any content or materials you provide to us for use in
                  delivering our Services.
                </li>
              </ul>

              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account and access to our
                Services immediately, without prior notice or liability, for any
                reason, including, without limitation, if you breach these
                Terms.
              </p>
              <p>
                Upon termination, your right to use our Services will
                immediately cease. If you wish to terminate your account, you
                may simply discontinue using our Services or contact us to
                request account deletion.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of India, without regard to its conflict of law
                provisions. Our failure to enforce any right or provision of
                these Terms will not be considered a waiver of those rights.
              </p>

              <h2>Dispute Resolution</h2>
              <p>
                Any disputes arising out of or relating to these Terms or our
                Services shall be resolved through binding arbitration in
                accordance with the Arbitration and Conciliation Act, 1996 of
                India. The arbitration shall take place in Bengaluru, Karnataka,
                India, and shall be conducted in English.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any
                time. We will provide notice of any material changes by posting
                the updated Terms on this page with a new "Last Updated" date.
                Your continued use of our Services after any such changes
                constitutes your acceptance of the new Terms.
              </p>

              <h2>Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid or
                unenforceable, such provision shall be struck, and the remaining
                provisions shall be enforced to the fullest extent under law.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about these Terms, please
                contact us at:
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:legal@moneymediia.com"
                  className="text-green-600 hover:underline"
                >
                  legal@moneymediia.com
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

export default TermsOfService;
