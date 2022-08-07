/**
 * See https://github.com/Fooidge/PleaseJS
 */
interface PleaseOptions {
  /**
   * (0-360) By setting the hue, you determine the color.
   */
  hue: number | null;
  /**
   * (0.0-1.0) By setting the saturation, you determine the distance from gray.
   */
  saturation: number | null;
  /**
   * (0.0-1.0) By setting the value, you determine the balance between black and white.
   */
  value: number | null;
  /**
   * ('the name of an HTML color') Setting a base_color (e.g. 'pink') will create a random color within the HSV range of the chosen color. Please will recognize any of the 146 standard HTML colors, it has a very good memory.
   */
  base_color: string;
  /**
   * (true/false) Setting either greyscale or grayscale (but we all know which one is correct) to true will cause all of the colors you generate to be within the grey or gray range. This is effectively the same as setting your saturation to 0.
   */
  grayscale: boolean;
  /**
   * (true/false) Setting golden to true randomizes your hue (overrides hue setting) and makes you a spectacular color based on the golden ratio. It's so good, it's the default. Make sure to turn it off if you want to have more control over your generated colors.
   */
  golden: boolean;
  /**
   * (true/false) Setting full_random to true will make Please lose its mind. It will completely randomize the hue, saturation, and value of the colors it makes.
   */
  full_random: boolean;
  /**
   * (1-infinity) Setting colors_returned to higher than 1 will return an array full of the colors Please has made for you. If you set it to 1, you'll just get the one color! It makes a sort of sense if you think about it.
   */
  colors_returned: number;
  /** 
   * ('format string') Setting format string, will change the format of what make_color will return for you. The options are as follows (example is the color black):
  'hex' = '#000000'
  'rgb' = {r: 0, g: 0,b: 0}
  'rgb-string' = 'rgb(0,0,0)'
  'hsv' = {h: 0, s: 0, v: 0} 
  */
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

const makeRandomColor = (): void => {
  const color = makeColor();
  getRandomColorDiv().style.backgroundColor = color;
  getRandomColorTextDiv().innerHTML = color;
};

const handleRandomButtonClick = (): void => {
  makeRandomColor();
};

const handleDOMContentLoaded = (): void => {
  getRandomButton().addEventListener('click', handleRandomButtonClick);
  makeRandomColor();
};

const main = (): void => {
  document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
};

main();
