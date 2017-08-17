var fs=require('fs')
var result = [];
var res = [];
var re = [];
fs.readFile('../csv/Agriculture.csv','UTF-8',function(err,usedData)
{
  const writeFileOil = fs.createWriteStream('../json/OilSeeds.json');
  const writeFileProd = fs.createWriteStream('../json/Production.json');
  const writeFileFood = fs.createWriteStream('../json/FoodGrains.json');
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
    var argument =new Object;
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
  }
} 
writeFileOil.write(JSON.stringify(x, null, 2), 'UTF8');


for(var k=1;k<arr.length;k++)
{   

 if(arr[k][0].match("Production")=="Production")
 {
  prod =arr[k][24];
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
} 
writeFileProd.write(JSON.stringify(y, null, 2), 'UTF8');


for(var l=1;l<arr.length;l++)
{   

 if(arr[l][0].match("Foodgrains")=="Foodgrains")
 {
  food =arr[l][24];
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
} 
writeFileFood.write(JSON.stringify(z, null, 2), 'UTF8');
})

