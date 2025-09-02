export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Spline Background */}
      <div className="fixed inset-0 z-0">
        <iframe
          src="https://my.spline.design/reactiveorb-s0GzgSco0uSVSXvwMHuJvPQs/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
        />
      </div>

      {/* Glass Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-ffmpeg-green/10 border border-ffmpeg-green/20 rounded-full px-4 py-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                className="text-ffmpeg-green"
              />
              <circle cx="12" cy="12" r="3" fill="#107C10" />
            </svg>
            <span className="ml-2 text-sm font-medium">FFmpegLab</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-xs text-gray-300 ml-8">
            {["Portfolio", "3D Design", "Animation", "Lab", "Connect"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-ffmpeg-green transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </div>
          <div className="flex items-center space-x-3 ml-8">
            <a
              href="#"
              className="hidden md:inline-block text-xs font-medium hover:text-ffmpeg-green transition-colors"
            >
              Login
            </a>
            <a
              href="#"
              className="px-3 py-1.5 text-xs font-medium text-ffmpeg-black bg-ffmpeg-green rounded-full hover:bg-ffmpeg-accent transition-colors"
            >
              Start Project
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <span className="px-3 py-1 text-xs font-medium text-ffmpeg-green bg-ffmpeg-green/10 backdrop-blur-sm rounded-full border border-ffmpeg-green/20">
                Interactive FFmpeg Studio
              </span>

              <h1 className="text-5xl md:text-7xl font-medium leading-none tracking-tighter">
                Reactive <span className="text-ffmpeg-green">Dimensional</span>{" "}
                Experiences
              </h1>

              <p className="text-xl text-neutral-300 max-w-lg leading-relaxed">
                We create immersive digital worlds powered by the efficiency and
                performance of FFmpeg-inspired design principles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#"
                  className="px-8 py-4 bg-ffmpeg-green text-ffmpeg-black font-medium rounded-full hover:bg-ffmpeg-accent transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  Explore Interactive Demo
                </a>
                <a
                  href="#"
                  className="px-8 py-4 bg-ffmpeg-green/10 backdrop-blur-sm text-ffmpeg-white font-medium rounded-full hover:bg-ffmpeg-green/20 transition-all duration-300 border border-ffmpeg-green/20 text-center"
                >
                  View Portfolio
                </a>
              </div>

              <div className="pt-8 space-y-4">
                <div className="text-sm text-neutral-400">
                  Featured Technologies
                </div>
                <div className="flex flex-wrap gap-3">
                  {["WebGL", "Three.js", "Spline", "GSAP"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-ffmpeg-green/10 backdrop-blur-sm rounded-full border border-ffmpeg-green/20 text-ffmpeg-green"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Placeholder */}
            <div className="hidden lg:block">{/* Orb space */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
