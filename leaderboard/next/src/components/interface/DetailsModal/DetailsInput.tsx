import React, { useMemo, useState } from 'react'
import tw from 'twin.macro'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import { useUpdateDetailsMutation } from '@/modules/hooks/graph'
import { signMessage } from '@/modules/util/library'
import { Modal } from '@/modules/state/modal'
import { useIsActiveModal, useToggleModal } from '@/modules/state/modal/hooks'
import { StyledButton, StyledInput } from '../util/Base'

const InputContainer = tw.div`space-y-2`

export const DetailsInput: React.FC = () => {
  const activeModal = useIsActiveModal(Modal.DETAILS)
  const toggleModal = useToggleModal(Modal.DETAILS)

  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const trimName = useMemo(() => name.trim(), [name])
  const trimText = useMemo(() => text.trim(), [text])

  const { account, library } = useEthersWeb3React()

  const [updateDetailsMutation, { loading, error }] = useUpdateDetailsMutation()

  const allowed = useMemo(() => !error && !loading, [error, loading])
  const empty = useMemo(() => !trimName && !trimText, [trimName, trimText])

  const mutateDetails = async () => {
    if (!library || !account || !allowed) return

    const signature = await signMessage(
      library,
      [trimName, trimText].map(v => v || 'empty').join(':'),
    )

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
        {error ? 'Error' : loading ? 'Loading...' : empty ? 'Reset' : 'Apply'}
      </StyledButton>
    </>
  )
}
