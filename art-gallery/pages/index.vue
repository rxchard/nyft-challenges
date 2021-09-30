<template>
  <section
    class="main 2xl:h-screen w-screen text-white uppercase overflow-hidden"
    @resize="onResize"
  >
    <div class="h-full flex flex-col 2xl:flex-row">
      <!-- intro -->
      <section
        class="
          relative
          h-screen
          2xl:h-full 2xl:text-left
          flex flex-col
          justify-between
          text-center
          p-8
          md:p-10
          xl:p-12
        "
      >
        <img
          src="/logo.png"
          alt="Nifty Island"
          class="main__logo sm:w-32 md:w-64 xl:w-96"
        />
        <div
          class="
            main__counter
            font-head
            text-3xl
            portrait:text-5xl
            md:text-5xl
            xl:text-6xl
            2xl:text-5xl
          "
        >
          <h1
            v-for="(word, idx) in (amount ? amount : 'zero').split(' ')"
            :key="idx"
            class="inline-block portrait:block p-1 lg:p-0 lg:block lg:pb-2"
          >
            {{ word }}
          </h1>
          <h1 class="text-xl lg:text-3xl mt-2 md:mt-4 lg:mt-6 mb-2">
            wearable & social
          </h1>
          <h1 class="text-xl lg:text-3xl mb-8">submissions</h1>
          <h1>🏝️</h1>
        </div>
        <div
          class="
            main__heading
            inline-block
            self-end
            w-full
            font-head
            text-lg
            md:text-xl
          "
        >
          palm challenge art gallery
        </div>
      </section>
      <!-- content -->
      <section
        class="gallery w-full overflow-y-visible p-8 md:p-10 xl:p-12 2xl:mr-12"
      >
        <div
          class="
            gallery__inner
            float-right
            overflow-hidden
            w-full
            2xl:w-9/12
            rounded-2xl
            ease-in
            duration-100
          "
          :style="{ transform: `translateY(${scrollTarget}px)` }"
        >
          <ul ref="gallery" class="flex flex-wrap p-4">
            <!--"dynamic" cols-->
            <li v-for="col in finalSubs.length + 1" :key="col">
              <!--imgs-->
              <div
                v-for="(data, index) in finalSubs[col - 1]"
                :key="index"
                class="relative p-2 w-full align-middle"
              >
                <GalleryItem
                  :listidx="sectionLen"
                  :name="data.name"
                  :tag="data.tag"
                  :url="data.url"
                  :type="data.type"
                />
              </div>
            </li>
          </ul>
        </div>
        <div
          ref="galScrollbar"
          class="
            hidden
            2xl:block
            absolute
            top-1/2
            right-0
            transform
            -translate-y-1/2
            w-1
            h-1/2
            bg-white bg-opacity-50
            rounded-xl
            overflow-hidden
          "
        >
          <div
            ref="galScrollbarItem"
            class="
              w-full
              h-1/4
              rounded-xl
              transition-transform
              ease-in
              duration-100
              bg-white
            "
            :style="{
              transform: `translateY(${scrollbarOffset}px)`,
            }"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Submissions, parseSubs } from '@/scripting/submissions'

import '@/scripting/fontAwesome'

// gsap is awesome but doesn't really work with firefox (on my ubuntu machine)
// import { gsap } from 'gsap'

@Component
export default class Index extends Vue {
  private readonly galleryPadding = 48

  public $refs!: {
    gallery: HTMLElement
    galScrollbar: HTMLElement
    galScrollbarItem: HTMLElement
  }

  scrollTarget: number = 0
  scrollbarOffset: number = 0

  finalSubs: any[] = []
  amount: string = 'unknown'
  sectionLen: number = 0

  // needs some optimization
  //
  onWheel(e: any) {
    const gallery = this.$refs.gallery

    // how far can we go
    //
    const maxScroll =
      -(gallery.clientHeight - window.innerHeight) - this.galleryPadding * 2

    if (maxScroll > 0) return

    const newScroll = this.scrollTarget - e.deltaY - e.deltaY / 3

    // check if we're at the top of our gallery
    //
    if (newScroll > 0) this.scrollTarget = 0
    // check if we're at the bottom of our gallery
    //
    else if (newScroll < maxScroll) this.scrollTarget = maxScroll
    // we're somewhere in between top and bottom, apply our scroll offset
    //
    else this.scrollTarget = newScroll

    const newScrollPerc = newScroll / maxScroll
    const scrollbHeight =
      this.$refs.galScrollbar.clientHeight -
      this.$refs.galScrollbarItem.clientHeight

    this.scrollbarOffset = scrollbHeight * newScrollPerc
  }

  onResize() {
    // just reset scroll, could calculate exact offset here but thats not necessary
    //
    this.scrollTarget = 0
    this.scrollbarOffset = 0

    window.innerWidth < 1536
      ? window.removeEventListener('wheel', this.onWheel)
      : window.addEventListener('wheel', this.onWheel)
  }

  // could use @nuxt/content with fetch/asyncData hooks too
  //
  async updateSubs() {
    const res = (await this.$http.$get('/submissions.json')) as Submissions

    const { finalSubs, amount, sectionLen } = parseSubs(res)

    this.finalSubs = finalSubs
    this.amount = amount
    this.sectionLen = sectionLen
  }

  async created() {
    await this.updateSubs()
  }

  // native event listeners
  //
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  beforeDestroy() {
    this.onResize()
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss">
*,
*::after,
*::before {
  @apply box-border m-0 outline-none;
}

*:hover,
*:focus,
button:focus {
  @apply outline-none;
}

html {
  scroll-behavior: smooth;
}
</style>

<style lang="scss">
@import '@/assets/base';

@keyframes transform-to-x0 {
  100% {
    @include transform(translateX(0%));
  }
}

.main {
  // using manual scss here because tailwind doesn't support percentages with gradients
  //
  background-image: linear-gradient(
    theme('colors.orchid.500') 5%,
    theme('colors.ronchi.500') 75%,
    theme('colors.ronchi.500')
  );

  &__logo {
    @include transform(translateX(-200%));
    @include animation(transform-to-x0 1s forwards);
  }

  &__counter {
    @include transform(translateX(-200%));
    @include animation(transform-to-x0 0.5s forwards);
    @include animation-delay(1s);
  }

  &__heading {
    @include transform(translateX(-100%));
    @include animation(transform-to-x0 1s forwards);
    @include animation-delay(0.5s);

    span {
      // https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align
      // One way of solving alignment would be using OpenType.js but this will suffice.
      line-height: 0.9em;
    }

    &__disable {
      @include animation(transform-to-x-200 1s forwards);
    }
  }
}

.gallery {
  @include transform(translateX(100%));
  @include animation(transform-to-x0 1s forwards);
  @include animation-delay(0.7s);

  background-attachment: fixed;

  &__inner {
    // not supported by firefox but fixes lag in chrome with other method below
    backdrop-filter: blur(1px);
    // firefox/other
    background: inherit;

    &::before {
      background: inherit;
      bottom: 0;
      box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.8);
      content: '';
      display: block;
      filter: blur(100px);
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    ul li {
      @screen md {
        flex: 50%;
        max-width: 50%;
      }

      @screen 3xl {
        flex: 25%;
        max-width: 25%;
      }

      & > div {
        @include transform(scale(1));
        @include transition(transform 0.5s);

        & > div img {
          @include deny-selection();
        }

        &:hover {
          @include transform(scale(1.02));
        }
      }
    }
  }
}
</style>
