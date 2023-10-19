
import "./Slidercard.css";
import React, { useState, useEffect } from 'react';
import sliderimages from '../../imgaes/sliderimg';
//import { SliderData } from './SliderData';
import { FaArrowRight, FaArrowLeft} from 'react-icons/fa';



const Slidercard = ({sliderimages}) => {
  const [current, setCurrent] = useState(0);
  const length = sliderimages.length;
  const autoSlideInterval = 3000; 

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoSlideInterval);

    return () => {
      clearInterval(interval);
    };
  }, [current]);

  if (!Array.isArray(sliderimages) || sliderimages.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <FaArrowLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowRight className='right-arrow' onClick={nextSlide} />
      {sliderimages.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <>
              <img src={slide.img} className="image"></img>
              <p className="caption">{slide.caption}</p>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};


export default Slidercard;
