
import { collection, addDoc, getDocs, query, where, orderBy, doc, setDoc } from "firebase/firestore";
import ResultsDataTable from "./add-otc-entry.js";

const otcGmu ={
    gmuPublicOnly: [6, 15, 16, 17, 18, 21, 22, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 47, 52, 53, 54, 55, 59, 60, 62, 63, 64, 65, 68, 70, 71, 72, 73, 74, 75, 77, 78, 80, 81, 82],
    gmuBoth: [85, 86, 133, 134, 140, 141, 142, 161, 171, 181, 361, 371, 411, 421, 431, 444, 471, 511, 521, 551, 581, 591, 681, 691, 711, 741, 751, 771, 851],
    gmuPrivateOnly: [3, 4, 5, 11, 12, 13, 14, 23, 24, 131, 211, 214, 231, 301, 441]

}
const table = "2022-all-rifle" 
export default async function addOTC(db) {
    //let table = "2022-second-rifle"
    console.log(table);
    try {
        let q = query(collection(db, table));
        const querySnapshot = await getDocs(q);
        //console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let dataCall = doc.data();
          let entryID = doc.id;
          console.log("entry",entryID)
          let unit = dataCall["unit"];
          let otcStatus = "Draw Only";
          //console.log("dataCall",dataCall);
          //console.log(dataCall.totalHarvest,harvestInt);
        
            if(otcGmu.gmuBoth.includes(unit)){
                otcStatus = "Both"
            }
            if(otcGmu.gmuPublicOnly.includes(unit)){
                otcStatus = "Public"
            }
            if(otcGmu.gmuPrivateOnly.includes(unit)){
                otcStatus = "Private"
            }
            //dataCall["otc"] = otcStatus;
            //const unitRef = doc(db, table, entryID);
            //setDoc(unitRef, { otc: otcStatus }, { merge: true });
            //await setDoc(doc(db, table, entryID), docData);
            ResultsDataTable(db, table, entryID, otcStatus)
            //db.collection("users").document(document.documentID).setData([ "isolationDate": "1" ], merge: true)

        });
    } catch (e) {
        console.error("Error adding document: ", e);
      } 
    //let season = "all-seasons"
    //let querySnapshot = await getDocs(collection(db, season));
    //addEntry(db, dataCall, table)
}



