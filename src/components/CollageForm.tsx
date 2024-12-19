import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import { TypeField } from "./TypeField";
import { ModeField } from "./ModeField";
import { PerpagForm } from "./PerpagForm";
import { useAttchStore } from "@/store/AttchStore";
import { usePdfStore } from "@/store/pdfStore";
import { useNoiceStore } from "@/store/NoiceStore";
import { useEffect } from "react";
import { RowsColForm } from "./RowsColForm";

import { formatImages, getColumsAndRows, definePages } from "@/lib/definePages";

const perPageForm = z.object({
  value: z.string().refine((val) => Number(val) >= 1, {
    message: "Debes seleccionar al menos una imagen por hoja",
  }),
});

const rowscolsForm = z.object({
  rows: z.string().refine((val) => Number(val) >= 1, {
    message: "Debes seleccionar al menos una fila",
  }),
  cols: z.string().refine((val) => Number(val) >= 1, {
    message: "Debes seleccionar al menos una columna",
  }),
});

const FormSchema = z.object({
  imgs: z.number().min(1, "Debes seleccionar al menos una imagen"),
  type: z.enum(["perPage", "rowscol"], {
    required_error: "Debes seleccionar el tipo de collage",
  }),
  mode: z.enum(["contain", "cover", "fill"], {
    required_error: "Debes seleccionar un modo de imagen",
  }),
  mode_data: z.union([perPageForm, rowscolsForm]),
});

export type FormType = z.infer<typeof FormSchema>;

export function CollageForm({ onLoading }: { onLoading: () => void }) {
  const { cleanPages, setPdf } = usePdfStore((state) => state);
  const { imgs, setImgs, setErr } = useAttchStore((state) => state);
  const { setNoice } = useNoiceStore((state) => state);
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!imgs) return;
    try {
      console.log(data);
      console.log(imgs);

      const imgs_ = await formatImages(
        imgs.filter((img) => img.file.type.includes("image")),
      );
      console.log(imgs_);

      let { rows, columns, perPage } = { rows: 0, columns: 0, perPage: 0 };

      if (data.type === "perPage" && "value" in data.mode_data) {
        perPage = Number(data.mode_data.value);
        const { rows: r, columns: c } = getColumsAndRows(perPage);
        rows = r;
        columns = c;
      } else if (
        data.type === "rowscol" &&
        "rows" in data.mode_data &&
        "cols" in data.mode_data
      ) {
        rows = Number(data.mode_data.rows);
        columns = Number(data.mode_data.cols);
        perPage = rows * columns;
      }

      const pages = definePages(imgs_, perPage, rows, columns);
      setPdf(pages, perPage, data.mode);
      setImgs(imgs_);

      console.log(pages);
      onLoading();
    } catch (error) {
      setNoice({
        type: "error",
        message:
          error instanceof Error ? error.message : "Hubo un error inesperado",
      });
      cleanPages();
    }
  }

  useEffect(() => {
    form.setValue("imgs", imgs?.length || 0);
    if (imgs?.length && imgs?.length >= 1) form.clearErrors("imgs");
  }, [imgs]);

  useEffect(() => {
    setErr(form.formState.errors.imgs ? true : false);
  }, [form.formState.errors.imgs]);

  return (
    <div className="overflow-hidden bg-white py-2 md:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-12">
              <ModeField form={form} />
              <div className="flex flex-col w-full">
                <TypeField form={form} />
                {form.watch("type") === "perPage" && <PerpagForm form={form} />}
                {form.watch("type") === "rowscol" && (
                  <RowsColForm form={form} />
                )}
              </div>
            </div>
            <Button className="my-4" type="submit">
              Generar PDF
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
