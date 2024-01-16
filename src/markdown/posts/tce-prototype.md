---
title: '4hp Prototype of Two Comparator Effect'
date: '2024-01-16'
---

I have been working on a version of cyberboy666's
:a[two_comparator_effect]{.https://github.com/cyberboy666/two_comparator_effect}, which I call TCE.
The :a[prototype is working]{href="https://www.youtube.com/watch?v=mtZ2dQ727Hc"}, and I have used it
in some of my live video art performances in support of live bands and DJs at shows and parties at
:a[Light Rail Studios]{.https://www.lightrailstudios.com} in San Francisco. It's been a great
addition to my video set up.

This circuit was originally designed by :a[Rob Schafer]{.https://www.youtube.com/c/schaferob} and
later improved by :a[cyberboy666]{.https://github.com/cyberboy666}. I talked with
cyberboy666 about whether it would be okay for me to create this Eurorack version, and he said that
it's open hardware so I should feel free to do so. If you are interested in his design, which leaves
the electronic components exposed and operates on a dedicated +5v wall wart power supply, you can
get his :a[version]{.https://underscores.shop/product/two_comparator_effect} on the
:a[underscores]{.https://underscores.shop} website.

I hope I have contributed to the lineage of of this circuit's design by converting it to a Eurorack
module. In the spirit of this, I decided to put the open hardware logo on the front panel rather
than my normal octopus logo. I also have the
:a[KiCAD files published on GitHub]{.https://github.com/octovolt/TCE}, currently under the
:a[GPL v3]{.https://www.gnu.org/licenses/gpl-3.0.en.html} license (Should I do this under the
:a[Creative Commons ShareAlike]{.https://creativecommons.org/licenses/by-sa/4.0/deed.en} licence? Or
some other "viral" open licence? Please [contact](/contact) me if you have thoughts on this).

You can see it working in the video below, on the
:a[Octovolt YouTube channel]{.https://www.youtube.com/@Octovolt-os2up}.

<div class="iframeVideoContainer">
  <iframe
    src="https://www.youtube.com/embed/mtZ2dQ727Hc?feature=oembed"
    title="TCE Demo"
    class="iframeVideo"
    loading="lazy"
    width="100%"
    height="100%"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen="">
  </iframe>
</div>

The front panel holes were a little too small for Alpha 9mm potentiometers, so I had to use tall
trim pots instead. I have revised both the front panel to allow the Alpha pots, and I was able to
improve the PCB a bit as well. As a result, it should be a little bit easier to build. And with the
Alpha potentiometers offering more connections between the PCB and the front panel, the whole thing
should be a lot more sturdy.

Currently, as I write this post, I'm waiting for the new PCBs and panels to come back from the
fabrication house. When I get them back and test them, assuming all works as it should, this will
be the second Octovolt module. As you might imagine, I'm pretty excited about it.

Working on this module has led me to think a lot about how comparators can be used in video
circuits. I am certainly going to create a different version of TCE (still thinking about the name,
but maybe Thresholds) which will be designed for 0-1v RGBY signals rather than composite video, and
it will offer CV control and some alternate outputs.

However, after studying some of the
:a[Sandin Image Processor]{.https://scanlines.xyz/t/diy-resources-file-system/224} circuits on
:a[scanlines.xyz]{.https://scanlines.xyz}, while also thinking about comparators, I've started
developing an "edge rendering" circuit. You can take a look at my progress on that circuit on my
personal :a[Instagram account]{.https://www.instagram.com/_bill_fisher_/}, especially :a[this
post]{.https://www.instagram.com/p/Cz06LWLrpfc}, and
:a[this post]{.https://www.instagram.com/p/Cz-ZmENrnEA}, and
:a[this post]{.https://www.instagram.com/p/C0Ju9wTrKbt}. I built a prototype of this circuit on
David Haillant's :a[Eurorack Stripboard]{.https://www.davidhaillant.com/eurorack-stripboard-1-3/},
and the documentation for that is also
:a[up on Github]{.https://github.com/octovolt/SlowEdgeStripboard}. But a better, more polished
version of it is coming soon.

Another thing that has emerged through my work on the TCE, and the other modules where I use
comparators, is the fact that the comparator in the TCE (and the original two_comparator_effect) is
actually a little bit too slow for video. The comparator in question is the
:a[LM339]{.https://www.ti.com/lit/ds/symlink/lm339.pdf}, which is cheap, widely available, and comes
in a through-hole quad package. Unfortunately, it has a response time of about 1.3 microseconds,
and for accurate video work we would want a response time under 83 microseconds (according to my
calculations for NTSC 720×480 video -- please [contact](/contact) me if I'm wrong). The resulting
image from the LM339 is shifted very slightly to the right. You can see this pretty clearly in
:a[this post]{.https://www.instagram.com/p/C0Ju9wTrKbt/}, where the blue and red signals are going
through the LM339, while the green is not. Still, it has a cool aesthetic. Regardless, with the
circuits I'm currently developing, I will use a faster comparator. I'm still working out which one
to use.

If you're interested, please check out the
:a[GitHub repository for TCE]{.https://github.com/octovolt/TCE}.