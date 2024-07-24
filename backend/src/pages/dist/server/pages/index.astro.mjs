import { c as createComponent, r as renderTemplate, a as addAttribute, d as renderHead, e as renderSlot, f as renderComponent, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_BHdie5pW.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { Cross2Icon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/* empty css                                 */
import { useDropzone } from 'react-dropzone-esm';
import { create } from 'zustand';
import { CloudArrowUpIcon, XCircleIcon } from '@heroicons/react/24/solid';
import useEmblaCarousel from 'embla-carousel-react';
import { Slot } from '@radix-ui/react-slot';
export { renderers } from '../renderers.mjs';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(Cross2Icon, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold [&+div]:text-xs", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Toaster", Toaster, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/ui/toaster", "client:component-export": "Toaster" })} </body></html>`;
}, "D:/Astro Projects/Collage generator/frontend/src/layouts/Layout.astro", void 0);

const useAttchStore = create((set) => ({
  imgs: null,
  err: false,
  setErr: (err) => set(() => ({ err })),
  setImgs: (imgs) => set(() => ({ imgs })),
  addImg: (file) => set((state) => ({
    imgs: state.imgs ? [...state.imgs, { file, src: URL.createObjectURL(file) }] : [{ file, src: URL.createObjectURL(file) }]
  })),
  deleteImg: (index) => set((state) => ({
    imgs: state.imgs ? state.imgs.filter((_, i) => i !== index) : null
  })),
  clean: () => set(() => ({ imgs: null, err: false }))
}));

const ERRORS = {
  invalid_file_type: "Archivo no permitido",
  too_many_files: "Solo es posible subir 20 archivos a la vez",
  file_too_large: "Max size = 100MB",
  file_not_found: "No file found",
  upload_failed: "Upload failed"
};
const typesAccepted = ["jpg", "jpeg", "png"];
function UploadZone() {
  const { addImg, err } = useAttchStore((state) => state);
  const validateFiles = (file) => {
    if (file === void 0 || file.name === void 0)
      return {
        code: "no-file-found",
        message: ERRORS.file_not_found
      };
    const ext = file.name.split(".").pop() || "";
    if (!typesAccepted.includes(ext))
      return {
        code: "type-incorrect",
        message: ERRORS.invalid_file_type
      };
    if (file.size > 1024 * 1024 * 100) {
      console.log("file too large");
      return {
        code: "file-too-large",
        message: ERRORS.file_too_large
      };
    }
    return null;
  };
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDropAccepted: (aceeptedFiles) => {
      aceeptedFiles.forEach((file) => {
        addImg(file);
      });
    },
    validator: validateFiles,
    maxFiles: 20
  });
  const errorsMessage = useMemo(() => {
    if (fileRejections[0]) {
      const { errors } = fileRejections[0];
      if (errors[0].code === "file-too-large") {
        return ERRORS.file_too_large;
      } else if (errors[0].code === "type-incorrect") {
        return ERRORS.invalid_file_type;
      } else if (errors[0].code === "too-many-files") {
        return ERRORS.too_many_files;
      } else {
        return ERRORS.upload_failed;
      }
    }
    return void 0;
  }, [fileRejections]);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center w-full px-4 sm:px-36 lg:px-36 md:px-20", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r to-emerald-600 from-sky-400 p-3 rounded-lg w-full", children: /* @__PURE__ */ jsxs(
    "div",
    {
      ...getRootProps(),
      className: "flex flex-col items-center justify-center pt-5 pb-6 w-full px-4 h-28 border-2 border-white border-dashed rounded-lg cursor-pointer bg-gray-300 bg-opacity-25 border-opacity-25 text-opacity-100 hover:bg-opacity-25 hover:bg-bray-800 hover:bg-gray-600 hover:border-white",
      children: [
        /* @__PURE__ */ jsx(
          CloudArrowUpIcon,
          {
            className: `h-8 w-8 ${err ? "text-red-600" : "text-white"}`
          }
        ),
        errorsMessage ? /* @__PURE__ */ jsx("p", { className: "text-red-500", children: errorsMessage }) : /* @__PURE__ */ jsxs(
          "p",
          {
            className: `text-sm ${err ? "text-red-600" : "text-white"} text-center`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm mt-2", children: "Click para seleccionar un archivo" }),
              " ",
              "o arrastralo aquí"
            ]
          }
        ),
        /* @__PURE__ */ jsx("input", { ...getInputProps() })
      ]
    }
  ) }) });
}

