'use client'

import { useEffect, useState } from 'react'
import type { SelectionMode } from './DateSelector'

export type SelectedDates = {
  specificDates: Date[]
  range: {
    start: Date | null
    end: Date | null
  }
}

interface CalendarProps {
  mode: SelectionMode
  onDatesChange: (dates: SelectedDates) => void
}

export function Calendar({ mode, onDatesChange }: CalendarProps) {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    specificDates: [],
    range: {
      start: null,
      end: null,
    },
  })

  useEffect(() => {
    onDatesChange(selectedDates)
  }, [selectedDates, onDatesChange])


  const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isInRange = (date: Date) => {
    const { start, end } = selectedDates.range
    if (!start || !end) return false
    return date >= start && date <= end
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return isSameDay(date, today)
  }

  const handleDateClick = (date: Date) => {
    if (mode === 'specific') {
      setSelectedDates(prev => {
        const exists = prev.specificDates.some(d => isSameDay(d, date))
        return {
          ...prev,
          specificDates: exists
            ? prev.specificDates.filter(d => !isSameDay(d, date))
            : [...prev.specificDates, date],
        }
      })
    } else {
      setSelectedDates(prev => {
        if (!prev.range.start || (prev.range.start && prev.range.end)) {
          return {
            ...prev,
            range: { start: date, end: null },
          }
        } else {
          return {
            ...prev,
            range: {
              start: date < prev.range.start ? date : prev.range.start,
              end: date < prev.range.start ? prev.range.start : date,
            },
          }
        }
      })
    }
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)
    const days = []

    // Previous month days
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
    for (let i = 0; i < firstDayOfMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        prevMonthDays - firstDayOfMonth + i + 1
      )
      days.push(
        <button key={`prev-${i}`} className="h-8 w-8 text-sm text-gray-600" disabled>
          {prevMonthDays - firstDayOfMonth + i + 1}
        </button>
      )
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      const isSelected =
        mode === 'specific'
          ? selectedDates.specificDates.some(d => isSameDay(d, date))
          : selectedDates.range.start && isSameDay(date, selectedDates.range.start)
      const isEndDate =
        mode === 'range' && selectedDates.range.end && isSameDay(date, selectedDates.range.end)
      const isRangeSelected = mode === 'range' && isInRange(date)
      const isTodayDate = isToday(date)

      days.push(
        <button
          key={i}
          onClick={(e) => {
            e.preventDefault()
            handleDateClick(date)
          }}
          className={`relative h-8 w-8 rounded-full text-sm transition-colors
            ${isSelected || isEndDate ? 'bg-[#0088cc] text-white' : ''}
            ${isRangeSelected && !isSelected && !isEndDate ? 'bg-[#e6f7ff] dark:bg-blackho dark:text-white' : ''}
            ${isTodayDate && !isSelected && !isEndDate ? 'font-bold' : ''}
            ${!isSelected && !isRangeSelected && !isEndDate ? 'hover:bg-[#e6f7ff] dark:hover:bg-blackho' : ''}
          `}
        >
          {i}
        </button>
      )
    }

    // Next month days
    const totalDays = days.length
    const remainingDays = 42 - totalDays
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <button key={`next-${i}`} className="h-8 w-8 text-sm text-gray-500" disabled>
          {i}
        </button>
      )
    }

    return days
  }

  const changeMonth = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(prevDate.getMonth() + increment)
      return newDate
    })
  }

  return (
    <div className="w-full max-w-xs rounded-lg border-2 border-gray-200 bg-white dark:bg-black p-4 dark:border-strokedark">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={(e) =>  {
            e.preventDefault()
            changeMonth(-1)
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-stroke dark:hover:bg-blackho"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-medium">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={(e) => {
            e.preventDefault()
            changeMonth(1)
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-stroke dark:hover:bg-blackho"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2">
        {DAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
    </div>
  )
}

