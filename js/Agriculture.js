let fs=require('fs')
let result = [], res=[], re = [], riceResult=[], commResult=[], year = [], commAggre=[] , id =0, aggre = 0 ,yearRice=[],riceXAggre=[], array=[],
riceAggre=[],riceResult1=[], riceResult2=[], riceResult3=[], riceKaran=[], riceTamil=[], riceAndhra=[],riceKerala=[], riceId=0;
fs.readFile('../csv/Agriculture.csv','UTF-8',function(err,usedData)
{
  const writeFileOil = fs.createWriteStream('../json/OilSeeds.json');
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
   if(arr[i][0].match("Foodgrains")=="Foodgrains")
   {
    let args = {"name" : arr[i][0], "value" : arr[i][23]};
    re.push(args)
    let arrWithId = re.filter((d)=>{ if(isNaN(d.value)){return false }  return true });
    z = arrWithId.sort((a,b)=>{ return b.value-a.value })
  }
  if(arr[i][0].match("Rice")=="Rice")
  {  
    let k = 15;
    do
    {
      yearRice.push(arr[0][k]);
      if(arr[i][0].match("Karnataka")=="Karnataka" )
      {
        let itemRice = {"name" : arr[0][k], "value" : arr[i][k]};
        riceResult.push(itemRice)  
        let arrByidComm = riceResult.filter((d)=>{ if(isNaN(d.value)){ return false } return true });
        riceA = arrByidComm.sort((a,b)=>{return b.value-a.value })
        riceAggre = riceA.filter((event) => { return event.name == yearRice[k] }).map((itemRice1)=>{return itemRice1.value}).reduce((prev, value)=>{return prev + parseFloat(value)}, 0);
        if(yearRice[k]!=undefined){
          aggreRice = { "id": id++, "name" : yearRice[k], "value" : riceAggre}
          if(id>=130&&id<=139){
           riceKaran[k] = aggreRice.value;
         }
       }
     } 
     if(arr[i][0].match("Kerala")=="Kerala" )
     {
      let itemRice1 = {"name" : arr[0][k], "value" : arr[i][k]};
      riceResult1.push(itemRice1)  
      let arrByidComm1 = riceResult1.filter((d)=>{ if(isNaN(d.value)){ return false } return true });
      riceZ = arrByidComm1.sort((a,b)=>{return b.value-a.value })
      riceAggreZ = riceZ.filter((event) => { return event.name == yearRice[k] }).map((itemRice2)=>{return itemRice2.value}).reduce((prev, value)=>{return prev + parseFloat(value)}, 0);
      if(yearRice[k]!=undefined){
        aggreRiceZ = {"id ": id++, "name" : yearRice[k], "value" : riceAggreZ} 
        if(id>=140&&id<=149){
          riceKerala[k]= aggreRiceZ.value
        } 
      }
    }
    if(arr[i][0].match("Andhra Pradesh")=="Andhra Pradesh" )
    {
      let itemRice2 = {"name" : arr[0][k], "value" : arr[i][k]};
      riceResult2.push(itemRice2)  
      let arrByidComm2 = riceResult2.filter((d)=>{ if(isNaN(d.value)){ return false } return true });
      riceY = arrByidComm2.sort((a,b)=>{return b.value-a.value })
      riceAggreY = riceY.filter((event) => { return event.name == yearRice[k] }).map((itemRice3)=>{return itemRice3.value}).reduce((prev, value)=>{return prev + parseFloat(value)}, 0);
      if(yearRice[k]!=undefined){
        aggreRiceY = {"id ": id++, "name" : yearRice[k], "value" : riceAggreY}
        if(id>=120&&id<=129)
        {
          riceAndhra[k] = aggreRiceY.value
          
        }
      }
    }
    if(arr[i][0].match("Tamil Nadu")=="Tamil Nadu" )
    {
      let itemRice3 = {"name" : arr[0][k], "value" : arr[i][k]};
      riceResult3.push(itemRice3)  
      let arrByidComm3 = riceResult3.filter((d)=>{ if(isNaN(d.value)){ return false } return true });
      riceX = arrByidComm3.sort((a,b)=>{return b.value-a.value })
      riceAggreX = riceX.filter((event) => { return event.name == yearRice[k] }).map((itemRice4)=>{return itemRice4.value}).reduce((prev, value)=>{return prev + parseFloat(value)}, 0);
      if(yearRice[k]!=undefined){
        aggreRiceX = {"id ": id++, "name" : yearRice[k], "value" : riceAggreX}
        if(id>=150&&id<160){
          riceTamil[k]= aggreRiceX.value
        }
      }
    }
    if(yearRice[k]!=undefined) {
     if(id>=120&&id<=160)
     {
       let riceGlobal = { "riceId":riceId++, "Year" :yearRice[k], "Karnataka" : riceKaran[k], "Kerala": riceKerala[k], "Andhra-Pradesh" : riceAndhra[k], "Tamil Nadu" : riceTamil[k]  }
       if(riceId>=202&&riceId<=210)
       {
        riceGlo = {"Year" :yearRice[k], "Karnataka" : riceKaran[k], "Kerala": riceKerala[k], "AndhraPradesh" : riceAndhra[k], "TamilNadu" : riceTamil[k]  }
        riceXAggre.push(riceGlo)
        console.log(riceXAggre)
      }
    }
  }  
  k++;
}while(k<arr.length);
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
writeFileFood.write(JSON.stringify(z, null, 2), 'UTF8');
writeFileRice.write(JSON.stringify(riceXAggre, null, 2), 'UTF8');
writeFileCommCrop.write(JSON.stringify(array, null, 2), 'UTF8'); 
} )

