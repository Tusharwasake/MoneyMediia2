
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video 
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Finance <span className="gradient-text">Content Marketing</span> That Delivers Results
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Transforming complex financial topics into engaging videos and content that educates and converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button className="btn-gradient px-8 py-6 text-lg">
              <Link to="/portfolio">View Our Work</Link>
            </Button>
            <Button variant="outline" className="bg-white/10 border-white hover:bg-white/20 text-white px-8 py-6 text-lg">
              <Link to="/contact" className="flex items-center">
                Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <div className="w-0.5 h-10 bg-gradient-money rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
