





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider from 'react-slick';
import ProductsPage from './Products';

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };


  const carouselImages = [
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
  ];

  const additionalCarouselImages = [
    'https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg',
  ];

  const bannerImages = [
    'https://t3.ftcdn.net/jpg/02/62/18/46/360_F_262184611_bXhmboL9oE6k2ILu4qXxNWFhNJCEbTn2.jpg',
    'https://static.vecteezy.com/system/resources/thumbnails/002/006/967/small/young-women-takes-a-shopping-cart-and-enjoy-online-shopping-through-smartphones-choose-to-buy-gifts-valentine-s-day-concepts-website-or-mobile-phone-application-flat-design-illustration-vector.jpg',
  ];

  const featuredBrands = [
    'https://static.vecteezy.com/system/resources/previews/021/496/125/original/hp-brand-logo-computer-symbol-white-design-usa-laptop-illustration-with-blue-background-free-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/021/514/856/non_2x/dell-brand-logo-computer-symbol-white-design-usa-laptop-illustration-with-blue-background-free-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/020/927/783/non_2x/lg-logo-brand-phone-symbol-with-name-design-south-korea-mobile-illustration-free-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/020/975/545/original/samsung-logo-samsung-icon-transparent-free-png.png',
    'https://static.vecteezy.com/system/resources/previews/000/065/124/original/whirlpool-vector.jpg',
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <FiChevronLeft className="text-blue-600 text-3xl cursor-pointer" />,
    nextArrow: <FiChevronRight className="text-blue-600 text-3xl cursor-pointer" />,
  };

  

  return (
    <div className="flex-1">
      <div className="min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 w-full bg-sky-600 text-white py-4 shadow-lg z-50">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1
              style={{
                fontFamily: '"Dancing Script", cursive',
                letterSpacing: '1.5px',
                background: 'linear-gradient(45deg, #ffffff, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
              className="text-5xl font-bold transition-all duration-300 transform hover:scale-110 hover:underline"
            >
              N Mart
            </h1>
            {/* <div className="flex-grow flex justify-center">
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-lg border border-gray-300"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div> */}


<div className="flex-grow flex justify-center">
              <input
                type="text"
                placeholder="Search Here..."
                className="p-2 px-12 rounded-lg border border-gray-300 text-black"  // Added text-black class
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLoginClick}
                className="bg-white text-blue-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:scale-105"
              >
                Login
              </button>
              <button
                className="text-white-800 p-2 rounded-full shadow-md hover:text-blue-800 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform transform hover:scale-105"
                aria-label="Profile"
              >
                <FaUserCircle className="text-2xl" />
              </button>
            </div>
          </div>
        </header>

        <main className="pt-20 mt-12">
          <section className="relative bg-blue-900 text-white py-24 px-24 rounded-lg">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(https://t3.ftcdn.net/jpg/06/32/90/44/360_F_632904407_iPLi90WdjZ0oKAeRiL98gEIeHIUtzWae.jpg)' }}
            ></div>
            <div className="relative container mx-auto flex flex-col items-center justify-center text-center px-4 py-16">
              <h2 className="text-5xl font-bold mb-6">Welcome to Nandha Mart</h2>
              <p className="text-lg mb-8">
                Discover the best products at unbeatable prices. Shop now and enjoy amazing discounts and fast shipping.
              </p>
              <button
                onClick={handleLoginClick}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-transform transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </section>

          <section className="py-24 px-24">
            <div className="relative mx-auto max-w-full overflow-hidden rounded-lg shadow-lg">
              <Slider {...carouselSettings}>
                {carouselImages.map((image, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform transform hover:scale-105"
                      style={{ height: '400px' }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </section>

          <section className="px-24">
            <h2 className="text-3xl font-extrabold mb-4 text-sky-800">Available by Categories</h2>
            <div className="flex overflow-x-auto space-x-4">
              {['Laptops', 'Mobiles', 'Refrigerators', 'TVs', 'Washing Machines'].map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gray-100 p-6 mb-4 rounded-lg shadow-md text-center"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="py-6">
            <ProductsPage searchTerm={searchTerm} />
          </section>

          <section className="px-24">
            <div className="relative mx-auto max-w-full overflow-hidden rounded-lg shadow-lg">
              <Slider {...carouselSettings}>
                {additionalCarouselImages.map((image, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <img
                      src={image}
                      alt={`Additional Slide ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform transform hover:scale-105"
                      style={{ height: '300px' }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4 flex justify-between gap-6 flex-wrap">
              {bannerImages.map((banner, index) => (
                <div
                  key={index}
                  className="flex-1 bg-cover bg-center rounded-lg shadow-lg"
                  style={{ backgroundImage: `url(${banner})`, height: '200px' }}
                ></div>
              ))}
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4 flex justify-between gap-6 flex-wrap">
              {featuredBrands.map((brand, index) => (
                <div key={index} className="w-1/6 p-2">
                  <img
                    src={brand}
                    alt={`Brand ${index + 1}`}
                    className="w-full h-auto object-contain rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    style={{ height: '100px' }}
                  />
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="bg-sky-900 w-full py-4 shadow-lg">
          <div className="container mx-auto text-center text-white">
            <p>&copy; {new Date().getFullYear()} Nandha Mart. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
