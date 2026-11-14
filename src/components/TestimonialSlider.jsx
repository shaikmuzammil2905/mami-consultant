import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { testimonials as defaultTestimonials } from '../data/testimonials';
import { useSiteContent } from '../context/ContentContext';

export default function TestimonialSlider() {
  const { testimonials = defaultTestimonials } = useSiteContent();
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <SectionHeading title="What Our Clients Say" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.45 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mami-swiper pb-11"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="card-mami rounded-2xl p-5 sm:p-6 h-full flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={`${item.name} — ${item.destination}`}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover object-top border-2 border-[#BCE6EC] shrink-0 bg-[#EAFBFD]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-[13.5px] italic text-[#173B63] leading-relaxed">
                      “{item.quote}”
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm font-bold text-[#0B3566]">
                      – {item.name}, <span className="text-[#0799A8]">{item.destination}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

