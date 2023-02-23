import * as React from "react";
import { twMerge } from "tailwind-merge";

type Columns<T> = {
  [Key in keyof T]: {
    title: string;
    renderCell?: (props: T[Key]) => React.ReactElement;
    renderHeader?: (props: { title: string }) => React.ReactElement;
  };
};

type TableProps<T extends object> = {
  /**
   * Array of objects containing row data.
   *
   * **Hint:** if you specify this prop first, your IDE will be able to guide
   * you through creating custom `renderCell` functions!
   */
  data: T[];
  /**
   * Object (aka dictionary aka record) mapping keys from row objects to objects
   * containing column title and optional cell and header rendering functions.
   */
  columns: Columns<T>;
  /**
   * Override CSS `gridTemplateColumns`.
   *
   * Default value: `auto repeat(N, min-content)` (where `N` is number of
   * columns).
   */
  overrideGridTemplateColumns?: string;
  title?: string;
  description?: string;
};

export function Table<T extends object>({
  columns,
  data,
  title,
  description,
  overrideGridTemplateColumns,
}: TableProps<T>) {
  const entries = Object.entries(columns) as [keyof T, Columns<T>[keyof T]][];

  const normal = (
    <div
      className="hidden md:grid bg-white border border-gray-300 m-4 rounded-lg overflow-x-auto"
      style={{
        gridTemplateColumns:
          overrideGridTemplateColumns ??
          `auto repeat(${entries.length - 1}, min-content)`,
        boxShadow:
          "0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.025)",
      }}
    >
      {(title || description) && (
        <div
          className="px-6 py-3"
          style={{
            gridColumnStart: 1,
            gridColumnEnd: entries.length + 1,
          }}
        >
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && (
            <span className="text-gray-400 text-sm">{description}</span>
          )}
        </div>
      )}
      {entries.map(([key, column]) => {
        if (column.renderHeader) {
          const HeaderComponent = column.renderHeader;
          return <HeaderComponent key={String(key)} title={column.title} />;
        } else {
          return (
            <div
              key={String(key)}
              className={twMerge(
                "text-xs font-medium text-gray-500 px-6 py-3",
                title && "bg-gray-100 border-t"
              )}
            >
              {column.title}
            </div>
          );
        }
      })}
      {data.map((row, rowIndex) => {
        if (Object.keys(row).length !== entries.length) {
          console.warn(
            `Number of keys in data[${rowIndex}] doesn't match number of columns.`
          );
        }

        return (
          <React.Fragment key={rowIndex}>
            {entries.map((_, i) => (
              <div
                key={`${rowIndex}-${i}`}
                className="h-px w-full bg-gray-300"
              />
            ))}
            {entries.map(([key, column]) => {
              const CellComponent = column.renderCell;
              if (CellComponent) {
                return (
                  <CellComponent
                    key={`${String(key)}-${rowIndex}`}
                    {...row[key]}
                  />
                );
              } else {
                return (
                  <div
                    key={`${String(key)}-${rowIndex}`}
                    className="px-6 py-3 truncate self-center"
                  >
                    {String(row[key])}
                  </div>
                );
              }
            })}
          </React.Fragment>
        );
      })}
    </div>
  );

  const mobile = (
    <div className="flex flex-col md:hidden gap-4 m-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {data.map((row, rowIndex) => {
        if (Object.keys(row).length !== entries.length) {
          console.warn(
            `Number of keys in data[${rowIndex}] doesn't match number of columns.`
          );
        }

        return (
          <div
            key={rowIndex}
            className="border border-gray-300 rounded-lg overflow-x-auto"
            style={{
              boxShadow:
                "0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.025)",
            }}
          >
            <div
              className="grid"
              style={{ gridTemplateColumns: "min-content auto" }}
            >
              {entries.map(([key, column], columnIndex) => {
                let cellElement, headerElement;

                if (column.renderCell) {
                  const CellComponent = column.renderCell;
                  cellElement = (
                    <CellComponent
                      key={`${String(key)}-${rowIndex}`}
                      {...row[key]}
                    />
                  );
                } else {
                  cellElement = (
                    <div
                      key={`${String(key)}-${rowIndex}`}
                      className={"px-6 py-3"}
                    >
                      {String(row[key])}
                    </div>
                  );
                }

                if (column.renderHeader) {
                  const Component = column.renderHeader;
                  headerElement = (
                    <Component key={String(key)} title={column.title} />
                  );
                } else {
                  headerElement = (
                    <div className="text-sm text-gray-500 flex items-center px-6 py-3">
                      {column.title}
                    </div>
                  );
                }

                return (
                  <React.Fragment key={String(key)}>
                    {columnIndex > 0 && (
                      <>
                        <div className="h-px w-full bg-gray-300" />
                        <div className="h-px w-full bg-gray-300" />
                      </>
                    )}
                    {headerElement}
                    {cellElement}
                  </React.Fragment>
                );
              })}
            </div>
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
