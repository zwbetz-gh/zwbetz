---
title: "Preview your site from any device on your network with these hugo server options"
date: 2019-04-23T13:06:04-05:00
tags: [hugo, networking]
toc: false
show_comments: true
---

When developing your hugo site from your main computer, have you ever wished you could preview it from your phone to see how it looks on a mobile device? Well, you're in luck: it's possible, and can be done with any device connected to your network. Here's the command. 

```
hugo server --bind 0.0.0.0 --baseURL http://<your-host-ip>:1313
```

As an example, let's say your main computer's IPv4 address (aka the host in this example) is `192.168.3.3`. After running the following command on your main computer, you'd navigate to `http://192.168.3.3:1313` from your phone to preview your site. 

```
hugo server --bind 0.0.0.0 --baseURL http://192.168.3.3:1313
```

Feels magical, right?

P.S. to get your IPv4 address on Windows run `ipconfig`. To get it on Mac and Linux run `ifconfig`. 
