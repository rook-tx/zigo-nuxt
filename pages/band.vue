<script setup>
useHead({
  title: 'Band'
})
</script>

<template>
  <main class="about page">
    <div class="post initial">
      <div class="post-half">
        <div class="post-body">
          <h1>We are the band</h1>
        </div>
      </div>

      <div class="post-half">
        <div class="post-body blurb">
          <h5>We are Tom Corbett, James FitzGerald, Will Hayes and Ian Iliopoulos, and we are ZIGO.</h5>
        </div>
      </div>
    </div>

    <div class="post">
      <nuxt-img
        src="/static/band/band-wood.jpg"
        alt="ZIGO"
        class="full-img"
      />
      <div class="post-body">
        <p>What started as a crazy idea in an attic space in September 2005 quickly became something beard-strokingly serious for four young men with delusions of grandeur. From the sweaty depths of boys' bedrooms flowed a unique sound, a blend of their love for artists ranging from Radiohead to Robert Johnson and Focus to Foals, which they collectively filed under the name <strong>ZIGO.</strong></p>
        <p>
          Their apocalyptically-tinged 2010 debut album <strong><a
            href="http://open.spotify.com/album/5hNd9WBdifh8SVYfYvQmBb"
            title="This Is How It Ends on Spotify"
            target="_blank"
          >This Is How It Ends</a></strong> found them staring disconsolately into the abyss of 20-something life (plus a few other existential niggles), but with each member the older, wiser, and groovier for his higher education odyssey, <strong>ZIGO</strong> have returned from their four corners of the globe (Reading, Southampton, Nottingham and Leicester respectively) to take back the throne.
        </p>
        <p>
          <strong>ZIGO</strong> have already kicked off 2012 with the brutal one-two of single <strong><a
            href="http://wearezigo.bandcamp.com/album/someone-more-persuasive-than-you"
            title="Someone More Persuasive Than You on Bandcamp"
            target="_blank"
          >Someone More Persuasive Than You</a></strong> and five-track <strong><a
            href="http://wearezigo.bandcamp.com/album/the-foal"
            title="The Foal on Bandcamp"
            target="_blank"
          >The Foal</a></strong>, and the rest of the year does not look to be letting up the pace.
        </p>
        <p><strong>WE ARE ZIGO.</strong></p>
        <p>
          <a
            href="http://en.wikipedia.org/wiki/Unman,_Wittering_and_Zigo"
            target="_blank"
          >Who was Zigo?</a>
        </p>
      </div>
    </div>

    <div class="post">
      <div class="post-body">
        <nuxt-img
          src="/static/band/tom.png"
          alt="Tom Corbett"
          class="band-prof"
        />
        <h3><strong>Tom Corbett</strong> shouts.</h3>
        <p>Tom was raised on a balanced diet of good old-fashioned rhythm n' blues and soul/disco, but decided soon after starting his university course that he would have to create a much more "alternative" persona for himself, so inhaled all kinds of math, hardcore and everything underground like as much tequila in the eyeball. To this end, he fulfils the oxymoronic cliché of 'confident frontman with underlying identity issues'.</p>
        <p>As well as offering his guitar and keyboard "skills"; to the band, Tom enjoys long walks on the beach. Like <em>really </em>long. Like <em>bring a tent</em> long. <em>We gonna talk feelin's.</em></p>
        <p>
          <a
            href="https://tcorbett.co.uk"
            target="_blank"
            title="T Corbett"
          >Tom's website</a>
        </p>
      </div>
    </div>

    <div class="post">
      <div class="post-body">
        <nuxt-img
          src="/static/band/james.png"
          alt="James FitzGerald"
          class="band-prof"
        />
        <h3><strong>James FitzGerald</strong> rumbles.</h3>
        <p>James is the talent. Composer of countless critically-acclaimed symphonies, as well as being the brains behind Lady Gaga, ZIGO allows him to rest on his musical laurels whilst smugly funking away in the corner of the stage. That knowing smile? It's because he's going home to his solid gold bath thanks to a little tune you may have heard called <em>Umbrella</em>.</p>
        <p>During his time at Reading University, he attempted to subtly educate the unwashed masses via his multi-award-winning radio program The Yearbook. He maintains a much quieter profile in his new position of almost-don at Oxford University, which we can only assume means he is building up to the mother of all pun-chlines.</p>
        <p>
          <a
            href="http://www.jfitzgerald.co.uk"
            target="_blank"
            title="J FitzGerald"
          >James' website</a>
        </p>
      </div>
    </div>

    <div class="post">
      <div class="post-body">
        <nuxt-img
          src="/static/band/will.png"
          alt="Will Hayes"
          class="band-prof"
        />
        <h3><strong>Will Hayes</strong> hits.</h3>
        <p>Will, thanks to a hilarious séance incident back in '93, actually channels the spirit of John Bonham, via the mind of Vic Reeves, out through his magic drummin' elbows. Still bitter about ZIGO's move from his own POP Studios to those of the mighty Blizzard Records, he's in the process of converting his History degree to various law certificates - with the sole aim of "pulling a Roger Waters" on the rest of the band.</p>
        <p>He also likes yodelling in songs, and smashing wing mirrors off cars. Who knew?</p>
      </div>
    </div>

    <div class="post">
      <div class="post-body">
        <nuxt-img
          src="/static/band/ian.png"
          alt="Ian Iliopoulos"
          class="band-prof"
        />
        <h3><strong>Ian Iliopoulos</strong> twangs.</h3>
        <p>Ian has not been seen since he boarded a London&ndash;bound train earlier this year, saying only that he was "doing law". We pray for his safe return.</p>
      </div>
    </div>
  </main>
</template>

<style lang="stylus">

@import "../assets/styl/_variables"

.about {
  height 100%

  .post.initial {
    position relative

    +above($tablet) {
      height 100%

      .post-half {
        bottom 50%
        left 0
        position absolute
        width 50%

        &:nth-child(2) {
          left 50%
        }
      }
    }

    +below($tablet) {
      // display flex
      // flex-direction column
      // justify-content flex-end
      // padding 10vh 0

      .post-half {
        pad(1, 0)
      }
    }

    h1, h2, h3, h5 {
      margin 0
    }

    h1 {
      text-align right
    }
  }

  .post {
    pad(1, 0)

    +above($mobile) {
      pad(4, 0)
    }
  }

  .post-body {
    pad(0, 1)
    position relative
    mgn(0, auto)
    max-width ($pwidth + $gut*2)*1em
  }

  img {
    mgn(2, auto)
    width 0.5 * $pwidth * 1rem
  }

  h3 {
    fs(mp(1))
    text-align center

    strong {
      fs(mp(2))
    }
  }

  p {
    word-spacing -.2em
  }

  &.page-enter-from,
  &.page-leave-to {
    opacity 0
  }

  &.page-enter-to,
  &.page-leave-from {
    opacity 1
  }
}

</style>
