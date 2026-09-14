export async function generateCertificatePdf(node: HTMLElement, filename: string): Promise<void> {
  const html2canvas = (await import('html2canvas-pro')).default;
  const jsPDF = (await import('jspdf')).jsPDF;

  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false,
    useCORS: true,
    allowTaint: true,
  });

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const doc = new jsPDF({
    orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();

  let heightLeft = imgHeight;
  let position = 0;

  const imgData = canvas.toDataURL('image/png');

  while (heightLeft >= 0) {
    doc.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
    position -= pageHeight;
  }

  doc.save(filename);
}
