var fs=require('fs')
var result = [];
var res = [];
var re = [];
var riceResult = [];
var commResult = [];
var year = [];
var commAggre =[];
var id = 0; 
 var ides = []
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
    var oil = { "name" : arr[i][0], "value" : arr[i][23] } 
    result.push(oil)
    var invalidEntries = 0;
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
  
  var arg = {"name" : arr[i][0], "value" : arr[i][23]};
  res.push(arg)
  var invalidEntrie = 0;
  function isNumber(obj) {
    return obj!== undefined && typeof(obj) === 'string' && !isNaN(obj);
  }
  function filterId(arg) {
    if (isNumber(arg.value)) {
      return true;
    } 
    invalidEntrie++;
    return false; 
  }
  var arrId = res.filter(filterId);
  var y = arrId.sort(function(a,b){
    return b.value-a.value;
  })
}

if(arr[i][0].match("Foodgrains")=="Foodgrains")
 {
  
  var args = {name : arr[i][0], value : arr[i][23]};
  
  re.push(args)
  var invalidEntr = 0;

  function isNumber(obj) {
    return obj!== undefined && typeof(obj) === 'string' && !isNaN(obj);
  }

  function filterWithId(args) {
    if (isNumber(args.value)) {
      return true;
    } 
    invalidEntr++;
    return false; 
  }
  var arrWithId = re.filter(filterWithId);
  var z = arrWithId.sort(function(a,b){
    return b.value-a.value;
  })
}

if(arr[i][0].match("Rice")=="Rice")
   {  
 
    var item ={"name" : arr[i][0], "value" : arr[i][23]};

    riceResult.push(item)
    var invalidEnt = 0;
    function isNumber(obj) {
      return obj!== undefined && typeof(obj) === 'string' && !isNaN(obj);
    }
    function filterByidRice(item) {
      if (isNumber(item.value)) {
        return true;
      } 
      invalidEnt++;
      return false; 
    }
    var arrByidRice = riceResult.filter(filterByidRice);
    var riceX = arrByidRice.sort(function(a,b){
      return b.value-a.value;
    })
  }

if(arr[i][0].match("Commercial")=="Commercial")
   { 
    var j = 15;
    do
    {
     year.push(arr[0][j]);  
    var itemComm = {"name" : arr[0][j], "value" : arr[i][j]};
    commResult.push(itemComm)
    var invalidVal = 0;
    function isNumber(obj) {
      return obj!== undefined && typeof(obj) == 'string' && !isNaN(obj);
    }
    function filterByidComm(itemComm) {
      if (isNumber(itemComm.value)) {
        return true;
      } 
      invalidVal++;
      return false; 
    }
    var arrByidComm = commResult.filter(filterByidComm);
    var commX = arrByidComm.sort(function(a,b){
      return b.value-a.value;
    })
   
    
   if(year[j]!=undefined)  
   {
     commAggre = commX.filter((event) => { return event.name == year[j] })
   .map((itemComm)=>{return itemComm.value})
   .reduce((prev, value)=>{return prev + parseFloat(value)}, 0);
   
   var aggreCommercial = { "id ": id++, "year" : year[j], "value" : commAggre }
  
   writeFileCommCrop.write(JSON.stringify(aggreCommercial, null, 2), 'UTF8'); 
 
   }
      j++;
    }
    while(j<arr.length);
   
    // 
  }

//console.log(aggreCommercial)
} 

writeFileOil.write(JSON.stringify(x, null, 2 ), 'UTF8');
writeFileProd.write(JSON.stringify(y, null, 2), 'UTF8');
writeFileFood.write(JSON.stringify(z, null, 2), 'UTF8');
writeFileRice.write(JSON.stringify(riceX, null, 2), 'UTF8');

}   )
 
