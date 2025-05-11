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
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getFeaturedTestimonials,
  getAllTestimonials,
} from "@/api/testimonial.api";
import "./TestimonialCarousel.css";

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
      }, 5000);
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
    setIsAutoPlaying(false);
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
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

  // Empty state when no testimonials are found
  if (!isLoading && testimonials.length === 0) {
    return (
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from the financial
              institutions we've helped.
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Testimonials Found
              </h3>
              <p className="text-gray-600 mb-6">
                {error || "No testimonials are currently available."}
              </p>
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
                  isRetrying
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-money-green text-white hover:bg-money-green/90"
                )}
              >
                {isRetrying ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <RefreshCw className="h-5 w-5" />
                )}
                {isRetrying ? "Retrying..." : "Try Again"}
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
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-money-green rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-money-teal rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from the financial
              institutions we've helped.
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-money-green" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-money-green rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-money-teal rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-20 h-1 bg-money-green rounded-full"></div>
            <span className="mx-4 text-money-green font-semibold">
              TESTIMONIALS
            </span>
            <div className="w-20 h-1 bg-money-green rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the financial
            institutions we've helped.
          </p>
        </div>

        {error && testimonials.length > 0 && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>Unable to refresh testimonials</span>
            </div>
          </div>
        )}

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden perspective-1000">
            <div
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial._id}
                  className="flex-shrink-0 w-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <CardContent className="p-10">
                    <div className="relative">
                      {/* Quote decorations */}
                      <Quote className="absolute -top-6 -left-6 h-16 w-16 text-money-green/10 transform -rotate-12" />
                      <Quote className="absolute -bottom-6 -right-6 h-16 w-16 text-money-green/10 transform rotate-12" />

                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="relative flex-shrink-0">
                          <div className="absolute -inset-2 gradient-border rounded-full opacity-70 blur-sm"></div>
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
                              e.currentTarget.src = `https://i.pravatar.cc/150?img=${Math.abs(
                                testimonial._id.charCodeAt(0) % 50
                              )}`;
                            }}
                          />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                            "{testimonial.content}"
                          </p>
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-900">
                              {testimonial.clientName}
                            </p>
                            <p className="text-lg text-money-teal font-medium">
                              {testimonial.clientPosition}
                            </p>
                            <p className="text-gray-600">
                              {testimonial.clientCompany}
                            </p>
                            {testimonial.rating && (
                              <div className="flex items-center justify-center md:justify-start gap-1 mt-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <Star
                                    key={index}
                                    className={`h-5 w-5 ${
                                      index < testimonial.rating!
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-10 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-100 hover:border-money-green group focus:outline-none focus:ring-2 focus:ring-money-green"
                aria-label="Previous testimonial"
                disabled={isLoading}
              >
                <ArrowLeft className="h-6 w-6 text-gray-600 group-hover:text-money-green transition-colors" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-10 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-100 hover:border-money-green group focus:outline-none focus:ring-2 focus:ring-money-green"
                aria-label="Next testimonial"
                disabled={isLoading}
              >
                <ArrowRight className="h-6 w-6 text-gray-600 group-hover:text-money-green transition-colors" />
              </button>
            </>
          )}

          {/* Enhanced indicators */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-12 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "relative w-4 h-4 rounded-full transition-all duration-300",
                    activeIndex === index ? "scale-125" : "hover:scale-110"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                  disabled={isLoading}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full transition-all duration-300",
                      activeIndex === index
                        ? "bg-money-green shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                  ></span>
                  {activeIndex === index && (
                    <span className="absolute inset-0 rounded-full bg-money-green/20 animate-ping"></span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Auto-play indicator */}
          {isAutoPlaying && testimonials.length > 1 && (
            <div className="flex justify-center ">
              {/* <div className="text-sm text-gray-500 italic">
                Autoplaying • Hover to pause
              </div> */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
