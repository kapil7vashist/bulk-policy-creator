import data from "./sub-dealers-data.json" assert {type:'json'};
import xlsx from "xlsx";

let sheetData = [['Registered Dealer Email','Risk Start Date','Name of Certificate Holder','DOB','Gender','Mobile','Email','Address','City','State','Pincode','Manufacturing Year','Vehicle Registration No','Vehicle Manufacturer','Model','Variant','Engine No.','Chassis No.','Nominee Name','Nominee Relationship','Nominee Gender','Nominee Age','Plan','Plan Type','New Vehicle','Dealer ID','Timestamp']];

const riskStartDate = "2022-10-24";
const gender = 'Male';
const city = 'Mathura';
const pincode = '281001';
const state = 'Uttar Pradesh';
const timestamp = '2022-10-24 11:29:01';
const planType = 'CPA + RSA + AHDC + DOC';
const manufacturingYear = '2022';

const cleanName = (name,address)=>{

    console.log(name);

    if(name.includes('/')){
        let splitName = name.indexOf('/');
        let customerName = name.substring(0,splitName-2);
        let newAddress = `${name.substring(splitName-2,name.length)}, ${address}`;
        return [customerName,newAddress.trim()];
    }else{
        return [name,address];
    }

}

const getDob = (dob)=>{
    const splitDob = dob.split('/');
    return `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`;
}

const setDealerID = (email)=>{
    if(email == 'upadhyaymotor@gmail.com'){
        return '1WH65I6cboV1MjKQhx3zM2QiEmuHtQjnKUssDiU-VP7k';
    }else if(email == 'mahendramotors2015@gmail.com'){
        return '1ipiizJhZiRSwa-HGPYAXoFXM18mwPYV5FEGfOTvybvk';
    }else if(email == 'radhamotorsbarsana2014@gmail.com'){
        return '19bXssdH9Vj9S4-hnqEvDKXxBYkCZb2YideGN1EcSGyk';
    }else if(email == 'agrawalautosales@gmail.com'){
        return '1EKUX2g7taP0J1K7X0BVbZcttQIgEqnHtNldFX8ZYPLQ';
    }else if(email == 'sbkhandelwal8@gmail.com'){
        return '1HtysfhpGiYy4pDXvahWxBmR24wGrNyOL6Yy9V9oDnB4';
    }else if(email == 'durgaauto1975@gmail.com'){
        return '1QJxVLeWFwDHR5Ssq189MMPEhhDqC6Su0kxd8dVVMql0';
    }
}

for(let i=0;i<data.length;i++){

    console.log(i);
    let record = data[i];

    let dealerID = setDealerID(record["Registered Dealer Email"]);
    let dob = getDob(record.DOB.toString());

    let freshName = cleanName(record.Name,record.Address);
    const nomineeRelation = record.Relation.includes('Spouse')?'Spouse':record.Relation;

    let newRecord = [record["Registered Dealer Email"],riskStartDate,freshName[0],dob,gender,record.Mob1,record["Registered Dealer Email"],freshName[1],city,state,pincode,manufacturingYear,'NEW','Hero',record["Model Code"],'BS6',record["Engine No"],record["Frame No"],record.Nominee,nomineeRelation,'Female',record.Age,record.PLAN,planType,'Yes',dealerID,timestamp];

    sheetData.push(newRecord);
}



const wb = xlsx.utils.book_new();
const worksheet = xlsx.utils.aoa_to_sheet(sheetData);
xlsx.utils.book_append_sheet(wb,worksheet,"Today");
xlsx.writeFile(wb,"./sub-dealers-data.xlsx");