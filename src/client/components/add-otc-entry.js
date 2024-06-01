import { doc, updateDoc } from "firebase/firestore";


export default async function addOTCEntry(db, season, unit, otcStatus){
    const unitToUpdate = doc(db, season, unit);
    await updateDoc(unitToUpdate, {
    otc: otcStatus
    });
}