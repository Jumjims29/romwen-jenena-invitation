import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Gallery() {
  const photos = [
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg",
    "/photo4.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,          // Auto slide
    autoplaySpeed: 3000,     // 3 seconds per slide
    pauseOnHover: true,      // Pause when mouse is over
    arrows: false            // Hide left/right arrows
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <Slider {...settings}>
        {photos.map((src, idx) => (
          <div key={idx}>
            <img
              src={src}
              alt={`Wedding memory ${idx + 1}`}
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
