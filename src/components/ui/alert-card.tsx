"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface AlertCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  isVisible: boolean;
  onDismiss?: () => void;
  className?: string;
}

const AlertCard = React.forwardRef<HTMLDivElement, AlertCardProps>(
  (
    {
      className,
      icon,
      title,
      description,
      buttonText,
      onButtonClick,
      isVisible,
      onDismiss,
    },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cardVariants: any = {
      hidden: { opacity: 0, y: 50, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
          staggerChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        transition: { duration: 0.2 },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            className={cn(
              "relative w-full max-w-sm overflow-hidden rounded-2xl p-6 shadow-2xl",
              "bg-red-950 text-red-50 border border-red-800/50",
              className
            )}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
            aria-live="assertive"
          >
            {onDismiss && (
              <motion.div variants={itemVariants} className="absolute top-3 right-3">
                <button
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  onClick={onDismiss}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </button>
              </motion.div>
            )}

            {icon && (
              <motion.div
                variants={itemVariants}
                className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {icon}
                </motion.div>
              </motion.div>
            )}

            <motion.h3 variants={itemVariants} className="text-2xl font-bold tracking-tight font-mono">
              {title}
            </motion.h3>

            <motion.p variants={itemVariants} className="mt-2 text-sm text-red-200/80 max-w-[80%]">
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6">
              <button
                className="w-full rounded-full bg-white py-3 px-6 text-base font-semibold text-red-950 shadow-lg transition-transform duration-200 hover:bg-white/90 active:scale-95"
                onClick={onButtonClick}
              >
                {buttonText}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

AlertCard.displayName = "AlertCard";

export { AlertCard };
