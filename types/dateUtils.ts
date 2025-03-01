  export function generateTimeSlotsGroup(startTime: string, endTime: string): string[] {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    return Array.from({ length: endHour - startHour + 1 }, (_, i) => {
      const hour = (startHour + i).toString().padStart(2, '0');
      return `${hour}:00`;
    });
  }

  export function generateTimeSlots(startTime: string, endTime: string): string[] {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
  
    // Calcola il numero di intervalli da 30 minuti
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
  
    const totalSlots = Math.floor((endTotalMinutes - startTotalMinutes) / 30) + 1;
  
    return Array.from({ length: totalSlots }, (_, i) => {
      const currentMinutes = startTotalMinutes + i * 30;
      const hour = Math.floor(currentMinutes / 60);
      const minutes = currentMinutes % 60;
      return `${hour}:${minutes === 0 ? "00" : minutes}`;
    });
  };

  
  export function formatDate(date: string): { weekday: string; day: string } {
    const d = new Date(date);
    return {
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.toLocaleDateString("en-US", { day: 'numeric', month: 'short' })
    };
  }
  

  function generateDatesInRange(from: Date, to: Date): string[] {
    const dateArray = [];
    let currentDate = new Date(from);
    currentDate.setHours(12, 0, 0, 0);
    let toDate = new Date(to);
    toDate.setHours(12, 0, 0, 0);
    
    while (currentDate <= toDate) {
      dateArray.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
  

  export function generateDates(mode: string, selectedDates: any) {
    if (mode === "specific") {
        return selectedDates.specificDates.map((date: Date) => {
            date.setHours(12, 0, 0, 0);
            return date.toISOString().split("T")[0];
        });
    } else if (selectedDates.range && selectedDates.range.start && selectedDates.range.end) {
        return generateDatesInRange(selectedDates.range.start, selectedDates.range.end);
    }
    return []; 
}