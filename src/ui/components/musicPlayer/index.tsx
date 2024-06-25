"use client";
import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaMusic, FaPause } from "react-icons/fa";

export const MusicPlayerButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio] = useState(new Audio('/music.mp3'));

  audio.volume = 0.1

  useEffect(() => {
    audio.play()
  } , [])

  useEffect(() => {
    audio.loop = true;
  }, [audio]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Box
      position="fixed"
      bottom="10px"
      left="10px"
      cursor="pointer"
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
  );
};
