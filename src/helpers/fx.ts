export const playSound = () => {
  const audio = new Audio("/clickFx.mp3");
  console.log(audio);
  audio.volume = 0.4;
  audio.play();
};

export const playSuccess = () => {
  const audio = new Audio("/successFx.mp3");
  console.log(audio);
  audio.volume = 0.4;
  audio.play();
};

export const playTypeWriting = () => {
  const audio = new Audio("/typewriting.mp3");
  console.log(audio);
  audio.volume = 0.4;
  audio.play();
};
