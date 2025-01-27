import Link from "next/link";

export default function Contents() {
  return (
    <div className="prose prose-indigo mx-4 pt-4 text-gray-800 xl:prose-lg xl:mx-auto">
      <h2 className="max-w-prose text-center text-xl font-semibold uppercase tracking-tight text-indigo-600">
        Privacy Policy
      </h2>
      <p>
        {" "}
        <span className="font-semibold">
          kodigo.me does not store any personal or voting information nor does
          it share any information with anyone.
        </span>{" "}
        You keep full ownership of your data and your kodigo. kodigo.me does not
        store any personal information, nor any information you key in.
        kodigo.me is not affiliated with COMELEC, Vote Pilipinas, any political
        party, or any media institution, nor does it endorse any political
        candidate or agenda. This is not an official ballot nor a valid
        substitute for one.
      </p>
      <p>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to{" "}
        <Link
          href={"mailto:hello@charlesjosh.com"}
          target="_blank"
        >
          contact us
        </Link>
        .
      </p>
      <h2>No Information Collected</h2>
      <p>
        We do not collect any information, nor are we interested in collecting
        them. Generated kodigos are not saved in any database nor are they
        traceable to any person, and so we do not share any information with
        third parties.
      </p>
      <h2>Consent</h2>
      <p>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </p>
    </div>
  );
}
