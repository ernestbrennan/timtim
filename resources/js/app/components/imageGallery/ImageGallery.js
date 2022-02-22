import React from 'react';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const ImageGallery = ({ images }) => {
  const settings = {
    dots: true,
    // lazyLoad: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    focusOnSelect: false,
  };
  return (
    <div style={{ height: '100%' }}>
      <Slider {...settings}>
        {images.map((image, index) => {
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <img
                src={image}
                alt=""
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  margin: 'auto',
                  objectFit: 'contain',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageGallery;
