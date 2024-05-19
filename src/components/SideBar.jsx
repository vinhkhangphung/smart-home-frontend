import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="w-60 rounded-lg bg-primary-content text-black border border-solid border-gray-500/20">
      <ul className="pl-2 pr-4 text-center justify-start space-y-6">
        <li className="mt-4">
          <Link
            to={"/home"}
            className="block border-double border-2 rounded-xl border-slate-800/30 p-2 outline-2 outline-offset-2 cursor-pointer hover:bg-slate-200 text-xl font-medium"
          >
            Dashboard
          </Link>
        </li>
        <li className="">
          <Link
            to={"/control"}
            className="block border-double border-2 rounded-xl border-slate-800/30 p-2 outline-2 outline-offset-2 cursor-pointer hover:bg-slate-200 text-xl font-medium"
          >
            Control
          </Link>
        </li>
        <li className="">
          <Link
            to={"/account"}
            className="block border-double border-2 rounded-xl border-slate-800/30 p-2 outline-2 outline-offset-2 cursor-pointer hover:bg-slate-200 text-xl font-medium"
          >
            Account
          </Link>
        </li>
      </ul>
    </div>
  );
}
