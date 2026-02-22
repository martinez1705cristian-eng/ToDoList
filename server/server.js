import fs from "fs";

fs.writeFileSync("text.text", "Correjido desde Nodejs")
console.log("texto correjido correctamente")

// usamos una funicon exportada lllamada suma desde mathjs

import {suma} from "./math.js";

console.log(suma(2,2));