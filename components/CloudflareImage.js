import React from 'react';
import Image from 'next/image';

/**
 * CloudflareImage component - A wrapper for Next.js Image optimized for Cloudflare Images
 * 
 * @param {Object} props
 * @param {string} props.src - Image source path or ID (without extension)
 * @param {number} props.width - Display width
 * @param {number} props.height - Display height
 * @param {string} props.alt - Alt text
 * @param {Object} props.className - CSS class
 * @param {boolean} props.priority - Loading priority
 * @param {string} props.objectFit - Object fit property
 */
export default function CloudflareImage({ 
  src, 
  width, 
  height, 
  alt = "", 
  className = "", 
  priority = false,
  objectFit = "cover",
  ...props 
}) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const cloudflareAccountHash = 'afekpjgU7bwy8XYMt0lA2Q';
  const variant = 'public';
  
  // Extract the image ID (filename without path or extension)
  const imageId = src.startsWith('/') ? src.slice(1).split('/').pop().split('.')[0] : src.split('/').pop().split('.')[0];
  
  // Determine the image source based on environment
  let imageSrc;
  
  if (isDevelopment) {
    // In development: Use local media files for better DX
    // First try media folder, then fall back to public/assets/images
    imageSrc = `/media/${imageId}.png`;
  } else {
    // In production: Use direct Cloudflare URL to ensure it works in static exports
    imageSrc = `https://imagedelivery.net/${cloudflareAccountHash}/${imageId}/${variant}`;
  }
  
  // During static build on server - use plain img tag with direct CF URL
  if (typeof window === 'undefined' && !isDevelopment) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ objectFit }}
        {...props}
      />
    );
  }
  
  // During development or client-side rendering in production
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={{ objectFit }}
      unoptimized={!isDevelopment}
      {...props}
    />
  );
}