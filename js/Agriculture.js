var fs=require('fs')
var result = [];
var res = [];
var re = [];
var riceResult = [];
var commResult = [];
var year = [];
var commAggre = [];
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


  for(var i=1;i<arr.length;i++)
  { 

   if(arr[i][0].match("Oilseeds")=="Oilseeds")
   {  
    oil=arr[i][23];
    oil1= arr[i][0];
    var argument =new Object;
    argument.name=oil1
    argument.value = oil
    result.push(argument)
    var invalidEntries = 0;
    function isNumber(obj) {
      return obj!== undefined&& typeof(obj) === 'string'  && !isNaN(obj);
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
   
    


  }
  if(arr[i][0].match("Production")=="Production")
 {
  prod =arr[i][23];
  prodName = arr[i][0];
  var arg =new Object;
  arg.name = prodName
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
  food =arr[i][23];
  foodName = arr[i][0]
  var args =new Object;
  args.name = foodName
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
    rice =arr[i][23];
    riceName = arr[i][0]
    var item =new Object;
    item.name = riceName
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
   
     j = 15;
   
    do
    {
    commCrop = arr[i][j];
    commCrop1 = arr[0][j];
     year.push(commCrop1);
    //console.log(year[9])
    var itemComm =new Object;
    itemComm.name = commCrop1;
    itemComm.value = commCrop;
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
   
    commAggre = commX.filter((event) => { return event.name == year[j] })
   .map((itemComm)=>{return itemComm.value})
   .reduce((prev, value)=>{return prev + parseFloat(value)}, 0);
      var commercialAggre = commAggre;
      console.log(year[j], commAggre)
      j++;
      
    }
    while(j<arr.length);
      
  }


} 
//console.log(year);
writeFileOil.write(JSON.stringify(x, null, 2 ), 'UTF8');
writeFileProd.write(JSON.stringify(y, null, 2), 'UTF8');
writeFileFood.write(JSON.stringify(z, null, 2), 'UTF8');
writeFileRice.write(JSON.stringify(riceX, null, 2), 'UTF8');
writeFileCommCrop.write(JSON.stringify(commX, null, 1), 'UTF8');

  //console.log(commercialAggre)
 

})
 
