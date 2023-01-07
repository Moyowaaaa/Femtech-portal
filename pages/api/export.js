import excelJS from "exceljs";

function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: `Method ${req.method} not allowed`,
    });
  }

  const { data, headers, title, fileName } = req.body;

  if (!data || !headers || !title || fileName) {
    return res.status(400).json({
      status: "error",
      message: "data, headers, title and fileName are all required!",
    });
  }

  if (!Array.isArray(data) || !Array.isArray(headers)) {
    return res.status(400).json({
      status: "error",
      message:
        "data and headers must be an array. headers must have a header field key to serve as a title and a key field key to access the data item",
    });
  }

  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet(title); // New Worksheet

  worksheet.columns = headers.map((header) => ({
    header: header.header,
    key: header.key,
    width: 20,
  }));

  worksheet.addRows(data);

  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${
      fileName || new Date().toLocaleDateString("en-Ca")
    }.xlsx"`
  );

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
}

export default handler;
