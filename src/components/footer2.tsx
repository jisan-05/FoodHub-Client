import { cn } from "@/lib/utils";
import { Logo, LogoImage, LogoText } from "@/components/logo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "FoodHub Logo",
    title: "FoodHub",
    url: "/",
  },
  className,
  tagline = "Discover & Order Delicious Meals",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Overview", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Marketplace", url: "#" },
        { text: "Features", url: "#" },
        { text: "Integrations", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Contact", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Help Center", url: "#" },
        { text: "Sales", url: "#" },
        { text: "Advertise", url: "#" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright = "© 2026 FoodHub. All rights reserved.",
  bottomLinks = [
    { text: "Terms & Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className={cn("bg-gray-900 text-white py-24", className)}>
      <div className="container mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            {/* Logo + Tagline */}
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-3 lg:justify-start">
                <Logo url={logo.url}>
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10 dark:invert"
                  />
                  <LogoText className="text-2xl font-bold">{logo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-4 text-gray-300 font-medium">{tagline}</p>
              
              {/* Optional CTA */}
              <a
                href="#"
                className="inline-block mt-6 bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
              >
                Order Now
              </a>
            </div>

            {/* Menu Sections */}
            {menuItems.map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-4 font-semibold text-white">{section.title}</h3>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-yellow-500 transition">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Links & Copyright */}
          <div className="mt-16 flex flex-col md:flex-row md:justify-between md:items-center border-t border-gray-700 pt-6 text-sm text-gray-400">
            <p>{copyright}</p>
            <ul className="flex gap-6 mt-4 md:mt-0">
              {bottomLinks.map((link, idx) => (
                <li key={idx} className="hover:text-yellow-500 underline transition">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
