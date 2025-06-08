import dgram from "dgram";

const BULB_IP = "192.168.1.7";
const PORT = 38899;
const METHOD_NAME = "setState";

/**
 * Sends a UDP message to the smart bulb.
 * @param message - The message to send.
 */
function sendMessage(message: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = dgram.createSocket("udp4");
    client.send(message, PORT, BULB_IP, (err) => {
      client.close();
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * Turns the bulb on.
 */
export async function turnOnBuld(): Promise<void> {
  const message = JSON.stringify({ method: METHOD_NAME, params: { state: true } });
  await sendMessage(message);
}

/**
 * Turns the bulb off.
 */
export async function turnOffBulb(): Promise<void> {
  const message = JSON.stringify({ method: METHOD_NAME, params: { state: false } });
  await sendMessage(message);
}

/**
 * Changes the bulb's color and brightness.
 * @param r - Red intensity (0-255).
 * @param g - Green intensity (0-255).
 * @param b - Blue intensity (0-255).
 * @param dimming - Brightness percentage (0-100).
 * @param temp - Optional color temperature in kelvins.
 */
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
  temp?: number | null;
}): Promise<void> {
  const message = JSON.stringify({
    method: METHOD_NAME,
    params: { state: true, r, g, b, dimming, temp },
  });
  await sendMessage(message);
}

/**
 * Pulses the bulb with a specified duration and brightness delta.
 * @param duration - Duration of the pulse in milliseconds.
 * @param delta - Brightness change (negative for dimming).
 */
export async function pulseTheBlub({
  duration,
  delta,
}: {
  duration: number;
  delta: number;
}): Promise<void> {
  const message = JSON.stringify({ method: "pulse", params: { delta, duration } });
  await sendMessage(message);
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
  " ": " ", // Space between words
};

/**
 * Delays execution for a specified time.
 * @param ms - Milliseconds to sleep.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Pulses the bulb to display a Morse code message.
 * @param message - The message to display in Morse code.
 * @param unitDuration - Duration of a single Morse code unit in milliseconds.
 */
export async function pulseMorseCode({
  message,
  unitDuration = 200,
}: {
  message: string;
  unitDuration: number;
}): Promise<void> {
  const DOT = unitDuration; // Duration of a dot pulse
  const DASH = unitDuration * 3; // Duration of a dash pulse
  const SYMBOL_GAP = unitDuration; // Gap between symbols in the same letter
  const LETTER_GAP = unitDuration * 3; // Gap between letters
  const WORD_GAP = unitDuration * 7; // Gap between words

  const upperMessage = message.toUpperCase();

  for (const char of upperMessage) {
    if (char === " ") {
      await sleep(WORD_GAP);
      continue;
    }

    const morseSymbols = MORSE_CODE[char];
    if (!morseSymbols) continue;

    for (let i = 0; i < morseSymbols.length; i++) {
      const symbol = morseSymbols[i];

      if (symbol === ".") {
        await pulseTheBlub({ delta: -100, duration: DOT });
      } else if (symbol === "-") {
        await pulseTheBlub({ delta: -100, duration: DASH });
      }

      // Gap between symbols (except after the last one)
      if (i < morseSymbols.length - 1) {
        await sleep(SYMBOL_GAP);
      }
    }

    await sleep(LETTER_GAP); // Extra gap after each letter
  }
}