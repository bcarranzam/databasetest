import './App.css';
import databaseCodingTest from "./db/data.json"


// THIS SOLUTION WILL SEND THE FINAL LIST TO THE WEB CONSOLE AND ALSO SHOW A TABLE IN THE WEBPAGE


function App() {
    let listNames = [];
    let controlIndex = 0;
    do {
        let controlElement = databaseCodingTest.recipients[controlIndex];
        if (controlElement.tags.length >= 2) {
            let compareElement;
            let comparelIndex = 0;
            do {
                let matches = 0;
                compareElement = databaseCodingTest.recipients[comparelIndex];

                // COMPARE INDEX VALUES SO AN ELEMENT IS NOT COMPARED TO ITSELF
                // IF THE ELEMENT CONTAINS LESS THAN 2 TAGS, IT CAN AUTOMATICALLY BE DISCARDED FROM THE POSSIBLE NAMES TO ADD TO THE LIST
                if (controlIndex !== comparelIndex && compareElement.tags.length >= 2) {
                    for (let compareTag of compareElement.tags) {
                        if (controlElement.tags.includes(compareTag)) {
                            matches++;
                        }
                    }
                }

                // CHECK FOR 2 OR MORE MATCHES AND APPEND THE NAMES TO THE MAIN LIST
                if (matches >= 2) {
                    let namesList = [controlElement.name, compareElement.name]
                    namesList.sort();
                    listNames.push(namesList);
                }
                comparelIndex++;
            } while (comparelIndex < databaseCodingTest.recipients.length)
        }
        controlIndex++;
    } while (controlIndex < databaseCodingTest.recipients.length)

    // CLEAN THE LIST BY ELIMINATING THE REPEATED NAMES
    // INSTEAD OF CHECKING IF A PAIR ALREADY EXISTS BEFORE ADDING IT, I RATHER CLEAN IT AFTERWARDS, 
    // THAT WAY ONLY ONE FULL RUN THROUGH THE DATA IS REQUIRED INSTEAD OF MULTIPLE
    listNames.sort();
    for (let i = 0; i < listNames.length - 1; i++) {
        let namesPairControl = listNames[i];
        let namesPairCompare = listNames[i + 1];

        if (namesPairControl[0] == namesPairCompare[0] && namesPairControl[1] == namesPairCompare[1]) {
            listNames.splice(i + 1, 1);
        }
    }

    console.log(listNames)

    return (
        <div>
            <table border="1">
                <tbody>
                    {listNames.map((names, i) => {
                        return <tr key={i}>
                            <td>{names[0]}</td>
                            <td>{names[1]}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
