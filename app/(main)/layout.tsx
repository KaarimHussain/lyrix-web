import Navbar from "@/components/navbar";
import NextAuthSessionProvider from "@/components/providers/session-provider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <NextAuthSessionProvider>
            <Navbar />
            {children}
        </NextAuthSessionProvider>
    );
}
