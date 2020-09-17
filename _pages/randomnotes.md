---
layout: archive
permalink: /randomnotes/
title: "Random notes"
author_profile: true
redirect_from:
  - /wordpress/randomnotes/
---

{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.posts %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    <h2 id="{{ year | slugify }}" class="archive__subtitle">{{ year }}</h2>
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}

Random pieces that worth a look.

### Do not remain nameless to yourself. -  Richard Feynman 
https://lettersofnote.com/2015/10/23/do-not-remain-nameless-to-yourself/

### The illustrated guide to a Ph.D. - Matt Might
http://matt.might.net/articles/phd-school-in-pictures/