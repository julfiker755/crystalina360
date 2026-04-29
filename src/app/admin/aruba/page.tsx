"use client"
import Avatars from '@/components/reuseable/avater';
import { PreviewBtn } from '@/components/reuseable/btn';
import { CustomTable } from '@/components/reuseable/custom-table';
import NavTitle from '@/components/reuseable/nav-title'
import { Pagination } from '@/components/reuseable/pagination';
import SearchBox from '@/components/reuseable/search-box';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { TableCell, TableRow } from '@/components/ui';
import { useGlobalState } from '@/hooks';
import { helpers } from '@/lib';
import { useGetInvoicesQuery } from '@/redux/api/admin/invoicesApi';
import Link from 'next/link';
import React from 'react'

const intState: any = {
    page: 1,
    isPreview: false,
    search: "",
    details: {},
};

export default function Aruba() {
    const [global, updateGlobal] = useGlobalState(intState);
    const headers = ["Name", "Event", "Invoice No", "Amount ", "Created At", "Action"];

    const { data: invoices, isLoading } = useGetInvoicesQuery({
        page: global?.page,
        search: global?.search,
    })

    return (
        <div>
            <NavTitle
                title="Aruba"
                subTitle="Manage all the aruba of your system from this section"
            />
            <SearchBox onChange={(v: any) => updateGlobal("search", v)} />
            <CustomTable
                headers={headers}
                pagination={
                    invoices?.meta?.total > 10 && (
                        <ul className="flex items-center flex-wrap justify-between py-3">
                            <li className="flex">
                                Total:
                                <sup className="font-medium text-2xl relative -top-3 px-2 ">
                                    {invoices?.meta?.total}
                                </sup>
                                invoice
                            </li>
                            <li>
                                <Pagination
                                    onPageChange={(v: any) => updateGlobal("page", v)}
                                    {...invoices?.meta}
                                />
                            </li>
                        </ul>
                    )
                }
            >
                {isLoading ? (
                    <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
                ) : invoices?.data?.length > 0 ? (
                    invoices?.data?.map((item: any, index: any) => (
                        <TableRow key={index} className="border">
                            <TableCell className="relative">
                                <div className="flex items-center gap-3">
                                    <Avatars
                                        src={item.user_img || "/avater.png"}
                                        fallback={item.user}
                                        alt="profile"
                                        fallbackStyle="aStyle"
                                    />
                                    <span>{item.user}</span>
                                </div>
                            </TableCell>

                            <TableCell>
                                <h5 className='w-[140px] truncate'>{item.event}</h5>
                            </TableCell>
                            <TableCell>
                                <h5>{item.invoice_no || ""}</h5>
                            </TableCell>
                            <TableCell>
                                {" "}
                                <h5 className="ml-4">{item.amount || 0}</h5>
                            </TableCell>
                            <TableCell>
                                {" "}
                                <h5 >{helpers.formatDate(item.created_at) || ""}</h5>
                            </TableCell>
                            <TableCell>
                                <ul className="flex gap-2">
                                    <li>
                                        <Link href={`/admin/aruba/${item.id}`}>
                                            <PreviewBtn
                                            />
                                        </Link>
                                    </li>

                                </ul>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableNoItem
                        colSpan={headers?.length}
                        title="No invoices are available at the moment"
                        tdStyle="!bg-background"
                    />
                )}
            </CustomTable>
        </div>
    )
}
