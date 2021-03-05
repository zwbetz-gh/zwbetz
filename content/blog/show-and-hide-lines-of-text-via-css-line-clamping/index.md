---
title: "Show and Hide Lines of Text via CSS Line Clamping"
date: 2020-12-03T19:36:15-06:00
toc: false
---

I had to implement a clamp-and-expand feature recently. If you do an internet search for how to do this, the results are sparse, and there seems to be no standard way.

I went with a CSS approach. (As opposed to a JS approach of actually manipulating the text string). The disadvantage of the CSS approach is you cannot have bottom padding, else the hidden text will bleed through.

## References

- <https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/white-space>
- <https://css-tricks.com/line-clampin/>

## Sample Code

- [CSS](index.css)
- [JS](index.js)

## Demo

<link rel="stylesheet" href="index.css">

<button id="the_toggle" class="usa-button">Toggle text</button>

<div id="the_text" class="clamped_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam etiam erat velit scelerisque in dictum non consectetur. Nunc non blandit massa enim nec. Turpis nunc eget lorem dolor sed. Tincidunt id aliquet risus feugiat in ante metus dictum. Vulputate mi sit amet mauris commodo. Montes nascetur ridiculus mus mauris. Pharetra magna ac placerat vestibulum. Sit amet aliquam id diam maecenas ultricies. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Neque laoreet suspendisse interdum consectetur libero id. Ut sem viverra aliquet eget sit amet tellus cras adipiscing. Tortor posuere ac ut consequat semper viverra nam libero. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus.
Pellentesque nec nam aliquam sem et tortor consequat. Posuere urna nec tincidunt praesent semper. Rhoncus mattis rhoncus urna neque viverra justo. Eu lobortis elementum nibh tellus molestie nunc non. Et magnis dis parturient montes nascetur ridiculus. Aenean et tortor at risus viverra adipiscing at in tellus. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Tellus in metus vulputate eu. Facilisis leo vel fringilla est ullamcorper. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Lectus arcu bibendum at varius vel. Auctor eu augue ut lectus. Mi in nulla posuere sollicitudin. At lectus urna duis convallis convallis tellus id interdum. Sapien faucibus et molestie ac feugiat sed. Aliquam sem et tortor consequat. Eu ultrices vitae auctor eu augue ut. Lectus arcu bibendum at varius vel pharetra. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu.</div>

<script src="index.js"></script>
