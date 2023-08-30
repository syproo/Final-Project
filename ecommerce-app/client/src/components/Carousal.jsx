// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../components/carousal.css";

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

const Carousal = () => {
  return (
    <div className="p-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper "
      >
        <div>
          <SwiperSlide>
            <img
              className=" "
              src="public\images\banner1.jpg"
              alt="Shop Easy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img src="public\images\banner2.jpg" alt="Easy Payments" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="public\images\banner3.jpg" alt="Gift Vouchers" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="public\images\banner4.jpg" alt="Shop from Anywhere" />
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousal;
