import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Mail,
  Send,
  CheckCircle,
  Bell,
  ArrowRight,
  Lock,
  Sparkles,
} from "lucide-react";

import { subscribeNewsletter } from "@/api/newsletter";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await subscribeNewsletter(email);
      setIsSuccess(true);
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Premium gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #00A86B 0%, #008080 100%)",
        }}
      ></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 bg-white"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 bg-white"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pattern-dots"></div>

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-12 shadow-xl border border-white/20">
            <div className="text-center mb-8">
              {/* Icon badge */}
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Exclusive Content</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Financial Content Insights Delivered
              </h2>

              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join industry leaders who receive our weekly newsletter with
                expert tips on finance content marketing, video production
                strategies, and upcoming trends.
              </p>

              {/* Benefits list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Weekly insights</p>
                    <p className="text-white/70 text-sm">
                      Curated by our experts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Exclusive resources
                    </p>
                    <p className="text-white/70 text-sm">
                      Guides, templates & more
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Industry updates</p>
                    <p className="text-white/70 text-sm">
                      Stay ahead of trends
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="relative max-w-xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-grow w-full">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-white/10 text-white placeholder:text-white/60 border-white/20 pl-12 py-6 rounded-xl focus-visible:ring-white/50 focus-visible:border-white/50 transition-all duration-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting || isSuccess}
                    />
                  </div>

                  <Button
                    type="submit"
                    className={`${
                      isSuccess
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-white hover:bg-gray-100 text-teal-700"
                    } font-medium py-6 px-8 rounded-xl transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl w-full sm:w-auto`}
                    disabled={isSubmitting || isSuccess}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-t-teal-700 border-teal-700/30 rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </div>
                    ) : isSuccess ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>Subscribed!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        <span>Subscribe Now</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Success message animation */}
                {isSuccess && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm rounded-xl transition-all duration-500">
                    <div className="text-white text-center p-4">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2 text-white" />
                      <p className="text-lg font-medium">
                        Thanks for subscribing!
                      </p>
                      <p className="text-sm">
                        Check your inbox for a confirmation email
                      </p>
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-white/70 text-sm">
                <Lock className="h-3 w-3" />
                <p>We respect your privacy. Unsubscribe at any time.</p>
              </div>

              {/* Social proof */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <p className="text-white/80 text-sm mb-4">
                  Trusted by finance professionals from:
                </p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-5">
                  <div className="text-white/80 font-semibold">Groww</div>
                  <div className="text-white/80 font-semibold">AngelOne</div>
                  <div className="text-white/80 font-semibold">HDFC Sky</div>
                  <div className="text-white/80 font-semibold">Edelweiss</div>
                  <div className="text-white/80 font-semibold">
                    ICICI Prudential
                  </div>
                  <div className="text-white/80 font-semibold">Paytm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for patterns */}
      <style>{`
        .pattern-dots {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

export default NewsletterSignup;
