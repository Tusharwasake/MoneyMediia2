import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";

import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Star,
  Quote,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getFeaturedTestimonials,
  getAllTestimonials,
} from "@/api/testimonial.api";

interface Testimonial {
  _id: string;
  content: string;
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  rating?: number;
  isActive: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const fetchTestimonials = useCallback(
    async (useFeatured: boolean = true) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = useFeatured
          ? await getFeaturedTestimonials(5)
          : await getAllTestimonials();

        if (response.data.status === "success") {
          const data = response.data.data.testimonials;
          if (data && data.length > 0) {
            setTestimonials(data);
            setActiveIndex(0); // Reset to first testimonial
          } else {
            throw new Error("No testimonials found");
          }
        } else {
          throw new Error("Failed to fetch testimonials");
        }
      } catch (err: unknown) {
        console.error("Error fetching testimonials:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load testimonials");
        }

        if (testimonials.length === 0) {
          setTestimonials([]);
        }
      } finally {
        setIsLoading(false);
        setIsRetrying(false);
      }
    },
    [testimonials.length]
  );

  // Auto-play functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying && testimonials.length > 1) {
      intervalId = setInterval(() => {
        setActiveIndex((current) =>
          current === testimonials.length - 1 ? 0 : current + 1
        );
      }, 6000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, testimonials.length]);

  useEffect(() => {
    fetchTestimonials(true);
  }, [fetchTestimonials]);

  const handleRetry = async () => {
    setIsRetrying(true);
    // Try featured first, then all testimonials if featured fails
    await fetchTestimonials(true);
    if (testimonials.length === 0) {
      await fetchTestimonials(false);
    }
  };

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  }, [testimonials.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Colors
  const moneyGreen = "#00A86B";
  const moneyTeal = "#008080";

  // Progress bar calculation
  const progressPercentage =
    activeIndex === 0 ? 0 : (activeIndex / (testimonials.length - 1)) * 100;

  // Empty state when no testimonials are found
  if (!isLoading && testimonials.length === 0) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">
                Client Success Stories
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>

            <p className="text-xl text-gray-600 mx-auto mb-16 max-w-3xl">
              Don't just take our word for it. Hear from the financial
              institutions we've helped achieve remarkable results through our
              premium services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-6 bg-yellow-50 rounded-full flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Testimonials Found
              </h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                {error ||
                  "We're currently updating our client testimonials. Please check back soon to see what our clients have to say about our services."}
              </p>
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all",
                  isRetrying
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-lg"
                )}
              >
                {isRetrying ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <RefreshCw className="h-5 w-5" />
                )}
                {isRetrying ? "Retrying..." : "Refresh Testimonials"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">
                Client Success Stories
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from the financial
              institutions we've helped.
            </p>
          </div>

          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full opacity-10 bg-gradient-to-tr from-teal-400 to-green-500"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pattern-dots"></div>

      <div
        className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 mb-6">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm font-medium">Client Success Stories</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-teal-700 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Don't just take our word for it. Hear from the financial
            institutions we've helped achieve remarkable results through our
            premium services.
          </p>
        </div>

        {error && testimonials.length > 0 && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>Unable to refresh testimonials</span>
              <button
                onClick={handleRetry}
                className="ml-3 text-green-600 hover:text-green-700 font-medium underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-200 rounded-full mb-8 max-w-2xl mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-teal-600 rounded-full transition-all duration-700"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial._id} className="flex-shrink-0 w-full">
                  <Card
                    className={`bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full mx-4 rounded-2xl relative ${
                      index === activeIndex
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-90"
                    }`}
                    style={{
                      background:
                        "linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95))",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <CardContent className="p-10">
                      <div className="relative">
                        {/* Decorative quotes */}
                        <div className="absolute -top-6 -left-6 w-16 h-16 flex items-center justify-center rounded-full bg-green-50">
                          <Quote className="h-8 w-8 text-green-600 transform -scale-x-100" />
                        </div>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                          <div className="relative flex-shrink-0">
                            {/* Image with gradient border */}
                            <div
                              className="absolute -inset-2 rounded-full opacity-70 blur"
                              style={{
                                background: `linear-gradient(135deg, ${moneyGreen}, ${moneyTeal})`,
                              }}
                            ></div>
                            <div className="absolute inset-0 rounded-full animate-pulse bg-white/50"></div>
                            <img
                              src={
                                testimonial.imageUrl ||
                                `https://i.pravatar.cc/150?img=${Math.abs(
                                  testimonial._id.charCodeAt(0) % 50
                                )}`
                              }
                              alt={testimonial.clientName}
                              className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                              onError={(e) => {
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  testimonial.clientName
                                )}&background=0D8ABC&color=fff`;
                              }}
                            />

                            {/* Star rating on mobile */}
                            {testimonial.rating && (
                              <div className="md:hidden flex items-center justify-center absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-full shadow-md border border-gray-100">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <Star
                                    key={index}
                                    className={`h-3 w-3 ${
                                      index < testimonial.rating!
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex-grow text-center md:text-left">
                            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                              "{testimonial.content}"
                            </p>

                            <div className="space-y-1">
                              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <p className="text-2xl font-bold text-gray-900">
                                  {testimonial.clientName}
                                </p>

                                {/* Star rating on desktop */}
                                {testimonial.rating && (
                                  <div className="hidden md:flex items-center gap-1">
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
                                        <Star
                                          key={index}
                                          className={`h-5 w-5 ${
                                            index < testimonial.rating!
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      )
                                    )}
                                  </div>
                                )}
                              </div>

                              <p className="text-lg bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent font-medium">
                                {testimonial.clientPosition}
                              </p>

                              <p className="text-gray-600">
                                {testimonial.clientCompany}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Improved navigation controls */}
          {testimonials.length > 1 && (
            <div className="mt-10 max-w-4xl mx-auto flex items-center justify-between">
              <button
                onClick={() => {
                  goToPrevious();
                  setIsAutoPlaying(false);
                }}
                className="group bg-white rounded-full p-4 shadow-md hover:shadow-lg hover:bg-green-50 transition-all duration-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
              </button>

              {/* Indicators */}
              <div className="flex items-center gap-4">
                {/* Auto-play control */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isAutoPlaying
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  aria-label={
                    isAutoPlaying ? "Pause auto-play" : "Start auto-play"
                  }
                >
                  {isAutoPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`relative transition-all duration-300 ${
                        activeIndex === index
                          ? "w-12 bg-green-600"
                          : "w-3 bg-gray-300 hover:bg-gray-400"
                      } h-3 rounded-full`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    ></button>
                  ))}
                </div>

                {/* Counter */}
                <div className="text-sm font-medium text-gray-500">
                  {activeIndex + 1} / {testimonials.length}
                </div>
              </div>

              <button
                onClick={() => {
                  goToNext();
                  setIsAutoPlaying(false);
                }}
                className="group bg-white rounded-full p-4 shadow-md hover:shadow-lg hover:bg-green-50 transition-all duration-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS for patterns */}
      <style>{`
        .pattern-dots {
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .animate-in {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;
