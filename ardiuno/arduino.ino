#include <IRremote.hpp>
#define IR_RECEIVE_PIN 2
#define IR_SEND_PIN 3

void setup() {
  Serial.begin(115200);
  Serial.flush();
  IrSender.begin(3, ENABLE_LED_FEEDBACK, USE_DEFAULT_FEEDBACK_LED_PIN);
}

void loop() {
  static String inputBuffer = "";  // Buffer to store the input

  while (Serial.available() > 0) {
    char receivedChar = Serial.read();  // Read one character from the serial buffer
    if (receivedChar == '\n') {         // Check if the character is a newline
      inputBuffer.trim();               // Remove any leading or trailing whitespace
      inputBuffer.toUpperCase();        // Convert to uppercase

      // Split the inputBuffer into prefix and command parts
      int separatorIndex = inputBuffer.indexOf(';');
      if (separatorIndex > 0) {
        String prefix = inputBuffer.substring(0, separatorIndex);
        String commandPart = inputBuffer.substring(separatorIndex + 1);

        // Convert the commandPart to a hexadecimal number
        long commandCode = strtol(commandPart.c_str(), NULL, 16);

        // Determine which IR protocol to use
        if (prefix == "SAMSUNG") {
          // Send the IR command with address 0x7 for Samsung
          IrSender.sendSamsung(0x7, commandCode, 1);
          Serial.print("Sent Samsung IR command with code: 0x");
        } else if (prefix == "NEC") {
          // Send the IR command with address 0x30 for NEC
          IrSender.sendNEC(0x30, commandCode, 1);
          Serial.print("Sent NEC IR command with code: 0x");
        } else {
          Serial.println("Unknown protocol.");
        }

        Serial.println(commandCode, HEX);  // Print the command code
      } else {
        Serial.println("Invalid format. Use PREFIX;COMMAND.");
      }

      inputBuffer = "";  // Clear the input buffer for the next input
    } else {
      inputBuffer += receivedChar;  // Append the character to the input buffer
    }
  }
}