namespace MCarBot {
    //% block = "RGB Led Left On $red $green $blue"
    //% red.defl=255
    //% red.min=0 red.max=255
    //% green.defl=255
    //% green.min=0 green.max=255
    //% blue.defl=255
    //% blue.min=0 blue.max=255
    export function RgbLeftLedOn(red: number, green: number, blue: number) {
        sendI2cWriteCommand(13, 4, red, green, blue, 0, 0, 0,0);
    }
    //% block = "RGB Led Left Off"
    export function RgbLeftLedOff() {
        sendI2cWriteCommand(14, 4, 0, 0, 0, 0, 0, 0,0);
    }
    // note that Caml casing yields lower case
    // block text with spaces

    export function getRpAddress() {
        let rp_address = 0x13;
        return rp_address;
    }
    function sendI2cWriteCommand(commandId: number, peripheralId: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: number) {
        let writeCommandBuffer = pins.createBuffer(9);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 0, commandId);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 1, peripheralId);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 2, 1);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 3, arg1);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 4, arg2);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 5, arg3);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 6, arg4);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 7, arg5);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 8, arg5);
        pins.i2cWriteBuffer(getRpAddress(), writeCommandBuffer, false);
    }
}
