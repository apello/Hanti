import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <a href="#">Buy</a> |
            <a href="#">Rent</a> |
            <Link href="/auth/seller-flow/">Sell</Link> |
            <Link href="/auth/rental-flow">List Rentals</Link> |
            <a href="#">See Agents</a> |
            <a href="#">Sign In</a>
            <br />
            <a href="#">Join Us Now</a>
        </nav>
    );
}
