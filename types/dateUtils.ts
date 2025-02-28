  export function generateTimeSlots(startTime: string, endTime: string): string[] {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    return Array.from({ length: endHour - startHour + 1 }, (_, i) => {
      const hour = (startHour + i).toString().padStart(2, '0');
      return `${hour}:00`;
    });
  }

  
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