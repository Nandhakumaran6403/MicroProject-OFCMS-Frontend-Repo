import React, { useState } from 'react';
import UserNavbar from './UserNavbar';
import ProductsPage from '../Products';
import { UserFooter } from '../Footer';
import Slider from "react-slick"; 

const carouselImages = [
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
    'https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
];

const secondCarouselImages = [
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

const Arrow = ({ className, style, onClick, direction }) => (
    <button
        className={`${className} absolute top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-3 shadow-lg focus:outline-none ${direction === 'next' ? 'right-4' : 'left-4'}`}
        style={{ ...style }}
        onClick={onClick}
    >
        {direction === 'next' ? '→' : '←'}
    </button>
);

const UserMain = () => {
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <Arrow direction="next" />,
        prevArrow: <Arrow direction="prev" />,
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="min-h-screen ">
            <UserNavbar onSearch={handleSearch}/>

            <main className="container mx-auto">

                <div className="relative mb-8 mt-24">
                    <Slider {...carouselSettings}>
                        {carouselImages.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold mb-4 text-cyan-800">Available by Categories</h2>
                    <div className="flex overflow-x-auto space-x-4">
                        {['Laptops', 'Mobiles', 'Refridgrators', 'TVs', 'Washing Machines'].map((category, index) => (
                            <div key={index} className="flex-shrink-0 bg-gray-100 p-6 mb-4 rounded-lg shadow-md text-center hover:bg-cyan-50 transition-colors duration-300">
                                <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <ProductsPage searchTerm={searchTerm}/>

                <div className="relative my-8">
                    <Slider {...carouselSettings}>
                        {secondCarouselImages.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img} alt={`Second Slide ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="mb-8 flex space-x-4">
                    {bannerImages.map((img, index) => (
                        <div key={index} className="flex-1">
                            <img src={img} alt={`Banner ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />
                        </div>
                    ))}
                </div>

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

            <UserFooter/>
        </div>
    );
};

export default UserMain;




