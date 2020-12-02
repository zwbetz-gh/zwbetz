---
title: "Snippets From the Book Clean Code"
date: 2020-12-01T21:26:46-06:00
tags: []
toc: false
show_comments: false
draft: false
---

The following are some of my favorite snippets from the book [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/). 

APA Citation: `Martin, Robert C. (2008). Clean Code. Pearson.`

## Chapter 1: Clean Code, Page 14

... You get the drift. Indeed, the ratio of time spent reading vs. writing is well over 10:1. We are _constantly_ reading old code as part of the effort to write new code.

Because this ratio is so high, we want the reading of the code to be easy, even if it makes the writing harder. Of course there's no way to write code without reading it, _so making it easy to ready actually makes it easier to write._

There is no escape from this logic. You cannot write code if you cannot read the surrounding code. The code you are trying to write today will be hard or easy to write depending on how hard or easy the surrounding code is to read. So if you want to go fast, if you want to get done quickly, if you want your code to be easy to write, make it easy to read.

...

It's not enough to write the code well. The code has to be _kept clean_ over time. We've all seen code rot and degrade as time passes. So we must take an active role in preventing this degradation.

The Boy Scouts of America have a simple rule that we can apply to our profession.

> Leave the campground cleaner than you found it (5).

If we all checked-in our code a little cleaner than when we checked it out, the code simply could not rot. The cleanup doesn't have to be something big. Change a variable name for the better, break up one function that's a little too large, eliminate one small bit of duplication, clean up one composite `if` statement.

Can you imagine working on a project where the code _simply got better_ as time passed? Do you believe that any other option is professional? Indeed, isn't continuous improvement an intrinsic part of professionalism?

(5): This was adapted from Robert Stephenson Smyth Baden-Powell's farewell message to the Scouts: "Try and leave this world a little better than you found it ...".

## Chapter 10: Classes, Page 139

... Getting software to work and making software clean are two very different activities. Most of us have limited room in our heads, so we focus on getting our code to work more than organization and cleanliness. This is wholly appropriate. Maintaining a separation of concerns is just as important in our programming _activities_ as it is in our programs.

The problem is that too many of us think we are done once the program works. We fail to switch to the _other_ concern of organization and cleanliness. We move on to the next problem rather than going back and breaking the overstuffed classes into decoupled units with single responsibilities ...

## Chapter 12: Emergence, Page 176

... But the most important way to be expressive is to _try_. All too often we get our code working then move on to the next problem without giving sufficient thought to making that code easy for the next person to read. Remember, the most likely next person to read the code will be you.

So take a little pride in your workmanship. Spend a little time with each of your functions and classes. Choose better names, split large functions into smaller functions, and generally just take care of what you've created. Care is a precious resource.

## Chapter 13: Concurrency, Page 187

Threaded code causes things to fail that "simply cannot fail." Most developers do not have an intuitive feel for how threading interacts with other code (authors included). Bugs in threaded code might exhibit their symptoms once in a thousand, or a million, executions. Attempts to repeat the systems can be frustrating. This often leads developers to write off the failure as a cosmic ray, a hardware glitch, or some other kind of "one-off". It is best to assume that one-offs do not exist. The longer these "one-offs" are ignored, the more code is built on top of a potentially faulty approach ...

## Chapter 14: Successive Refinement, Page 200-201

... Let me put your mind at rest. I did not simply write this program from beginning to end in the current form. More importantly, I am not expecting you to be able to write clean and elegant programs in one pass. If we have learned anything over the last couple of decades, it is that programming is a craft more than it is a science. To write clean code, you must first write dirty code _and then clean it._

This should not be a surprise to you. We learned this truth in grade school when our teachers tried (usually in vain) to get us to write rough drafts of our compositions. The process, they told us, was that we should write a rough draft, then a second draft, then several subsequent drafts until we had a final version. Writing clean compositions, they tried to tell us, is a matter of successive refinement. 

Most freshman programmers (like most grade-schoolers) don't follow this advice particularly well. They believe that the primary goal is to get the program working. Once it's "working", they move on to the next task, leaving the "working" program in whatever state they finally got it to "work". Most seasoned programmers know that this is professional suicide.

## Chapter 14: Successive Refinement, Page 212-213

One of the best ways to ruin a program is to make massive changes to its structure in the name of improvement. Some programs never recover from such "improvements." The problem is that it's very hard to get the program working the same way it worked before the "improvement."

To avoid this, I use the discipline of Test-Driven Development (TDD). One of the central doctrines of this approach is to keep the system running at all times. In other words, using TDD. I am not allowed to make a change to the system that breaks that system. Every change I make must keep the system working as it worked before.

To achieve this, I need a suite of automatic tests that I can run on a whim and that verifies that the behavior of the system is unchanged ... I had created a suite of unit and acceptance tests while I was building the festering pile ... I could run these tests any time I wanted, and if they passed, I was confident that the system was working as I specified.

So I proceeded to make a large number of very tiny changes ...

## Chapter 14: Successive Refinement, Page 250

It is not enough for code to work. Code that works is often badly broken. Programmers who satisfy themselves with merely working code are behaving unprofessionally. They may fear that they don't have time to improve the structure and design of their code, but I disagree. Nothing has a more profound and long-term degrading effect upon a development project than bad code. Bad schedules can be redone, bad requirements can be refined. Bad team dynamics can be repaired. But bad code rots and ferments, becoming an inexorable weight that drags the team down. Time and time again I have seen teams grind to a crawl because, in their haste, they created a malignant morass of code that forever thereafter dominated their destiny.

Of course bad code can be cleaned up. But it's very expensive. As code rots, the modules insinuate themselves into each other, creating lots of hidden and tangled dependencies. Finding and breaking old dependencies is a long and arduous task. On the other hand, keeping code clean is relatively easy. If you made a mess in a module in the morning, it is easy to clean it up in the afternoon. Better yet, if you made a mess five minutes ago, it's very easy to clean it up right now.

So the solution is to continuously keep your code as clean and simple as it can be. Never let the rot get started.
