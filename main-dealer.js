// import data from "./main-dealer-data.json" assert {type:'json'};
import data from "./missing.json" assert {type:'json'};
import xlsx from 'xlsx';

const cleanName = (name,address)=>{

    if(name.includes('/')){
        let splitName = name.indexOf('/');
        let customerName = name.substring(0,splitName-2);
        let newAddress = `${name.substring(splitName-2,name.length)}, ${address}`;
        return [customerName,newAddress.trim()];
    }else{
        return [name,address];
    }

}

const nomineeDetails = (nomineeDetail) => {
    let newNomineeDetails ;
    if(nomineeDetail.includes('-')){
        newNomineeDetails = nomineeDetail.split('-');
        return [newNomineeDetails[0],newNomineeDetails[2],newNomineeDetails[1]];
    }else if(nomineeDetail.includes(',')){
        newNomineeDetails = nomineeDetail.split(',');
        return [newNomineeDetails[0],newNomineeDetails[2],newNomineeDetails[1]];
    }else{
        newNomineeDetails = nomineeDetail.split(' ');
        return [newNomineeDetails[0],newNomineeDetails[2],newNomineeDetails[1]];
    }
}


const getDob = (dob)=>{
    const splitDOB = dob.split('/');
    return `${splitDOB[2]}-${splitDOB[1]}-${splitDOB[0]}`;
}

let sheetData = [['Registered Dealer Email','Risk Start Date','Name of Certificate Holder','DOB','Gender','Mobile','Email','Address','City','State','Pincode','Manufacturing Year','Vehicle Registration No','Vehicle Manufacturer','Model','Variant','Engine No.','Chassis No.','Nominee Name','Nominee Relationship','Nominee Gender','Nominee Age','Plan','Plan Type','New Vehicle','Dealer ID','Timestamp']];


const riskStartDate = "2022-10-24";
const gender = 'Male';
const state = 'Uttar Pradesh';
const dealerID = '184Y3L-ZLT7vcLiFDItIcLa-18phpzEbgBCBDgt_LGCQ';
const timestamp = '2022-10-24 10:45:01';


for(let i=0;i<data.length;i++){    
    let record = data[i];

    let freshName = cleanName(record["Name of Certificate Holder"],record.Address);
    let nomineeDetail = nomineeDetails(record["Nominee Details"]);
    let dob = getDob(record.DOB);


    let newRecord = [record.Email,riskStartDate,freshName[0],dob,gender,record.Mobile,record.Email,freshName[1],record.City,state,record.Pincode,record["Manufacturing Year"],record["Vehicle Registration No."],record["Vehicle Manufacturer"],record.Model,record.Variant,record["Engine No."],record["Chassis No."],nomineeDetail[0],nomineeDetail[1],'Male',nomineeDetail[2],record.PLAN,'CPA + RSA + AHDC + DOC','Yes',dealerID,timestamp];
    
    sheetData.push(newRecord);
}



const wb = xlsx.utils.book_new();
const worksheet = xlsx.utils.aoa_to_sheet(sheetData);
xlsx.utils.book_append_sheet(wb,worksheet,"Today");
xlsx.writeFile(wb,"./master-data.xlsx");