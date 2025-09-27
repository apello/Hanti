'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getInitialSession();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

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
                    {!loading && (
                        user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: '#333' }}>
                                    {user.email}
                                </span>
                                <button
                                    onClick={handleSignOut}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#333',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link href="/auth/login-flow" style={{ textDecoration: 'none', color: '#333', padding: '8px 12px', borderRadius: '4px' }}>
                                Sign In
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
}
