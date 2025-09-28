import React, { useEffect, useState, useCallback } from "react";

const Button = () => {
  const categories = [
    "Pizza",
    "Burger",
    "Fried Chicken",
    "Pasta",
    "Sandwiches",
    "Drinks",
    "Desserts",
    "Fries & Sides",
    "Deals",
  ];

  const [active, setActive] = useState(categories[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { 
        root: null, 
        rootMargin: '-20% 0px -70% 0px', // Adjust these values as needed
        threshold: 0.1 
      }
    );

    categories.forEach((cat) => {
      const section = document.getElementById(cat);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      categories.forEach((cat) => {
        const section = document.getElementById(cat);
        if (section) {
          observer.unobserve(section);
        }
      });
      observer.disconnect();
    };
  }, []); // Empty dependency array

  const scroll = useCallback((cat) => {
    const sec = document.getElementById(cat);
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="sticky top-19 z-20 flex gap-4 p-4 justify-center overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => scroll(cat)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all border whitespace-nowrap
            ${
              active === cat
                ? "bg-red-500 text-white border-red-600 shadow-lg scale-105"
                : "bg-[#f1d4d4] text-black font-bold hover:bg-white"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Button;