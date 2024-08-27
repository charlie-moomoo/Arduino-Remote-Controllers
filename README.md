# Arduino Remote Controllers

This project uses Arduino and infrared transmitter to control devices. It also has a web GUI. This is written for mBot but technically it should also work on Arduino with infrared transmitters.

# Supported Devices

- Samsung 32" Smart Monitor
- Heran Fan

# How to use

1. `git clone` this repo
2. `cd` into this repo
3. Make a file named `.env` and enter the following:

```env
COM="" # Your COM port path, example: \\.\COM5
```

4. `npm i`
5. `node .` and go to https://localhost:8084

Now choose a controller to use and control your devices!
