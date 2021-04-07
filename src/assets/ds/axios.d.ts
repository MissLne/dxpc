// @ts-ignore
import {AxiosInstance} from "axios/index.d.ts";
import Request from "@/web/api";
import {FormRequest} from "@/web/api";
import {JsonRequest} from "@/web/api"
declare module 'vue/types/vue' {
    interface Vue {
        $http : AxiosInstance,
        $request : Request,
        $formRequest : FormRequest,
        $jsonRequest : JsonRequest
    }
}
