"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    title: "SEO & Organic Growth",
    type: "matrix",
    eyebrow: "Optimization",
  },
  {
    title: "Paid Media & Google Ads",
    image: "/portfolio/pivot-health.png",
  },
  {
    title: "Social Media Marketing",
    type: "brand",
    brand: "misso",
  },
  {
    title: "Content & Conversion",
    image: "/portfolio/meadowhawk.png",
  },
  {
    title: "Analytics & Reporting",
    image: "/portfolio/pulsar-dashboard.png",
  },
  {
    title: "Conversion Landing Pages",
    image: "/portfolio/nexus-ai.png",
  },
  {
    title: "Email Nurture Systems",
    image: "/portfolio/income-per-week.png",
  },
  {
    title: "Brand Messaging Refresh",
    image: "/portfolio/plastomics.png",
  },
  {
    title: "Lead Funnel Strategy",
    image: "/portfolio/health-9am.png",
  },
  {
    title: "Retention Campaigns",
    image: "/portfolio/focus-stability.png",
  },
  {
    title: "Marketing Automation",
    image: "/portfolio/lorica-encrypt.png",
  },
  {
    title: "Performance Dashboards",
    image: "/portfolio/pulsar-dashboard.png",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollMetricsRef = useRef({ distance: 0, maxX: 0 });
  const [pinHeight, setPinHeight] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    if (!section || !viewport || !track) {
      return;
    }

    let frame = 0;

    function updateScrollPosition() {
      const { distance, maxX } = scrollMetricsRef.current;

      if (!mediaQuery.matches || distance <= 0) {
        track.style.transform = "";
        return;
      }

      const sectionTop = section.offsetTop;
      const rawProgress = (window.scrollY - sectionTop) / distance;
      const progress = Math.min(1, Math.max(0, rawProgress));

      track.style.transform = `translate3d(${-progress * maxX}px, 0, 0)`;
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateScrollPosition);
    }

    function measure() {
      if (!mediaQuery.matches) {
        scrollMetricsRef.current = { distance: 0, maxX: 0 };
        setPinHeight(null);
        track.style.transform = "";
        return;
      }

      const maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);
      scrollMetricsRef.current = { distance: maxX, maxX };
      setPinHeight(window.innerHeight + maxX);
      scheduleUpdate();
    }

    const resizeObserver = new ResizeObserver(measure);

    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    mediaQuery.addEventListener("change", measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", scheduleUpdate);
      mediaQuery.removeEventListener("change", measure);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full overflow-clip bg-[#b7d5fb]"
      style={{
        fontFamily: "var(--font-inter, Inter, sans-serif)",
        height: pinHeight ? `${pinHeight}px` : undefined,
      }}
    >
      <style>
        {`
          .work-scroll-viewport {
            scrollbar-width: none;
          }

          .work-scroll-viewport::-webkit-scrollbar {
            display: none;
          }

          .work-scroll-track {
            box-sizing: border-box;
            width: max-content;
            padding-left: 0;
            padding-right: 0;
            will-change: transform;
          }

          .work-project-card {
            flex: 0 0 clamp(300px, 28vw, 430px);
          }

          .work-project-visual {
            height: clamp(384px, 36vw, 552px);
          }

          .work-project-card:first-child {
            padding-left: clamp(24px, 4vw, 64px);
          }

          .work-project-card:last-child {
            padding-right: clamp(24px, 4vw, 64px);
          }

          @media (min-width: 768px) {
            .work-pin-sticky {
              position: sticky;
              top: 0;
              display: flex;
              min-height: 100vh;
              width: 100%;
              align-items: center;
              overflow: hidden;
              padding-block: 64px;
            }

            .work-scroll-viewport {
              width: 100vw;
              overflow: hidden;
            }
          }

          @media (max-width: 767px) {
            .work-pin-sticky {
              padding-block: 48px 56px;
            }

            .work-scroll-viewport {
              overflow-x: auto;
              overscroll-behavior-x: contain;
            }

            .work-scroll-track {
              padding-left: 0;
              padding-right: 0;
              scroll-snap-type: x mandatory;
              transform: none !important;
            }

            .work-project-card {
              flex-basis: min(76vw, 280px);
              scroll-snap-align: start;
            }

            .work-project-visual {
              height: clamp(330px, 88vw, 430px);
            }

            .work-project-card:first-child {
              padding-left: 16px;
            }

            .work-project-card:last-child {
              padding-right: 16px;
            }
          }

        `}
      </style>

      <div className="work-pin-sticky">
        <div className="w-full">
          <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
            <h2
              className="mx-auto mb-8 max-w-[560px] text-center text-[#05051f] sm:mb-10"
              style={{
                fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
                fontSize: "clamp(34px, 4vw, 58px)",
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              Digital Marketing Built
              <br />
              Around Your Business
            </h2>
          </div>

          <div
            ref={viewportRef}
            className="work-scroll-viewport"
            tabIndex={0}
            aria-label="Project carousel"
          >
            <div
              ref={trackRef}
              className="work-scroll-track flex gap-5 pb-5 sm:gap-7"
            >
              {PROJECTS.map((project) => (
                <article
                  key={project.title}
                  className="work-project-card"
                  aria-label={project.title}
                >
                  <div className="work-project-visual relative mb-4 overflow-hidden rounded-lg bg-[#eaf3ff] shadow-[0_24px_70px_rgba(38,94,158,0.2)]">
                    {project.type === "matrix" ? (
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fbff_0%,#dcecff_100%)]">
                        <div className="absolute left-[21%] top-[18%] h-[68%] w-px bg-[#173c8a]/30" />
                        <div className="absolute bottom-[18%] left-[21%] h-px w-[62%] bg-[#173c8a]/30" />
                        <div className="absolute left-[16%] top-[43%] -rotate-90 text-[10px] font-semibold text-[#12387f]/70">
                          Qualification
                        </div>
                        <div className="absolute bottom-[12%] left-[41%] text-[10px] font-semibold text-[#12387f]/70">
                          Audience fit
                        </div>
                        <div className="absolute left-[41%] top-[32%] grid grid-cols-10 gap-[3px]">
                          {Array.from({ length: 90 }).map((_, index) => {
                            const col = index % 10;
                            const row = Math.floor(index / 10);
                            const intensity = Math.max(0.18, (col + row) / 18);

                            return (
                              <span
                                key={index}
                                className="block h-[3px] w-[3px] rounded-full"
                                style={{
                                  backgroundColor: `rgba(17, 79, 177, ${intensity})`,
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ) : project.type === "brand" ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(145deg,#eaf4ff_0%,#cfe4ff_100%)] text-[#05051f]">
                        <span className="absolute right-9 top-8 rounded-full bg-[#d6eaff] px-3 py-1 text-[10px] font-semibold text-[#4b8deb]">
                          After
                        </span>
                        <div className="flex items-center gap-3 text-[clamp(34px,4vw,52px)] font-semibold tracking-[-0.08em]">
                          <span className="text-[1.08em]">*</span>
                          <span>{project.brand}</span>
                        </div>
                        <span className="absolute bottom-8 rounded-full bg-[#d6eaff] px-3 py-1 text-[10px] font-semibold text-[#4b8deb]">
                          Before
                        </span>
                      </div>
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt=""
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1640]/22 via-transparent to-white/10" />
                      </>
                    )}
                  </div>

                  <h3 className="text-xs font-semibold text-[#05051f] sm:text-sm">
                    {project.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
