import dgram from 'dgram';

const BULB_IP = '192.168.1.7';
const PORT = 38899;
const METHOD_Name = "setState";


export async function turnOnBuld() {
    const client = dgram.createSocket('udp4');

    const message = JSON.stringify({ method: METHOD_Name, params: { state: true } });

    client.send(message, PORT, BULB_IP, (err) => {
        // console.log(err);
        client.close();
    }
    )
}

// export async function pulseTheBlub({
//     duration,delta
// }:{duration:number,delta:number}) {
//     const client = dgram.createSocket('udp4');

//     const message = JSON.stringify({ method: "pulse", params: { delta: delta,duration:duration } });
//     client.send(message, PORT, BULB_IP, (err) => {
//         console.log(err);
//         client.close();
//     }
//     )
// }

export async function pulseTheBlub({ duration, delta }: { duration: number; delta: number }) {
    return new Promise<void>((resolve, reject) => {
      const client = dgram.createSocket('udp4');
      const message = JSON.stringify({ method: "pulse", params: { delta, duration } });
      
      client.send(message, PORT, BULB_IP, (err) => {
        client.close();
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  // Morse code mapping
  const MORSE_CODE: Record<string, string> = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".",
    F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
    K: "-.-", L: ".-..", M: "--", N: "-.", O: "---",
    P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
    "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
    "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
    " ": " " // space between words
  };
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  export async function pulseMorseCode({
    message,
    unitDuration = 200,
  }: {
    message: string;
    unitDuration: number;
  }) {
    const DOT = unitDuration;             // Duration of a dot pulse
    const DASH = unitDuration * 3;        // Duration of a dash pulse
    const SYMBOL_GAP = unitDuration;      // Gap between symbols in the same letter
    const LETTER_GAP = unitDuration * 3;  // Gap between letters
    const WORD_GAP = unitDuration * 7;    // Gap between words
  
    const upperMessage = message.toUpperCase();
  
    for (const char of upperMessage) {
      if (char === ' ') {
        await sleep(WORD_GAP);
        continue;
      }
  
      const morseSymbols = MORSE_CODE[char];
      if (!morseSymbols) continue;
  
      for (let i = 0; i < morseSymbols.length; i++) {
        const symbol = morseSymbols[i];
  
        if (symbol === '.') {
          await pulseTheBlub({ delta: -100, duration: DOT });
          // await sleep(DOT); // blackout time same as dot
        } else if (symbol === '-') {
          await pulseTheBlub({ delta: -100, duration: DASH });
          // await sleep(DOT); // fixed blackout time after dash
        }
  
        // Gap between symbols (except after the last one)
        if (i < morseSymbols.length - 1) {
          await sleep(SYMBOL_GAP);
        }
      }
  
      await sleep(LETTER_GAP); // extra gap after each letter
    }
  }
  
export async function turnOffBulb() {
    const client = dgram.createSocket('udp4');
    const message = JSON.stringify({ method: METHOD_Name, params: { state: false } });
    client.send(message, PORT, BULB_IP, (err) => {
        console.log(err);
        client.close();

    })
}

export async function changeColorOfBulb({
    r,
    g,
    b,
    dimming,
    temp,
}: {
    r: number;
    g: number;
    b: number;
    dimming: number;
    temp?: number|null; // ← Make it optional
}) {
    const client = dgram.createSocket('udp4');
    const message = JSON.stringify({ method: METHOD_Name, params: { state: true, r, g, b, dimming, temp } });
    client.send(message, PORT, BULB_IP, (err) => {
        // console.log(err);
        client.close();
    })
}

