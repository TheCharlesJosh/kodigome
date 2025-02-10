import { BASE_URL } from "@/lib/constants";
import { jsPDF } from "jspdf";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string; id: string[] }> }
) {
  const { year, id: idArray } = await params;
  const id = idArray[0];
  const doc = new jsPDF();

  const imageRaw = await fetch(`${BASE_URL}/${year}/${id}`);
  const imageBuffer = await imageRaw.arrayBuffer();
  // const imageB64 = Buffer.from(imageBuffer).toString("base64");
  const imageArray = new Uint8Array(imageBuffer);

  doc.addImage(imageArray, "PNG", 0, 0, 720, 720);
  const pdf = doc.output("arraybuffer");

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
