// http://www.network-science.de/ascii/
// roman font
const CHARSET_TITLE = `ooooooooo.                                                       .   ooooooooo.   ooooooooo.     .oooooo.    \`888   \`Y88.                                                   .o8   \`888   \`Y88. \`888   \`Y88.  d8P'  \`Y8b    888   .d88' oooo d8b  .ooooo.  ooo. .oo.  .oo.   oo.ooooo.  .o888oo  888   .d88'  888   .d88' 888            888ooo88P'  \`888""8P d88' \`88b \`888P"Y88bP"Y88b   888' \`88b   888    888ooo88P'   888ooo88P'  888            888          888     888   888  888   888   888   888   888   888    888\`88b.     888         888     ooooo  888          888     888   888  888   888   888   888   888   888 .  888  \`88b.   888         \`88.    .88'  o888o        d888b    \`Y8bod8P' o888o o888o o888o  888bod8P'   "888" o888o  o888o o888o         \`Y8bood8P'                                                      888                                                                                                         o888o`;


// WAKE UP
_maindocumentready = setInterval((f)=>{if(document.readyState == "complete"){clearInterval(_maindocumentready);delete _maindocumentready;f();}}, 1, ()=>{
  newElement('div', {id:'test', type:'none', text:CHARSET_TITLE, width:109, height:9, x:'center'}, 'main');

  // change base color to #4dd5ff
  document.getElementsByTagName("prompt")[0].setAttribute('style','color:#4dd5ff');
});