"use client";
import React, { useEffect, useState } from "react";
import "./Carousel.css";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import Image from "next/image";

const clubs = [
  {
    name: "Designauts",
    image: "/assets/logo/designauts1.svg",
    description:
      "Designauts is IIT Mandi’s hub for design enthusiasts! From graphic design to product innovation, we explore it all with hands-on workshops, projects, and guest speakers. Thinking Made Visual",
    color: "53,31,59,0.5",
  },
  {
    name: "UDC",
    image: "/assets/logo/udc1.svg", 
    description:
      "UDC is a vibrant community of passionate dancers, offering workshops, performances, and competitions. We nurture talent, foster creativity, and bring together dance enthusiasts of all skill levels.",
    color: "23,48,43,0.5",
  },

  {
    name: "PMC",
    image: "/assets/logo/pmc.svg",
    description:
      "The Photography and Moviemaking Club (PMC) at IIT Mandi is for visual storytellers. It has two segments: Shutterbugs for photography and Perception for filmmaking.",
    color: "35,38,44,0.5",
  },
  {
    name: "Drama Club",
    image: "/assets/logo/drama.png",
    description:
      "Step into the spotlight with IIT Mandi’s Drama Club! 🎭 Whether you’re an actor, writer, or theater enthusiast, this is your stage to shine with captivating performances and behind-the-scenes magic!",
    color: "29,39,59,0.5",
  },
  {
    name: "ArtGeeks",
    image: "/assets/logo/artgeeks.svg",
    description:
      "We are a community of artists at IIT Mandi, dedicated to elevating art to unprecedented heights. ArtGeeks serves as a creative sanctuary where we come together to express ourselves and bring ideas to life on canvas.",
    color: "0,214,243,0.2",
  },
  
  {
    name: "SPIC MACAY",
    image: "/assets/logo/spicmacay.svg",
    description:
      "The Society for the Promotion of Indian Classical Music And Culture Amongst Youth (SPIC MACAY) is a youth movement dedicated to promoting Indian cultural heritage.",
    color: "57,48,28,0.5",
  },
  {
    name: "Music Club",
    image: "/assets/logo/music1.svg",
    description:
      "The Music Club of IIT Mandi is a vibrant community fostering musical talent, offering a platform for students to explore, perform, and enhance their musical skills through events, workshops, and collaborations.",
    color: "55,31,45,0.5",
  },
];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = clubs.length;
  const [grad, setGrad] = useState(clubs[0].color); // Initialize with the first club color
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  // Update the gradient background color whenever activeIndex changes
  useEffect(() => {
    setGrad(clubs[activeIndex].color);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % clubs.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? clubs.length - 1 : prevIndex - 1
    );
  };

  const getTransformValue = (index: number) => {
    let diff = (index - activeIndex + totalImages) % totalImages;
    if (diff > totalImages - 5) {
      diff -= totalImages;
    }

    let translateValue = 0;
    if (screenWidth >= 1200) {
      translateValue = diff * 500;
    } else if (screenWidth >= 900) {
      translateValue = diff * 450;
    } else if (screenWidth >= 765) {
      translateValue = diff * 400;
    } else translateValue = diff * 300;

    return `translateX(${translateValue}px) scale(${
      index === activeIndex ? 1.5 : 0.8
    })`;
  };

  const getVisibility = (index: number) => {
    const diff = (index - activeIndex + totalImages) % totalImages;

    if (diff === totalImages - 5) return "hidden";
    if (diff === totalImages - 4) return "hidden";
    return "visible";
  };

  return (
    <div
      className="carousel h-screen w-full relative"
      style={{
        background: `linear-gradient(-15deg, rgba(24, 24, 27, 0.5), rgba(${grad}))`,
      }}
    >
      <div className="absolute top-28 left-12 text-neutral-100 sm:w-[500px] max-sm:left-10 max-sm:top-28 max-sm:w-[80%] ">
        <h1 className="text-3xl sm:text-5xl font-semibold pb-2">
          {clubs[activeIndex].name}
        </h1>
        <p className="text-sm sm:text-base">{clubs[activeIndex].description}</p>
        <div className="flex my-2 gap-2.5 sm:gap-5  text-neutral-100/[0.5]">
          <FaRegArrowAltCircleLeft
            size={30}
            onClick={handlePrev}
            className="cursor-pointer max-sm:scale-90"
          />
          <FaRegArrowAltCircleRight
            size={30}
            onClick={handleNext}
            className="cursor-pointer max-sm:scale-90"
          />
        </div>
      </div>
      <div className="carousel-images max-sm:mt-5 -rotate-[15deg] translate-y-24">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="carousel-image cursor-pointer max-lg:mt-16"
            style={{
              transform: getTransformValue(index),
              visibility: getVisibility(index),
            }}
          >
            <Image
              width={100}
              height={100}
              src={club.image}
              onClick={() => setActiveIndex(index)}
              alt={`Carousel ${index}`}
              className={`m-2 xl:h-56 xl:w-56 md:h-56 md:w-56 sm:h-44 sm:w-44 shadow-2xl lg:h-64 lg:w-64 xs:h-44 xs:w-44 h-56 w-56`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
