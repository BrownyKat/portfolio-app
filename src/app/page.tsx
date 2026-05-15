import Image from "next/image";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { LogPreview } from "@/components/molecules/LogPreview";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { CompletionGallery } from "@/components/sections/CompletionGallery";
import { Timeline } from "@/components/sections/Timeline";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { getLogs } from "@/lib/logs";
import { getTimelineEntries } from "@/lib/timeline";

export default function Home() {
  const projects = getProjects();
  const featuredProjects = getFeaturedProjects();
  const allLogs = getLogs();
  const logs = allLogs.slice(0, 2);
  const timelineEntries = getTimelineEntries();

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#47d7c4]/20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#47d7c4] to-transparent" />
        <div className="floating-cat cat-one" aria-hidden="true">
          <span />
        </div>
        <div className="floating-cat cat-two" aria-hidden="true">
          <span />
        </div>
        <div className="floating-cat cat-three" aria-hidden="true">
          <span />
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_0.82fr] md:items-center lg:px-8 lg:py-20">
          <div className="animate-rise space-y-7">
            <div className="space-y-4">
              <p className="section-kicker uppercase tracking-[0.22em]">
                BSIT Student / Web Developer
              </p>
              <h1 className="hero-title max-w-3xl">
                Embuido, Franz Joseph M.
              </h1>
              <p className="hero-copy max-w-3xl">
                I am a BSIT student and web developer who enjoys building
                efficient, user-friendly systems. I work across frontend and
                backend development with an academic focus on web development.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/work">Explore work</ButtonLink>
              <ButtonLink
                href="/logs"
                variant="secondary"
              >
                View logs
              </ButtonLink>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <a
                href="mailto:franzjosephembuido@gmail.com"
                className="arcane-panel rounded-lg p-4 transition hover:border-[#47d7c4]/60"
              >
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#93b8b1]">
                  Email
                </span>
                <span className="mt-2 block break-words font-semibold text-[#fff7ec]">
                  franzjosephembuido@gmail.com
                </span>
              </a>
              <a
                href="tel:+639452256431"
                className="arcane-panel rounded-lg p-4 transition hover:border-[#47d7c4]/60"
              >
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#93b8b1]">
                  Phone
                </span>
                <span className="mt-2 block font-semibold text-[#fff7ec]">
                  +63-945-225-6431
                </span>
              </a>
              <a
                href="https://github.com/BrownyKat"
                target="_blank"
                rel="noreferrer"
                className="arcane-panel rounded-lg p-4 transition hover:border-[#47d7c4]/60"
              >
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#93b8b1]">
                  GitHub
                </span>
                <span className="mt-2 block font-semibold text-[#fff7ec]">
                  BrownyKat
                </span>
              </a>
            </div>
            <blockquote className="rounded-lg border border-[#ff7a59]/25 bg-[#ff7a59]/8 p-4 text-sm font-medium leading-6 text-[#ffe4d9]">
              &quot;If money is in, There is no more problem&quot; - By Me
            </blockquote>
            <dl className="grid grid-cols-3 gap-3 text-sm">
              <div className="arcane-panel rounded-lg p-4">
                <dt className="text-[#93b8b1]">Projects</dt>
                <dd className="text-2xl font-black text-[#fff7ec]">
                  {projects.length}
                </dd>
              </div>
              <div className="arcane-panel rounded-lg p-4">
                <dt className="text-[#93b8b1]">Logs</dt>
                <dd className="text-2xl font-black text-[#fff7ec]">
                  {allLogs.length}
                </dd>
              </div>
              <div className="arcane-panel rounded-lg p-4">
                <dt className="text-[#93b8b1]">Focus</dt>
                <dd className="text-2xl font-black text-[#fff7ec]">Web</dd>
              </div>
            </dl>
          </div>
          <div className="animate-float relative flex justify-center md:justify-end">
            <div className="cybercat" aria-hidden="true">
              <div className="cybercat-ear cybercat-ear-left" />
              <div className="cybercat-ear cybercat-ear-right" />
              <div className="cybercat-head">
                <div className="cybercat-eye cybercat-eye-left" />
                <div className="cybercat-eye cybercat-eye-right" />
                <div className="cybercat-nose" />
                <div className="cybercat-whisker cybercat-whisker-left" />
                <div className="cybercat-whisker cybercat-whisker-right" />
              </div>
              <div className="cybercat-ring" />
            </div>
            <div className="absolute inset-8 rounded-full border border-[#47d7c4]/35 shadow-[0_0_45px_rgba(71,215,196,0.22)]" />
            <div className="absolute inset-16 rounded-full border border-[#ff7a59]/25" />
            <Image
              src="/portfolio/franz-profile.png"
              alt="Profile photo of Franz Joseph Embuido"
              width={940}
              height={1123}
              priority
              className="relative aspect-square w-full max-w-sm rounded-full border border-[#47d7c4]/45 object-cover object-top shadow-2xl shadow-[#47d7c4]/20"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#47d7c4]">
              Featured
            </p>
            <h2 className="section-title mt-2 text-[#fff7ec]">
              Selected systems
            </h2>
          </div>
          <ButtonLink href="/work" variant="secondary">
            View all work
          </ButtonLink>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <CompletionGallery />

      <section className="border-y border-[#47d7c4]/18 bg-[#15383d]/45">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#47d7c4]">
              Timeline
            </p>
            <h2 className="section-title mt-2 text-[#fff7ec]">
              Daily Internship Timeline
            </h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-[#c8ded7]">
              A day-by-day record of revisions, research, implementation,
              testing, and shipped project work.
            </p>
          </div>
          <Timeline entries={timelineEntries} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#47d7c4]">
            Logs
          </p>
          <h2 className="section-title mt-2 text-[#fff7ec]">
            Recent notes
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {logs.map((log) => (
            <LogPreview key={log.slug} log={log} />
          ))}
        </div>
      </section>
    </main>
  );
}
