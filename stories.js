(async function(){

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


OldHeight = 0
ContinueCycle = true
while(ContinueCycle) {
    await sleep(4000);
    window.scrollTo(0,document.body.scrollHeight);
    if (document.body.scrollHeight === OldHeight){
      run()
      ContinueCycle = false
    }
    else{
      OldHeight = document.body.scrollHeight
    }
}


function run (){
const mode = (myArray) =>
  myArray.reduce(
    (a,b,i,arr)=>
     (arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b),
    null)


itemclasses = [...document.querySelectorAll('div')].map(d=>d.className).filter(d=>(d.match(/\s/g) || []).length === 3 )

itemclass = mode(itemclasses)



var data = [...document.querySelectorAll(`div[class="${itemclass}"]`)].map(d => {
  article = {};
  keys = ["title", "subtitle", "publisher"];

  d.querySelectorAll("a").forEach((e, i) => {
    article[keys[i]] = e.innerText;
    if (i === 0) article["url"] = e.href;
  });

  return article
});

console.log(data)

switch(window.location.href) {
  case "https://medium.com/me/stories/public":
    fname = 'stories.json'
    break;
  case "https://medium.com/me/stats":
    fname = 'stats.json'
    break;
  default:
    alert('You are not on the Stories or Stats page on medium')
}


var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
var download = document.createElement('a');
download.setAttribute("href",dataStr);
download.setAttribute("download", fname);
download.click();

}
})()
