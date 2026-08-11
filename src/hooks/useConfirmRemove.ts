import { useState } from 'react'

export function useConfirmRemove(removeFn: (id: string) => void) {
  const [pendingId, setPendingId] = useState<string | null>(null)

  function requestRemove(id: string) {
    setPendingId(id)
  }

  function cancel() {
    setPendingId(null)
  }

  function confirm() {
    if (pendingId) removeFn(pendingId)
    setPendingId(null)
  }

  return { pendingId, requestRemove, cancel, confirm }
}
