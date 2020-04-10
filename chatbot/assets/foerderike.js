
var answers= {};
var current_step = {};
var botui = new BotUI('foerderike');

function auswahlSingle(step) {
    actions = []
    step["mögliche antworten"].forEach(element => {
        actions.push({ text: element, value: element })
    });
    botui.message.add({
        content: step.text,
    }).then(() =>
    botui.action.button({
        addMessage: true,
        action: actions,
    }).then( (res) => {
        answers[currentStep] = res.value;
        SchrittZeigen(step["weiter zu"][res.value])
    }));
}

function auswahlMultiple(step) {
    options = []
    step["mögliche antworten"].forEach(element => {
        options.push({ text: element, value: element })
    });
    botui.message.add({
        content: step.text,
    }).then(() =>
    botui.action.select({
        action: {
            multipleselect: true,
            options: options,
            button: { icon: 'check', label: 'OK'}
        }
    }).then( (res) => {
        answers[currentStep] = res.value;
        SchrittZeigen(step["weiter zu"][res.value])
    }));
}

function SchrittZeigen(stepId) {

    var entry = foerderike_steps.find(v => v.id == stepId);

    if(entry)
    {
        currentStep = stepId;
        if (entry.fragetyp =="auswahl_single") auswahlSingle(entry);
        else if (entry.fragetyp == "auswahl_multiple") auswahlMultiple(entry);
        else console.log("unknown command"+stepId);
    }
    else console.log("nicht gefunden "+stepId);
};

function startBot()
{   
    answers= {} 
    SchrittZeigen(foerderike_steps[0].id);
}
