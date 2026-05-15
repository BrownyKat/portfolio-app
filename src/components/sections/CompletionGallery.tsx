import Image from "next/image";
import { getProjects } from "@/lib/projects";

export function CompletionGallery() {
  const completionImages = getProjects().flatMap(
    (project) => project.completionProofs ?? [],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#47d7c4]">
            Completion Proof
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#fff7ec] sm:text-4xl">
            Screens matched to shipped work
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#c8ded7]">
          Each screenshot is labeled by what it actually shows, so the gallery
          reads like a clean proof board instead of a file dump.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {completionImages.map((image, index) => (
          <article
            key={image.src}
            className={`arcane-card animate-rise group overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-[#47d7c4]/55 ${
              image.featured ? "lg:col-span-2" : ""
            }`}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className={`relative overflow-hidden ${image.featured ? "aspect-[16/8.5]" : "aspect-[16/10]"}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102b2f]/88 via-[#102b2f]/10 to-transparent" />
            </div>
            <div className="space-y-3 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#47d7c4]">
                  {image.category}
                </p>
                <span className="h-px min-w-10 flex-1 bg-gradient-to-r from-[#47d7c4]/40 to-transparent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#fff7ec]">
                  {image.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#c8ded7]">
                  {image.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
