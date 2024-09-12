import { useState, useEffect } from 'react';

function RandomImage() {
  const images = [
    '/fireworks.jpg',
    '/flower.jpg',
    '/oceanside.jpg',
    '/train.jpg',
    '/mountain.jpg',
    '/city.jpg',
    '/beach.jpg',
    '/amalfi.jpg',
    '/divot.jpg',
    '/fjord.jpg',
    '/grassy.jpg',
    '/haebyeon.jpg',
    '/lighthouse.jpg',
    '/kyoto.jpg',
  ];

  const [randomImage, setRandomImage] = useState<string>('');

  const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  };

  useEffect(() => {
    selectRandomImage();
  }, []);

  return (
    <img src={randomImage} className="h-[340px] w-full object-cover rounded-xl" alt="Random" />
  );
}

export default RandomImage;
