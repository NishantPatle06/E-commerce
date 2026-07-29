'use client'
import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'
import { loadUserFromStorage } from '../lib/features/user/userSlice'
import { loadAddressesFromStorage } from '../lib/features/address/addressSlice'

export default function StoreProvider({ children }) {
  const storeRef = useRef(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(loadUserFromStorage())
      storeRef.current.dispatch(loadAddressesFromStorage())
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}