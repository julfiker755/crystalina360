import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib";
import React from "react";

interface TableProps {
  className?: string;
  headers?: string[];
  children: React.ReactNode;
  pagination?: React.ReactNode;
  paginateStyle?: string;
}

export const CustomTable = ({
  className,
  headers = [],
  children,
  pagination,
  paginateStyle,
}: TableProps) => {
  return (
    <div className={cn("bg-transparent", className)}>
      <Table className=" border-separate border-spacing-y-5 my-0">
        {headers && headers.length > 0 && (
          <TableHeader className="translate-y-3">
            <TableRow className="text-[17px] hover:bg-transparent font-semibold text-center  text-blacks border-2 border-[#F6F6F6]">
              {headers?.map((header, index) => (
                <TableHead key={index}>
                  <h5 className="w-max capitalize font-semibold">{header}</h5>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody className=" [&>tr>td]:border-y [&>tr>td]:first:pl-5 [&>tr>td]:first:border-l [&>tr>td]:first:rounded-l-xl [&>tr>td]:last:rounded-r-xl [&>tr>td]:last:border-r [&>tr>td]:last:w-[180px]">
          {children}
        </TableBody>
      </Table>
      {pagination && <div className="mt-5 md:mt-0">{pagination}</div>}
    </div>
  );
};
