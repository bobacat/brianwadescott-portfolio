#!/usr/bin/env node
/**
 * Prints a QR code for your local dev server so you can scan it with your phone.
 * Run this after starting: npm run dev:mobile
 *
 * Make sure your phone and computer are on the same Wi‑Fi network.
 */

const os = require("os");

function getLocalIP() {
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
  } catch {
    // Sandbox or restricted env may block networkInterfaces
  }
  return null;
}

const port = process.env.PORT || 3000;
const ip = getLocalIP();
const url = ip ? `http://${ip}:${port}` : null;

console.log("\n📱 Mobile testing — scan QR or open URL on your phone:\n");
console.log("   (Phone and computer must be on the same Wi‑Fi)\n");

if (url) {
  try {
    const qrcode = require("qrcode-terminal");
    qrcode.generate(url, { small: true });
  } catch {
    console.log("   Install qrcode-terminal for QR: npm install -D qrcode-terminal\n");
  }
  console.log(`   Or open: ${url}\n`);
} else {
  console.log("   Could not detect local IP. Run: npm run dev:mobile");
  console.log("   Then check the terminal for the Network URL (e.g. http://192.168.x.x:3000)");
  console.log("   Use a QR generator like qr.io or goqr.me with that URL.\n");
}
