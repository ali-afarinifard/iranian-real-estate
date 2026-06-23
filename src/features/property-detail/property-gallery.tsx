"use client";

import React, { useState } from "react";
import { Box, Typography, alpha } from "@mui/material";
import NextImage from "next/image";
import { motion } from "framer-motion";
import type { IPropertyImage } from "@/types";

interface IPropertyGalleryProps {
  images: IPropertyImage[];
}

export function PropertyGallery({ images }: IPropertyGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <Box sx={{ mb: 3 }}>
      {/* Main image */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 280, md: 480 },
          borderRadius: 3,
          overflow: "hidden",
          mb: 1.5,
        }}
      >
        <motion.div
          key={activeImage}
          initial={{ opacity: 0.6, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ height: "100%" }}
        >
          <NextImage
            src={images[activeImage]?.url}
            alt={images[activeImage]?.alt}
            fill
            priority={activeImage === 0}
            sizes="(max-width: 1200px) 100vw, 65vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)",
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            bgcolor: alpha("#000", 0.5),
            color: "#fff",
            px: 1.5,
            py: 0.5,
            borderRadius: 10,
            fontWeight: 600,
            backdropFilter: "blur(4px)",
          }}
        >
          {activeImage + 1} / {images.length}
        </Typography>
      </Box>

      {/* Thumbnails */}
      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 0.5 }}>
        {images.map((img, i) => (
          <Box
            key={img.id}
            onClick={() => setActiveImage(i)}
            sx={{
              position: "relative",
              width: 80,
              height: 60,
              borderRadius: 2,
              overflow: "hidden",
              flexShrink: 0,
              cursor: "pointer",
              border: "2px solid",
              borderColor: i === activeImage ? "primary.main" : "transparent",
              opacity: i === activeImage ? 1 : 0.65,
              transition: "all 0.2s",
              "&:hover": { opacity: 1 },
            }}
          >
            <NextImage
              src={img.url}
              alt={img.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="80px"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}