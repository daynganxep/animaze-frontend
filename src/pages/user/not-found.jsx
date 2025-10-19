import { Link } from "react-router-dom";
import notFoundImg from "@/assets/images/not-found.gif";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center not-found-container">
      <img src={notFoundImg} alt="Page not found" className="w-1/2 mb-6" />
      <h1 className="mb-4 text-4xl font-bold text-gray-700">
        Ôiii! Không tìm thấy trang này!
      </h1>
      <p className="mb-6 text-gray-600">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link to="/" className="text-lg text-blue-500 hover:underline">
        Quay về trang chủ
      </Link>
    </div>
  );
}

export default NotFound;
