import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for slide-into-view animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Percentage of element visibility that triggers animation (0-1)
 * @param {string} options.direction - Direction of slide animation ('bottom', 'left', 'right', 'top')
 * @param {number} options.delay - Delay before animation starts (in ms)
 * @returns {Object} - { ref, isVisible } - ref to attach to element and visibility state
 */
const useSlideIntoView = (options = {}) => {
    const {
        threshold = 0.1,
        direction = 'bottom',
        delay = 0,
    } = options;

    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    // Add delay if specified
                    if (delay > 0) {
                        setTimeout(() => {
                            setIsVisible(true);
                        }, delay);
                    } else {
                        setIsVisible(true);
                    }
                }
            },
            {
                threshold,
                rootMargin: '0px',
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, delay, isVisible]);

    return { ref, isVisible, direction };
};

export default useSlideIntoView;
