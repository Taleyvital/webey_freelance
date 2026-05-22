import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-stack-md bg-background/80 border-t border-surface-container/40 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 page-container">
        <span className="text-label-md text-on-surface-variant">
          © 2025 Webey Digital Magic. Made for Africa.
        </span>
        <div className="flex gap-8">
          <Link href="#" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Terms
          </Link>
          <Link href="#" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="#" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
