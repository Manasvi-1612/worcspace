import { type FC, useState } from "react";
import { ChevronDown, Search, Bell, TextAlignStart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/cn";
import { useSidebar } from "../../context/sidebar-context";

const Logo = () => (
  <svg
    viewBox="0 0 133 28"
    xmlns="http://www.w3.org/2000/svg"
    width="150"
    height="28"
  >
    <path
      d="M 11.808 18.956 C 11.603 14.174 4.723 14.173 4.519 18.956 C 4.519 20.948 6.152 22.564 8.164 22.564 C 10.172 22.564 11.808 20.948 11.808 18.956 Z M 16.331 18.956 C 15.883 29.678 0.448 29.685 0 18.956 C 0 14.499 3.663 10.873 8.164 10.873 C 12.664 10.873 16.331 14.499 16.331 18.956 Z M 31.012 26.093 L 24.601 26.043 L 12.566 5.455 L 10.53 8.937 L 7.342 3.482 L 9.377 0.003 L 9.377 0 L 15.757 0 Z"
      fill="rgb(79, 71, 229)"
    />
    <text
      x="36"
      y="21"
      fontFamily="-apple-system, 'Inter', 'Helvetica Neue', Arial, sans-serif"
      fontSize="20"
      fontWeight="500"
      fill="#fff"
      letterSpacing="-0.3"
    >
      Worcspace
    </text>
  </svg>
);

const KbdBadge = () => (
  <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-primary-border bg-primary-light text-text-subtle font-mono text-[11px] leading-none shrink-0 select-none">
    <span className="text-[13px] leading-none">⌘</span>K
  </span>
);

const UserAvatar: FC<{ initials: string; onClick?: () => void }> = ({
  initials,
  onClick,
}) => (
  <button
    onClick={onClick}
    aria-label="Open profile"
    className={cn(
      "h-10 w-10 rounded-full flex items-center justify-center",
      "bg-primary-200 text-secondary text-sm font-bold tracking-wide",
      "shadow-[0_2px_8px_rgba(99,102,241,0.4)]",
      "hover:opacity-90 active:scale-95 transition-all duration-200",
      "cursor-pointer select-none border-4 border-primary-border",
    )}
  >
    {initials}
  </button>
);

const Header = ({
  workspaceName = "Worcspace 1",
  userInitials = "GK",
}) => {
  const [query, setQuery] = useState("");
  const { toggle } = useSidebar();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className="w-full h-14 flex items-center justify-between gap-4 px-4 bg-linear-to-r from-[#12102d] via-[#2c276c] to-[#12102d] p-5 shadow xs:pl-4 xs:pr-3 rounded-xl">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label="Toggle sidebar"
          className="text-text-muted hover:text-text-light lg:hidden"
        >
          <TextAlignStart size={20} strokeWidth={1.5} />
        </Button>
        <div>
          <Logo />
        </div>

        <Button variant="surface" size="sm" className="rounded-full max-lg:hidden">
          {workspaceName}
          <ChevronDown size={13} strokeWidth={2} />
        </Button>
      </div>

      <div className="flex-1 max-w-sm max-sm:hidden">
        <Input
          type="search"
          theme="dark"
          onChange={handleChange}
          size="md"
          placeholder="Search..."
          value={query}
          leftSlot={
            <span className="text-text-subtle">
              <Search size={14} strokeWidth={1.75} />
            </span>
          }
          rightSlot={!query ? <KbdBadge /> : undefined}
        />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-muted hover:text-text-light"
          >
            <Bell size={20} strokeWidth={1.5} />
          </Button>
          <span className="absolute top-2.25 right-2.25 w-1.5 h-1.5 rounded-full bg-primary border-2 border-secondary pointer-events-none" />
        </div>

        <UserAvatar initials={userInitials} />
      </div>
    </header>
  );
};

export { Header };
