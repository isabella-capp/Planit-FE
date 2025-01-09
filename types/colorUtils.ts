// Funzione per convertire un colore esadecimale in HSL
const hexToHsl = (hex: string) => {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;
  
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
  
    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h * 360, s * 100, l * 100];
  };
  
  // Funzione per convertire HSL in colore esadecimale
  const hslToHex = (h: number, s: number, l: number) => {
    const f = (n: number, k = (n + h / 30) % 12) =>
      l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  };
  
  // Variabili globali per il colore di base e l'intervallo di luminosità
  let primaryColor = '#005780'; // Colore primario
  let maxLightness = 30; // Luminosità minima per la massima disponibilità
  let minLightness = 80; // Luminosità massima per la minima disponibilità
  
  // Funzione per ottenere un nuovo colore in base al rapporto di disponibilità
  export default function getNextColor(availabilityCount: number, maxAvailability: number): string {
    const [h, s, l] = hexToHsl(primaryColor);
    if (availabilityCount === 0) return 'transparent'; // Nessuna disponibilità, nessun colore
    const availabilityRatio = availabilityCount / maxAvailability;
    const newLightness = maxLightness + (minLightness - maxLightness) * (1 - availabilityRatio); // Inverso per colori più scuri con più disponibilità
    return hslToHex(h, s / 100, newLightness / 100); // Restituisce il colore scuro per più iscritti
  }
  