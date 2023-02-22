import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type Column = {
  name: string;
};

function TableFlex({ columns, rows }: { columns: Column[]; rows: any[][] }) {
  const columnData: any[][] = [];
  for (let i = 0; i < columns.length; i++) {
    columnData.push([]);
  }

  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      columnData[i].push(row[i]);
    }
  }

  return (
    <div className="flex flex-row border border-gray-300 rounded-lg overflow-x-auto">
      {columns.map((column, columnIndex) => {
        return (
          <div
            key={columnIndex}
            className={twMerge(
              "flex flex-col divide-y border-gray-300",
              columnIndex === 0 && "flex-1"
            )}
          >
            <div className="text-sm text-gray-500 px-6 py-3">{column.name}</div>
            {columnData[columnIndex].map((row, rowIndex) => {
              return (
                // NOTE: truncate here cannot do anything.
                <div key={rowIndex} className="px-6 py-3 truncate">
                  {row}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function TableGrid({ columns, rows }: { columns: Column[]; rows: any[][] }) {
  const normal = (
    <div
      className="hidden md:grid border border-gray-300 rounded-lg divide-y overflow-x-auto"
      style={{
        gridTemplateColumns: "auto min-content min-content",
      }}
    >
      {columns.map((column) => {
        // border-none fixes border-top appearing on all-but-first cells in the first row.
        return (
          <div
            key={column.name}
            className="text-sm text-gray-500 px-6 py-3 border-none"
          >
            {column.name}
          </div>
        );
      })}
      {rows.map((row) => {
        return row.map((cell, i) => {
          return (
            <div key={i} className="px-6 py-3 truncate">
              {cell}
            </div>
          );
        });
      })}
    </div>
  );

  const mobile = (
    <div className="flex flex-col md:hidden gap-4">
      {rows.map((row, rowIndex) => {
        return (
          <div
            key={rowIndex}
            className="grid border border-gray-300 rounded-lg divide-y overflow-x-auto"
            style={{
              gridTemplateColumns: "min-content auto",
            }}
          >
            {row.map((cell, cellIndex) => {
              return (
                <Fragment key={cellIndex}>
                  <div className="text-sm text-gray-500 flex items-center px-6 py-3">
                    {columns[cellIndex].name}
                  </div>
                  <div
                    className={twMerge(
                      "px-6 py-3",
                      cellIndex === 0 && "border-none"
                    )}
                  >
                    {cell}
                  </div>
                </Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {normal}
      {mobile}
    </>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold text-gray-900">{children}</h1>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-500 text-sm">{children}</p>;
}

export default function App() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Description>
        This example is responsive. Please play with the width of your browser
        window!
      </Description>
      <Header>Flex table</Header>
      <Description>
        I tried initially to use flexbox, but this example shows limitations:
        columns are not aware of each other (from the layout engine
        perspective), so truncation is impossible.
      </Description>
      <TableFlex
        columns={[{ name: "Commit" }, { name: "Platform" }, { name: "Author" }]}
        rows={[
          ["abc", "iOS", "Tomek"],
          [
            "TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtLCBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpIHV0IGFsaXF1aXAgZXggZWEgY29tbW9kbyBjb25zZXF1YXQuIER1aXMgYXV0ZSBpcnVyZSBkb2xvciBpbiByZXByZWhlbmRlcml0IGluIHZvbHVwdGF0ZSB2ZWxpdCBlc3NlIGNpbGx1bSBkb2xvcmUgZXUgZnVnaWF0IG51bGxhIHBhcmlhdHVyLiBFeGNlcHRldXIgc2ludCBvY2NhZWNhdCBjdXBpZGF0YXQgbm9uIHByb2lkZW50LCBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdCBhbmltIGlkIGVzdCBsYWJvcnVtLg",
            "iOS",
            "Simek",
          ],
          ["ghi", "iOS", "Juwan"],
        ]}
      />
      <Header>Grid table</Header>
      <Description>
        Here on the other hand, truncation works well. Please keep in mind that
        I implemented mobile view only for this one, so comparison is slightly
        unfair (although I don't think we can really proceed with the flex
        variant).
      </Description>
      <TableGrid
        columns={[{ name: "Commit" }, { name: "Platform" }, { name: "Author" }]}
        rows={[
          ["abc", "iOS", "Tomek"],
          [
            "TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdCwgc2VkIGRvIGVpdXNtb2QgdGVtcG9yIGluY2lkaWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtLCBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpIHV0IGFsaXF1aXAgZXggZWEgY29tbW9kbyBjb25zZXF1YXQuIER1aXMgYXV0ZSBpcnVyZSBkb2xvciBpbiByZXByZWhlbmRlcml0IGluIHZvbHVwdGF0ZSB2ZWxpdCBlc3NlIGNpbGx1bSBkb2xvcmUgZXUgZnVnaWF0IG51bGxhIHBhcmlhdHVyLiBFeGNlcHRldXIgc2ludCBvY2NhZWNhdCBjdXBpZGF0YXQgbm9uIHByb2lkZW50LCBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdCBhbmltIGlkIGVzdCBsYWJvcnVtLg",
            "iOS",
            "Simek",
          ],
          ["ghi", "iOS", "Juwan"],
        ]}
      />
    </div>
  );
}
