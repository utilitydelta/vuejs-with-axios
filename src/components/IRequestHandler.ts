//Parts of this taken from https://laptrinhx.com/how-does-axios-cancel-duplicate-requests-253816797/

import { AxiosInstance } from "axios";

export default interface IRequestHandler {
  Axios: AxiosInstance;
}
