//% color=190 weight=100 icon="\uf1ec" block="MCarBot"
//% groups=['General','RGB LED', 'Line Follower', 'Moves']
namespace MCarBot {
    //% block = "MCarbot Init"
    //% group='General'
    export function McarBotInit() {
        sendI2cWriteCommand(1, 4, 0, 0, 0, 0, 0, 0);
    }
    //% block = "RGB Led Left On r:$red g:$green b:$blue"
    //% red.defl=255
    //% red.min=0 red.max=255
    //% green.defl=255
    //% green.min=0 green.max=255
    //% blue.defl=255
    //% blue.min=0 blue.max=255
    //% group='RGB LED'
    export function RgbLeftLedOn(red: number, green: number, blue: number) {
        sendI2cWriteCommand(13, 4, red, green, blue, 0, 0, 0);
    }
    //% block = "RGB Led Left Off"
    //% group='RGB LED'
    export function RgbLeftLedOff() {
        sendI2cWriteCommand(14, 4, 0, 0, 0, 0, 0, 0);
    }
    //% block = "RGB Led Right On r:$red g:$green b:$blue"
    //% red.defl=255
    //% red.min=0 red.max=255
    //% green.defl=255
    //% green.min=0 green.max=255
    //% blue.defl=255
    //% blue.min=0 blue.max=255
    //% group='RGB LED'
    export function RgbRightLedOn(red: number, green: number, blue: number) {
        sendI2cWriteCommand(15, 4, red, green, blue, 0, 0, 0);
    }
    //% block = "RGB Led Right Off"
    //% group='RGB LED'
    export function RgbRightLedOff() {
        sendI2cWriteCommand(16, 4, 0, 0, 0, 0, 0, 0);
    }
    //% block = "Line Follower Sensors On"
    //% group='Line Follower'
    export function LfSensorsOn() {
        sendI2cWriteCommand(24, 4, 0, 0, 0, 0, 0, 0);
    }
    enum Direction {
        //% block="forward"
        Forward = 1,
        //% block="backward"
        Backward = 2,
    }
    //% block = "Line Follower Sensors Off"
    //% group='Line Follower'
    export function LfSensorsOff() {
        sendI2cWriteCommand(25, 4, 0, 0, 0, 0, 0, 0);
    }
    //% block = "Move Forward"
    //% group='Moves'
    export function MoveForward() {
        sendI2cWriteCommand(35, 3, 0, 0, 0, 0, 0, 0);
    }
    //% block = "Move Backward"
    //% group='Moves'
    export function MoveBackward() {
        sendI2cWriteCommand(36, 3, 0, 0, 0, 0, 0, 0);
    }
    //% block = "Stop Motors"
    //% group='Moves'
    export function StopMotors() {
        sendI2cWriteCommand(34, 3, 0, 0, 0, 0, 0, 0);
    }
    //% block = "Set Speed Left Direction:$leftDirection Speed:$leftSpeed Right Direction:$rightDirection Speed:$rightSpeed"
    //% leftSpeed.defl=100
    //% leftSpeed.min=0 green.max=100
    //% rightSpeed.defl=100
    //% rightSpeed.min=0 green.max=100
    //% group='Moves'
    export function SetSpeed(leftDirection: Direction, leftSpeed: number, rightDirection: Direction, rightSpeed: number) {
        sendI2cWriteCommand(33, 3, leftDirection, leftSpeed, rightDirection, rightSpeed, 0, 0);
    }
    //% block = "Move Forward Distance"
    //% group='Moves'
    export function MoveForwardDistance(speed: number, distance: number) {
        sendI2cWriteCommand(39, 3, speed, distance, 0, 0, 0, 0);
    }
    //% block = "Move Backward Distance"
    //% group='Moves'
    export function MoveBackwardDistance(speed: number, distance: number) {
        sendI2cWriteCommand(40, 3, speed, distance, 0, 0, 0, 0);
    }
    //% block = "Turn Left Angle"
    //% group='Moves'
    export function TurnLeftAngle(speed: number, angle: number) {
        sendI2cWriteCommand(41, 3, speed, angle, 0, 0, 0, 0);
    }
    //% block = "Turn Right Angle"
    //% group='Moves'
    export function TurnRightAngle(speed: number, angle: number) {
        sendI2cWriteCommand(42, 3, speed, angle, 0, 0, 0, 0);
    }
    // note that Caml casing yields lower case
    // block text with spaces
    export function getRpAddress() {
        let rp_address = 0x13;
        return rp_address;
    }
    function sendI2cWriteCommand(commandId: number, peripheralId: number, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number) {
        let writeCommandBuffer = pins.createBuffer(9);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 0, commandId);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 1, peripheralId);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 2, 1);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 3, arg1);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 4, arg2);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 5, arg3);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 6, arg4);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 7, arg5);
        writeCommandBuffer.setNumber(NumberFormat.UInt8LE, 8, arg6);
        pins.i2cWriteBuffer(getRpAddress(), writeCommandBuffer, false);
    }
}