import { useState, useEffect } from 'react';

export const useImages = (images: string[]) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = images.map(image => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = image;
                    img.onload = () => {
                        // Cache the image in the browser
                        img.style.display = 'none';
                        document.body.appendChild(img);
                        setTimeout(() => {
                            document.body.removeChild(img);
                            resolve(true);
                        }, 0);
                    };
                    img.onerror = reject;
                });
            });

            try {
                await Promise.all(imagePromises);
                // Add a small delay to ensure smooth transition
                setTimeout(() => {
                    setImagesLoaded(true);
                }, 300);
            } catch (error) {
                console.error('Error preloading images:', error);
                setImagesLoaded(true);
            }
        };

        preloadImages();
    }, [images]);

    return {imagesLoaded};
}; 