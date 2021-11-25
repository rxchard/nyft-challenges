import tw from 'twin.macro'

export const StyledButton = tw.button`flex flex-row items-center justify-center w-full p-4 text-white transition-colors duration-200 border  rounded-xl border-tertiary-800 bg-tertiary-900 hover:border-tertiary-200 disabled:cursor-default`

export const StyledInput = tw.input`w-full p-4 border outline-none placeholder-tertiary-300 bg-tertiary-800 rounded-xl border-tertiary-700`

export const Container = tw.div`p-8`

export const Heading = tw.h1`font-head`

export const Title = tw(Heading)`text-3xl sm:text-5xl`
export const Subtitle = tw(Heading)`text-xl`
