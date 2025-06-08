import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { changeColorOfBulb, turnOffBulb, turnOnBuld, pulseMorseCode } from "./service";
import { z } from "zod";

// Initialize the MCP server with metadata about the smart bulb
const server = new McpServer({
  name: "Philips Smart Bulb",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

/**
 * Tool: Pulse the bulb in Morse code
 * Allows the bulb to pulse in a pattern representing a Morse code message.
 */
server.tool(
  "pulse-bulb",
  "Pulse the bulb",
  {
    message: z.string().describe("Message to display via Morse code"),
    unitDuration: z.number().describe(
      "Duration of a single Morse code unit in milliseconds (e.g., dot duration)."
    ),
  },
  async ({ message, unitDuration }) => {
    await pulseMorseCode({ message, unitDuration });
    return {
      content: [
        {
          type: "text",
          text: "Bulb is displaying Morse code.",
        },
      ],
    };
  }
);

/**
 * Tool: Change the bulb's color
 * Allows the user to set the RGB color, dimming level, and optional color temperature.
 */
server.tool(
  "change-bulb-color",
  "Change the bulb color",
  {
    r: z.number().min(0).max(255).describe("Red color intensity (0-255)"),
    g: z.number().min(0).max(255).describe("Green color intensity (0-255)"),
    b: z.number().min(0).max(255).describe("Blue color intensity (0-255)"),
    dimming: z.number().min(0).max(100).describe(
      "Brightness level as a percentage (0-100)."
    ),
    temp: z.number().nullable().optional().describe(
      "Color temperature in kelvins (optional). Pass null if setting RGB color."
    ),
  },
  async ({ r, g, b, dimming, temp }) => {
    await changeColorOfBulb({ r, g, b, dimming, temp });
    return {
      content: [
        {
          type: "text",
          text: "Bulb color has been updated.",
        },
      ],
    };
  }
);

/**
 * Tool: Turn off the bulb
 * Turns the smart bulb off.
 */
server.tool(
  "turn-off-bulb",
  "Turn the bulb off",
  async () => {
    await turnOffBulb();
    return {
      content: [
        {
          type: "text",
          text: "Bulb has been turned off.",
        },
      ],
    };
  }
);

/**
 * Tool: Turn on the bulb
 * Turns the smart bulb on.
 */
server.tool(
  "turn-on-bulb",
  "Turn the bulb on",
  async () => {
    await turnOnBuld();
    return {
      content: [
        {
          type: "text",
          text: "Bulb has been turned on.",
        },
      ],
    };
  }
);

/**
 * Main function to start the MCP server
 * Connects the server to the standard input/output transport.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Philips Bulb MCP Server running on stdio");
}

main();