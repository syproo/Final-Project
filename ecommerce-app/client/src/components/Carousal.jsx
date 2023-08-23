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
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  
} from "swiper/modules";

const Carousal = () => {
  return (
    <div className="p-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 2500,
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
              src="https://images.pexels.com/photos/8078443/pexels-photo-8078443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/23/14/56/bazaar-1853361_1280.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.pixabay.com/photo/2019/07/13/16/44/woman-4335235_1280.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/29/05/07/breads-1867459_1280.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014617_1280.jpg"
              alt=""
            />
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousal;
