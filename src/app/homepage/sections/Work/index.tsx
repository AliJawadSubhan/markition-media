"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    title: "SEO & Organic Growth",
    type: "matrix",
    eyebrow: "Optimization",
    description: "We rebuilt their keyword architecture from the ground up, targeting high-intent queries. Organic sessions grew 3.4× in six months with zero paid spend.",
  },
  {
    title: "Paid Media & Google Ads",
    image: "/portfolio/pivot-health.png",
    description: "Restructured a bloated ad account into tightly themed campaigns. Cut cost-per-lead by 41% while doubling monthly lead volume within the same budget.",
  },
  {
    title: "Social Media Marketing",
    type: "brand",
    brand: "misso",
    description: "Developed a full content calendar and community strategy across Instagram and LinkedIn. Grew engaged following from 4K to 28K in under a year.",
  },
  {
    title: "Content & Conversion",
    image: "/portfolio/meadowhawk.png",
    description: "Rewrote landing pages using conversion-first copywriting and A/B tested layouts. Average page conversion rate lifted from 1.8% to 5.2% across all products.",
  },
  {
    title: "Analytics & Reporting",
    image: "/portfolio/pulsar-dashboard.png",
    description: "Built a custom GA4 + Looker Studio dashboard that gave the client real-time visibility into every funnel stage — from first click to closed deal.",
  },
  {
    title: "Conversion Landing Pages",
    image: "/portfolio/nexus-ai.png",
    description: "Designed and launched a suite of campaign-specific landing pages. Each page was optimised for a single CTA, reducing friction and increasing sign-ups by 67%.",
  },
  {
    title: "Email Nurture Systems",
    image: "/portfolio/income-per-week.png",
    description: "Created a 9-step automated email sequence tied to behavioural triggers. Open rates averaged 48% and the sequence generated $120K in attributable revenue in Q1.",
  },
  {
    title: "Brand Messaging Refresh",
    image: "/portfolio/plastomics.png",
    description: "Audited positioning across all touchpoints and rewrote the core messaging hierarchy. Sales team reported significantly shorter closing cycles after the rebrand.",
  },
  {
    title: "Lead Funnel Strategy",
    image: "/portfolio/health-9am.png",
    description: "Mapped the full buyer journey and identified three major drop-off points. Plugging those gaps increased qualified leads by 2.1× within the first quarter.",
  },
  {
    title: "Retention Campaigns",
    image: "/portfolio/focus-stability.png",
    description: "Launched a win-back and loyalty programme targeting lapsed customers. 30-day retention improved by 22% and average order value climbed 18% year-over-year.",
  },
  {
    title: "Marketing Automation",
    image: "/portfolio/lorica-encrypt.png",
    description: "Integrated CRM with ad platforms and built automated lead scoring workflows. The team saved 14 hours per week on manual tasks while follow-up speed improved.",
  },
  {
    title: "Performance Dashboards",
    image: "/portfolio/pulsar-dashboard.png",
    description: "Consolidated data from 6 separate tools into one live performance hub. Executives now get a single source of truth for CAC, LTV, and ROAS every morning.",
  },
];

// Individual card — owns its own content ref so the dropdown animates
// to the exact measured height, not a hard-coded max-height.
type Project = (typeof PROJECTS)[number];

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure on mount and whenever open state changes
  useEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <article
      className="work-project-card"
      aria-label={project.title}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
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
                    style={{ backgroundColor: `rgba(17, 79, 177, ${intensity})` }}
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

      {/* Title row */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-[#05051f] sm:text-sm">
          {project.title}
        </h3>
        <span className={`work-card-chevron flex-shrink-0 ${open ? "is-open" : ""}`} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#05051f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Measured-height dropdown */}
      <div
        style={{
          overflow: "hidden",
          height: open ? height : 0,
          opacity: open ? 1 : 0,
          transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
        }}
      >
        <div ref={innerRef}>
          <p
            className="pt-2 text-[11px] leading-relaxed text-[#3a3a4a] sm:text-xs"
            style={{
              transform: open ? "translateY(0)" : "translateY(8px)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}

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

          .work-card-chevron {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .work-card-chevron.is-open {
            transform: rotate(180deg);
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
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
