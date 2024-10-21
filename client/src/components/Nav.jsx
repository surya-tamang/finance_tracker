import { Link } from "react-scroll";
const Nav = () => {
  return (
    <nav>
      <ul className="hidden md:flex gap-8 py-6">
        <Link
          to="features"
          spy={true}
          smooth={true}
          offset={10}
          duration={500}
          className="hover:text-yellow cursor-pointer"
        >
          Feature
        </Link>
        <Link
          to="steps"
          spy={true}
          smooth={true}
          offset={-40}
          duration={500}
          className="hover:text-yellow cursor-pointer"
        >
          Tutorial
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-10}
          duration={500}
          className="hover:text-yellow cursor-pointer"
        >
          About us
        </Link>
        <Link
          to="faq"
          spy={true}
          smooth={true}
          offset={40}
          duration={500}
          className="hover:text-yellow cursor-pointer"
        >
          FAQs
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
