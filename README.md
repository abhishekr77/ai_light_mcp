<!DOCTYPE html>
<html lang="en">
<body>
    <h1>CodeLightAI - Philips Smart Bulb Controller</h1>
    <p>
        CodeLightAI is a Node.js-based application that provides a server for controlling a Philips Smart Bulb. 
        It uses the Model Context Protocol (MCP) to expose tools for interacting with the bulb, such as turning it on/off, 
        changing its color, and pulsing it in Morse code.
    </p>

## Prerequisites

- **Node.js**: Version 18 or higher.
- **pnpm**: Version 10.11.0 or higher (used as the package manager).
- A Philips Smart Bulb connected to the same network as the application.
   <p>
        - <a href="https://github.com/sbidy/pywizlight" target="_blank">pywizlight</a>: Wiz Ligt API Documentation, which made this project possible.
    </p>
    <h2>Features</h2>
    <ul>
        <li><strong>Turn On/Off the Bulb</strong>: Easily switch the bulb on or off.</li>
        <li><strong>Change Bulb Color</strong>: Set the bulb's RGB color, brightness, and optional color temperature.</li>
        <li><strong>Pulse in Morse Code</strong>: Make the bulb pulse to display a Morse code message.</li>
        <li><strong>MCP Integration</strong>: Uses the Model Context Protocol for seamless tool integration.</li>
    </ul>

    <h2>Prerequisites</h2>
    <ul>
        <li><strong>Node.js</strong>: Version 18 or higher.</li>
        <li><strong>pnpm</strong>: Version 10.11.0 or higher (used as the package manager).</li>
        <li>A Philips Smart Bulb connected to the same network as the application.</li>
    </ul>

    <h2>Installation</h2>
    <ol>
        <li>Clone the repository:
            <pre><code>git clone https://github.com/abhishekr77/codeLightAi.git </code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>pnpm install</code></pre>
        </li>
        <li>Build the project:
            <pre><code>pnpm build</code></pre>
        </li>
    </ol>
    <h2>Configuration</h2>
    <p>
        The application communicates with the Philips Smart Bulb using UDP. Ensure the following configurations in 
        <code>src/service.ts</code> are correct:
    </p><pre><code>const BULB_IP = "192.168.1.7"; // Replace with your bulb's IP address 
    const PORT = 38899; // Default port for Philips Smart Bulb</code></pre>
    <h2>Usage</h2>
    <ol>
        <li>Start the server:
            <pre><code>pnpm start</code></pre>
        </li>
        <li>The server will run on standard input/output (stdio) and expose the following tools:
            <ul>
                <li><strong>Pulse Bulb</strong>: Pulses the bulb in a Morse code pattern.</li>
                <li><strong>Change Bulb Color</strong>: Changes the bulb's RGB color, brightness, and optional temperature.</li>
                <li><strong>Turn Off Bulb</strong>: Turns the bulb off.</li>
                <li><strong>Turn On Bulb</strong>: Turns the bulb on.</li>
            </ul>
        </li>
    </ol>
    <h2>Tools Overview</h2>
    <h3>Pulse Bulb</h3>
    <ul>
        <li><strong>Description</strong>: Pulses the bulb to display a Morse code message.</li>
        <li><strong>Parameters</strong>:
            <ul>
                <li><code>message</code> (string): The message to display in Morse code.</li>
                <li><code>unitDuration</code> (number): Duration of a single Morse code unit in milliseconds.</li>
            </ul>
        </li>
    </ul>
    <h3>Change Bulb Color</h3>
    <ul>
        <li><strong>Description</strong>: Changes the bulb's RGB color, brightness, and optional temperature.</li>
        <li><strong>Parameters</strong>:
            <ul>
                <li><code>r</code> (number): Red intensity (0-255).</li>
                <li><code>g</code> (number): Green intensity (0-255).</li>
                <li><code>b</code> (number): Blue intensity (0-255).</li>
                <li><code>dimming</code> (number): Brightness percentage (0-100).</li>
                <li><code>temp</code> (number | null): Optional color temperature in kelvins.</li>
            </ul>
        </li>
    </ul>
    <h3>Turn Off Bulb</h3>
    <ul>
        <li><strong>Description</strong>: Turns the bulb off.</li>
        <li><strong>Parameters</strong>: None.</li>
    </ul>
    <h3>Turn On Bulb</h3>
    <ul>
        <li><strong>Description</strong>: Turns the bulb on.</li>
        <li><strong>Parameters</strong>: None.</li>
    </ul>
   
    <h2>Development</h2>
    <p>To make changes to the code:</p>
    <ol>
        <li>Edit the TypeScript files in the <code>src/</code> directory.</li>
        <li>Rebuild the project:
            <pre><code>pnpm build</code></pre>
        </li>
    </ol>
    <h2>Contributing</h2>
    <p>Contributions are welcome! Feel free to open issues or submit pull requests.</p>
    <h2>License</h2>
    <p>This project is licensed under the <code>ISC License</code>.</p>
</body>
</html>
