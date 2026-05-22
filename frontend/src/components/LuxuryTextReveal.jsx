import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * LuxuryTextReveal Component
 * Animates text word-by-word or letter-by-letter with a premium, buttery transition.
 * Works seamlessly without third-party text-splitting libraries that could break in React 19.
 */
export default function LuxuryTextReveal({
    text,
    type = 'word', // 'word' or 'char'
    delay = 0,
    duration = 1.2,
    stagger = 0.03,
    className = '',
    trigger = null, // Custom ScrollTrigger element. If null, triggers on load or standard ref view
    start = 'top 85%',
    ease = 'power4.out',
    active = true
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!active || !containerRef.current) return;

        const container = containerRef.current;
        const elements = container.querySelectorAll('.ltr-item');
        if (elements.length === 0) return;

        let ctx = gsap.context(() => {
            // Setup initial hidden state
            gsap.set(elements, {
                yPercent: 100,
                opacity: 0
            });

            const animationConfig = {
                yPercent: 0,
                opacity: 1,
                duration: duration,
                stagger: stagger,
                ease: ease,
                delay: delay
            };

            if (trigger || containerRef.current) {
                gsap.to(elements, {
                    ...animationConfig,
                    scrollTrigger: {
                        trigger: trigger || container,
                        start: start,
                        toggleActions: 'play none none none'
                    }
                });
            } else {
                gsap.to(elements, animationConfig);
            }
        }, container);

        return () => ctx.revert();
    }, [text, type, delay, duration, stagger, trigger, start, ease, active]);

    if (!text) return null;

    // Word-based splitting
    if (type === 'word') {
        const words = text.split(' ');
        return (
            <span ref={containerRef} className={`luxury-text-reveal ltr-words ${className}`} style={{ display: 'inline-block', overflow: 'hidden' }}>
                {words.map((word, index) => (
                    <span 
                        key={index} 
                        className="ltr-word-wrap" 
                        style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.22em', verticalAlign: 'bottom' }}
                    >
                        <span 
                            className="ltr-item ltr-word" 
                            style={{ display: 'inline-block', transform: 'translateY(100%)', willChange: 'transform, opacity' }}
                        >
                            {word}
                        </span>
                    </span>
                ))}
            </span>
        );
    }

    // Character-based splitting
    const words = text.split(' ');
    return (
        <span ref={containerRef} className={`luxury-text-reveal ltr-chars ${className}`} style={{ display: 'inline-block' }}>
            {words.map((word, wordIndex) => (
                <span 
                    key={wordIndex} 
                    className="ltr-word-wrap" 
                    style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em', whiteSpace: 'nowrap', verticalAlign: 'bottom' }}
                >
                    {word.split('').map((char, charIndex) => (
                        <span 
                            key={charIndex} 
                            className="ltr-item ltr-char" 
                            style={{ display: 'inline-block', transform: 'translateY(100%)', willChange: 'transform, opacity' }}
                        >
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </span>
    );
}
