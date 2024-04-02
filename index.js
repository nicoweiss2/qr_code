//Konstante(Werte können nicht verändert werden) namens employess
//in dieser sind 3 Objekte in einem Array die jeweil einen Mitarbeiter darstelle
//Name ist ein String, stampedIn ein boolean ob der Mitarbeiter eingestempelt ist am anfang false
//Die Starttime ein Date wann der Mitarbeiter eingestempelt hat, die TotalTime die die gesamte
//Arbeitszeit darstellt anfang auf 0
const employees = [
    { name: "Mitarbeiter 1", stampedIn: false, startTime: null, totalTime: 0 },
    { name: "Mitarbeiter 2", stampedIn: false, startTime: null, totalTime: 0 },
    { name: "Mitarbeiter 3", stampedIn: false, startTime: null, totalTime: 0 }
];
 
//funktion updateTime um die Uhrzeit zu aktualisieren. Zuerst neues Date repräsentiert den
//Momentanen Zeitpunkt der Funktion Date objekt hat viele methoden für die Speicherung von Jahr, Monat, Stunden etc
//funktion hollt sich also nachher die Stunden, Minuten und Sekunden aus dem Date mit "now" Obejekt oben definiert
//Diese werden in Strings umgewandelt, mit padStart sagt es wenn der String unter 2 stellen hat fügt es eine 0 hinzu
//z.B bei 7 = 07, mit getElementbyID zum HTML verknüpft mit stunden minuten sekunden
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
 
//stamp funktion für das ein und aus Stempeln des Mitarbeiters. Zuerst neue konstante employee die den
//Wert des jeweiligen Mitarbeiters nimmt in der Ekigen Klammer wie dann der Parameter dazu heisst
//wieder das gleiche wie oben schon mit dem Date
//konstante stamptime formatiert die akutelle zeit als strint in h min sek wird gebraucht für ein oder ausstempeln
//konstatne stamplist dort wird der Zeitstempel angezeigt
//konstante li wird neue listenelement hinzugefügt
//wenn mitarbeiter ausgestempelt also 2mal weil 1 mal ist false ist also stempedIN = true dann
// akutelle zeit minus startezeit gibt ingesamte zeit, diese zeit wird zu totaltime addiert
//die infos dazu werden in der vorhin definierten konstante li befüllt, dann wieder auf falsch gesetzt damit es neu anfangen kann
// dann das gleiche umgekehrt und wird zum schluss auf true gesetzt
// wird jeweil das liste element zur stamplist dann zu ul im html hinzugefügt
 
function stamp(employeeIndex) {
    const employee = employees[employeeIndex];
    const now = new Date();
    const stampTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const stampList = document.getElementById('stampList');
    const li = document.createElement('li');
    
    if (employee.stampedIn) {
        const elapsedTime = now - employee.startTime;
        employee.totalTime += elapsedTime;
        li.innerHTML = `${employee.name} - Ausgestempelt: ${stampTime}<br>Gesamtzeit: ${formatTime(employee.totalTime)}`;
        employee.stampedIn = false;
    } else {
        employee.startTime = now;
        li.textContent = `${employee.name} - Eingestempelt: ${stampTime}`;
        employee.stampedIn = true;
    }
 
    stampList.appendChild(li);
}
 
//umwandlung von den gegeben milisekunden in der funktion oben
//das oben in der klammer formattime(..) das in der klammer dieser wert hat der parameter
//zuerst sekunden umgerechnet, 1000ms = 1s
//danaxh die sekunden werden durch 60 geteilt für die minuten
//dann die stunden durch 60 geteilt
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}
//erstmal holt das html in eine konstante danach einfach zu verstehen
//der eventlistener sorgt dafür das man klicken kann nach dem click kommt die funktion stamp mit den richtigen daten des jeweiligen
//mitarbeits
//danaxh werden die infos zum button mit appendchild zur oberenkonstante buttons hinzugefügt
function createButtons() {
    const buttonsContainer = document.getElementById('buttons');
 
    employees.forEach((employee, index) => {
        const button = document.createElement('button');
        button.textContent = employee.name;
        button.addEventListener('click', () => stamp(index));
        buttonsContainer.appendChild(button);
    });
}
//create buttons wird aufgerufne und und setinterval funktion heisst jede 1000ms also jede 1s wird updateTime funktion
//aktualisiert also die neue Zeit wird angezeigt
setInterval(updateTime, 1000);
createButtons();
 