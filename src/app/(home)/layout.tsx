import { Metadata } from "next";

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
            {children}
        </>
    )
}