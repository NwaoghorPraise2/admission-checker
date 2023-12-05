const form = document.querySelector(".getForm-Data");
const section = document.querySelector("section"),
showBtn = document.querySelector(".show-modal"),
closeBtn = document.querySelector(".close-btn");

const modalBox = document.querySelector(".modal-box");

let jambNumber;

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    jambNumber = document.getElementById("jambNumber").value;

    // console.log(jambNumber);
    // if(jambNumber == "" ) {
    //     alert("Filled it");
    // }

    localStorage.setItem("jamb", jambNumber);

    let jambe = localStorage.getItem("jamb");
    const query = `SELECT * WHERE B = ${jambe}`;
    
        const finalRes = (data) => {
            console.log( data[0]);
            const datum = data[0];
         
            if (datum === undefined ){
                modalBox.innerHTML = `
                <i class="fa-solid fa-ban"></i>
                <h3>Sorry!!! No admission record found.<span id="name"></span></h3>
                <div class="buttons">
                  <button class="close-btn" onclick="hello()">Ok, Close</button>
                </div>
                `;
          
                console.log('Hiiiiiiiiiiiii')
            } else {
          console.log(datum);
           document.getElementById("name").innerHTML = data[0].NAME;
           document.getElementById("course").innerHTML = data[0].COURSE;
          document.getElementById("status").innerHTML = data[0].AD_STATUS;

          
            }

        };
    
        getSheetData ({
            sheetID: "1-sF5khew1bbYdPcvJ8nHebH5y529Vy_kG51_eyYQ3i0",
            sheetName:"list", 
            query: query,
            callback: finalRes,
        });
        modalBox.innerHTML = `
        <i class="fa-regular fa-circle-check"></i>
        <h3>Congratulations!!! <span id="name"></span></h3>
        <h3>You have been offered provisional Admission into the University OF DELTA, AGBOR, DELTA STATE.</h3>
        <h3>Course: <span id="course"></span></h3>
        <h3>Faculty: <span id="status"></span></h3>
        <div class="buttons">
          <button class="close-btn" onclick="hello()">Ok, Close</button>
        </div>
        `;
                    
        // console.log(datum)

        // modalFun();
 
});

showBtn.addEventListener("click", () => section.classList.add("active"));

const modalFun = () => {

    

}




const hello = ()=> {
    window.location.reload();
}


















overlay.addEventListener("click", () =>
section.classList.remove("active")
);






// window.addEventListener("DOMContentLoaded", 

// const sheetID = "1-sF5khew1bbYdPcvJ8nHebH5y529Vy_kG51_eyYQ3i0";
// const sheetName = encodeURIComponent("list");
// const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;


// const fetchData = async () => {
//     const res = await fetch(sheetURL);
//     const resType = await res.text();
//     const data = CSVToJSON(resType);
//     console.log(data);
// }

// fetchData();

// const CSVToJSON = (data, delimiter = ',') => {
//     const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
//     return data
//       .slice(data.indexOf('\n') + 1)
//       .split('\n')
//       .map(v => {
//         const values = v.split(delimiter);
//         return titles.reduce(
//           (obj, title, index) => ((obj[title] = values[index]), obj),
//           {}
//         );
//       });
//   };