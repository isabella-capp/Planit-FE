'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export type SelectionMode = 'specific' | 'range'

interface ModeSelectorProps {
  onModeChange: (mode: SelectionMode) => void
}

export default function DateSelector({ onModeChange }: ModeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('specific')

  const handleSelection = (mode: SelectionMode) => {
    setSelected(mode)
    onModeChange(mode)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      {/* Custom Select Header */}
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
        className="flex w-full items-center justify-between rounded-lg border-2 border-stroke bg-transparent p-3 text-left transition-colors focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
      >
        <span>{selected === 'specific' ? 'Specific dates' : 'Date range'}</span>
        
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
       
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-lg arent p-1 shadow-lg border border-stroke bg-white dark:bg-[#1b1f34] dark:border-strokedark ">
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSelection('specific')
            }}
            className={`flex w-full mb-1 rounded-lg items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-btndark ${
              selected === 'specific' ? 'bg-zumthor dark:bg-btndark' : ''
            }`}
          >
            <span>Specific dates</span>
            {selected === 'specific' && (
                <Check className="h-4 w-4"/>
            )}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSelection('range')
            }}
            className={`flex w-full rounded-lg items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-btndark  ${
              selected === 'range' ? 'bg-zumthor dark:bg-btndark' : ''
            }`}
          >
            <span>Date range</span>
            {selected === 'range' && (
              <Check className="h-4 w-4"/>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
