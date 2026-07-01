import { TEAM_SHOWCASE_SLIDES } from '../lib/marketing-images';
import { HeroImageFrame } from './HeroImageFrame';

type HeroTeamShowcaseProps = {
  className?: string;
};

function ShowcaseCaption({ text }: { text: string }) {
  return (
    <p className="absolute bottom-0 left-0 right-0 z-10 px-4 py-3 text-xs font-technical font-medium uppercase tracking-[0.14em] text-text-primary/90 bg-gradient-to-t from-[#0a192f]/95 via-[#0a192f]/70 to-transparent">
      {text}
    </p>
  );
}

function ShowcaseTile({
  slide,
  className = '',
  priority = false,
}: {
  slide: (typeof TEAM_SHOWCASE_SLIDES)[number];
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`group relative m-0 overflow-hidden bg-surface-raised ${className}`.trim()}
    >
      <HeroImageFrame
        src={slide.src}
        alt={slide.alt}
        fill
        priority={priority}
        overlay="fade"
        objectPosition={slide.objectPosition}
        frameClassName="absolute inset-0"
        className="transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
      />
      <ShowcaseCaption text={slide.caption} />
    </figure>
  );
}

/**
 * Editorial team photography: bento grid on desktop, snap filmstrip on mobile.
 * Vivid photos with a light bottom fade — no heavy duotone grid.
 */
export function HeroTeamShowcase({ className = '' }: HeroTeamShowcaseProps) {
  const [featured, ...supporting] = TEAM_SHOWCASE_SLIDES;

  return (
    <div
      className={`hero-team-showcase -mx-4 sm:-mx-6 lg:-mx-8 ${className}`.trim()}
      aria-label="Qwabi Engineering team"
    >
      {/* Mobile: horizontal filmstrip */}
      <div
        className="flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-4 pb-2 md:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {TEAM_SHOWCASE_SLIDES.map((slide, index) => (
          <figure
            key={slide.src}
            role="listitem"
            className="relative m-0 w-[min(82vw,22rem)] shrink-0 snap-center overflow-hidden bg-surface-raised aspect-[4/5]"
          >
            <HeroImageFrame
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              overlay="fade"
              objectPosition={slide.objectPosition}
              frameClassName="absolute inset-0"
            />
            <ShowcaseCaption text={slide.caption} />
          </figure>
        ))}
      </div>

      {/* Desktop: asymmetric bento */}
      <div className="hidden md:grid md:grid-cols-12 md:grid-rows-2 md:gap-1 md:min-h-[22rem] lg:min-h-[26rem]">
        <ShowcaseTile
          slide={featured}
          priority
          className="col-span-7 row-span-2 min-h-[22rem] lg:min-h-[26rem]"
        />
        {supporting.map((slide) => (
          <ShowcaseTile
            key={slide.src}
            slide={slide}
            className="col-span-5 min-h-[10.5rem] lg:min-h-[12.75rem]"
          />
        ))}
      </div>
    </div>
  );
}
