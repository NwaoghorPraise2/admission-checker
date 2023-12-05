const getSheetData = ({sheetID, sheetName, query, callback}) => {
    const origin = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
    const url = `${origin}$sheet=${encodeURIComponent(sheetName)}&tq=${encodeURIComponent(query)}`


const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.text();
    // console.log(data);
    const dataNow = callback(responseToObject(data));
}

fetchData();

const responseToObject = (data) =>  {
    const jsData = JSON.parse(data.substring(47).slice(0, -2));
    // console.log(jsData);

    let formatData = [];
    const columns = jsData.table.cols;
    const rows = jsData.table.rows;

    let rowObject;
    let cellData;
    let propName;
    for( let r = 0, rowMax = rows.length; r < rowMax; r++) {
        rowObject = {};
        for(let c = 0, colMax = columns.length; c < colMax; c++) {
            cellData = rows[r]["c"][c];
            propName = columns[c].label;
            if (cellData === null) {
                rowObject[propName] = "";
            }else if (
                typeof cellData["v"] === "string" && cellData["v"].startsWith("Date")
            ) {
                rowObject[propName] = new Date(cellData["f"]);
            } else {
                rowObject[propName] = cellData["v"];
            }
        }

        formatData.push(rowObject);
    }

    return formatData;

    }

}

getSheetData();