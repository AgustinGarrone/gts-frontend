export const playSound = () => {
  const audio = new Audio("/clickFx.mp3");
  console.log(audio);
  audio.volume = 0.4;
  audio.play();
};
