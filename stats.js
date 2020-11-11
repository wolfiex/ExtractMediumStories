

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


var data = [...document.querySelectorAll(`tr[class="sortableTable-row js-statsTableRow"]`)].map(d => {
  article = {};
  article['title']=d.querySelector("a").innerText

  keys = ["date", "view", "read","ratio","fans"];

  [...d.querySelectorAll('span[class="sortableTable-value"]')].forEach((e, i) => {
    article[keys[i]] = e.innerText;
  });

  return article
});

console.log(data)

switch(window.location.href) {
  // case "https://medium.com/me/stories/public":
  //   fname = 'stories.json'
  //   break;
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
