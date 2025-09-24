'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav style={{
            backgroundColor: '#f8f9fa',
            padding: '15px 20px',
            borderBottom: '1px solid rgb(135, 148, 160)',
            fontFamily: 'Arial, sans-serif',
            position: 'relative'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>
                    Hanti
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <a href="#" style={{ textDecoration: 'none', color: '#333', padding: '8px 12px', borderRadius: '4px' }}>Buy</a>
                    <a href="#" style={{ textDecoration: 'none', color: '#333', padding: '8px 12px', borderRadius: '4px' }}>Rent</a>
                    <Link href="/auth/seller-flow" style={{ textDecoration: 'none', color: '#333', padding: '8px 12px', borderRadius: '4px' }}>Sell</Link>
                    <a href="#" style={{ textDecoration: 'none', color: '#333', padding: '8px 12px', borderRadius: '4px' }}>List Rentals</a>
                    <a href="#" style={{ textDecoration: 'none', color: '#333', padding: '8px 12px', borderRadius: '4px' }}>See Agents</a>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Link href="/auth/login-flow" style={{ textDecoration: 'none', color: '#333', padding: '8px 12px', borderRadius: '4px' }}>
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
}
