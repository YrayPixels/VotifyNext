import Navbar from "@/components/Navbar";
import Proposals from "@/components/Proposals";

export default function ProposalsPage() {
    return (
        <>
            <div className="p-12 min-h-screen">
                <Navbar />
                <Proposals />
            </div>
            {/* <Navigation type={'home'} /> */}
        </>
    );
}
