import { Route, Routes } from "react-router-dom";
import MyContext from "./functions/MyContext";
import AS from "./pages/AS";
import AsReception from "./pages/AsReception";
import Cart from "./pages/Cart";
import Complete from "./pages/Complete";
import Download from "./pages/Download";
import DownloadDetail from "./pages/DownloadDetail";
import FAQ from "./pages/FAQ";
import ForgotId from "./pages/ForgotId";
import ForgotPs from "./pages/ForgotPs";
import Home from "./pages/Home";
import Interest from "./pages/Interest";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Modify from "./pages/Modify";
import MyPage from "./pages/MyPage";
import Notice from "./pages/Notice";
import NoticeDetail from "./pages/NoticeDetail";
import One2one from "./pages/One2one";
import One2OneDetail from "./pages/One2OneDetail";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import Payment from "./pages/Payment";
import Review from "./pages/Review";
import ReviewDetail from "./pages/ReviewDetail";
import ReviewModify from "./pages/ReviewModify";
import ReviewNotice from "./pages/ReviewNotice";
import Shopping from "./pages/Shopping";
import ShoppingDetail from "./pages/ShoppingDetail";
import Support from "./pages/Support";
import Test from "./pages/Test";
import WriteOne2one from "./pages/WriteOne2one";
import WriteReview from "./pages/WriteReview";

export default function App() {
    return (
        <div className="App">
            <MyContext>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/notices" element={<Notice />} />
                    <Route path="/notice/:uid" element={<NoticeDetail />} />
                    <Route path="/downloads" element={<Download />} />
                    <Route path="/download/:uid" element={<DownloadDetail />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/as" element={<AS />} />
                    <Route path="/asReception" element={<AsReception />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/review/notice" element={<ReviewNotice />} />
                    <Route path="/review/:uid" element={<ReviewDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgotId" element={<ForgotId />} />
                    <Route path="/forgotPs" element={<ForgotPs />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/order/detail" element={<OrderDetail />} />
                    <Route path="/shopping" element={<Shopping />} />
                    <Route path="/shopping/detail" element={<ShoppingDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/review/write" element={<WriteReview />} />
                    <Route path="/one2one" element={<One2one />} />
                    <Route path="/one2one/:uid" element={<One2OneDetail />} />
                    <Route path="/one2one/write" element={<WriteOne2one />} />
                    <Route path="/review/modify/:uid" element={<ReviewModify />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/complete" element={<Complete />} />
                    <Route path="/modify" element={<Modify />} />
                    <Route path="/interest" element={<Interest />} />
                </Routes>
            </MyContext>
        </div>
    );
}