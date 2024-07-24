import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Button } from "@/components/ui/button";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Loading } from "./Loading";

import { Form } from "@/components/ui/form";

import { TypeField } from "./TypeField";
import { ModeField } from "./ModeField";
import { PerpagForm } from "./PerpagForm";
import { useAttchStore } from "@/store/AttchStore";
import { usePdfStore } from "@/store/pdfStore";
import { useEffect, useState } from "react";

const perPageForm = z.object({
  value: z.string({
    required_error: "Debes seleccionar la cantidad de imagenes por hoja",
  }),
});

const FormSchema = z.object({
  imgs: z.number().min(1, "Debes seleccionar al menos una imagen"),
  type: z.enum(["perPage"], {
    required_error: "Debes seleccionar el tipo de collage",
  }),
  mode: z.enum(["fit", "fill", "stretch"], {
    required_error: "Debes seleccionar un modo de imagen",
  }),
  mode_data: z.union([perPageForm, z.string()]),
});

export function CollageForm() {
  const [open, setOpen] = useState(false);
  const { setPdfUrl, cleanPdfUrl } = usePdfStore((state) => state);
  const { imgs, setErr } = useAttchStore((state) => state);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formData = new FormData();
      formData.append("mode", data.mode);
      const mode_data = Object(data.mode_data.valueOf());
      formData.append("mode_data", JSON.stringify(mode_data));
      imgs?.forEach((img) => {
        formData.append("images", img.file);
      });

      setOpen(true);
      await fetch(`http://localhost:5050/${data.type}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.blob())
        .then((data) => {
          setPdfUrl(data);
          toast({
            title: "Collage generado",
            description: "Todo perfecto!",
            action: (
              <ToastAction
                className="bg-gradient-to-r to-emerald-600 from-sky-400"
                altText="Ver PDF"
              >
                <a className="font-bold text-white" href="#pdfview">
                  Ver PDF
                </a>
              </ToastAction>
            ),
          });
        })
        .catch((err) => {
          console.log(err.message);
          throw new Error("Algo esta fallando, vuelva a intentarlo luego");
        })
        .finally(() => setOpen(false));
    } catch (error) {
      toast({
        description: (
          <div className="flex items-center gap-3 text-sm rounded-lg">
            <ExclamationCircleIcon className="h-10 w-10 text-white" />
            <div>
              {error instanceof Error
                ? error.message
                : "Hubo un error inesperado"}
            </div>
          </div>
        ),
        variant: "destructive",
      });
      cleanPdfUrl();
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
    <div className="overflow-hidden bg-white py-4 sm:py-2">
      <Loading open={open} />

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
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
