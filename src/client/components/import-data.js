import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, query, where, orderBy  } from "firebase/firestore";

const gmuData = { 
	"units": [
{"unit":1, "bulls":0, "cows":12, "calves":0, "totalHarvest":12, "totalHunters":17, "percSuccess":70, "totalDays":43},
{"unit":2, "bulls":0, "cows":14, "calves":2, "totalHarvest":16, "totalHunters":16, "percSuccess":100, "totalDays":41},
{"unit":201, "bulls":0, "cows":8, "calves":0, "totalHarvest":8, "totalHunters":32, "percSuccess":26, "totalDays":109},
{"unit":3, "bulls":22, "cows":121, "calves":29, "totalHarvest":173, "totalHunters":801, "percSuccess":22, "totalDays":2843},
{"unit":301, "bulls":4, "cows":31, "calves":0, "totalHarvest":36, "totalHunters":376, "percSuccess":9, "totalDays":986},
{"unit":4, "bulls":37, "cows":84, "calves":8, "totalHarvest":130, "totalHunters":388, "percSuccess":33, "totalDays":1362},
{"unit":441, "bulls":4, "cows":49, "calves":11, "totalHarvest":65, "totalHunters":119, "percSuccess":54, "totalDays":379},
{"unit":5, "bulls":0, "cows":23, "calves":0, "totalHarvest":23, "totalHunters":53, "percSuccess":44, "totalDays":121},
{"unit":6, "bulls":2, "cows":31, "calves":0, "totalHarvest":33, "totalHunters":157, "percSuccess":21, "totalDays":563},
{"unit":7, "bulls":0, "cows":5, "calves":0, "totalHarvest":5, "totalHunters":69, "percSuccess":7, "totalDays":238},
{"unit":8, "bulls":15, "cows":0, "calves":0, "totalHarvest":15, "totalHunters":79, "percSuccess":19, "totalDays":281},
{"unit":9, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":12, "percSuccess":45, "totalDays":38},
{"unit":10, "bulls":0, "cows":19, "calves":0, "totalHarvest":19, "totalHunters":69, "percSuccess":28, "totalDays":252},
{"unit":11, "bulls":37, "cows":118, "calves":11, "totalHarvest":166, "totalHunters":735, "percSuccess":23, "totalDays":2524},
{"unit":211, "bulls":51, "cows":74, "calves":22, "totalHarvest":147, "totalHunters":633, "percSuccess":23, "totalDays":1965},
{"unit":12, "bulls":21, "cows":45, "calves":0, "totalHarvest":66, "totalHunters":312, "percSuccess":21, "totalDays":978},
{"unit":13, "bulls":70, "cows":29, "calves":7, "totalHarvest":107, "totalHunters":237, "percSuccess":45, "totalDays":820},
{"unit":131, "bulls":2, "cows":4, "calves":0, "totalHarvest":6, "totalHunters":48, "percSuccess":12, "totalDays":177},
{"unit":231, "bulls":0, "cows":3, "calves":1, "totalHarvest":4, "totalHunters":44, "percSuccess":9, "totalDays":150},
{"unit":14, "bulls":8, "cows":6, "calves":0, "totalHarvest":13, "totalHunters":56, "percSuccess":23, "totalDays":180},
{"unit":214, "bulls":2, "cows":9, "calves":0, "totalHarvest":10, "totalHunters":25, "percSuccess":40, "totalDays":75},
{"unit":15, "bulls":21, "cows":14, "calves":0, "totalHarvest":35, "totalHunters":180, "percSuccess":19, "totalDays":657},
{"unit":16, "bulls":9, "cows":6, "calves":0, "totalHarvest":15, "totalHunters":71, "percSuccess":22, "totalDays":245},
{"unit":161, "bulls":13, "cows":17, "calves":3, "totalHarvest":33, "totalHunters":181, "percSuccess":19, "totalDays":718},
{"unit":17, "bulls":8, "cows":20, "calves":3, "totalHarvest":30, "totalHunters":124, "percSuccess":24, "totalDays":434},
{"unit":171, "bulls":8, "cows":26, "calves":0, "totalHarvest":34, "totalHunters":118, "percSuccess":29, "totalDays":363},
{"unit":18, "bulls":20, "cows":47, "calves":0, "totalHarvest":66, "totalHunters":503, "percSuccess":13, "totalDays":1600},
{"unit":181, "bulls":0, "cows":57, "calves":3, "totalHarvest":60, "totalHunters":237, "percSuccess":25, "totalDays":686},
{"unit":19, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":65, "percSuccess":0, "totalDays":208},
{"unit":191, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":91, "percSuccess":0, "totalDays":308},
{"unit":20, "bulls":13, "cows":4, "calves":0, "totalHarvest":17, "totalHunters":41, "percSuccess":41, "totalDays":143},
{"unit":21, "bulls":4, "cows":23, "calves":4, "totalHarvest":32, "totalHunters":168, "percSuccess":19, "totalDays":526},
{"unit":22, "bulls":21, "cows":22, "calves":2, "totalHarvest":45, "totalHunters":224, "percSuccess":20, "totalDays":729},
{"unit":23, "bulls":30, "cows":22, "calves":0, "totalHarvest":52, "totalHunters":333, "percSuccess":16, "totalDays":1137},
{"unit":24, "bulls":5, "cows":11, "calves":0, "totalHarvest":16, "totalHunters":119, "percSuccess":14, "totalDays":386},
{"unit":25, "bulls":0, "cows":1, "calves":0, "totalHarvest":1, "totalHunters":34, "percSuccess":3, "totalDays":141},
{"unit":26, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":38, "percSuccess":7, "totalDays":163},
{"unit":27, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":59, "percSuccess":5, "totalDays":198},
{"unit":28, "bulls":15, "cows":7, "calves":6, "totalHarvest":29, "totalHunters":401, "percSuccess":7, "totalDays":1286},
{"unit":29, "bulls":3, "cows":2, "calves":0, "totalHarvest":5, "totalHunters":10, "percSuccess":50, "totalDays":23},
{"unit":30, "bulls":11, "cows":4, "calves":0, "totalHarvest":15, "totalHunters":161, "percSuccess":9, "totalDays":546},
{"unit":31, "bulls":34, "cows":12, "calves":0, "totalHarvest":46, "totalHunters":147, "percSuccess":31, "totalDays":445},
{"unit":32, "bulls":0, "cows":7, "calves":3, "totalHarvest":9, "totalHunters":44, "percSuccess":21, "totalDays":148},
{"unit":33, "bulls":7, "cows":17, "calves":0, "totalHarvest":24, "totalHunters":202, "percSuccess":12, "totalDays":721},
{"unit":34, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":30, "percSuccess":9, "totalDays":123},
{"unit":35, "bulls":0, "cows":9, "calves":0, "totalHarvest":9, "totalHunters":33, "percSuccess":26, "totalDays":127},
{"unit":36, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":23, "percSuccess":15, "totalDays":76},
{"unit":361, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":16, "percSuccess":0, "totalDays":56},
{"unit":37, "bulls":2, "cows":26, "calves":0, "totalHarvest":29, "totalHunters":392, "percSuccess":7, "totalDays":1212},
{"unit":371, "bulls":0, "cows":7, "calves":0, "totalHarvest":7, "totalHunters":80, "percSuccess":9, "totalDays":230},
{"unit":38, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":9, "percSuccess":22, "totalDays":37},
{"unit":39, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":15, "percSuccess":14, "totalDays":38},
{"unit":391, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":3, "percSuccess":0, "totalDays":15},
{"unit":40, "bulls":4, "cows":10, "calves":0, "totalHarvest":13, "totalHunters":45, "percSuccess":30, "totalDays":148},
{"unit":41, "bulls":14, "cows":9, "calves":0, "totalHarvest":24, "totalHunters":94, "percSuccess":25, "totalDays":323},
{"unit":411, "bulls":6, "cows":3, "calves":0, "totalHarvest":8, "totalHunters":37, "percSuccess":23, "totalDays":91},
{"unit":42, "bulls":23, "cows":23, "calves":0, "totalHarvest":47, "totalHunters":217, "percSuccess":22, "totalDays":658},
{"unit":421, "bulls":2, "cows":9, "calves":0, "totalHarvest":11, "totalHunters":95, "percSuccess":12, "totalDays":308},
{"unit":43, "bulls":9, "cows":26, "calves":6, "totalHarvest":41, "totalHunters":143, "percSuccess":29, "totalDays":553},
{"unit":44, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":17, "percSuccess":9, "totalDays":47},
{"unit":444, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":37, "percSuccess":9, "totalDays":144},
{"unit":45, "bulls":8, "cows":0, "calves":0, "totalHarvest":8, "totalHunters":30, "percSuccess":27, "totalDays":104},
{"unit":46, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":6, "percSuccess":0, "totalDays":19},
{"unit":461, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":21},
{"unit":47, "bulls":7, "cows":0, "calves":0, "totalHarvest":7, "totalHunters":38, "percSuccess":19, "totalDays":118},
{"unit":471, "bulls":1, "cows":0, "calves":0, "totalHarvest":1, "totalHunters":7, "percSuccess":15, "totalDays":26},
{"unit":48, "bulls":0, "cows":6, "calves":0, "totalHarvest":6, "totalHunters":28, "percSuccess":23, "totalDays":94},
{"unit":481, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":18, "percSuccess":25, "totalDays":65},
{"unit":49, "bulls":3, "cows":35, "calves":6, "totalHarvest":44, "totalHunters":135, "percSuccess":32, "totalDays":501},
{"unit":50, "bulls":4, "cows":11, "calves":9, "totalHarvest":24, "totalHunters":75, "percSuccess":32, "totalDays":258},
{"unit":500, "bulls":6, "cows":0, "calves":0, "totalHarvest":6, "totalHunters":16, "percSuccess":37, "totalDays":69},
{"unit":501, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":31, "percSuccess":17, "totalDays":114},
{"unit":51, "bulls":6, "cows":0, "calves":0, "totalHarvest":6, "totalHunters":19, "percSuccess":30, "totalDays":51},
{"unit":511, "bulls":8, "cows":0, "calves":0, "totalHarvest":8, "totalHunters":93, "percSuccess":9, "totalDays":304},
{"unit":52, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":48, "percSuccess":0, "totalDays":167},
{"unit":521, "bulls":6, "cows":5, "calves":3, "totalHarvest":13, "totalHunters":57, "percSuccess":23, "totalDays":177},
{"unit":53, "bulls":2, "cows":17, "calves":0, "totalHarvest":19, "totalHunters":74, "percSuccess":26, "totalDays":259},
{"unit":54, "bulls":32, "cows":14, "calves":0, "totalHarvest":46, "totalHunters":134, "percSuccess":35, "totalDays":520},
{"unit":55, "bulls":11, "cows":0, "calves":0, "totalHarvest":11, "totalHunters":44, "percSuccess":24, "totalDays":177},
{"unit":551, "bulls":6, "cows":4, "calves":1, "totalHarvest":11, "totalHunters":19, "percSuccess":57, "totalDays":69},
{"unit":56, "bulls":4, "cows":6, "calves":0, "totalHarvest":10, "totalHunters":37, "percSuccess":26, "totalDays":139},
{"unit":561, "bulls":0, "cows":3, "calves":0, "totalHarvest":3, "totalHunters":30, "percSuccess":12, "totalDays":127},
{"unit":57, "bulls":19, "cows":8, "calves":0, "totalHarvest":26, "totalHunters":85, "percSuccess":31, "totalDays":264},
{"unit":58, "bulls":26, "cows":22, "calves":6, "totalHarvest":54, "totalHunters":87, "percSuccess":61, "totalDays":260},
{"unit":581, "bulls":1, "cows":2, "calves":0, "totalHarvest":3, "totalHunters":109, "percSuccess":3, "totalDays":341},
{"unit":59, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":61, "percSuccess":0, "totalDays":153},
{"unit":60, "bulls":10, "cows":10, "calves":0, "totalHarvest":19, "totalHunters":47, "percSuccess":41, "totalDays":168},
{"unit":61, "bulls":17, "cows":79, "calves":7, "totalHarvest":103, "totalHunters":221, "percSuccess":47, "totalDays":799},
{"unit":62, "bulls":11, "cows":25, "calves":7, "totalHarvest":43, "totalHunters":201, "percSuccess":21, "totalDays":746},
{"unit":63, "bulls":8, "cows":8, "calves":0, "totalHarvest":16, "totalHunters":51, "percSuccess":31, "totalDays":184},
{"unit":64, "bulls":2, "cows":17, "calves":3, "totalHarvest":22, "totalHunters":75, "percSuccess":30, "totalDays":214},
{"unit":65, "bulls":14, "cows":58, "calves":10, "totalHarvest":81, "totalHunters":250, "percSuccess":33, "totalDays":795},
{"unit":66, "bulls":10, "cows":38, "calves":4, "totalHarvest":52, "totalHunters":116, "percSuccess":45, "totalDays":409},
{"unit":67, "bulls":4, "cows":23, "calves":3, "totalHarvest":31, "totalHunters":117, "percSuccess":26, "totalDays":460},
{"unit":68, "bulls":22, "cows":0, "calves":0, "totalHarvest":22, "totalHunters":106, "percSuccess":20, "totalDays":354},
{"unit":681, "bulls":5, "cows":2, "calves":2, "totalHarvest":8, "totalHunters":63, "percSuccess":13, "totalDays":221},
{"unit":69, "bulls":6, "cows":0, "calves":0, "totalHarvest":6, "totalHunters":27, "percSuccess":21, "totalDays":60},
{"unit":691, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":2, "percSuccess":0, "totalDays":2},
{"unit":70, "bulls":7, "cows":26, "calves":0, "totalHarvest":33, "totalHunters":110, "percSuccess":30, "totalDays":409},
{"unit":71, "bulls":4, "cows":0, "calves":0, "totalHarvest":4, "totalHunters":35, "percSuccess":10, "totalDays":135},
{"unit":711, "bulls":12, "cows":13, "calves":0, "totalHarvest":25, "totalHunters":90, "percSuccess":28, "totalDays":324},
{"unit":72, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":29},
{"unit":73, "bulls":9, "cows":0, "calves":0, "totalHarvest":9, "totalHunters":12, "percSuccess":71, "totalDays":26},
{"unit":74, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":43, "percSuccess":5, "totalDays":140},
{"unit":741, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":18, "percSuccess":0, "totalDays":67},
{"unit":75, "bulls":7, "cows":3, "calves":0, "totalHarvest":11, "totalHunters":76, "percSuccess":14, "totalDays":303},
{"unit":751, "bulls":2, "cows":3, "calves":0, "totalHarvest":5, "totalHunters":38, "percSuccess":12, "totalDays":193},
{"unit":76, "bulls":0, "cows":43, "calves":8, "totalHarvest":51, "totalHunters":177, "percSuccess":29, "totalDays":586},
{"unit":77, "bulls":14, "cows":5, "calves":0, "totalHarvest":18, "totalHunters":56, "percSuccess":33, "totalDays":182},
{"unit":771, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":28, "percSuccess":0, "totalDays":72},
{"unit":78, "bulls":9, "cows":5, "calves":0, "totalHarvest":14, "totalHunters":57, "percSuccess":25, "totalDays":251},
{"unit":79, "bulls":0, "cows":23, "calves":0, "totalHarvest":23, "totalHunters":107, "percSuccess":22, "totalDays":408},
{"unit":80, "bulls":2, "cows":16, "calves":0, "totalHarvest":18, "totalHunters":61, "percSuccess":29, "totalDays":205},
{"unit":81, "bulls":6, "cows":8, "calves":0, "totalHarvest":14, "totalHunters":73, "percSuccess":20, "totalDays":252},
{"unit":82, "bulls":25, "cows":15, "calves":0, "totalHarvest":40, "totalHunters":140, "percSuccess":29, "totalDays":465},
{"unit":83, "bulls":5, "cows":26, "calves":9, "totalHarvest":40, "totalHunters":114, "percSuccess":35, "totalDays":460},
{"unit":84, "bulls":6, "cows":4, "calves":0, "totalHarvest":10, "totalHunters":36, "percSuccess":28, "totalDays":140},
{"unit":85, "bulls":11, "cows":16, "calves":4, "totalHarvest":31, "totalHunters":137, "percSuccess":22, "totalDays":501},
{"unit":851, "bulls":6, "cows":4, "calves":0, "totalHarvest":10, "totalHunters":13, "percSuccess":76, "totalDays":44},
{"unit":86, "bulls":6, "cows":2, "calves":0, "totalHarvest":8, "totalHunters":57, "percSuccess":15, "totalDays":220},
{"unit":861, "bulls":6, "cows":0, "calves":2, "totalHarvest":8, "totalHunters":21, "percSuccess":39, "totalDays":68},
{"unit":104, "bulls":6, "cows":0, "calves":0, "totalHarvest":6, "totalHunters":6, "percSuccess":100, "totalDays":19},
{"unit":133, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":10, "percSuccess":34, "totalDays":35},
{"unit":134, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":21},
{"unit":140, "bulls":4, "cows":3, "calves":0, "totalHarvest":7, "totalHunters":25, "percSuccess":27, "totalDays":85},
{"unit":141, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":12},
{"unit":142, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":10, "percSuccess":0, "totalDays":28}
    
	]
  }
async function importData(db) {
    try {
        console.log("tru");
        console.log(gmuData.units.length)
        for(var i=0; i<gmuData.units.length; i++){
            var unit = gmuData.units[i];
            console.log(i);
            console.log("unit",unit);
                const docRef = await addDoc(collection(db, "2022-fourth-rifle"), {
                    unit: unit.unit,
                    bulls: unit.bulls,
                    cows: unit.cows,
                    calves: unit.calves,
                    totalHarvest: unit.totalHarvest,
                    totalHunters: unit.totalHunters,
                    percSuccess: unit.percSuccess,
                    totalDays: unit.totalDays
                });
                console.log("Document written with ID: ", docRef.id);
            
        }
    } catch (e) {
        console.error("Error adding document: ", e);
      } 
    //let season = "all-seasons"
    //let querySnapshot = await getDocs(collection(db, season));

}

