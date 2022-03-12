"use strict";
const random = () => 1 + Math.floor(898 * Math.random());
let x = random();
const capitalize = (string) => {
    if(typeof(string) !== "string" || !string) {
        return string;
    } else {
        const subCapitalize = (subString) => subString[0].toUpperCase() + subString.slice(1);
        string = string.split(" ");
        string.forEach(function(subString,index) { string[index] = subCapitalize(subString); });
        string = string.join(" ");
        string = string.split("-");
        string.forEach(function(subString,index) { string[index] = subCapitalize(subString); });
        return string.join("-");
    }
}
const display = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + x)
        .then(response => response.json())
        .then(mon => {
            document.querySelector("h1").innerText = `#${x}, ${capitalize(mon.species.name)}`;
            let types = capitalize(mon.types[0].type.name);
            if(mon.types.length === 2) { types += ", " + capitalize(mon.types[1].type.name); }
            document.querySelector("h2").innerText = types;
            document.getElementById("height").innerText = mon.height/10;
            document.getElementById("weight").innerText = mon.weight/10;
            document.querySelectorAll("td").forEach((node,index) => {
                if(index > 5) { node.innerText = mon.stats[index - 6].base_stat; }
            });
        });
}
document.getElementById("random").addEventListener("click", () => {
    x = random();
    display();
});
document.getElementById("next").addEventListener("click", () => {
    x %= 898;
    x++;
    display();
});
document.getElementById("last").addEventListener("click", () => {
    x--;
    if(!x) { x = 898; }
    display();
});
display();