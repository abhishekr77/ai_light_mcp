import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { changeColorOfBulb, turnOffBulb, turnOnBuld,pulseMorseCode } from "./service";
import { z } from "zod";

    //  changeColorOfBulb({ r: 200, g: 100, b:50, dimming: 20, });

// turnOnBuld();
const server = new McpServer({
  name: "Philips Smart Bulb",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});



server.tool(
  "pulse-bulb",
    "Pulse the bulb",
  {
    message: z.string().describe('Message that user what to tell through morse code'),
    unitDuration: z.number().describe(' Duration of the entire pulse effect in milliseconds. This controls how long the bulb stays dimmed or brightened before returning to its original state. For example, duration: 300 means the pulse lasts 300ms.'),
 
  },
  async ({message, unitDuration}) => {
   await pulseMorseCode({message: message, unitDuration: unitDuration});
    return {
            content: [
              {
                type: "text",
                text: "Bulb is giving morseCode",
              },
            ],
          }
  },
);
server.tool(
  "change-bulb-color",
    "Change the bulb color",
  {
    r: z.number().min(0).max(255).describe('red color range 0-255'),
    g: z.number().min(0).max(255).describe('green color range 0-255'),
    b: z.number().min(0).max(255).describe('blue color range 0-255'),
    dimming: z.number().min(0).max(100).describe('sets the dimmer of the bulb in percent, 100% means full brightness and 50% means half the brightness'),
    temp: z.number().nullable().optional().describe('sets the color temperature in kelvins, pass temp null if wants to set color, only pass this paramter when have white color or color temprature requirement. other wise dont pass this parameter'),
  },
  async ({ r,g,b,dimming,temp}) => {
    changeColorOfBulb({ r: r, g: g, b:b, dimming: dimming,temp: temp});
    return {
            content: [
              {
                type: "text",
                text: "Bulb has been changed",
              },
            ],
          }
  },
);

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
server.tool(
  "turn-off-bulb",
  "Turn the bulb off",
  async () => {
await turnOffBulb();

    return {
      content: [
        {
          type: "text",
          text: "Bulb has been turned off",
        },
      ],
    }
  });

server.tool(
  "turn-on-bulb",
  "Turn the bulb on",
  async () => {
await turnOnBuld();
    return {
      content: [
        {
          type: "text",
          text: "Bulb has been turned on",
        },
      ],
    }
  });

  async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("Philips Buld MCP Server running on stdio");
  }
  
  main();