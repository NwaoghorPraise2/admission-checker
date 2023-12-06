const form = document.querySelector(".getForm-Data");
const section = document.querySelector("section"),
showBtn = document.querySelector(".show-modal"),
closeBtn = document.querySelector(".close-btn");

const modalBox = document.querySelector(".modal-box");

let jambReg;

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const jambNumber = document.getElementById("jambNumber").value;
    console.log(jambNumber);
    
    localStorage.setItem("jamb", jambNumber);
    
    jambReg = localStorage.getItem("jamb");

    loadList();
    
});



const loadList = () => {
    const sheetID = "1-sF5khew1bbYdPcvJ8nHebH5y529Vy_kG51_eyYQ3i0";
    const sheetName = encodeURIComponent("list");
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

    fetch(sheetURL)
    .then((response) => response.text())
    .then((csvText) => handleResponse(csvText));

    function handleResponse(csvText) {
        let sheetObjects = csvToObjects(csvText);
        let obj = sheetObjects.find(o => o.REG_NUMBER === jambReg);

       
        if (obj === undefined || "" ){
            modalBox.innerHTML = `
            <i class="fa-solid fa-ban" style="color:red;"></i>
            <h3>Sorry!!! No admission record found.<span id="name"></span></h3>
            <div class="buttons">
              <button class="close-btn" onclick="hello()">Ok, Close</button>
            </div>
            `;
        } else {
            let name = obj.NAME;
        let course = obj.COURSE;
        let status = obj.AD_STATUS; 
      console.log(name, course, status);

      modalBox.innerHTML = `
      <i class="fa-regular fa-circle-check"></i>
      <h3>Congratulations!!! <span id="name">${name}</span></h3>
      <h3>You have been offered provisional Admission into the UNIVERSITY OF DELTA, AGBOR, DELTA STATE.</h3>
      <h3>Course:<span id="course">${course} </span></h3>
      <h3>Faculty: <span id="status">${status}</span></h3>
      <div class="buttons">
        <button class="close-btn" onclick="hello()">Ok, Close</button>
      </div>
      `;
      
        }

      }

    function csvToObjects(csv) {
        const csvRows = csv.split("\n");
        const propertyNames = csvSplit(csvRows[0]);
        let objects = [];
        for (let i = 1, max = csvRows.length; i < max; i++) {
          let thisObject = {};
          let row = csvSplit(csvRows[i]);
          for (let j = 0, max = row.length; j < max; j++) {
            thisObject[propertyNames[j]] = row[j];
          }
          objects.push(thisObject);
        }
        return objects;
      }
      
      function csvSplit(row) {
        return row.split(",").map((val) => val.substring(1, val.length - 1));
      }

      
} 


showBtn.addEventListener("click", () => section.classList.add("active"));


const hello = ()=> {
    window.location.reload();
}