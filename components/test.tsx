import BgWrapper from "@/components/background/AnimatedBackground";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <BgWrapper>
      {/* Hero Section */}
      <Hero />

      {/* Extra Section Example */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Why Choose Us?</h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          We combine artificial intelligence, robotics, and modern web
          technologies to build scalable and future-ready solutions.
        </p>
      </section>
    </BgWrapper>
  );
}
