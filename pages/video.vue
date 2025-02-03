<template>
  <main class="video-page">
    <div class="post initial">
      <div class="post-half">
        <div class="post-body">
          <h1>We are filmed</h1>
        </div>
      </div>
      <div class="post-half">
        <div class="post-body blurb">
          <h5>A short list of shorter films featuring ZIGO, members thereof, their friends and their family.</h5>
        </div>
      </div>
    </div>

    <div class="post">
      <div class="video">
        <iframe
          src="https://www.youtube.com/embed/snNoVag62iQ?autohide=1&showinfo=0"
          frameborder="0"
          allowfullscreen
        />
      </div>
      <div class="post-body">
        <h2>Private Lectures</h2>
        <h3>ZIGO &amp; the Making of The Fox</h3>
        <p>Dec 2014</p>
      </div>
    </div>

    <div class="post">
      <div class="video">
        <iframe
          src="https://www.youtube.com/embed/6i_ja-N0LUg?autohide=1&showinfo=0"
          frameborder="0"
          allowfullscreen
        />
      </div>
      <div class="post-body">
        <h2>Hover Stereos</h2>
        <h3>ZIGO and The Making of The Foal, Part II</h3>
        <p>July 2012</p>
      </div>
    </div>

    <div class="post">
      <div class="video">
        <iframe
          src="https://www.youtube.com/embed/wAeGFzUTrCk?autohide=1&showinfo=0"
          frameborder="0"
          allowfullscreen
        />
      </div>
      <div class="post-body">
        <h2>Old Wood: ZIGO and The Foal so far</h2>
        <p>May 2012</p>
        <p>Since the release of This Is How It Ends in July 2010, ZIGO have been working hard on its follow-up.</p>
        <p>Someone More Persuasive Than You broke the silence on 21.1.12.</p>
        <p>Then came The Foal&hellip; in pieces.</p>
        <p>21.2.12: On Your Bones</p>
        <p>21.3.12: War Horse</p>
        <p>21.4.12: The Hunted</p>
        <p>But what of the rest of The Foal?</p>
        <p>And of ZIGO?</p>
      </div>
    </div>

    <div class="post">
      <div class="video">
        <iframe
          src="https://www.youtube.com/embed/3w3fv-ustkU?autohide=1&showinfo=0"
          frameborder="0"
          allowfullscreen
        />
      </div>
      <div class="post-body">
        <h2>WARning/</h2>
        <p>March 2012</p>
        <p>ZIGO urge you to run.</p><p>Run like The Foal you are.</p>
      </div>
    </div>

    <div class="post">
      <div class="video">
        <iframe
          src="https://www.youtube.com/embed/aXD5HzY9dDs?autohide=1&showinfo=0"
          frameborder="0"
          allowfullscreen
        />
      </div>
      <div class="post-body">
        <h2>21GO</h2>
        <p>February 2012</p>
        <p>&ldquo;And I mean, this sort of thing can happen to the most sharp-witted fellows, to psychologists and litterateurs, sir! Human nature is a mirror, sir, a mirror, of the most transparent kind! Look in it and feast your eyes!&rdquo;<br>&mdash;<em>Porfiry Petr</em></p><p>The clues are already there. Just keep your eye trained on the places you have already been.</p>
      </div>
    </div>
  </main>
</template>

<style lang="stylus">

@import "../assets/styl/_variables"

.video-page {
  height 100%

  .post.initial {
    position relative
    max-width 100%

    +above($mobile) {
      height 100%
      padding 0

      .post-half {
        bottom 50%
        left 0
        pad(0, 1)
        position absolute
        width 50%

        &:nth-child(2) {
          left 50%
        }
      }

      h1 {
        text-align right
      }
    }

    +below($mobile) {
      .post-half {
        pad(1, 0)
      }
    }

    h1, h5 {
      margin 0
    }
  }

  .video {
    width 100%
  }

  .video {
    background $b
    border 1px solid rgba($w,.22)
    height 0
    padding-bottom (225/400)*100%
    position relative

    iframe {
      height 100%
      left 0
      position absolute
      top 0
      width 100%
    }
  }

  .post {
    pad(1, 1)
    mgn(0, auto)
    max-width $pwidth*1.62em

    +above($mobile) {
      pad(4, 1)
    }
  }

  .post-body {
    mgn(0, auto)
    max-width ($pwidth + $gut*2)*1em
    position relative
  }

  h2, h3, p {
    mgn(1, auto)
    text-align center
    word-spacing -.2em
  }

  h2 {
    fs(mp(3))
  }

  h3 {
    fs(mp(1))
  }

  p {
    fs(mp(-1))
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
