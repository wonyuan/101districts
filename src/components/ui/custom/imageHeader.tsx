import { useState, useEffect } from 'react';

function RandomImage() {
  const images = [
    '/fireworks.jpg',
    '/flower.jpg',
    '/oceanside.jpg',
    '/train.jpg',
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
