import { BASE_URL } from "@/lib/constants";
import { PDFDocument } from "pdf-lib";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string; id: string[] }> }
) {
  const { year, id: idArray } = await params;
  const id = idArray[0];
  const doc = await PDFDocument.create();

  const imageRaw = await fetch(`${BASE_URL}/${year}/png/${id}`);
  const imageBuffer = await imageRaw.arrayBuffer();
  const imageInPage = await doc.embedPng(imageBuffer);
  const imageDims = imageInPage.scale(0.7);
  const page = doc.addPage();

  page.drawImage(imageInPage, {
    x: page.getWidth() / 2 - imageDims.width / 2,
    y: page.getHeight() / 2 - imageDims.height / 2,
    width: imageDims.width,
    height: imageDims.height,
  });

  const pdf = await doc.save();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename= "kodigo-me-${id}.pdf"`,
      "Cache-Control": `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    },
  });
}
