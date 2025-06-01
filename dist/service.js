"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnOnBuld = turnOnBuld;
exports.pulseTheBlub = pulseTheBlub;
exports.pulseMorseCode = pulseMorseCode;
exports.turnOffBulb = turnOffBulb;
exports.changeColorOfBulb = changeColorOfBulb;
const dgram_1 = __importDefault(require("dgram"));
const BULB_IP = '192.168.1.7';
const PORT = 38899;
const METHOD_Name = "setState";
function turnOnBuld() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = dgram_1.default.createSocket('udp4');
        const message = JSON.stringify({ method: METHOD_Name, params: { state: true } });
        client.send(message, PORT, BULB_IP, (err) => {
            // console.log(err);
            client.close();
        });
    });
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
function pulseTheBlub(_a) {
    return __awaiter(this, arguments, void 0, function* ({ duration, delta }) {
        return new Promise((resolve, reject) => {
            const client = dgram_1.default.createSocket('udp4');
            const message = JSON.stringify({ method: "pulse", params: { delta, duration } });
            client.send(message, PORT, BULB_IP, (err) => {
                client.close();
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    });
}
// Morse code mapping
const MORSE_CODE = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".",
    F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
    K: "-.-", L: ".-..", M: "--", N: "-.", O: "---",
    P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
    "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
    "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
    " ": " " // space between words
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function pulseMorseCode(_a) {
    return __awaiter(this, arguments, void 0, function* ({ message, unitDuration = 200, }) {
        const DOT = unitDuration; // Duration of a dot pulse
        const DASH = unitDuration * 3; // Duration of a dash pulse
        const SYMBOL_GAP = unitDuration; // Gap between symbols in the same letter
        const LETTER_GAP = unitDuration * 3; // Gap between letters
        const WORD_GAP = unitDuration * 7; // Gap between words
        const upperMessage = message.toUpperCase();
        for (const char of upperMessage) {
            if (char === ' ') {
                yield sleep(WORD_GAP);
                continue;
            }
            const morseSymbols = MORSE_CODE[char];
            if (!morseSymbols)
                continue;
            for (let i = 0; i < morseSymbols.length; i++) {
                const symbol = morseSymbols[i];
                if (symbol === '.') {
                    yield pulseTheBlub({ delta: -100, duration: DOT });
                    // await sleep(DOT); // blackout time same as dot
                }
                else if (symbol === '-') {
                    yield pulseTheBlub({ delta: -100, duration: DASH });
                    // await sleep(DOT); // fixed blackout time after dash
                }
                // Gap between symbols (except after the last one)
                if (i < morseSymbols.length - 1) {
                    yield sleep(SYMBOL_GAP);
                }
            }
            yield sleep(LETTER_GAP); // extra gap after each letter
        }
    });
}
function turnOffBulb() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = dgram_1.default.createSocket('udp4');
        const message = JSON.stringify({ method: METHOD_Name, params: { state: false } });
        client.send(message, PORT, BULB_IP, (err) => {
            console.log(err);
            client.close();
        });
    });
}
function changeColorOfBulb(_a) {
    return __awaiter(this, arguments, void 0, function* ({ r, g, b, dimming, temp, }) {
        const client = dgram_1.default.createSocket('udp4');
        const message = JSON.stringify({ method: METHOD_Name, params: { state: true, r, g, b, dimming, temp } });
        client.send(message, PORT, BULB_IP, (err) => {
            // console.log(err);
            client.close();
        });
    });
}
