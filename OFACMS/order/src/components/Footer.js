import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

export function UserFooter() {
    return (
        <Footer container>
            <div className="w-full">
                <div className="flex items-center justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className="flex items-center space-x-2">
                        <FaShoppingBag className="text-4xl text-cyan-800" />
                        <Link  
  to="/usermain" 
  style={{ 
    fontFamily: '"Dancing Script", cursive', // Apply Dancing Script font
    letterSpacing: '1.5px', // Slightly increased spacing
    // textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // More pronounced shadow
    background: 'linear-gradient(45deg, #008B8B, #008B8B)', // Gradient background
    WebkitBackgroundClip: 'text', // Clip background to text
    WebkitTextFillColor: 'transparent', // Make text color transparent to show background
    display: 'inline-block', // Necessary for the gradient effect
  }}
  className="text-5xl font-bold transition-all text-cyan-800 duration-300 transform hover:scale-11 hover:underline"
>
  Nandha Mart</Link>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-4 sm:gap-6">
                        <div>
                            <FooterTitle title="About" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Contact Us</FooterLink>
                                <FooterLink href="#">About Us</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Product" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Mobile</FooterLink>
                                <FooterLink href="#">Laptops</FooterLink>
                                <FooterLink href="#">And More</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Help" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">FAQ</FooterLink>
                                <FooterLink href="#">Shipping</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Legal" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Privacy Policy</FooterLink>
                                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright href="#" by="Nandha Mart" year={2024} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterIcon href="#" icon={BsFacebook} />
                        <FooterIcon href="#" icon={BsInstagram} />
                        <FooterIcon href="#" icon={BsTwitter} />
                        <FooterIcon href="#" icon={BsGithub} />
                        <FooterIcon href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
