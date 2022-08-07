/**
 * See https://github.com/Fooidge/PleaseJS
 */
interface PleaseOptions {
  hue: number | null;
  saturation: number | null;
  value: number | null;
  base_color: string;
  grayscale: boolean;
  golden: boolean;
  full_random: boolean;
  colors_returned: number;
  format: 'hex' | 'rgb' | 'rgb-string' | 'hsv';
}

const defaultOptions: PleaseOptions = {
  hue: null,
  saturation: null,
  value: null,
  base_color: '',
  grayscale: false,
  golden: true,
  full_random: false,
  colors_returned: 1,
  format: 'hex'
};

const makeColor = (options = defaultOptions): string => {
  return Please.make_color(options)[0];
};

const getRandomButton = (): HTMLButtonElement => {
  return document.querySelector('#random_button') as HTMLButtonElement;
};

const getRandomColorDiv = (): HTMLDivElement => {
  return document.querySelector('#random_color') as HTMLDivElement;
};

const getRandomColorTextDiv = (): HTMLDivElement => {
  return document.querySelector('#random_color_text') as HTMLDivElement;
};

const getCustomizeButton = (): HTMLButtonElement => {
  return document.querySelector('#customize_button') as HTMLButtonElement;
};

const getCustomizeColorDiv = (): HTMLDivElement => {
  return document.querySelector('#customize_color') as HTMLDivElement;
};

const getCustomizeColorTextDiv = (): HTMLDivElement => {
  return document.querySelector('#customize_color_text') as HTMLDivElement;
};

const makeRandomColor = (): void => {
  const color = makeColor();
  getRandomColorDiv().style.backgroundColor = color;
  getRandomColorTextDiv().innerHTML = color;
};

const handleRandomButtonClick = (): void => {
  makeRandomColor();
};

const handleCustomizeButtonClick = (): void => {
  // get value from each input
  // build opts
  // make color
  const options = {
    ...defaultOptions
  };
  const color = makeColor(options);
  getCustomizeColorDiv().style.backgroundColor = color;
  getCustomizeColorTextDiv().innerHTML = color;
};

const handleDOMContentLoaded = (): void => {
  getRandomButton().addEventListener('click', handleRandomButtonClick);
  getCustomizeButton().addEventListener('click', handleCustomizeButtonClick);

  makeRandomColor();
  handleCustomizeButtonClick();
};

const main = (): void => {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
};

main();
