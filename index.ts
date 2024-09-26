import dotenv from "dotenv";
import CommandLine from "@src/commandline";
import {isRoot,exec} from "@src/utils";
import {check_update, update} from "@src/update";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import sdl from '@kmamal/sdl'
import { createCanvas } from 'canvas'

dotenv.configDotenv();

const argv = yargs(hideBin(process.argv))
    .scriptName("amdhelper")
    .option("update", {
        alias: "u",
        describe: "Updating the program.",
        demandOption: false,
        type: "boolean",
        default: false,
    }).help()
    .argv as {
        [x: string]: any
    };

async function main(){

    // Setup
    const window = sdl.video.createWindow({ title: "Canvas" })
    const { pixelWidth: width, pixelHeight: height } = window
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Clear screen to red
    ctx.fillStyle = 'red'
    // ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = 'blue'
    ctx.fillText("y4734236ryuhfdruehjdfkrujkdfryuiehdfkjedhufkjnhuedkj", 30, 30, width);

    // Render to window
    const buffer = canvas.toBuffer('raw')
    window.render(width, height, width * 4, 'bgra32', buffer)

    if(process.platform != "darwin") return console.error("Sorry, this program is only for AMD Hackintosh.");

    const cpuname = await exec("sysctl -n machdep.cpu.brand_string");
    if(!cpuname.stdout.trim().includes("AMD")) return console.error("Sorry, this program is only for AMD Hackintosh.")

    if(argv.update) return update();

    await check_update();
    if(!isRoot()) console.log("Please run as sudo to detect apps that's not patched.");

    global.chromiumApps = [];
    
    const cli = new CommandLine();
    await cli.start();
}


main();