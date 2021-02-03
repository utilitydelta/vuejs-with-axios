//Parts of this taken from https://laptrinhx.com/how-does-axios-cancel-duplicate-requests-253816797/

import axios, { AxiosInstance } from "axios";

export default class RequestHandler {
  pendingRequests = new Map();
  requestCount = 0;

  addRequest() {
    if (this.requestCount == 0) {
      this.progress.start();
    }
    this.requestCount++;
  }

  removeRequest() {
    this.requestCount--;
    if (this.requestCount == 0) {
      this.progress.finish();
    }
  }
  constructor(
    router: any,
    public AxiosService: AxiosInstance,
    private progress: any
  ) {
    router.beforeEach((_to: any, _from: any, next: () => void) => {
      this.clearPending();

      this.requestCount = 0;
      progress.finish();

      next();
    });

    AxiosService.interceptors.request.use(
      (config) => {
        this.addRequest();
        this.removePending(config); // check and cancel the previous request before the request starts
        this.addPending(config); // add the current request to pending
        return config;
      },
      (error) => {
        this.removeRequest();
        return Promise.reject(error);
      }
    );

    AxiosService.interceptors.response.use(
      (response) => {
        this.removeRequest();
        this.removePending(response.config); // after the request, remove the request
        return response;
      },
      (error) => {
        this.removeRequest();
        return Promise.reject(error);
      }
    );
  }

  private requestSignature(config: any): string {
    return [
      config.method,
      config.url,
      JSON.stringify(config.params),
      JSON.stringify(config.data),
    ].join("&");
  }

  private addPending(config: any) {
    const url = this.requestSignature(config);
    config.cancelToken =
      config.cancelToken || //Already a cancellation token in place?
      new axios.CancelToken((cancel) => {
        // if the current request does not exist in pending, add it
        if (!this.pendingRequests.has(url)) {
          this.pendingRequests.set(url, cancel);
        }
      });
  }

  private removePending(config: any) {
    const url = this.requestSignature(config);

    // if the current request ID exists in pending, you need to cancel the current request and remove it
    if (this.pendingRequests.has(url)) {
      const cancellationFunction = this.pendingRequests.get(url);
      cancellationFunction(url); //url here is just for info
      this.pendingRequests.delete(url);
    }
  }

  private clearPending() {
    for (const [url, cancellationFunction] of this.pendingRequests) {
      cancellationFunction(url);
    }
    this.pendingRequests.clear();
  }
}
