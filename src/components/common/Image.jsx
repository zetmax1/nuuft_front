import { useState, useEffect } from 'react';

/**
 * A reusable Image component that displays a fallback image if the source fails to load.
 * 
 * @param {string} src - The source URL of the image.
 * @param {string} alt - The alt text for the image.
 * @param {string} className - Optional CSS classes.
 * @param {string} fallbackSrc - Optional fallback image URL. Defaults to '/logo.png'.
 * @param {object} props - Any other props to pass to the img element.
 */
const Image = ({ src, alt, className, fallbackSrc = '/logo.png', ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
        setHasError(false);
    }, [src]);

    const handleError = () => {
        if (!hasError) {
            setImgSrc(fallbackSrc);
            setHasError(true);
        }
    };

    const getClassName = () => {
        if (!hasError) return className;

        // Filter out object-cover/fill to ensure logo is fully visible (object-contain)
        // Keep sizing classes (w-*, h-*)
        const baseClass = className.replace(/object-(cover|fill|none|scale-down)/g, '').trim();

        // clean styles for fallback:
        // object-contain: shows full logo
        // bg-slate-50: nice light background
        // p-4: gentle spacing for elegance (bejirim) - reduced to p-2 for versatility or check context?
        // User requested "very big" (juda katta), so we minimize padding to maximize size
        // within the container, but keep a little breathing room.
        return `${baseClass} object-contain p-2 bg-slate-50`;
    };

    return (
        <img
            src={imgSrc || fallbackSrc}
            alt={alt}
            className={getClassName()}
            onError={handleError}
            {...props}
        />
    );
};

export default Image;
