import RequestHandler from "@/components/RequestHandler";

declare module "vue/types/vue" {
  interface Vue {
    $RequestHandler: RequestHandler;
  }
}

declare module "vue-progressbar";
