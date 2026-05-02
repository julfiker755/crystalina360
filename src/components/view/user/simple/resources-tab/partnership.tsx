"use client";
import { Button, Input, Label } from "@/components/ui";
import { useEffect, useState } from "react";
import { AppAlert } from "../../reuse";
import { helpers } from "@/lib";
import sonner from "@/components/reuseable/sonner";
import { useQuestionSendMutation } from "@/redux/api/user/contactApi";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Partnership({ action }: { action?: string }) {
  const t = useTranslations("user.resources");

  const [questionSend, { isLoading }] = useQuestionSendMutation();

  const intQuestion = () => [
    { question: t("partner_text.email"), answer: "", type: "email", placeholder: t("partner_text.email_placeholder") },
    { question: t("partner_text.question1"), answer: "", type: "text", placeholder: t("partner_text.placeholder") },
    { question: t("partner_text.question2"), answer: "", type: "text", placeholder: t("partner_text.placeholder") },
    { question: t("partner_text.question3"), answer: "", type: "text", placeholder: t("partner_text.placeholder") },
    { question: t("partner_text.question4"), answer: "", type: "text", placeholder: t("partner_text.placeholder") },
  ];

  const [question, setQuestion] = useState(intQuestion());

  useEffect(() => {
    setQuestion(intQuestion());
  }, [t]);



  const handleQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const mainData = question.map((item => ({
      question: item.question,
      answer: item.answer
    })))
    const data = helpers.fromData({
      answer: mainData,
    });
    console.log(mainData)
    try {
      await questionSend(data).unwrap();
      setQuestion(intQuestion);
      sonner.success(
        `${t("partner_text.success.title")}`,
        `${t("partner_text.success.text")}`,
        "bottom-right",
      );
    } catch (err) {
      console.log(err);
    }
    // setQuestion(intQuestion)
  };

  const handleAnswerChange = (index: number, value: string) => {
    setQuestion((prev) =>
      prev.map((item, i) => (i === index ? { ...item, answer: value } : item)),
    );
  };

  return (
    <div>
      <div className="bg-[url('/partnership.jpg')] flex flex-col items-center justify-center rounded-lg bg-cover bg-no-repeat bg-center h-[500px] w-full relative">
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "18px",
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%)",
          }}
        ></div>
        <div className="space-y-4 z-10">
          <h1 className="text-white text-xl lg:text-4xl text-center">
            {t("partner_text.title")}
          </h1>
          <p className="text-white text-center max-w-2xl">
            {t("partner_text.text")}
          </p>
          <div className="flex justify-center">
            {action === "partnership" ? (
              <Link href="/#contact-us">
                <Button
                  size="lg"
                  className="bg-white m-auto text-primary rounded-md"
                >
                  {t("partner_text.contact_us")}
                </Button>
              </Link>
            ) : (
              <Link href={"/contact-us"}>
                <Button
                  size="lg"
                  className="bg-white m-auto text-primary rounded-md"
                >
                  {t("partner_text.contact_us")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleQuestion} className="space-y-6 py-10">
        {question.map((item, index) => (
          <div className="space-y-2" key={index}>
            <Label className="text-lg">{item.question}</Label>
            <Input
              placeholder={item.placeholder}
              className="border-none bg-[#F4F4F4]"
              value={item.answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required={true}
              type={item.type}
            />
          </div>
        ))}
        <div className="flex justify-center mt-10">
          <Button disabled={isLoading} className="lg:min-w-md">
            {t("partner_text.submit_answer")}
          </Button>
        </div>
      </form>

      <AppAlert />
    </div>
  );
}
