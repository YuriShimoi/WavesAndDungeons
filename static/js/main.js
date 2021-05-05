// VARIABLES



// FUNCTIONS
function startGame(){
  // change base color to #5de5ff
  setBaseColor("#ffffff");

  newElement('div', {id:'title_case', type:'none', width:107, height:19, x:'center', y:'center'}, 'main', draw=false);
  newElement('div', {id:'title_p1',   type:'none', text:CHARSET_TITLE_1, width:105, height:7, x:'center', color:'#5de5ff'}, 'title_case', draw=false);
  newElement('div', {id:'title_p2',   type:'none', text:CHARSET_TITLE_2, width:105, height:9, x:'center', yalign:'bottom', color:'#2d85bd'}, 'title_case', draw=false);
  delElement('start_button', draw=false);

  diagonalBlinkDiv('title_p1', '~', 5, 2);
  diagonalBlinkDiv('title_p2', '~', 5, 2);
}

function setBaseColor(color){
  document.getElementsByTagName("prompt")[0].setAttribute('style',`color:${color}`);
}

function diagonalBlinkDiv(eid, char="*", delay=50, angle=2){
  let el  = document.getElementById(eid);
  let txt = el.getAttribute("text");
  let wid = parseInt(el.getAttribute("width"));
  let hei = parseInt(el.getAttribute("height"));

  let step = 0;
  let interval = setInterval(() => {
    if(step++ >= wid+(hei*angle)) {
      clearInterval(interval);
      changeElement(eid, {text: txt});
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
    
    changeElement(eid, {text: btext});
  }, delay);
}