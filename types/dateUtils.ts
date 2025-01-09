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
  
  