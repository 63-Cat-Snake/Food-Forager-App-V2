import React , { useState, useEffect }from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function Navigationbar() {

  const [show, setShow] = useState(false);
  const [navbarTop, setNavbarTop] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY < 200) { // if scroll down hide the navbar
      if (window.scrollY < 10 ) setShow(false);
      else setShow(true);
      setNavbarTop(window.scrollY); 
    } else { // if scroll up show the navbar
      setNavbarTop(500);
      setShow(true);
    }

    // remember current page location to use in the next move
      setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    // cleanup function
    return () => {
       window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <Navbar> {/*class = { show ? "" : "hidden" } style = {{ top: (navbarTop-70)+'px' }}>*/}
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <h1 className="font-bold text-inherit"><b>Food Foragers</b></h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
