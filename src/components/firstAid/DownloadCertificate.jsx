import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const DownloadCertificate = async (student) => {
  try {
    // Load PDF template
    const existingPdfBytes = await fetch("/templete/FIRST_AID.pdf").then(
      (res) => res.arrayBuffer(),
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const [firstPage] = pdfDoc.getPages();

    const { width, height } = firstPage.getSize();

    // Fonts
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    const textStyle = {
      font,
      color: rgb(0, 0, 0),
    };

    // Center helper
    const getCenteredX = (text, size, selectedFont = font) => {
      const safeText = String(text || "");

      const textWidth = selectedFont.widthOfTextAtSize(safeText, size);

      return (width - textWidth) / 2;
    };
    
    // FIX: wrapText function (MISSING BEFORE)
    const wrapText = (text, font, size, maxWidth) => {
  if (!text || typeof text !== "string") return [];

  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (let word of words) {
    const testLine = line ? line + " " + word : word;

    const lineWidth = font.widthOfTextAtSize(testLine, size);

    if (lineWidth > maxWidth) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) lines.push(line);

  return lines;
};

    // Title Case Name
    const studentName = student.studentName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // ========================
    // NAME (CENTER) - DO NOT CHANGE
    // ========================
    const nameFontSize = 25;

    firstPage.drawText(studentName, {
      x: getCenteredX(studentName, nameFontSize),
      y: height - 242,
      size: nameFontSize,
      ...textStyle,
    });

    // ========================
    // COURSE TITLE (CENTER)
    // ========================
    const courseTitleFontSize = 25;

    const courseTitle = student.courseTitle;

    firstPage.drawText(courseTitle, {
      x: getCenteredX(courseTitle, courseTitleFontSize),
      y: height - 158,
      size: courseTitleFontSize,
      ...textStyle,
    });

    // ========================
    // DESCRIPTION (WRAP + CENTER + ITALIC)
    // ========================
   const description =
  typeof student.certificateDescription === "string"
    ? student.certificateDescription
    : "";

    const descFontSize = 16;

    const maxWidth = width * 0.75;

    const lines = wrapText(description, italicFont, descFontSize, maxWidth);

    const startY = height - 270;

    lines.forEach((line, index) => {
      const textWidth = italicFont.widthOfTextAtSize(line, descFontSize);

      const x = (width - textWidth) / 2;

      firstPage.drawText(line, {
        x,
        y: startY - index * 24,
        size: descFontSize,
        font: italicFont,
        color: rgb(0, 0, 0),
      });
    });

    // ========================
    // COMPLETION DATE (CENTER)
    // ========================
    const formattedDate = new Date(student.completionDate).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );

    const dateFontSize = 14;

    firstPage.drawText(formattedDate, {
      x: getCenteredX(formattedDate, dateFontSize),
      y: height - 394,
      size: dateFontSize,
      ...textStyle,
    });

    // Save PDF
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${student.studentName
  .replace(/\s+/g, "-")
  .toLowerCase()}-certificate.pdf`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
    alert("Failed to generate certificate");
  }
};

export default DownloadCertificate;
