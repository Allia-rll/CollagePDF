interface RowsColPreviewProps {
  rows: number;
  cols: number;
}

export function RowsColPreview({ rows, cols }: RowsColPreviewProps) {
  return (
    <div className="h-36 w-24 border-2 border-emerald-950 border-opacity-60 rounded-sm shadow-lg shadow-emerald-100 flex flex-col p-1 gap-1">
      {Array(rows)
        .fill(0)
        .map((_, i) => {
          return (
            <div key={`${i}-rowspreview`} className="flex flex-row gap-1 w-full h-full">
              {Array(cols)
                .fill(0)
                .map((_, j) => {
                  return (
                    <div
                      key={`${i}-${j}-cellpreview`}
                      className="flex-1 border-2 border-emerald-900 rounded-md shadow-inner shadow-emerald-50 border-opacity-75 h-full"
                    ></div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
