import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "HOME", href: "#" },
  {
    label: "GAMES",
    href: "#",
    children: [
      { label: "Laser Tag", href: "#" },
      { label: "Bowling", href: "#" },
      { label: "Trampoline", href: "#" },
      { label: "Slime Universe", href: "#" },
      { label: "VR Games", href: "#" },
      { label: "Soft Play", href: "#" },
      { label: "Wall Climbing", href: "#" },
      { label: "Arcade Games", href: "#" },
      { label: "All Games", href: "#" },
    ],
  },
  {
    label: "PARTY",
    href: "#",
    children: [
      { label: "BIRTHDAY", href: "#" },
      { label: "CORPORATE", href: "#" },
    ],
  },
  { label: "PRICE", href: "#" },
  { label: "CONTACT", href: "#" },
];

/* ───── Logo (FIXED RESPONSIVE) ───── */
const Logo = () => (
  <a href="#" className="flex items-center gap-2 shrink-0">
    <span className="text-white font-black text-xl sm:text-2xl tracking-wide">
      LOCO
    </span>

    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
      <span className="text-black text-[10px] sm:text-xs font-bold">🐻</span>
    </div>

    <span className="text-white font-black text-xl sm:text-2xl tracking-wide hidden sm:block">
      BEAR
    </span>
  </a>
);
const DropdownIcon = ({ open }) => (
  <span
    className={`ml-1 text-xs transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
  >
    ▼
  </span>
);

const Dropdown = ({ items, open }) => {
  return (
    <div
      className={`
        absolute top-full left-0 mt-2 bg-black border border-gray-800 min-w-[210px] z-50
        origin-top transition-all duration-200 ease-out
        ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
      `}
    >
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          className="
            block px-4 py-2 text-sm text-white
            tracking-wide
            border-b border-white
            hover:bg-yellow-500 hover:text-white
            hover:tracking-widest
            transition-all duration-200
            whitespace-nowrap
            hover:ml-1
          "
        >
          {i.label}
        </a>
      ))}
    </div>
  );
};

const NavItem = ({ item, active, setActive }) => {
  const ref = useRef();
  const open = active === item.label;

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [setActive]);

  return (
    <div ref={ref} className="relative">
      
      <button
        onClick={() => setActive(open ? null : item.label)}
        className="
          relative text-white text-xs sm:text-sm font-bold px-2 py-2
          whitespace-nowrap tracking-wide
          hover:text-yellow-400
          transition-colors duration-200
          group
        "
      >
        <span className="flex items-center">
          {item.label}

          {item.children && <DropdownIcon open={open} />}
        </span>
        <span
          className="
            absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400
            transition-all duration-300
            group-hover:w-full
          "
        />
      </button>

      {item.children && <Dropdown items={item.children} open={open} />}
    </div>
  );
};
/* ───── Mobile Icon ───── */
const Burger = ({ open }) => (
  <div className="w-6 flex flex-col gap-1">
    <span className={`h-[2px] bg-white transition ${open ? "rotate-45 translate-y-2" : ""}`} />
    <span className={`h-[2px] bg-white transition ${open ? "opacity-0" : ""}`} />
    <span className={`h-[2px] bg-white transition ${open ? "-rotate-45 -translate-y-2" : ""}`} />
  </div>
);
const MobileDropdownIcon = ({ open }) => (
  <span
    className={`ml-2 text-xs transition-transform duration-200  ${
      open ? "rotate-180" : ""
    }`}
  >
    ▼
  </span>
);

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [mobile, setMobile] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/90 z-50 border-b border-gray-800">
      
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between px-4 lg:px-10 h-16">
        <Logo />

        <div className="flex items-center gap-3 lg:gap-6">
          {NAV_LINKS.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              active={active}
              setActive={setActive}
            />
          ))}

          <button className="bg-yellow-500 text-black px-4 py-2 text-xs font-bold">
            BOOK NOW
          </button>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between px-4 h-16">
        <Logo />

        <button onClick={() => setMobile(!mobile)} >
          <Burger open={mobile} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobile && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-3 space-y-2">

          {NAV_LINKS.map((item) => (
            <div key={item.label}>

              {/* MAIN BUTTON */}
              <button
                className="
                  w-full flex items-center justify-between
                  text-white text-left py-3 font-bold
                  tracking-wide
                  border-b border-white
                  transition-all duration-200
                  hover:text-yellow-400
                "
                onClick={() =>
                  setActive(active === item.label ? null : item.label)
                }
              >
                <span className="flex items-center">
                  {item.label}

                  {/* dropdown indicator */}
                  {item.children && (
                    <MobileDropdownIcon open={active === item.label} />
                  )}
                </span>
              </button>

              {/* SUB MENU (SMOOTH ANIMATION) */}
              {item.children && (
                <div
                  className={`
                    overflow-hidden pl-3 space-y-1
                    transition-all duration-300 ease-in-out
                    ${active === item.label
                      ? "max-h-96 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                    }
                  `}
                >
                  {item.children.map((c) => (
                    <a
                      key={c.label}
                      href="#"
                      className="
                        block py-2 text-sm text-gray-300
                        tracking-wide
                        border-l border-gray-700 pl-3
                        hover:text-yellow-400
                        hover:tracking-widest
                        transition-all duration-200
                      "
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              )}

            </div>
          ))}

          {/* BOOK NOW */}
          <button className="w-full bg-yellow-500 text-black py-3 font-bold mt-3">
            BOOK NOW
          </button>

        </div>
      )}
    </nav>
  );
}