<template>
  <div
    v-lazyload="listidx < 4"
    class="
      relative
      rounded-2xl
      overflow-hidden
      flex flex-row
      justify-center
      bg-black bg-opacity-50
    "
  >
    <svg
      v-if="type !== 'video'"
      class="lazy-placeholder animate-spin m-24 h-5 w-5 text-white opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <!--Content-->
    <video v-if="type === 'video'" ref="video" :src="url" muted></video>
    <!--<img v-else-if="listidx < 8" v-lazyload :src="url" />-->
    <img v-else :data-url="url" class="absolute h-auto max-w-full" />
    <div
      class="
        absolute
        bottom-0
        right-0
        left-0
        top-0
        transition-opacity
        duration-500
        opacity-0
        hover:opacity-100
        bg-black bg-opacity-50
        p-4
        text-center
        font-head
      "
    >
      <div
        class="relative h-full flex flex-col items-end justify-between text-lg"
      >
        <a :href="url" target="__blank"
          ><FontAwesome icon="expand" class="cursor-pointer"
        /></a>
        <div
          v-if="type === 'video'"
          class="w-full cursor-pointer"
          @click="handleToggle($event)"
        >
          <FontAwesome v-if="playing" icon="pause" />
          <FontAwesome v-else icon="play" />
        </div>
        <h1 class="w-full">
          Made by
          <span class="text-orchid-300">{{ name }}</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop } from 'nuxt-property-decorator'

// lazy loading images based on intersection observer
//
Vue.directive('lazyload', {
  inserted(oel: HTMLElement, binding: any) {
    const el = Array.from(oel.children).find(
      m => m.nodeName === 'IMG',
    ) as HTMLImageElement

    if (!el) return

    const toggleVis = () => {
      el.classList.remove('absolute')

      const placeholder: Element[] =
        Array.from(oel.children).filter(m =>
          m.classList.contains('lazy-placeholder'),
        ) || null

      if (placeholder) placeholder.forEach(m => m.classList.add('hidden'))
    }

    // this will set the image src and therefor load our image
    //
    const load = () => {
      setTimeout(() => {
        el.addEventListener('error', () =>
          console.log('load fail: ' + el.dataset.url),
        )
        el.addEventListener('load', () => toggleVis())

        el.src = el.dataset.url!
        if (el.complete) toggleVis()
      }, 500)
    }

    if (binding.value) {
      load()
      return
    }

    const create = () => {
      new IntersectionObserver(
        (
          entries: IntersectionObserverEntry[],
          observer: IntersectionObserver,
        ) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              load()
              observer.unobserve(el)
            }
          })
        },
        {
          root: null,
          threshold: [0, 1.0],
        },
      ).observe(el)
    }

    const check = () => {
      //
      if (document.readyState === 'complete') {
        window.IntersectionObserver ? create() : load()
        return true
      }

      return false
    }

    if (check()) return

    const waiter = setInterval(() => {
      if (check()) clearInterval(waiter)
    }, 10)
  },
})

@Component
export default class ContentOverlay extends Vue {
  @Prop() readonly listidx!: number
  @Prop() readonly name!: string
  @Prop() readonly tag!: string
  @Prop() readonly url!: string
  @Prop({ default: 'image' }) readonly type!: string

  public $refs!: {
    video: HTMLVideoElement
  }

  lazyThreshold: number = 2
  playing: boolean = false

  videoEnd() {
    this.$refs.video.pause()
    this.$refs.video.currentTime = 0
    this.playing = false
  }

  mounted() {
    if (this.type === 'video') {
      this.playing = !this.$refs.video.paused
      this.$refs.video.addEventListener('ended', this.videoEnd)
    }
  }

  beforeMount() {
    if (window.innerWidth < 1536) this.lazyThreshold = 2
  }

  beforeDestroy() {
    if (this.type === 'video') {
      this.playing = false
      this.$refs.video.pause()
      this.$refs.video.removeEventListener('ended', this.videoEnd)
    }
  }

  handleToggle(_: PointerEvent) {
    this.playing ? this.$refs.video.pause() : this.$refs.video.play()
    //
    this.playing = !this.$refs.video.paused
  }
}
</script>
