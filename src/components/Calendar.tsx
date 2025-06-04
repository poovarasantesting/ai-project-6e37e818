import React, { useState } from 'react'
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday,
  parseISO
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  
  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Add days from previous/next month to fill the calendar grid
  const startDay = monthStart.getDay() // 0 = Sunday, 1 = Monday, etc.
  const endDay = 6 - monthEnd.getDay() // Days needed to complete the last week
  
  // Previous month days to display
  const prevMonthDays = startDay > 0 
    ? eachDayOfInterval({ 
        start: subMonths(monthStart, 1).setDate(monthStart.getDate() - startDay),
        end: subMonths(monthStart, 1)
      }).reverse()
    : []
  
  // Next month days to display
  const nextMonthDays = endDay > 0
    ? eachDayOfInterval({
        start: addMonths(monthEnd, 1).setDate(1),
        end: addMonths(monthEnd, 1).setDate(endDay)
      })
    : []
    
  // Combine all days
  const calendarDays = [...prevMonthDays.reverse(), ...monthDays, ...nextMonthDays]
  
  // Navigation functions
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const goToToday = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
  }
  
  // Generate weekday headers
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {weekdays.map(day => (
          <div 
            key={day} 
            className="text-center font-medium text-gray-500 text-sm py-2"
          >
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(day)}
            className={cn(
              "h-12 rounded-md flex items-center justify-center text-sm transition-colors",
              !isSameMonth(day, currentMonth) && "text-gray-400",
              isSameMonth(day, currentMonth) && "hover:bg-gray-100",
              isSameDay(day, selectedDate as Date) && "bg-blue-100 text-blue-800",
              isToday(day) && !isSameDay(day, selectedDate as Date) && 
                "border border-blue-500"
            )}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
      
      {selectedDate && (
        <div className="mt-6 p-4 border-t border-gray-200">
          <h3 className="font-medium">
            Selected: {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
        </div>
      )}
    </div>
  )
}