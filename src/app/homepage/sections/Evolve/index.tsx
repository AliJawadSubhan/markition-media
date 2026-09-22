"use client";

import { type CSSProperties, useEffect, useState } from "react";
import LottieAnimation from "./LottieAnimation";

const CARDS = [
  {
    statement: "Your audience is searching.",
    caveat: "But your brand isn't always there.",
  },
  {
    statement: "Your campaigns are running.",
    caveat: "But performance isn't consistent.",
  },
  {
    statement: "You're creating content.",
    caveat: "But it's not always creating action.",
  },
  {
    statement: "You're getting traffic.",
    caveat: "But too much of it stops before conversion.",
  },
];

const REVIEWS = [
  {
    quote:
      "Working with Markition transformed how we approach digital growth. Their integrated strategy drove a 3× increase in qualified leads within the first quarter — results we hadn't seen in years.",
    name: "Peter Hedlund",
    role: "SVP of marketing, HomeQ",
    image: "/expert-photo.png",
  },
  {
    quote:
      "The team connected our paid, organic, and content work into one clear growth engine. We finally had reporting we could trust and momentum we could feel.",
    name: "Peter Hedlund",
    role: "SVP of marketing, HomeQ",
    image: "/expert-photo.png",
  },
  {
    quote:
      "Markition helped us tighten the whole journey, from first click to booked call. The campaigns felt sharper, faster, and much easier to scale.",
    name: "Peter Hedlund",
    role: "SVP of marketing, HomeQ",
    image: "/expert-photo.png",
  },
];

const REVIEW_INTERVAL_MS = 6000;

export default function Evolve() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % REVIEWS.length);
    }, REVIEW_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [activeReview]);

  return (
    <section
      className="w-full px-6 sm:px-10 pt-10 pb-16 sm:pb-20"
      style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
    >
      <style>
        {`
          @keyframes reviewProgressFill {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }

          .review-card-track {
            display: flex;
            transform: translate3d(calc(var(--active-review) * -100%), 0, 0);
            transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          .review-card-slide {
            display: flex;
            min-height: clamp(430px, 31vw, 520px);
            min-width: 100%;
            flex-direction: column;
            align-items: center;
          }

          .review-quote {
            width: min(100%, 680px);
            text-align: center;
          }

          .review-person {
            margin-top: auto;
          }

          .review-avatar {
            background: rgba(255, 255, 255, 0.16);
            border: 1px solid rgba(255, 255, 255, 0.32);
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.34), 0 8px 20px rgba(8, 37, 91, 0.2);
            backdrop-filter: blur(12px);
          }

          .review-progress-button {
            position: relative;
            width: clamp(64px, 7vw, 96px);
            height: 4px;
            padding: 0;
            border: 0;
            border-radius: 999px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.32);
            cursor: pointer;
            box-shadow: 0 0 18px rgba(93, 168, 255, 0.18);
            transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
          }

          .review-progress-button:hover,
          .review-progress-button:focus-visible {
            transform: translateY(-1px);
            background: rgba(255, 255, 255, 0.55);
            box-shadow: 0 0 24px rgba(93, 168, 255, 0.34);
            outline: none;
          }

          .review-progress-button::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: #ffffff;
            transform: scaleX(0);
            transform-origin: left center;
          }

          .review-progress-button[data-active="true"]::after {
            animation: reviewProgressFill ${REVIEW_INTERVAL_MS}ms linear both;
          }

          @media (prefers-reduced-motion: reduce) {
            .review-card-track,
            .review-progress-button[data-active="true"]::after {
              animation: none;
              transition: none;
            }

            .review-progress-button[data-active="true"]::after {
              transform: scaleX(1);
            }
          }

          @media (max-width: 640px) {
            .review-card-slide {
              min-height: 440px;
            }

            .review-quote {
              font-size: 22px !important;
            }
          }
        `}
      </style>
      {/* Lottie animation */}
      <div className="w-full pb-4 sm:pb-6">
        <LottieAnimation />
      </div>

      <div className="max-w-[1200px] mx-auto">

        {/* Heading */}
        <h2
          className="text-white text-center mb-10 sm:mb-12"
          style={{
            fontFamily: "var(--font-familjen, 'Familjen Grotesk', sans-serif)",
            fontSize: "clamp(26px, 3.6vw, 50px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          When Digital Marketing Needs To Evolve
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {CARDS.map((card) => (
            <div
              key={card.statement}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#ffffff" }}
            >
              {/* Dark image placeholder */}
              <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                <div
                  className="w-full rounded-xl"
                  style={{ background: "#0A1535", aspectRatio: "1 / 0.85" }}
                />
              </div>

              {/* Text */}
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <p
                  className="text-[#000028] font-semibold leading-snug mb-1"
                  style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
                >
                  {card.statement}
                </p>
                <p
                  className="text-[#000028]/45 leading-snug"
                  style={{ fontSize: "clamp(11px, 0.9vw, 12.5px)" }}
                >
                  {card.caveat}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <p
          className="text-white/70 text-center max-w-[620px] mx-auto leading-[1.75]"
          style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}
        >
          Digital growth isn&apos;t about doing more marketing. It&apos;s about making every
          part of your marketing work harder together.
        </p>

        {/* Glass testimonial carousel */}
        <div className="mt-14 sm:mt-20">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="review-card-track"
              style={{ "--active-review": activeReview } as CSSProperties}
              aria-live="polite"
            >
              {REVIEWS.map((review) => (
                <article
                  key={review.quote}
                  className="review-card-slide px-8 sm:px-16 pt-12 pb-0 text-center overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.01)",
                    boxShadow: "inset 0 0 58px 0 rgba(93,168,255,0.4), inset 0 0 0 1px rgba(255,255,255,0.12)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="22" height="22" viewBox="0 0 20 20" fill="#F5A623">
                        <path d="M10 1l2.39 6.26H19l-5.35 4.27 2.05 6.47L10 14.27l-5.7 3.73 2.05-6.47L1 7.26h6.61z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote
                    className="review-quote"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Suisse, Arial, sans-serif",
                      fontSize: "28.16px",
                      lineHeight: 1.34,
                      margin: "16.896px auto 28.16px",
                    }}
                  >
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>

                  <div className="review-person mb-6 sm:mb-8 flex items-center gap-4 text-left">
                    <div className="review-avatar h-16 w-16 shrink-0 overflow-hidden rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={review.image}
                        alt={review.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-medium leading-tight text-white sm:text-lg">
                        {review.name}
                      </p>
                      <p className="mt-1 text-sm leading-tight text-white/65 sm:text-base">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            className="mt-8 flex items-center justify-center gap-5"
            aria-label="Client review navigation"
          >
            {REVIEWS.map((item, index) => (
              <button
                key={item.quote}
                type="button"
                className="review-progress-button"
                data-active={index === activeReview}
                aria-label={`Show client review ${index + 1}`}
                aria-current={index === activeReview ? "true" : undefined}
                onClick={() => setActiveReview(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
