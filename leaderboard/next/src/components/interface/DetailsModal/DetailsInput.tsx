import React, { useEffect, useMemo, useState } from 'react'
import tw from 'twin.macro'
import { useEthersWeb3React } from '@/modules/hooks/web3'
import { useUpdateDetailsMutation } from '@/modules/hooks/graph'
import { signMessage } from '@/modules/util/library'
import { Modal } from '@/modules/state/modal'
import { useIsActiveModal, useToggleModal } from '@/modules/state/modal/hooks'
import { StyledButton, StyledInput } from '../util/Base'
import { ModalError } from '../Modal/Util'
import { usePrevious } from '@/modules/hooks/usePrevious'

const InputContainer = tw.div`space-y-2`

export const DetailsInput: React.FC = () => {
  const activeModal = useIsActiveModal(Modal.DETAILS)
  const wasActiveModal = usePrevious(activeModal)
  const toggleModal = useToggleModal(Modal.DETAILS)

  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const trimName = useMemo(() => name.trim(), [name])
  const trimText = useMemo(() => text.trim(), [text])

  const empty = useMemo(() => !trimName && !trimText, [trimName, trimText])

  const { account, library } = useEthersWeb3React()

  const [loading, setLoading] = useState(false)
  const [updateDetailsMutation, { data, error: graphError }] =
    useUpdateDetailsMutation()

  const [error, setError] = useState('')

  useEffect(() => {
    if (!wasActiveModal || !activeModal || (!data && !graphError)) return

    const err = data?.updateDetails?.error?.message ?? graphError?.message
    if (!err) toggleModal() // close if we don't have any errors after a mutation

    setError(err ?? '')
  }, [data, graphError, wasActiveModal, activeModal, toggleModal])

  const mutateDetails = () => {
    if (!library || !account) return
    setLoading(true)

    signMessage(library, [trimName, trimText].map(v => v || 'empty').join(':'))
      // will wait for the mutation to resolve
      .then(signature =>
        updateDetailsMutation({
          variables: {
            address: account,
            name: trimName,
            text: trimText,
            signature,
          },
        }),
      )
      .catch(err => setError(err.message ?? 'Failed'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <ModalError error={error} />
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
      <StyledButton onClick={mutateDetails}>
        {loading ? 'Loading...' : empty ? 'Reset' : 'Apply'}
      </StyledButton>
    </>
  )
}
