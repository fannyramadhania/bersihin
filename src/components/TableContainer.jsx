"use client";

import React, { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons";
const TableContainer = ({
  datas,
  columns,
  globalFilter,
  setGlobalFilter,
  setDataDetail,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    id: false,
  });

  const [columnFilters, setColumnFilters] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleRowClick = (rowId, rowOriginal) => {
    if (selected === rowId) {
      // Jika row yang sama di-click lagi, unselect
      setSelected(null);

      // Hapus hash dari URL tanpa scroll ke atas
      window.history.replaceState(null, "", window.location.pathname);
      // Gulirkan halaman ke atas
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      // Select row baru
      setSelected(rowId);
      setDataDetail(rowOriginal);

      // Set hash ke URL dengan id dari rowOriginal
      const detailUrl = `#detail?id=${rowOriginal.id}`;
      window.location.hash = detailUrl;

      // Scroll ke elemen #detail dengan smooth scroll
      requestAnimationFrame(() => {
        setTimeout(() => {
          const detailElement = document.getElementById("detail");
          if (detailElement) {
            const top =
              detailElement.getBoundingClientRect().top + window.scrollY - 110;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 100);
      });
    }
  };

  const table = useReactTable({
    data: datas || [],
    columns,
    state: {
      globalFilter,
      sorting, // ketika di klik tablenya / sorting manual
      columnFilters, // untuk memfilter tiap kolum tapi belom di terapkan
      columnVisibility,
    },
    //  - SET STATE
    enableRowSelection: true,
    onSortingChange: setSorting, // sorting manual
    OnGlobalFilterChange: setGlobalFilter, // lama
    onColumnFiltersChange: setColumnFilters, // baru
    onColumnVisibilityChange: setColumnVisibility, // baru
    //  -  OPSI LAMA
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //  - OPSI BARU
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  // Mengambil nilai yang dibutuhkan untuk pagination summary
  const pageIndex = table.getState().pagination.pageIndex;
  const totalRows = table.getFilteredRowModel().rows.length;
  const rowsPerPage = table.getState().pagination.pageSize;

  // Menghitung range hasil yang ditampilkan
  const firstResult = totalRows === 0 ? 0 : pageIndex * rowsPerPage + 1;
  const lastResult = Math.min(pageIndex * rowsPerPage + rowsPerPage, totalRows);

  return (
    <>
      <div className="isolate" style={{ zIndex: 999 }}>
        <div className="flex gap-2 justify-between mb-4 mt-2 items-center">
          <div className="text-black  mt-3 ">
            {totalRows === 0 ? (
              "No results"
            ) : (
              <>
                {/* <span className="hidden md:inline">Showing to </span>
                <strong>{firstResult}</strong>-<strong>{lastResult}</strong> of{" "}
                <strong>{totalRows}</strong>{" "}
                <span className="hidden md:inline">result</span> */}
              </>
            )}
          </div>
          {/* <div className="flex gap-2 items-center justify-end md:justify-normal text-black">
            <h3 className="hidden md:inline ">
              Items per page
            </h3>
            <h3 className="md:hidden ">Page</h3>
            <select
              name="show"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              disabled={totalRows === 0}
              className="py-1 dark:bg-boxDark dark:border-none  bg-transparent border border-gray-400 rounded-md"
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}
                  className="dark:text-gray-100 text-sm px-2"
                >
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div> */}
        </div>
        <div className="overflow-x-auto custom-scrollbar ">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 n rounded-t-lg">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`p-4 text-left  text-xs font-medium  text-gray-500    tracking-wider cursor-pointer ${
                        index === 0 ? "rounded-tl-lg rounded-bl-lg " : ""
                      } ${
                        index === headerGroup.headers.length - 1
                          ? "rounded-tr-lg rounded-br-lg"
                          : ""
                      }`}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <UpOutlined className="inline-block ml-1" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <DownOutlined className="inline-block ml-1" />
                        ) : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4 ">
                    Unavailable data
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className=" border-gray-300  text-black  "
                    >
                      {row.getVisibleCells().map((cell) => {
                        const value = cell.getValue();

                        return (
                          <td
                            key={cell.id}
                            className="min-w-0 text-sm font-normal p-4 text-nowrap"
                          >
                            {cell.column.id === "action"
                              ? flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )
                              : value !== null && value !== undefined
                              ? flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )
                              : "-"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="flex justify-end py-2 mt-4 text-black">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="border border-gray-300 disabled:opacity-30"
            >
              <LeftOutlined className="w-7 h-7 " />
            </button>
            <span className="flex items-center gap-1 ">
              <strong>Page</strong>
              <input
                name="page"
                type="number"
                value={
                  datas && datas.length > 0
                    ? table.getState().pagination.pageIndex + 1
                    : table.getState().pagination.pageIndex
                }
                onChange={(e) => {
                  let page = e.target.value ? Number(e.target.value) - 1 : 0;
                  const maxPageIndex = table.getPageCount() - 1;
                  if (page < 0) {
                    page = 0;
                  }
                  if (page > maxPageIndex) {
                    page = maxPageIndex;
                  }
                  table.setPageIndex(page);
                }}
                className=" mx-2 border p-1 rounded w-14 bg-transparent font-bold   text-center"
                min={1}
                max={table.getPageCount()}
                disabled={table.getPageCount() === 0}
              />
            </span>
            <div className="flex gap-1 flex-row">
              <span className="">
                Of {table.getPageCount()}{" "}
              </span>
            </div>
            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="border border-gray-300 disabled:opacity-30"
            >
              <RightOutlined className="w-7 h-7 " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableContainer;
