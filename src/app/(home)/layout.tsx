import { Metadata } from "next";

// Components
import Nav from "@/components/ui/nav/nav";
import Footer from "@/components/ui/footer/footer";

export const metadata: Metadata = {
    title: "Welcome back!"
}

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Nav />
            {children}
            <Footer />
        </>
    )
}