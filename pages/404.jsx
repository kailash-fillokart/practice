import ErrorPage from "../components/errorpage/error";
import CommonLayout from "../layouts/CommonLayout";

export default function Custom404() {
  return (
    <>
      <CommonLayout>
        <ErrorPage />
      </CommonLayout>
    </>
  );
}
