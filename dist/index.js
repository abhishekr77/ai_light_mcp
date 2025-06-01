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
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const service_1 = require("./service");
const zod_1 = require("zod");
//  changeColorOfBulb({ r: 200, g: 100, b:50, dimming: 20, });
// turnOnBuld();
const server = new mcp_js_1.McpServer({
    name: "Philips Smart Bulb",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
server.tool("pulse-bulb", "Pulse the bulb", {
    message: zod_1.z.string().describe('Message that user what to tell through morse code'),
    unitDuration: zod_1.z.number().describe(' Duration of the entire pulse effect in milliseconds. This controls how long the bulb stays dimmed or brightened before returning to its original state. For example, duration: 300 means the pulse lasts 300ms.'),
}, (_a) => __awaiter(void 0, [_a], void 0, function* ({ message, unitDuration }) {
    yield (0, service_1.pulseMorseCode)({ message: message, unitDuration: unitDuration });
    return {
        content: [
            {
                type: "text",
                text: "Bulb is giving morseCode",
            },
        ],
    };
}));
server.tool("change-bulb-color", "Change the bulb color", {
    r: zod_1.z.number().min(0).max(255).describe('red color range 0-255'),
    g: zod_1.z.number().min(0).max(255).describe('green color range 0-255'),
    b: zod_1.z.number().min(0).max(255).describe('blue color range 0-255'),
    dimming: zod_1.z.number().min(0).max(100).describe('sets the dimmer of the bulb in percent, 100% means full brightness and 50% means half the brightness'),
    temp: zod_1.z.number().nullable().optional().describe('sets the color temperature in kelvins, pass temp null if wants to set color, only pass this paramter when have white color or color temprature requirement. other wise dont pass this parameter'),
}, (_a) => __awaiter(void 0, [_a], void 0, function* ({ r, g, b, dimming, temp }) {
    (0, service_1.changeColorOfBulb)({ r: r, g: g, b: b, dimming: dimming, temp: temp });
    return {
        content: [
            {
                type: "text",
                text: "Bulb has been changed",
            },
        ],
    };
}));
// server.tool(
//   "change-bulb-color",
//   "Change the bulb color",
//   {
//     r: z.number().describe('red color range 0-255'),
//     g: z.number().describe('green color range 0-255'),
//     b: z.number().describe('blue color range 0-255'),
//     dimming: z.number().describe('sets the dimmer of the bulb in percent, 100% means full brightness and 50% means half the brightness'),
// temp: z.number().nullable().optional().describe('sets the color temperature in kelvins, pass temp null if wants to set color'),
//   },
//   async ({ r, g, b, dimming, temp }) => {
//     // await changeColorOfBulb({ r,g,b,dimming,temp });
//     return {
//       content: [
//         {
//           type: "text",
//           text: "Bulb has been changed",
//         },
//       ],
//     }
//   });
server.tool("turn-off-bulb", "Turn the bulb off", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, service_1.turnOffBulb)();
    return {
        content: [
            {
                type: "text",
                text: "Bulb has been turned off",
            },
        ],
    };
}));
server.tool("turn-on-bulb", "Turn the bulb on", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, service_1.turnOnBuld)();
    return {
        content: [
            {
                type: "text",
                text: "Bulb has been turned on",
            },
        ],
    };
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = new stdio_js_1.StdioServerTransport();
        yield server.connect(transport);
        console.log("Philips Buld MCP Server running on stdio");
    });
}
main();
