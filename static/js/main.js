// http://www.network-science.de/ascii/
// roman font
const CHARSET_TITLE = "\
oooooo   oooooo     oooo                                                                            .o8  \
 `888.    `888.     .8'                                                                            ¬888  \
  `888.   .8888.   .8'    .oooo.   oooo    ooo  .ooooo.   .oooo.o        .oooo.   ooo. .oo.    .oooo888  \
   `888  .8'`888. .8'    `P  )88b   `88.  .8'  d88' `88b d88(  ¬8       `P  )88b  `888P¬Y88b  d88' `888  \
    `888.8'  `888.8'      .oP¬888    `88..8'   888ooo888 `¬Y88b.         .oP¬888   888   888  888   888  \
     `888'    `888'      d8(  888     `888'    888    .o o.  )88b       d8(  888   888   888  888   888  \
      `8'      `8'       `Y888¬¬8o     `8'     `Y8bod8P' 8¬¬888P'       `Y888¬¬8o o888o o888o `Y8bod88P¬ \
                                                                                                         \
         oooooooooo.                                                                                     \
         `888'   `Y8b                                                                                    \
          888      888 oooo  oooo  ooo. .oo.    .oooooooo  .ooooo.   .ooooo.  ooo. .oo.    .oooo.o       \
          888      888 `888  `888  `888P¬Y88b  888' `88b  d88' `88b d88' `88b `888P¬Y88b  d88(  ¬8       \
          888      888  888   888   888   888  888   888  888ooo888 888   888  888   888  `¬Y88b.        \
          888     d88'  888   888   888   888  `88bod8P'  888    .o 888   888  888   888  o.  )88b       \
         o888bood8P'    `V88V¬V8P' o888o o888o `8oooooo.  `Y8bod8P' `Y8bod8P' o888o o888o 8¬¬888P'       \
                                               d¬     YD                                                 \
                                               ¬Y88888P'\
".replaceAll('¬','"');


// FUNCTIONS
function startGame(){
  // change base color to #4dd5ff
  setBaseColor("#4dd5ff");

  newElement('div', {id:'test', type:'none', text:CHARSET_TITLE, width:105, height:17, x:'center', y:'center'}, 'main');
  delElement('start_button');
}

function setBaseColor(color){
  document.getElementsByTagName("prompt")[0].setAttribute('style',`color:${color}`);
}

function stressTest(){
  let counter  = 0;
  aux = 0;
  let interval = setInterval(() => {
    let start = new Date();
    if(counter++ == 100) {
      clearInterval(interval);
      newElement('div', {x:'center',y:'center', width:6, height:1, text:`${(aux/100).toFixed(3)}s`}, 'main');
      return;
    }
    
    let rx = Math.floor(Math.random() * 142);
    let ry = Math.floor(Math.random() *  27);

    let red = (Math.floor((Math.random() * 100 + 150) * Math.random())).toString(16);
    let gre = (Math.floor((Math.random() * 100 + 150) * Math.random())).toString(16);
    let blu = (Math.floor((Math.random() * 100 + 150) * Math.random())).toString(16);

    newElement('div', {x:rx, y:ry, width:10, height:4, 'border-color':`#${red+gre+blu}`, color:`#${red+gre+blu}`, text:counter}, 'main');
    aux += (new Date() - start)/1000;
  }, 1);
}