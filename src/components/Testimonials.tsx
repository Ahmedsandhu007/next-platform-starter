"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

const avatarTones = [
  "from-ink to-ink-soft",
  "from-bronze-500 to-bronze-700",
  "from-ink-soft to-ink",
  "from-bronze-400 to-bronze-600",
  "from-ink to-bronze-700",
  "from-bronze-600 to-ink",
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-bronze" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, s) => (
        <svg key={s} viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden border-b border-line bg-cream/40 py-20 sm:py-28"
      aria-label="Client testimonials"
    >
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title="Trusted by business owners across the UK"
          subtitle="We measure our success by yours. Here is what a few of the businesses we look after have to say about working with MMR."
        />

        <Reveal className="mt-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            style={
              {
                "--swiper-pagination-color": "#8b6a3d",
                "--swiper-pagination-bullet-inactive-color": "#161616",
                "--swiper-pagination-bullet-inactive-opacity": "0.18",
                "--swiper-pagination-bottom": "0px",
              } as React.CSSProperties
            }
            className="!pb-16 [&_.swiper-slide]:h-auto"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.name} className="h-auto">
                <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/5">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl leading-none text-bronze/30" aria-hidden>
                      &ldquo;
                    </span>
                    <Stars />
                  </div>
                  <blockquote className="mt-3 flex-1 text-[1.02rem] leading-relaxed text-ink/85">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-6">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${
                        avatarTones[i % avatarTones.length]
                      } font-display text-sm font-extrabold text-white`}
                      aria-hidden
                    >
                      {t.initials}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-[0.95rem] font-bold text-ink">{t.name}</span>
                      <span className="text-xs text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </Container>
    </section>
  );
}
