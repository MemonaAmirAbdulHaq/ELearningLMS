import Link from "next/link";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

const NavItems = ({
  activeItem,
  isMobile,
}: {
  activeItem: number;
  isMobile: boolean;
}) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden 800px:flex items-center space-x-2">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link className="group relative" key={index} href={item.url}>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-blue-400 text-blue-600 font-semibold"
                    : "dark:text-gray-300 text-gray-700 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                } text-base px-4 py-2 font-Poppins font-medium transition-all duration-300 relative rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-gray-800/50`}
              >
                {item.name}
                {/* Active indicator */}
                {activeItem === index && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
                )}
                {/* Hover indicator */}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 group-hover:w-6"></span>
              </span>
            </Link>
          ))}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          {/* Mobile Logo */}
          <div className="w-full text-center py-6 border-b border-gray-200 dark:border-gray-700">
            <Link href={"/"} passHref>
              <span
                className={`text-2xl font-Poppins font-[500] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
              >
                ELearning
              </span>
            </Link>
          </div>

          {/* Mobile Menu Items */}
          <div className="py-4">
            {navItemsData &&
              navItemsData.map((item, index) => (
                <Link key={index} href={item.url}>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-blue-400 text-blue-600 font-semibold bg-blue-50 dark:bg-gray-800/50 border-r-3 border-blue-600"
                        : "dark:text-gray-300 text-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                    } text-lg px-6 py-3 font-Poppins font-medium block transition-all duration-300 border-l-4 ${
                      activeItem === index
                        ? "border-l-blue-600"
                        : "border-l-transparent hover:border-l-blue-300"
                    } relative group`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {activeItem === index && (
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      )}
                    </div>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
