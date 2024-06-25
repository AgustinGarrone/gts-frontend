"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaMusic, FaPause } from "react-icons/fa";
import { usePathname } from "next/navigation";

export const MusicPlayerButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio] = useState(new Audio("/music.mp3"));
  const currentPath = usePathname();
  const [showMusic, setShowMusic] = useState(false);
  const isPlayingRef = useRef(false);

  audio.volume = 0.02;

  useEffect(() => {
    if (currentPath !== "/login") {
      if (!isPlayingRef.current) {
        audio.play();
        isPlayingRef.current = true;
      }
      setShowMusic(true);
    } else {
      if (isPlayingRef.current) {
        audio.pause();
        isPlayingRef.current = false;
      }
      setShowMusic(false);
    }
  }, [currentPath, audio]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      isPlayingRef.current = false;
    } else {
      audio.play();
      isPlayingRef.current = true;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    showMusic && (
      <Box
        position="fixed"
        bottom="10px"
        right="10px"
        cursor="pointer"
        zIndex="1000"
        onClick={togglePlayPause}
      >
        <IconButton
          aria-label="Toggle music"
          icon={isPlaying ? <FaPause /> : <FaMusic />}
          bg="teal.500"
          color="white"
          _hover={{ bg: "teal.700" }}
          size="lg"
        />
      </Box>
    )
  );
};
