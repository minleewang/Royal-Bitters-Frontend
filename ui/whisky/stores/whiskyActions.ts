import * as axiosUtility from "../../utility/axiosInstance";

export const whiskyAction = {
  async requestWhiskyList(
    page: number = 1,
    perPage: number = 8
  ): Promise<void> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res = await djangoAxiosInstance.get("/whisky/list", {
        params: { page, perPage },
      });
      console.log("Response Data:", res.data);

      this.whiskyList = res.data.dataList;
      this.totalPages = res.data.totalPages;
      this.currentPage = page;
    } catch (error) {
      console.log("requestWhiskyList() 중 에러:", error);
    }
  },
  async requestCreateBeer(imageFormData: FormData): Promise<void> {
    console.log(`requestCreateWhisky(): ${imageFormData}`);
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res = await djangoAxiosInstance.post(
        "/whiksy/create",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response Data:", res.data);
    } catch (error) {
      console.log("requestCreateWhisky() 중 에러:", error);
    }
  },
  async requestWhiskyById(id: string): Promise<any> {
    const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

    try {
      const res = await djangoAxiosInstance.get(`/whisky/read/${id}`);
      console.log("Response Data:", res.data);
      return res.data;
    } catch (error) {
      console.log("requestWhiskyById() 중 에러:", error);
      throw error;
    }
  },
};
