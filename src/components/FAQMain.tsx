// import { FieldValues, UseFormReset } from 'react-hook-form'
import {
  // BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
} from "react";
import MarkdownWrapper from "./MarkdownWrapper";
import { UpperHeader } from "./UpperHeader";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
// import { ChevronDownIcon } from '@heroicons/react/outline'
import clsx from "clsx";

// const Main = ({
//   initialValues = {},
// }: {
//   initialValues?: CandidateGroupValues
// }) => {
const faqs = [
  {
    question: "Is this a survey? Will my votes get tallied?",
    answer:
      "No, this is not a survey. Intentionally, there is no way kodigo.me can collect or tally votes or any personal information from its users.",
  },
  {
    question: "Where did the list of candidates comes from?",
    answer:
      "COMELEC released their [Ballot Templates](https://comelec.gov.ph/?r=2022NLE/BallotFaceTemplates) last January 2022. kodigo.me presents the names of all candidates, their positions, and their political affiliations as is on the ballot template.",
  },
  {
    question: "What do I need to know during Election Day?",
    answer: `Before Election Day, make sure to know your precinct number and location. You may find your polling precinct [here](https://voterverifier.comelec.gov.ph/voter_precinct).
      
During Election Day, you may refer to the official guide from COMELEC [here](https://comelec.gov.ph/?r=2022NLE/VoterEducation/StepsinVoting). Voting time starts at 6:00 AM and ends at 7:00 PM.
      `,
  },
  {
    question: "Why did you create this?",
    answer: `I got frustrated when I didn't know who do I vote for my local candidates. With the [ballot templates publicly available](https://comelec.gov.ph/?r=2022NLE/BallotFaceTemplates) and GMA releasing their [own kodigo generator](https://www.gmanetwork.com/news/eleksyon2022/mykodigo/), I thought that there should be a better way to be prepared before Election Day.

After a series of usability tests, the benefits can be summarized to the following:
1. I want to see who's running for what position so that I can do some research on who they are beyond name-recall and campaigns.
2. I want to create a kodigo easily so that it's easier to vote on Election Day.
3. I want to finish voting quickly by making sure I know already who I'm voting for, given that we're still in a pandemic.`,
  },
  {
    question: "Why are the headers colored blue and green?",
    answer: `As much as possible, I wanted to make kodigo.me look like (but not too similar to) the actual ballot so that it's easier to remember where to shade. Having said that, the ballot's headers are also colored blue and green.

kodigo.me will never endorse any political candidate or party.`,
  },
  {
    question: "Can I create a ballot even if I leave some positions empty?",
    answer: `Yes! Much like you can abstain or [undervote](https://ballotpedia.org/Undervote) in the elections, you can also leave parts of your kodigo blank. This will also allow you to revise your kodigo sometime after.`,
  },
  {
    question: `What's the QR Code for? What's the kodigo.me link for?`,
    answer: `It points to a link where you can see your generated kodigo, and have the option to edit it again. Note that if you modify your kodigo, you have to save again and create a new link.`,
  },
  {
    question:
      "I have some feedback/I want to reach out. How can I contact the owner of the site?",
    answer: `You may send me a message at kodigo.me's [Facebook Page](https://www.facebook.com/kodigomeph/), or email me [here](mailto:hello@charlesjosh.com).`,
  },
  // More questions...
];

const Main = ({
  setMainLogoVisible,
  sharePage = false,
}: {
  setMainLogoVisible: Dispatch<SetStateAction<boolean>>;
  sharePage?: boolean;
}) => {
  function handleVisibility(inView: boolean) {
    setMainLogoVisible(inView);
  }
  return (
    <>
      <UpperHeader
        handleVisibility={handleVisibility}
        sharePage={sharePage}
      />
      <div className="mx-4 xl:mx-8">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
            <h2 className="max-w-prose text-center text-xl font-semibold uppercase tracking-tight text-indigo-600">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <Disclosure
                  as="div"
                  key={faq.question}
                  className="pt-6"
                >
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-400">
                          <span className="font-bold text-gray-900">
                            {faq.question}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <HiChevronDown
                              className={clsx(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel
                        as="dd"
                        className="prose prose-indigo mt-2 pr-12"
                      >
                        <MarkdownWrapper>{faq.answer}</MarkdownWrapper>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
