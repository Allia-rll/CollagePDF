import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "./ui/input";
import { RowsColPreview } from "./RowsColPreview";
import { UseFormReturn } from "react-hook-form";
import type { FormType } from "@/components/CollageForm";

interface RowsColFormProps {
  form: UseFormReturn<FormType>;
}

export function RowsColForm({ form }: RowsColFormProps) {
  const rows = Number(form.watch("mode_data.rows"));
  const cols = Number(form.watch("mode_data.cols"));
  return (
    <div className="grid grid-cols-2 gap-4 pt-2">
      <div>
        <FormField
          control={form.control}
          name="mode_data.rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Filas</FormLabel>
              <Input
                {...form.register("mode_data.rows")}
                type="number"
                placeholder="Numero de filas"
                min={1}
                max={30}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mode_data.cols"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Columnas</FormLabel>
              <Input
                {...form.register("mode_data.cols")}
                type="number"
                placeholder="Numero de columas"
                min={1}
                max={30}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {rows >= 1 && cols >= 1 && (
        <div className="mt-4 ml-4 flex flex-col items-center">
          <RowsColPreview rows={rows} cols={cols} />
          <span className="text-lg mt-2">{rows * cols} imagenes</span>
        </div>
      )}
    </div>
  );
}
