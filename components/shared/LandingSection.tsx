import { MainCarousel } from "./MainCarousel";
import CC3DLogo from "@/components/shared/3DCube";

const carouselImages = [
  "/assets/images/campus.jpeg",
  "/assets/home/pic2.jpeg",
  "/assets/home/pic3.jpeg",
  "/assets/home/pic1.jpeg",
  "/assets/home/pic5.JPG",
];

function LandingSection() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center text-center px-4 mt-48">
        <div className="flex flex-col items-center">
          <div className="text-xl font-medium text-neutral-100/[0.7] text-center">
            This is the Cultural Society, IIT Mandi
          </div>
          <h1 className="text-6xl max-sm:text-3xl max-w-screen-md font-semibold text-center leading-tight">
            Where raw talent meets global exposure
          </h1>
        </div>
        <div className="mt-24 px-12 w-full max-w-screen-lg mb-20">
          <MainCarousel images={carouselImages} />
        </div>

        {/* 3D Cube Section */}
        <div className="w-full flex flex-col items-center mt-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold ">
            Explore Our Cultural Legacy
          </h2>
          <div className="w-full max-w-[400px] h-[400px] mb-16 -mt-16 ">
            <CC3DLogo
              logos={[
                "/assets/images/CCLogo.png",
                "/assets/images/CCLogo.png",
                "/assets/images/CCLogo.png",
                "/assets/images/CCLogo.png",
                "/assets/images/CCLogo.png",
                "/assets/images/CCLogo.png",
              ]}
            />
          </div>
        </div>

        <div className="w-[80%] max-sm:w-full text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              About The Council
            </h1>
          </div>
          <p className="text-sm md:text-base lg:text-lg mb-20">
            The Cultural Council at IIT Mandi is a vibrant hub for students
            passionate about arts, culture, and creativity. It plays a pivotal
            role in fostering a diverse cultural atmosphere on campus,
            organizing events that range from music and dance performances to
            drama and arts. The council provides a platform for
            students to showcase their talents, learn new skills, and engage in
            cultural exchanges, thereby enriching the campus experience. By
            promoting various cultural activities, the Cultural Council helps in
            building a close-knit community where students can explore their
            interests and celebrate the rich diversity of cultural expressions.
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingSection;
