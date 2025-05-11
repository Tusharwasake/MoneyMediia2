import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, MessageSquare, Star } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="section bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-300 ml-2">
                Trusted by finance professionals
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Elevate Your
              <span className="text-money-green block">Financial Content?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Transform complex financial topics into compelling videos and
              content that educates your audience and drives measurable results.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-money-green">50+</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-money-green">98%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-money-green">24h</div>
                <div className="text-sm text-gray-400">Average Response</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-gradient px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-shadow group">
                <Link to="/contact" className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/20 hover:border-white/40 bg-transparent text-white px-8 py-4 text-lg"
              >
                <Link to="/portfolio" className="flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  View Our Work
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">
                Or chat with us instantly on{" "}
                <a
                  href="https://wa.me/918484819808"
                  className="text-green-400 hover:underline"
                >
                  WhatsApp
                </a>
              </span>
            </div>
          </div>

          {/* Enhanced Visual Section */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-money-green/10 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-money-teal/10 rounded-full filter blur-2xl animate-pulse delay-500"></div>

            {/* Main Image */}
            <div className="relative z-10">
              <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {/* Use your actual financial content image */}
                <img
                  src="https://plus.unsplash.com/premium_photo-1663100794696-6b7afa02016c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Financial content marketing visualization with charts and graphics"
                  className="w-full h-full object-cover"
                  style={{ backgroundColor: "#1a2332" }}
                />

                {/* Fallback content if image doesn't load */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90">
                  <div className="w-16 h-16 bg-money-green/20 rounded-full flex items-center justify-center mb-4">
                    <PlayCircle className="h-8 w-8 text-money-green" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Transform Your Financial Content
                  </h3>
                  <p className="text-gray-300">
                    Engaging videos • Expert writing • Professional design
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-5 left-5 right-5 z-20">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-money-green/20 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-money-green" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        Premium Content Creation
                      </div>
                      <div className="text-xs text-gray-400">
                        Guaranteed quality results
                      </div>
                    </div>
                  </div>
                  <div className="text-money-green font-bold">
                    100% Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default CallToAction;
