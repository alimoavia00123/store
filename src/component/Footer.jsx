import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#a30606] text-white p-6 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">&copy; Butt Online Shopping. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:underline hover:text-amber-400 ">Privacy Policy</a>
          <a href="#" className="hover:underline hover:text-amber-400">Terms of Service</a>
          <a href="#" className="hover:underline hover:text-amber-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
