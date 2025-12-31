"use client";
import { DeleteBtn, EditBtn } from "@/components/reuseable/btn";
import { FromInput2 } from "@/components/reuseable/form-input2";
import Form from "@/components/reuseable/from";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import Modal from "@/components/reuseable/modal";
import sonner from "@/components/reuseable/sonner";
import { Button, Skeleton } from "@/components/ui";
import useConfirmation from "@/provider/confirmation";
import {
  useDeleteFqaMutation,
  useGetFqaQuery,
  useStoreFqaMutation,
  useUpdateFqaMutation,
} from "@/redux/api/admin/fqaApi";
import { fqa_sc } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { helpers } from "@/lib";
import { Repeat } from "@/components/reuseable/repeat";

export default function FQA() {
  const { confirm } = useConfirmation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [storeOpen, setStoreOpen] = useState<boolean>(false);
  const [isDetails, setIsDetails] = useState<any>({});
  const { data: fqa, isLoading } = useGetFqaQuery({});
  const [deleteFqa, { isLoading: delisLoading }] = useDeleteFqaMutation();
  const [storeFqa, { isLoading: storeLoading }] = useStoreFqaMutation();
  const [updateFqa, { isLoading: updateLoading }] = useUpdateFqaMutation();

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  // edit  question
  const editfrom = useForm({
    resolver: zodResolver(fqa_sc),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    if (isDetails) {
      editfrom.reset({
        question: isDetails.question,
        answer: isDetails.answer,
      });
    }
  }, [isDetails]);

  const editSubmit = async (values: FieldValues) => {
    try {
      const data = helpers.fromData(values);
      const res = await updateFqa({ id: isDetails.id, data }).unwrap();
      if (res?.status) {
        sonner.success(
          "FAQ Updated",
          "FAQ has been updated successfully",
          "bottom-right"
        );
      }
    } finally {
      editfrom.reset();
      setEditOpen(!editOpen);
      setIsDetails({});
    }
  };

  //  == add question ==
  const storefrom = useForm({
    resolver: zodResolver(fqa_sc),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    if (!storeOpen) {
      storefrom.reset();
    }
  }, [storeOpen]);

  const storeSubmit = async (values: FieldValues) => {
    try {
      const data = helpers.fromData(values);
      const res = await storeFqa(data).unwrap();
      if (res?.status) {
        sonner.success(
          "FAQ Added",
          "FAQ has been added successfully",
          "bottom-right"
        );
      }
    } finally {
      setStoreOpen(!storeOpen);
      storefrom.reset();
    }
  };

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete FAQ",
      title: "You are going to delete this FAQ",
      description:
        "After deleting, user's won't be able to find this FAQ on your system",
    });
    if (confirmed) {
      await deleteFqa(id).unwrap();
    }
  };

  return (
    <div>
      <div className="py-5" ref={containerRef}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full">
            {isLoading ? (
              <div className="space-y-4">
                <Repeat count={7}>
                  <div className="flex items-center space-x-4 mr-4">
                    <Skeleton className="w-full h-11 rounded-md" />
                    <Skeleton className="h-11 w-12 rounded-md" />
                    <Skeleton className="h-11 w-12 rounded-md" />
                  </div>
                </Repeat>
              </div>
            ) : (
              fqa?.data?.map((item: any, index: any) => (
                <div key={index} className="flex">
                  <div className="py-2.5 px-5 mb-4 bg-white rounded-xl border cursor-pointer w-full">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h4 className="text-base font-medium text-[#1B1B1B]">
                        {item.question}
                      </h4>
                      <span>
                        {activeAccordion === index ? (
                          <ChevronUp
                            size={27}
                            className="text-primary rounded-full p-1"
                          />
                        ) : (
                          <ChevronDown
                            size={27}
                            className="text-primary rounded-full p-1"
                          />
                        )}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        activeAccordion === index ? "max-h-full" : "max-h-0"
                      }`}
                      style={{
                        maxHeight: activeAccordion === index ? "500px" : "0px",
                      }}
                    >
                      <p className="text-sm lg:text-base mt-1">{item.answer}</p>
                    </div>
                  </div>
                  <div className="ml-2 w-32 flex gap-2">
                    <EditBtn
                      onClick={() => {
                        setEditOpen(!editOpen);
                        setIsDetails(item);
                      }}
                      className="rounded-xl bg-[#E4FFE7] size-11"
                    />
                    <DeleteBtn
                      onClick={() => handleDelete(item?.id)}
                      disabled={delisLoading}
                      className="rounded-xl bg-[#FFEEEE] size-11"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Button
          onClick={() => setStoreOpen(!storeOpen)}
          variant="primary"
          size="lg"
          className="rounded-full mt-7"
        >
          <Plus className="text-white size-5" />
          Add More
        </Button>
      </div>
      {/* ==============  added question ============= */}
      <Modal
        open={storeOpen}
        setIsOpen={setStoreOpen}
        title="Add FAQ"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form
          from={storefrom}
          onSubmit={storeSubmit}
          className="space-y-6 pt-4"
        >
          <FromInput2
            label="Question"
            name="question"
            placeholder="Enter your Question"
            className="h-11 rounded-xl"
          />
          <FromTextarea2
            label="Answer"
            name="answer"
            placeholder="Enter your Answer"
            className="min-h-44 rounded-xl"
            stylelabel="bg-white"
          />
          <Button
            disabled={storeLoading}
            variant="primary"
            className="rounded-full w-full"
            size="lg"
          >
            Add
          </Button>
        </Form>
      </Modal>
      {/* ============ edit question ============= */}
      <Modal
        open={editOpen}
        setIsOpen={setEditOpen}
        title="Edit FAQ"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form from={editfrom} onSubmit={editSubmit} className="space-y-6 pt-4">
          <FromInput2
            label="Question"
            name="question"
            placeholder="Enter your Question"
            className="h-11 rounded-xl"
          />
          <FromTextarea2
            label="Answer"
            name="answer"
            placeholder="Enter your Answer"
            className="min-h-44 rounded-xl"
            stylelabel="bg-white"
          />
          <Button
            variant="primary"
            disabled={updateLoading}
            className="rounded-full w-full"
            size="lg"
          >
            Save Changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
