import React from "react";
import CubeWithLogos from "@/components/shared/3DCube";
import Ball3D from "@/components/shared/3DBall";
import { MainCarousel } from "@/components/shared/MainCarousel";

const carouselImages = [
  "/assets/home/pic1.jpeg",
  "/assets/home/pic2.jpeg",
  "/assets/home/pic3.jpeg",
  "/assets/home/pic4.jpeg",
  "/assets/home/pic5.JPG",
];

const KalaImages = [
  "/assets/kala/k1.JPG",
  "/assets/home/pic6.JPG",
  "/assets/kala/k3.JPG",
  "/assets/kala/k5.png",

];


const AakarshanImages = [
  "/assets/aakarshan/a5.JPG",
  "/assets/aakarshan/a2.JPG",
  "/assets/aakarshan/a3.JPG",
  "/assets/aakarshan/a4.JPG",
  "/assets/aakarshan/a11.JPG",
];



const page = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center mt-48">
      {/* Exodia Section */}
      <div className="flex flex-col items-center">
        <div className="text-xl font-medium text-neutral-100/[0.7] text-center">
          This is the Cultural Society, IIT Mandi
        </div>
        <h1 className="text-5xl max-sm:text-2xl max-w-screen-md font-semibold text-center leading-tight">
          Explore Our Cultural Legacy
        </h1>
      </div>
      <div className="w-full max-w-[400px] h-[400px] mb-16 -mt-16 ">
        <CubeWithLogos
          logos={[
            "/assets/images/Exodia1.png",
            "/assets/images/Exodia1.png",
            "/assets/images/Exodia1.png",
            "/assets/images/Exodia1.png",
            "/assets/images/Exodia1.png",
            "/assets/images/Exodia1.png",
          ]}
        />
      </div>

      <div className="w-full flex flex-col items-center -mt-10">
        <h2 className="text-4xl md:text-6xl lg:text-6xl font-semibold ">Exodia</h2>
        <p className="text-sm md:text-base lg:text-lg mb-20 mt-20  text-center mx-36 max-sm:mx-8">
        Exodia is the annual cultural fest of IIT Mandi. It is a three-day-long event that is held in the month of March. The fest is a celebration of the cultural diversity and talent of the students all over India. The fest is a platform for students to showcase their talent in various fields such as music, dance, drama, art, design, photography and moviemaking. The fest also includes various competitions, workshops, and performances by renowned artists. Exodia is one of the most awaited events of the year at IIT Mandi and is attended by students from various colleges and universities across the country. The fest is a perfect blend of fun, creativity, and talent and is a celebration of the spirit of youth.
        </p>
      </div>
      <div className="mt-12 px-12 w-full max-w-screen-lg mb-20 max-sm:px-16">
        <MainCarousel images={carouselImages} />
      </div>

      {/* Kala Section */}
      <div className="w-full max-w-[400px] h-[400px] mb-16 -mt-16 ">
        <CubeWithLogos
          logos={[
            "/assets/images/kala.png",
            "/assets/images/kala.png",
            "/assets/images/kala.png",
            "/assets/images/kala.png",
            "/assets/images/kala.png",
            "/assets/images/kala.png",
          ]}
        />
      </div>

      <div className="w-full flex flex-col items-center -mt-10">
        <h2 className="text-4xl md:text-6xl lg:text-6xl font-semibold ">Kala</h2>
        <p className="text-sm md:text-base lg:text-lg mb-20 mt-20 text-center mx-36 max-sm:mx-8 ">
        Kala is an annual event organized by the Cultural Council of IIT Mandi, featuring a vibrant 2-week cultural fiesta. 
This event includes a range of activities organized by clubs - UDC, Gustakh Saale, PMC, Music Club, Designatus, and Art Geeks. Kala aims to broaden students' exposure to various cultural domains and fosters a collaborative environment. 
It plays a crucial role in encouraging over 300 students to learn, collaborate, and actively participate in cultural activities. Having a unique way of selecting teams, Kala ensures that students from different years and branches come together to form teams and compete in various events after getting selected in an auction.
        </p>
      </div>
      <div className="mt-12 max-sm:px-16 px-12 w-full max-w-screen-lg mb-20">
        <MainCarousel images={KalaImages} />
      </div>

      {/* Aakarshan Section */}
      <div className="w-full max-w-[400px] h-[400px] mb-16 -mt-16 ">
        <CubeWithLogos
          logos={[
            "/assets/images/aakarshan.png",
            "/assets/images/aakarshan.png",
            "/assets/images/aakarshan.png",
            "/assets/images/aakarshan.png",
            "/assets/images/aakarshan.png",
            "/assets/images/aakarshan.png",
          ]}
        />
      </div>

      <div className="w-full flex flex-col items-center -mt-10">
        <h2 className="text-4xl md:text-6xl lg:text-6xl font-semibold ">Aakarshan</h2>
        <p className="text-sm md:text-base lg:text-lg mb-20 mt-20 text-center mx-36 max-sm:mx-8">
        Aakarshan is the annual induction program organized by the Cultural Council of IIT Mandi for the freshers.
The event is a cultural nigth that includes various activities, workshops, and performances by the clubs of the Cultural Council.
The event aims to introduce the freshers to the cultural atmosphere of the college and encourage them to participate in various cultural activities.
        </p>
      </div>
      <div className="mt-12 max-sm:px-16 px-12 w-full max-w-screen-lg mb-20">
        <MainCarousel images={AakarshanImages} />
      </div>
    </div>
  );
};

export default page;