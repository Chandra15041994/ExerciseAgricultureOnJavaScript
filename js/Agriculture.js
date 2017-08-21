let fs=require('fs')
let result = [];
let res = [];
let re = [];
let riceResult = [];
let commResult = [];
let year = [];
let commAggre =[];
let id = 0; 
let invalidEntries = 0;
let aggre = [];
let array = [];
fs.readFile('../csv/Agriculture.csv','UTF-8',function(err,usedData)
{
  const writeFileOil = fs.createWriteStream('../json/OilSeeds.json');
  const writeFileProd = fs.createWriteStream('../json/Production.json');
  const writeFileFood = fs.createWriteStream('../json/FoodGrains.json');
  const writeFileRice = fs.createWriteStream('../json/RiceProduction.json');
  const writeFileCommCrop = fs.createWriteStream('../json/CommercialCrop.json');
  var arr=usedData
  .split('\n')
  .map((usedData)=>{
    return usedData.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)
  })
  for(var i=1; i<arr.length; i++)
  { 
   if(arr[i][0].match("Oilseeds")=="Oilseeds")
   {  
     let oil = { "name" : arr[i][0], "value" : arr[i][23] } 
    result.push(oil)  
    function isNumber(obj) {
      return obj!== undefined && typeof(obj)=== 'string' && !isNaN(obj);
    }
    function filterByid(oil) {
      if (isNumber(oil.value)) {
        return true;
      } 
      invalidEntries++;
      return false; 
    }
    var arrByid = result.filter(filterByid);
    var x = arrByid.sort(function(a,b){
      return b.value-a.value;
    })
  }
  if(arr[i][0].match("Production")=="Production")
 {
  let arg = {"name" : arr[i][0], "value" : arr[i][23]};
  res.push(arg) 
  function isNumber(obj) {
    return obj!== undefined && typeof(obj) === 'string' && !isNaN(obj);
  }
  function filterId(arg) {
    if (isNumber(arg.value)) {
      return true;
    } 
    invalidEntries++;
    return false; 
  }
  let arrId = res.filter(filterId);
   y = arrId.sort(function(a,b){
    return b.value-a.value;
  })
}
if(arr[i][0].match("Foodgrains")=="Foodgrains")
 {
  let args = {"name" : arr[i][0], "value" : arr[i][23]};
  re.push(args)
  function isNumber(obj) {
    return obj!== undefined && typeof(obj) === 'string' && !isNaN(obj);
  }

  function filterWithId(args) {
    if (isNumber(args.value)) {
      return true;
    } 
    invalidEntries++;
    return false; 
  }
  let arrWithId = re.filter(filterWithId);
  var z = arrWithId.sort(function(a,b){
    return b.value-a.value;
  })
}

if(arr[i][0].match("Rice")=="Rice")
   {  
 
    let item ={"name" : arr[i][0], "value" : arr[i][23]};

    riceResult.push(item)
  
    function isNumber(obj) {
      return obj!== undefined && typeof(obj) === 'string' && !isNaN(obj);
    }
    function filterByidRice(item) {
      if (isNumber(item.value)) {
        return true;
      } 
      invalidEntries++;
      return false; 
    }
    let arrByidRice = riceResult.filter(filterByidRice);
     riceX = arrByidRice.sort(function(a,b){
      return b.value-a.value;
    })
  }
if(arr[i][0].match("Commercial")=="Commercial")
   { 
    let j = 15;
    do
    {
     year.push(arr[0][j]);  
    let itemComm = {"name" : arr[0][j], "value" : arr[i][j]};
    commResult.push(itemComm)
    
    function isNumber(obj) {
      return obj!== undefined && typeof(obj) == 'string' && !isNaN(obj);
    }
    function filterByidComm(itemComm) {
      if (isNumber(itemComm.value)) {
        return true;
      } 
      invalidEntries++;
      return false; 
    }
    let arrByidComm = commResult.filter(filterByidComm);
     commX = arrByidComm.sort(function(a,b){
      return b.value-a.value;
    })
   if(year[j]!=undefined)  
   {
     commAggre = commX.filter((event) => { return event.name == year[j] }).map((itemComm)=>{return itemComm.value}).reduce((prev, value)=>{return prev + parseFloat(value)}, 0);
     let aggreCommercial = {"id ": id++, "year" : year[j], "value" : commAggre} 
      //let aggregate = aggreCommercial.filter((event)=>{return (id>30)?event.value:false})
       if(id>30)
        {
          array.push(aggreCommercial)
          
      }

                
   }
      j++;

    }
    while(j<arr.length); 


  }
} 
writeFileOil.write(JSON.stringify(x, null, 2), 'UTF8');
writeFileProd.write(JSON.stringify(y, null, 2), 'UTF8');
writeFileFood.write(JSON.stringify(z, null, 2), 'UTF8');
writeFileRice.write(JSON.stringify(riceX, null, 2), 'UTF8');
writeFileCommCrop.write(JSON.stringify(array, null, 2), 'UTF8'); 
} )
 
