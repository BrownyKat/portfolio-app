export function SiteFooter() {
  return (
    <footer className="border-t border-[#48e2ff]/18 bg-[#071018]/82">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-[#b8c8d6] sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
        <div>
          <p className="font-black uppercase tracking-[0.18em] text-[#f5fbff]">
            Embuido, Fran Joseph M.
          </p>
          <p className="mt-2 text-[#9ff0ff]">BSIT Student / Full-stack portfolio</p>
          <p className="mt-3 max-w-2xl text-[#b8c8d6]">
            &quot;IF money is in, There will be more money to be out&quot; - By Me
          </p>
        </div>
        <address className="flex flex-col gap-2 not-italic md:items-end">
          <a href="mailto:franzjosephembuido@gmail.com" className="hover:text-[#48e2ff]">
            franzjosephembuido@gmail.com
          </a>
          <a href="tel:+639452256431" className="hover:text-[#48e2ff]">
            +63-945-225-6431
          </a>
          <a
            href="https://github.com/BrownyKat"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#48e2ff]"
          >
            github.com/BrownyKat
          </a>
        </address>
      </div>
    </footer>
  );
}
