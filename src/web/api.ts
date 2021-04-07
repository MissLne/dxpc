import axios from "./axios";
import instance from "./axios";


export class Request {
    get(url : string, data ?: object) {
        return axios.get(url, {
            params : data
        })
    }

    post(url : string, data ?: object, config ?: object) {
        return axios.post(url, data, config);
    }

    upload(url : string, data ?: object) {
        data && (data = data instanceof FormData ? data : dataToFormData(data));
        return axios.post(url, data, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    }
    download(url : string, data ?: object) {
        data && (data = data instanceof FormData ? data : dataToFormData(data));
        return axios.post(url, data, {
            headers: {'Content-Type': 'application/json'}
        });
    }
    // multipart/form-data
    put(url : string, data ?: object, config ?: object) {
        return axios.put(url, data, config);
    }

    delete(url : string, data ?: object) {
        return axios.delete(url, data);
    }


}

class FormRequest extends Request{
    @ResponseInterceptor
    put(url: string, data?: object, config?: object) {
        return super.put(url, data, config);
    }
    @ResponseInterceptor
    post(url: string, data?: object, config ?: object) {
        return super.post(url, data, config);
    }
}
class JsonRequest extends Request{
    @ResponseInterceptor1
    put(url: string, data?: object, config?: object) {
        return super.put(url, data, config);
    }
    @ResponseInterceptor1
    post(url: string, data?: object, config ?: object) {
        return super.post(url, data, config);
    }
}


function dataToFormData(data ?: object) {
    if (data == null) {
        return new FormData();
    }
    if (data instanceof FormData) {
        return data;
    }
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, (<any>data)[key]);
    });
    return formData;
}
function dataToJsonData(data ?: object) {
    console.log(data)
    return data;
}
function setFormConfigHeader(config ?: object) {
    console.log('00'+config)
    config  = config ? config : {};
    config = {
        ...config,
        'Content-Type' : 'multipart/form-data'
    };
    
    return config;
}
function setFormConfigHeader1(config ?: object) {
    console.log('00000'+config)
    config  = config ? config : {};
    config = {
        ...config,
        'Content-Type' : 'application/json;charset=UTF-8'
    };
    
    return config;
}


function ResponseInterceptor(request : any, key : string, config : PropertyDescriptor) {
    let cache = request[key];
    config.value = function(url : string, data ?: object, config ?: object) {
        return cache(url, dataToFormData(data), setFormConfigHeader(config));
    };
    console.log(config)
}

function ResponseInterceptor1(request : any, key : string, config : PropertyDescriptor) {
    let cache = request[key];
    config.value = function(url : string, data ?: object, config ?: object) {
        return cache(url,dataToJsonData(data), setFormConfigHeader1(config));
    };
    console.log(config)
}

const request = new Request();
const formRequest = new FormRequest();
const jsonRequest = new JsonRequest();
export {request, formRequest, FormRequest, JsonRequest, jsonRequest};
export default Request;
