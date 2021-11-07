import React, { useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import { useUpdateDetailsMutation } from '@/modules/hooks/graph'
import { signMessage } from '@/modules/util/library'

const InputContainer = tw.div`space-y-2`

const StyledInput = tw.input`w-full p-4 text-white outline-none placeholder-darked-600 bg-darked-800 rounded-xl`

const StyledButton = styled.button(({ highlight }: { highlight: boolean }) => [
  tw`w-full p-4 rounded-xl `,
  !highlight && tw`bg-darked-700 text-darked-600`,
  highlight && tw`text-white bg-mandy-500`,
])

export const DetailsInput: React.FC = () => {
  const [name, setName] = useState<string>()
  const [text, setText] = useState<string>()

  const { account, library } = useEthersWeb3React()

  const [updateDetailsMutation, { data, loading, error }] =
    useUpdateDetailsMutation()

  const mutateDetails = async () => {
    if (!library || !account || (!name && !text)) return

    const signature = await signMessage(library, [name, text].join(':'))

    updateDetailsMutation({
      variables: {
        address: account,
        name,
        text,
        signature,
      },
    })
  }

  return (
    <>
      <InputContainer>
        <StyledInput
          type="text"
          placeholder="Display Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Description"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </InputContainer>
      <StyledButton highlight={!!name || !!text} onClick={mutateDetails}>
        Apply
      </StyledButton>
    </>
  )
}
