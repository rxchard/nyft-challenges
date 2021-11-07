import React, { useMemo, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import { useUpdateDetailsMutation } from '@/modules/hooks/graph'
import { signMessage } from '@/modules/util/library'
import { Modal } from '@/modules/state/modal'
import { useIsActiveModal, useToggleModal } from '@/modules/state/modal/hooks'

const InputContainer = tw.div`space-y-2`

const StyledInput = tw.input`w-full p-4 text-white outline-none placeholder-darked-600 bg-darked-800 rounded-xl`

const StyledButton = tw.button`
  w-full p-4 rounded-xl text-white bg-mandy-500 
  disabled:(cursor-default bg-darked-700 text-darked-600)`

export interface DetailsInputProps {
  modal: Modal
}

export const DetailsInput: React.FC<DetailsInputProps> = ({ modal }) => {
  const activeModal = useIsActiveModal(modal)
  const toggleModal = useToggleModal(modal)

  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const trimName = useMemo(() => name.trim(), [name])
  const trimText = useMemo(() => text.trim(), [text])

  const { account, library } = useEthersWeb3React()

  const [updateDetailsMutation, { loading, error }] = useUpdateDetailsMutation()

  const allowed = useMemo(
    () => !error && !loading && (!!trimName || !!trimText),
    [error, loading, trimName, trimText],
  )

  const mutateDetails = async () => {
    if (!library || !account || !allowed) return

    const signature = await signMessage(library, [trimName, trimText].join(':'))

    await updateDetailsMutation({
      variables: {
        address: account,
        name: trimName,
        text: trimText,
        signature,
      },
    })

    if (activeModal && allowed) toggleModal()
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
      <StyledButton disabled={!allowed} onClick={mutateDetails}>
        {error ? 'Error' : loading ? 'Loading...' : 'Apply'}
      </StyledButton>
    </>
  )
}
