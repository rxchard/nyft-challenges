import tw from 'twin.macro'

export const StyledButton = tw.button`
  w-full p-4 rounded-xl text-white bg-darked-600 
  disabled:(cursor-default bg-darked-700 text-darked-600)`

export const StyledInput = tw.input`w-full p-4 text-white outline-none placeholder-darked-600 bg-darked-800 rounded-xl`

export const Container = tw.div`p-8`

export const Heading = tw.h1`font-head`

export const Title = tw(Heading)`text-3xl sm:text-5xl`
export const Subtitle = tw(Heading)`text-xl`