const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRightIcon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";

function Attachments() {
  const { imgs, err } = useAttchStore((state) => state);
  const [api, setApi] = useState();
  const handleDelete = useAttchStore((state) => state.deleteImg);
  const handleClean = useAttchStore((state) => state.clean);
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("slidesChanged", () => {
      if (api.canScrollNext()) api.scrollNext();
    });
  }, [api]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Carousel,
      {
        opts: {
          align: "start"
        },
        setApi,
        className: "w-full",
        children: [
          /* @__PURE__ */ jsx(CarouselContent, { children: imgs && imgs.length >= 1 ? imgs.map((image, index) => /* @__PURE__ */ jsx(
            CarouselItem,
            {
              className: "sm:basis-1/2 lg:basis-1/3 mx-auto",
              children: /* @__PURE__ */ jsx("div", { className: "p-1", children: /* @__PURE__ */ jsxs(Card, { className: "max-h-[282px] relative", children: [
                /* @__PURE__ */ jsx(
                  XCircleIcon,
                  {
                    className: "cursor-pointer w-8 h-8 text-red-800 hover:text-red-900 absolute top-[-8px] right-[-8px] z-100",
                    onClick: () => handleDelete(index)
                  }
                ),
                /* @__PURE__ */ jsx(CardContent, { className: "flex flex-col aspect-square items-center justify-center p-6", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: image.src,
                    alt: "",
                    className: "w-full h-full object-contain"
                  }
                ) })
              ] }) })
            },
            index
          )) : /* @__PURE__ */ jsx(
            CarouselItem,
            {
              className: "sm:basis-1/2 lg:basis-1/3 mx-auto",
              children: /* @__PURE__ */ jsx("div", { className: "p-1", children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "flex aspect-square items-center justify-center p-6", children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-2xl sm:text-xl font-semibold text-center ${err && "text-red-800"}`,
                  children: "No hay imagenes seleccionadas"
                }
              ) }) }) })
            },
            "null-images"
          ) }),
          /* @__PURE__ */ jsx(CarouselPrevious, {}),
          /* @__PURE__ */ jsx(CarouselNext, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-1/2 sm:w-1/5 mt-2",
        variant: "destructive",
        onClick: handleClean,
        disabled: imgs?.length === void 0,
        children: "Limpiar"
      }
    )
  ] });
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto max-w-7xl py-5 lg:py-10 flex flex-col items-center"> <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
Collage <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">PDF</span> </h1> <p class="mb-6 text-lg font-normal text-gray-500 px-4 text-center lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
Arrastra los archivos al área de carga y genera un PDF con todas las
      imágenes.
</p> </main> ${renderComponent($$result2, "UploadZone", UploadZone, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/Astro Projects/Collage generator/frontend/src/components/UploadZone.tsx", "client:component-export": "UploadZone" })} <div class="mx-auto my-4 min-w-72 w-[250px] sm:w-[500px] md:w-[600px] lg:w-[900px]"> ${renderComponent($$result2, "Attachments", Attachments, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/Astro Projects/Collage generator/frontend/src/components/Attachments.tsx", "client:component-export": "Attachments" })} </div> ${renderComponent($$result2, "CollageForm", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/CollageForm", "client:component-export": "CollageForm" })} ${renderComponent($$result2, "PDFViewer", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/PDFViewer", "client:component-export": "PDFViewer" })} ` })}`;
}, "D:/Astro Projects/Collage generator/frontend/src/pages/index.astro", void 0);

const $$file = "D:/Astro Projects/Collage generator/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
