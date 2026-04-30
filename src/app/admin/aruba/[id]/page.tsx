"use client";
import { useState } from "react";
import {
  FileText,
  User,
  Building2,
  CreditCard,
  Calendar,
  Code2,
  Download,
  Receipt,
  Banknote,
  ArrowRight,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NavTitle from "@/components/reuseable/nav-title";
import { useInvoicesDetailsQuery } from "@/redux/api/admin/invoicesApi";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui";
import Link from "next/link";
import { event_t } from "@/lib";

export default function InvoiceDetailsPage() {
  const [activeTab, setActiveTab] = useState("details");
  const { id } = useParams();
  const { data: invoiceDetails, isLoading } = useInvoicesDetailsQuery(id);
  const invoice = invoiceDetails?.data || {};

  console.log(invoice.events);

  return (
    <div>
      <NavTitle
        title="Aruba Details"
        subTitle="Manage all the aruba of your system from this section"
      />
      {isLoading ? (
        <>
          <div>
            <div className="space-y-3">
              <Skeleton className="w-1/2 h-8 rounded-full" />
              <Skeleton className="w-1/2 h-6 rounded-full" />
              <Skeleton className="w-1/2 h-4 rounded-full" />
            </div>
            <div className="mt-10">
              <Skeleton className="w-1/2 h-[400px] rounded-md" />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 ml-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium uppercase tracking-wider">
                <Receipt className="w-4 h-4" />
                <span>Invoice Management</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                {invoice?.invoice_no || "N/A"}
              </h1>
            </div>
          </div>
          <Tabs
            defaultValue="details"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="flex items-center justify-between my-6">
              <TabsList className="bg-slate-100 p-1 rounded-full">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-white cursor-pointer data-[state=active]:rounded-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="xml"
                  className="data-[state=active]:bg-white cursor-pointer  data-[state=active]:rounded-full"
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  XML Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" key="details">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border overflow-hidden shadow-none">
                  <CardHeader className="bg-white  border-b border-slate-100 pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold text-slate-900">
                        Billing Overview
                      </CardTitle>
                      <Link href={`/admin/events/${invoice?.events?.id}`}>
                        <div className="text-figma-primary underline cursor-pointer flex items-center">
                          Event Details <ArrowRight className="size-4" />
                        </div>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                      {/* Organizer Section */}
                      <div className="p-8 space-y-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                          <Building2 className="w-3.5 h-3.5" />
                          Operator Details
                        </div>
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16 border-2 border-slate-50 shadow-sm">
                            <AvatarImage
                              src={invoice?.organizer?.img || ""}
                              referrerPolicy="no-referrer"
                            />
                            <AvatarFallback>
                              {invoice?.organizer?.name || "A"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-bold text-lg leading-tight">
                              {invoice?.organizer?.name || "N/A"}
                            </h3>
                            <div className="space-y-1 text-sm text-slate-600">
                              <p className="truncate max-w-[200px]">
                                {invoice?.organizer?.email || "N/A"}
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="font-semibold text-slate-400">
                                  VAT:
                                </span>{" "}
                                {invoice?.organizer?.vat || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* User Section */}
                      <div className="p-8 space-y-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                          <User className="w-3.5 h-3.5" />
                          User Details
                        </div>
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16 border-2 border-slate-50 shadow-sm">
                            <AvatarImage
                              src={invoice?.user?.img || ""}
                              referrerPolicy="no-referrer"
                            />
                            <AvatarFallback>
                              {invoice?.user?.name || "A"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-bold text-lg leading-tight">
                              {invoice?.user?.name || "N/A"}
                            </h3>
                            <div className="space-y-1 text-sm text-slate-600">
                              <p className="truncate max-w-[200px]">
                                {invoice?.user?.email || "N/A"}
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="font-semibold text-slate-400">
                                  VAT:
                                </span>{" "}
                                {invoice?.user?.vat || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-slate-100" />

                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Banknote className="w-5 h-5" />
                          Total Amount
                        </div>
                        <p className="font-semibold text-slate-700">
                          {invoice.amount}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Calendar className="w-4 h-4" />
                          Date Created
                        </div>
                        <p className="font-semibold text-slate-700">
                          {invoice.created_at}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <CreditCard className="w-5 h-5" />
                          Auth ID
                        </div>
                        <p className="font-mono text-sm font-semibold text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-100 inline-block">
                          {invoice.auth_id}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="xml" key="xml">
              <div>
                <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold">
                        XML Source
                      </CardTitle>
                      <CardDescription>
                        Electronic invoice format (FPR12)
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const blob = new Blob([invoice.xml_preview], {
                          type: "text/xml",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${invoice.invoice_no}.xml`;
                        a.click();
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download XML
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[600px] w-full bg-[#1e1e1e]">
                      <SyntaxHighlighter
                        language="xml"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: "2rem",
                          fontSize: "13px",
                          lineHeight: "1.6",
                          background: "transparent",
                        }}
                        showLineNumbers
                      >
                        {invoice.xml_preview}
                      </SyntaxHighlighter>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
