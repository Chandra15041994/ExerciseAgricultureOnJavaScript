let fs=require('fs')
let result = [], res=[], re = [], riceResult=[], commResult=[], year = [], commAggre=[] , id =0, aggre = 0 , array=[];
fs.readFile('../csv/Agriculture.csv','UTF-8',function(err,usedData)
{
  const writeFileOil = fs.createWriteStream('../json/OilSeeds.json');
  const writeFileProd = fs.createWriteStream('../json/Production.json');
  const writeFileFood = fs.createWriteStream('../json/FoodGrains.json');
  const writeFileRice = fs.createWriteStream('../json/RiceProduction.json');
  const writeFileCommCrop = fs.createWriteStream('../json/CommercialCrop.json');
  let arr=usedData.split('\n').map((usedData)=>{ return usedData.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)})
  for(let i=1; i<arr.length; i++)
  { 
   if(arr[i][0].match("Oilseeds")=="Oilseeds")
   {  
     let oil = { "name" : arr[i][0], "value" : arr[i][23] } 
     result.push(oil)  
     let arrByid = result.filter((d)=>{if(isNaN(d.value)){ return false; } return true;});
     x = arrByid.sort((a,b)=>{return b.value-a.value})
   }
   if(arr[i][0].match("Production")=="Production")
   {
    let arg = {"name" : arr[i][0], "value" : arr[i][23]};
    res.push(arg) 
    let arrId = res.filter((d)=>{if(isNaN(d.value)){ return false }return true });
    y = arrId.sort((a,b)=>{return b.value-a.value })
  }
  if(arr[i][0].match("Foodgrains")=="Foodgrains")
  {
    let args = {"name" : arr[i][0], "value" : arr[i][23]};
    re.push(args)
    let arrWithId = re.filter((d)=>{ if(isNaN(d.value)){return false }  return true });
    z = arrWithId.sort((a,b)=>{ return b.value-a.value })
  }
  if(arr[i][0].match("Rice")=="Rice")
  {  
    if ((arr[i][0].match("Andhra Pradesh") == "Andhra Pradesh") ||(arr[i][0].match("Karnataka") == "Karnataka") ||
      (arr[i][0].match("Kerala") == "Kerala") ||  (arr[i][0].match("Tamil Nadu") == "Tamil Nadu")) {
      let item ={"name" : arr[i][0], "value" : arr[i][23]};
    riceResult.push(item)
    let arrByidRice = riceResult.filter((d)=>{ if(isNaN(d.value)){ return false } return true });
    riceX = arrByidRice.sort((a,b)=>{return b.value-a.value })
  }
}
if(arr[i][0].match("Commercial")=="Commercial")
{ 
  let j = 15;
  do
  {
   year.push(arr[0][j]);  
   let itemComm = {"name" : arr[0][j], "value" : arr[i][j]};
   commResult.push(itemComm)  
   let arrByidComm = commResult.filter((d)=>{ if(isNaN(d.value)){ return false } return true });
   commX = arrByidComm.sort((a,b)=>{return b.value-a.value })
   if(year[j]!=undefined)  
   {
     commAggre = commX.filter((event) => { return event.name == year[j] }).map((itemComm)=>{return itemComm.value}).reduce((prev, value)=>{return prev + parseFloat(value)}, 0);
     let aggreCommercial = {"id ": id++, "year" : year[j], "value" : commAggre} 
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

