const { buildPathHtml, buildPathPdf } = require('./buildPaths');
const fs = require('fs');
const puppeteer = require('puppeteer');

/**
 * Take an object which has the following model
 * @param {Object} item 
 * @model
 * {
 *   "serial_no": `Number`,
 *   "name": `String`,
 *   "phone_number": `String`,
 *   "email": `String`,
 *   "hobbies": `String`
 * }
 * 
 * @returns {String}
 */

 const createRow = (item) => `
 <tr>
   <td>${item.serial_no}</td>
   <td>${item.name}</td>
   <td>${item.phone_number}</td>
   <td>${item.email}</td>
   <td>${item.hobbies}</td>
 </tr>`;

 /**
 * @description Generates an `html` table with all the table rows
 * @param {String} rows
 * @returns {String}
 */
const createTable = (rows) => `
<table>
    <tr>
        <th>ID</td>
        <th>Name</td>
        <th>Phone Number</td>
        <th>Email</td>
        <th>Hobbies</td>
    </tr>
${rows}
</table>
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (table) => `
<html>
<head>
    <style>
    table {
        width: 100%;
    }
    tr {
        text-align: left;
        border: 1px solid black;
    }
    th, td {
        padding: 15px;
    }
    tr:nth-child(odd) {
        background: #ccc
    }
    tr:nth-child(even) {
        background: #FFF
    }
    .no-content {
        background-color: red;
    }
    </style>
</head>
<body>
    ${table}
</body>
</html>
`;

/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath 
 * @returns {Boolean}
 */

 const doesFileExist = (filePath) => {
    try {
        fs.statSync(filePath); // get information of the specified file path.
        return true;
    } catch (error) {
        return false;
    }
};

class createFile {
    async createHtmlTable (data) {  
        try {
            /* Check if the file for `html` build exists in system or not */
            if (doesFileExist(buildPathHtml)) {
                //console.log('Deleting old build file');
                /* If the file exists delete the file from system */
                fs.unlinkSync(buildPathHtml);
            }
            /* generate rows */
            const rows = data.map(createRow).join('');
            /* generate table */
            const table = createTable(rows);
            /* generate html */
            const html = createHtml(table);
            /* write the generated html to file */
            fs.writeFileSync(buildPathHtml, html);
            //console.log('Succesfully created an HTML table');
            return { status: 200, msg: 'Succesfully created an HTML table'};
        } catch (error) {
            console.log('Error generating table', error);
            return { status: 401, msg: error};
        }
    }
    async createPdf () {
        console.log('Starting: Generating PDF Process, Kindly wait ..');
        /** Launch a headleass browser */
        const browser = await puppeteer.launch();
        /* 1- Ccreate a newPage() object. It is created in default browser context. */
        const page = await browser.newPage();
        /* 2- Will open our generated `.html` file in the new Page instance. */
        await page.goto(buildPathHtml, { waitUntil: 'networkidle0' });
        /* 3- Take a snapshot of the PDF */
        const pdf = await page.pdf({
            format: 'A4',
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });
        /* 4- Cleanup: close browser. */
        await browser.close();
        console.log('Ending: Generating PDF Process');

        try {
            fs.writeFileSync(buildPathPdf, pdf);
            console.log('Succesfully created an PDF table');
            return { status: 200, msg: 'Succesfully created PDF'};
        } catch (error) {
            console.log('Error generating PDF', error);
            return { status: 401, msg: error};
        }
    }
}

module.exports = new createFile()
