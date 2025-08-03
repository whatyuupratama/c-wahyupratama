/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from '../../lib/utils';
import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';

function IconContainer({
  mouseAxis,
  title,
  icon,
  href,
  isMobile,
}: {
  mouseAxis: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // For mobile, use X axis, for desktop use Y axis
  const distance = useTransform(mouseAxis, (val) => {
    if (!ref.current) return Infinity;
    const bounds = ref.current.getBoundingClientRect();
    if (isMobile) {
      return val - (bounds.x + bounds.width / 2);
    } else {
      return val - (bounds.y + bounds.height / 2);
    }
  });

  // Animate width/height for desktop, height/width for mobile
  const widthTransform = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [40, 80, 40] : [40, 80, 40]
  );
  const heightTransform = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [40, 80, 40] : [40, 80, 40]
  );

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [20, 40, 20] : [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [20, 40, 20] : [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height, boxShadow: 'none' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        className={
          isMobile
            ? 'relative flex flex-col aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 h-7 w-7 md:h-16 md:w-16'
            : 'relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 h-7 w-7 md:h-16 md:w-16'
        }
      >
        {/* Only show label on desktop, and animate to the right */}
        {!isMobile && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, y: '-50%' }}
                animate={{ opacity: 1, x: 0, y: '-50%' }}
                exit={{ opacity: 0, x: 2, y: '-50%' }}
                className='absolute top-1/2 left-full ml-2 -translate-y-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white'
              >
                {title}
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className='flex items-center justify-center h-4 w-4 md:h-10 md:w-10'
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  // Detect mobile using window.matchMedia
  const [isMobile, setIsMobile] = useState(false);
  const mouseAxis = useMotionValue(Infinity);

  // Effect to update isMobile on resize
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use X axis for mobile (horizontal), Y for desktop (vertical)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) {
      mouseAxis.set(e.pageX);
    } else {
      mouseAxis.set(e.pageY);
    }
  };

  const handleMouseLeave = () => mouseAxis.set(Infinity);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'fixed z-50 rounded-2xl dark:bg-neutral-900',
        isMobile
          ? 'left-1/2 -translate-x-1/2 bottom-4 flex flex-row items-end justify-center gap-1.5 w-max px-2 py-2'
          : 'left-4 bottom-4 flex flex-col items-center justify-center gap-1.5 w-max px-1.5 md:px-4 py-1.5 md:py-3',
        className
      )}
      style={{ boxShadow: 'none' }}
    >
      {items.map((item) => (
        <IconContainer
          mouseAxis={mouseAxis}
          key={item.title}
          {...item}
          isMobile={isMobile}
        />
      ))}
    </motion.div>
  );
};
