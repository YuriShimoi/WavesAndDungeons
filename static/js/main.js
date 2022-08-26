// VARIABLES
let player = null;
GLOBAL_VARIABLE_REGISTER["IMAGES"] = IMAGES;


// FUNCTIONS
function startGame(){
    Prompter.DelElement('start_button', draw=false);
    Prompter.NewElement('div', {id:'title_case', type:'none', width:107, height:19, xalign:'center', yalign:'center'}, 'main', draw=false);
    Prompter.NewElement('div', {id:'title_p1',   type:'none', text:CHARSET_TITLE_1, width:105, height:7, xalign:'center', color:'#5de5ff'}, 'title_case', draw=false);

    diagonalBlinkDiv('title_p1', '*', 5, 2, () => {
        Prompter.NewElement('div', {id:'title_p2',   type:'none', text:CHARSET_TITLE_2, width:105, height:9, xalign:'center', yalign:'bottom', color:'#2d85bd'}, 'title_case', draw=false);
        diagonalBlinkDiv('title_p2', '*', 5, 2, () => {
        setTimeout(() => {
            Prompter.DelElement('title_case', {hidden: 'true'});
            showClassWindow();
        }, 1000);
        });
    });
}

function showClassWindow() {
    Prompter.EnableElement("chooseClass");
}

function chooseClass(type) {
    player = new Player(type);
    Prompter.DisableElement("chooseClass");
    showInterface();
}

function showInterface(){
    Prompter.EnableElement("profile", draw=false);
    Prompter.EnableElement("map", draw=false);
    Prompter.UpdateElement("sep1", {'disabled': "false", 'text': VERTICAL_SEPARATOR1, 'color': 'lightgray'}, draw=false);

    Interface.Status.startVariables();
    Interface.Status.update();

    Interface.Minimap.startMinimap();

    let island = new Island(1);
    Interface.Map.startVariables();
    Interface.Map.updateMapView(island.mapping);
    PrompterScreen.UpdateScreen();
}


// TOOLS
function diagonalBlinkDiv(eid, char="*", delay=50, angle=2, end_call=()=>{}){
    let el  = document.getElementById(eid);
    let txt = el.getAttribute("text");
    let wid = parseInt(el.getAttribute("width"));
    let hei = parseInt(el.getAttribute("height"));

    let step = 0;
    let interval = setInterval(() => {
        if(step++ >= wid+(hei*angle)) {
            clearInterval(interval);
            Prompter.UpdateElement(eid, {text: txt});
            end_call();
            return;
        }

        let btext = '';
        for(let y=0; y<hei; y++){
            let ypos = step < y*angle? wid * y: (step - y*angle) + (wid * y);
            if(ypos >= wid*(y+1)) {
                btext += txt.substring(wid*y, wid*(y+1));
                continue;
            }
            btext += txt.substring(wid*y, ypos);
            btext += txt[ypos] != " "? char: txt[ypos];
            btext += ' '.repeat((wid*(y+1)) - (ypos+1));
        }
        
        Prompter.UpdateElement(eid, {text: btext});
    }, delay);
}