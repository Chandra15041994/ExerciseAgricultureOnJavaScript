var fs=require('fs')
var result = [];
var res = [];
var re = [];
var riceResult = [];
var commResult = [];
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
    return usedData.split(',')
  })

  for(var i=1;i<arr.length;i++)
  {   
   if(arr[i][0].match("Oilseeds")=="Oilseeds")
   {  
    oil=arr[i][24];
    oil1="Oilseed";
    var argument =new Object;
    argument.name=oil1
    argument.value = oil
    result.push(argument)
    var invalidEntries = 0;
    function isNumber(obj) {
      return obj!== undefined && typeof(obj) === 'string' && !isNaN(obj);
    }
    function filterByid(argument) {
      if (isNumber(argument.value)) {
        return true;
      } 
      invalidEntries++;
      return false; 
    }
    var arrByid = result.filter(filterByid);
    var x = arrByid.sort(function(a,b){
      return b.value-a.value;
    })
    var ar2 = [];
    
ar2 = arrByid.filter((item)=>{return item.name==="Oilseed"}).map((event)=>{return event.value}).reduce((prev, value) => {return prev+parseFloat(value)},0);
console.log(ar2);

  }
  if(arr[i][0].match("Production")=="Production")
 {
  prod =arr[i][24];
  var arg =new Object;
  arg.value = prod
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
  food =arr[i][24];
  var args =new Object;
  args.value = food
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
    rice =arr[i][24];
    var item =new Object;
    item.value = rice
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
    commCrop =arr[i][24];
    var itemComm =new Object;
    itemComm.value = commCrop;
    commResult.push(itemComm)
    var invalidVal = 0;
    function isNumber(obj) {
      return obj!== undefined && typeof(obj) === 'string' && !isNaN(obj);
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
  }

} 
writeFileOil.write(JSON.stringify(x, null, 2), 'UTF8');
writeFileProd.write(JSON.stringify(y, null, 2), 'UTF8');
writeFileFood.write(JSON.stringify(z, null, 2), 'UTF8');
writeFileRice.write(JSON.stringify(riceX, null, 2), 'UTF8');
writeFileCommCrop.write(JSON.stringify(commX, null, 2), 'UTF8');




})

