var logs = [
    { name: "TEXT01.LOG", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { name: "TEXT02.LOG", content: "Content of text02.log." },
    { name: "TEXT03.LOG", content: "Content of text03.log." }
];

var terminalOutput = document.getElementById('terminalOutput');
var commandResult = document.getElementById('commandResult');
var currentFileContent = "";
var currentIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    var commandInput = document.getElementById("commandInput");
    commandInput.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            processCommand();
        }
    });
});

function getFileContent(fileName) {
    for (var i = 0; i < logs.length; i++) {
        if (logs[i].name === fileName) {
            return logs[i].content;
        }
    }
    return null;
}

function processCommand() {
    var input = document.getElementById("commandInput");
    var command = input.value.trim().toUpperCase();

    // Traitez la commande ici
    var terminalOutput = document.getElementById("terminalOutput");
    var commandOutput = "";

    if (command === "LIST LOGS") {
        commandOutput = "Available logs:\n";
        for (var i = 0; i < logs.length; i++) {
            commandOutput += logs[i].name + "\n";
        }
    } else if (command.startsWith("READ")) {
        var fileName = command.substring(5).trim();
        var fileContent = getFileContent(fileName);
        if (fileContent) {
            commandOutput = "Reading file: " + fileName + "\n" + wrapText(fileContent,60);
            //typeWriter(fileContent);
        } else {
            commandOutput = "File not found: " + fileName;
        }
    } else if (command === "DWNLD PRT-104") {
        var fileContent = "https://drive.google.com/file/d/1Myl9H3ixxO-S8FhbrbpTiTh1Tkn-GWbz/view?usp=drive_link";
        window.open(fileContent, "_blank");
        commandOutput = "Downloading file: PRT-104";
    } else if (command === "HELP") {
        commandOutput = "Available commands:\n";
        commandOutput += "- LIST LOGS : Lists available logs.\n";
        commandOutput += "- READ [FILENAME] : Reads the content of the specified log.\n";
		commandOutput += "- CLEAR : Clear the terminal screen.\n";
        commandOutput += "- DWNLD [FILENAME] : Downloads the specified file.\n";
		commandOutput += "- INFO : Display information about this terminal.\n";
    } else if (command === "CLEAR") {
        terminalOutput.innerHTML = "";
        input.value = "";
        return; // Ne pas afficher le message "Command not found"
	} else if (command === "INFO") {
    commandOutput = "This is a test message.";
    }

    // Affichez la sortie de la commande dans le terminal
    if (commandOutput) {
        terminalOutput.innerHTML += "<p>&gt; " + command + "</p>";
        terminalOutput.innerHTML += "<pre id='commandResult'>" + commandOutput + "</pre>";
    }

    // Effacez la saisie de l'utilisateur
    input.value = "";
}

function wrapText(text, maxLength) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = "";

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (currentLine.length + word.length + 1 <= maxLength) {
            // Ajoute le mot à la ligne actuelle
            if (currentLine.length > 0) {
                currentLine += " ";
            }
            currentLine += word;
        } else {
            // La ligne actuelle est pleine, ajoutez-la aux lignes et commencez une nouvelle ligne
            lines.push(currentLine);
            currentLine = word;
        }
    }

    // Ajoutez la dernière ligne si elle n'est pas vide
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    // Joindre les lignes en un seul texte avec des sauts de ligne
    return lines.join("\n");
}

/*
Ne marche pas
function typeWriter(text) {
    var commandResult = document.getElementById('commandResult');
    var index = 0;
    var speed = 50; // Vitesse de la saisie des caractères en millisecondes

    function type(text) {
        if (index < text.length) {
            commandResult.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type(text);
}*/

