import Image from "next/image";
import React from "react";
import FooterLogo from "@/public/assets/FooterLogo.svg";
export const Footer = () => {
  const aboutLinks = ["About Us", "Our Branches", "Changelog"];
  const quickLinks = ["FAQs", "Recipes", "ContactUs"];
  const helpLinks = ["Terms of Privacy", "Privacy Policy", "Security"];
  const companyLinks = ["Contact", "Blog"];
  const socialLinks = ["Facebook", "Twitter", "Instagram"];
  return (
    <div className="border-t   w-full border-[#E0E0E0]">
      <div className="container mt-4 mx-auto py-5  px-5 ">
        <div className="grid lg:grid-cols-6 grid-cols-1 gap-4">
          <Image src={FooterLogo} alt="" />
          <div>
            <p className="text-[#282828] font-[600] text-[14px]">About</p>
            <ul>
              {aboutLinks.map((link, index) => (
                <li className="mt-1.5" key={index}>
                  <a href="#" className="text-[#5F6980] hover:text-[#282828]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#282828] font-[600] text-[14px]">Quick Links</p>
            <ul>
              {quickLinks.map((link, index) => (
                <li className="mt-1.5" key={index}>
                  <a href="#" className="text-[#5F6980] hover:text-[#282828]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#282828] font-[600] text-[14px]">
              Help & Support
            </p>
            <ul>
              {helpLinks.map((link, index) => (
                <li className="mt-1.5" key={index}>
                  <a href="#" className="text-[#5F6980] hover:text-[#282828]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#282828] font-[600] text-[14px]">Company</p>
            <ul>
              {companyLinks.map((link, index) => (
                <li className="mt-1.5" key={index}>
                  <a href="#" className="text-[#5F6980] hover:text-[#282828]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#282828] font-[600] text-[14px]">Social</p>
            <ul>
              {socialLinks.map((link, index) => (
                <li className="mt-1.5" key={index}>
                  <a href="#" className="text-[#5F6980] hover:text-[#282828]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
       
      </div>
       <div className="border-t mt-4 flex items-center justify-center border-[#E0E0E0] text-[#5F6980] py-2 text-[12px]">
          All rights reserved.© 2026{" "}
        </div>
    </div>
  );
};
