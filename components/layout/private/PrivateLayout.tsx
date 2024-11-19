

import Sidebar from "./Sidebar";
import SMPrivateNavbar from "./SMNavbar";

interface PROPS {
    children: any;
}


export default function PrivateLayout({ children }: PROPS) {


    return <div>
        <SMPrivateNavbar />
        <div className="pt-24 md:pt-0">
            <Sidebar />
            <section className={`md:ml-[150px] flex overflow-y-scroll flex-col flex-auto border-x border-gray-100`}>
                {children}
            </section>
        </div>
    </div>
}