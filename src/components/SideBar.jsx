import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="w-60 bg-primary-content text-black">
      <ul className="pl-2 pr-4 text-center justify-start">
        <li className="my-4">
          <Link
            to={"/home"}
            className="block border rounded-lg border-slate-400 p-1 outline-2 outline-offset-2 cursor-pointer hover:bg-gray-500 text-lg"
          >
            Dashboard
          </Link>
        </li>
        <li className="my-4">
          <Link
            to={"/control"}
            className="block border rounded-lg border-slate-400 p-1 outline-2 outline-offset-2 cursor-pointer hover:bg-gray-500 text-lg"
          >
            Control
          </Link>
        </li>
        <li className="my-4">
          <Link
            to={"/account"}
            className="block border rounded-lg border-slate-400 p-1 outline-2 outline-offset-2 cursor-pointer hover:bg-gray-500 text-lg"
          >
            Account
          </Link>
        </li>
      </ul>
    </div>
  );
}
