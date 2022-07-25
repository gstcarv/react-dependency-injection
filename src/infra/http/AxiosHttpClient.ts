import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { HttpClient, HttpGetParams } from "../../common/http/HttpClient";
import { HttpResponse } from "../../common/http/HttpResponse";
import { Provider } from "../../core/injector/Provider";

@Provider()
export class AxiosHttpClient implements HttpClient {
    axiosInstance!: AxiosInstance;

    async get<T>(url: string, params?: HttpGetParams | undefined): Promise<HttpResponse<T>> {
        const request = await axios.get(url, { params });
        return this.mapAxiosResponseToHttp(request);
    }
    async post<T, R = unknown>(url: string, body: T): Promise<HttpResponse<R>> {
        const request = await axios.post(url, body);
        return this.mapAxiosResponseToHttp(request);
    }

    async put<T, R = unknown>(url: string, body: T): Promise<HttpResponse<R>> {
        const request = await axios.put(url, body);
        return this.mapAxiosResponseToHttp(request);
    }

    async delete<T, R = unknown>(url: string, body: T): Promise<HttpResponse<R>> {
        const request = await axios.delete(url, body);
        return this.mapAxiosResponseToHttp(request);
    }

    private mapAxiosResponseToHttp<T>(response: AxiosResponse): HttpResponse<T> {
        return {
            data: response.data,
            statusCode: response.status,
        };
    }
}
