import React, { useState } from "react";

const videos = [
  {
    id: 1,
    src: "ugc.mp4",
    poster: "ugc-poster.jpg",
    title: "Skincare routine",
    desc: "Short-form UGC video",
  },
];

const VideoCard = ({ src, poster, title, desc }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gold-400/50 bg-gradient-to-b from-pink-100/60 to-white/70 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400 hover:shadow-gold">
      {failed ? (
        <div className="flex aspect-[9/16] w-full items-center justify-center bg-gradient-to-b from-pink-100/70 to-white/70 px-6 text-center font-sans text-sm font-light text-ink/50">
          Video coming soon
        </div>
      ) : (
        <video
          className="aspect-[9/16] w-full object-cover"
          src={src}
          poster={poster}
          controls
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
      <div className="px-5 py-4">
        <p className="font-serif text-xl text-ink">{title}</p>
        <p className="font-sans text-sm font-light text-ink/60">{desc}</p>
      </div>
    </div>
  );
};

const UGC = () => {
  return (
    <div name="ugc" className="w-full bg-transparent py-24">
      <div className="mx-auto flex max-w-screen-lg flex-col px-6">
        <div className="mb-12 text-center md:text-left">
          <p className="font-serif text-4xl font-light text-black sm:text-5xl md:text-6xl">
            UGC
          </p>
          <div className="accent-rule mx-auto mt-4 h-px w-40 md:mx-0" />
          <p className="mt-6 font-sans font-light text-ink/70">
            Skincare, makeup &amp; lifestyle content I&apos;ve made
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl justify-items-center gap-8 sm:grid-cols-2">
          {videos.map(({ id, src, poster, title, desc }) => (
            <VideoCard
              key={id}
              src={src}
              poster={poster}
              title={title}
              desc={desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UGC;
